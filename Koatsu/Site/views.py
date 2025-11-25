from django.shortcuts import render, redirect
from django.http import JsonResponse
from django.views.decorators.http import require_POST
from django.core.mail import send_mail, EmailMessage
from django.template.loader import render_to_string
from django.contrib import messages
from django.conf import settings
import json


# ============================================================
# CONFIGURATION LANGUE ET COOKIES
# ============================================================

SUPPORTED_LANGUAGES = {
    'en': {
        'name': 'English',
        'native_name': 'English',
        'flag': '🇺🇸'
    },
    'ja': {
        'name': 'Japanese',
        'native_name': '日本語',
        'flag': '🇯🇵'
    }
}

DEFAULT_LANGUAGE = 'en'


def get_language_context(request):
    """
    Retourne le contexte de langue pour les templates.
    """
    current_lang = getattr(request, 'language', DEFAULT_LANGUAGE)
    cookie_consent = getattr(request, 'cookie_consent', None)
    show_cookie_banner = getattr(request, 'show_cookie_banner', True)

    return {
        'current_language': current_lang,
        'languages': SUPPORTED_LANGUAGES,
        'cookie_consent': cookie_consent,
        'show_cookie_banner': show_cookie_banner,
    }


# ============================================================
# VUES DE GESTION DES COOKIES
# ============================================================

@require_POST
def set_cookie_consent(request):
    """
    Vue pour définir le consentement aux cookies.
    POST: { "consent": "accepted" | "rejected" }
    """
    try:
        data = json.loads(request.body)
        consent = data.get('consent', 'rejected')

        if consent not in ['accepted', 'rejected']:
            return JsonResponse({'error': 'Invalid consent value'}, status=400)

        response = JsonResponse({
            'success': True,
            'consent': consent,
            'message': 'Cookie consent saved successfully'
        })

        # Définir le cookie de consentement (toujours autorisé car nécessaire)
        max_age = 365 * 24 * 60 * 60  # 1 an
        response.set_cookie(
            'koatsu_cookie_consent',
            consent,
            max_age=max_age,
            httponly=False,
            samesite='Lax',
            secure=not settings.DEBUG
        )

        # Si consentement refusé, supprimer les cookies de préférence
        if consent == 'rejected':
            response.delete_cookie('koatsu_language')

        return response

    except json.JSONDecodeError:
        return JsonResponse({'error': 'Invalid JSON'}, status=400)
    except Exception as e:
        return JsonResponse({'error': str(e)}, status=500)


@require_POST
def set_language(request):
    """
    Vue pour changer la langue de préférence.
    POST: { "language": "en" | "ja" }
    """
    try:
        data = json.loads(request.body)
        language = data.get('language', DEFAULT_LANGUAGE)

        if language not in SUPPORTED_LANGUAGES:
            return JsonResponse({
                'error': f'Unsupported language: {language}',
                'supported': list(SUPPORTED_LANGUAGES.keys())
            }, status=400)

        response = JsonResponse({
            'success': True,
            'language': language,
            'language_info': SUPPORTED_LANGUAGES[language]
        })

        # Sauvegarder le cookie de langue (cookie fonctionnel, toujours autorisé)
        # Les cookies de préférence de langue sont considérés comme "nécessaires" selon RGPD
        max_age = 365 * 24 * 60 * 60  # 1 an
        response.set_cookie(
            'koatsu_language',
            language,
            max_age=max_age,
            httponly=False,
            samesite='Lax',
            secure=not settings.DEBUG
        )

        return response

    except json.JSONDecodeError:
        return JsonResponse({'error': 'Invalid JSON'}, status=400)
    except Exception as e:
        return JsonResponse({'error': str(e)}, status=500)


def get_cookie_status(request):
    """
    Vue pour récupérer le statut des cookies.
    GET: Retourne le statut actuel
    """
    consent = request.COOKIES.get('koatsu_cookie_consent', None)
    language = request.COOKIES.get('koatsu_language', DEFAULT_LANGUAGE)

    return JsonResponse({
        'consent': consent,
        'language': language,
        'language_info': SUPPORTED_LANGUAGES.get(language, SUPPORTED_LANGUAGES[DEFAULT_LANGUAGE])
    })


# ============================================================
# VUES DES PAGES PRINCIPALES
# ============================================================

def index(request):
    """Vue de la page d'accueil avec formulaire de devis"""
    context = {
        'title': 'Home - KOATSU',
        'message': 'Welcome to KOATSU!',
        'form_submitted': False,
        'form_success': False,
        'form_error': None
    }
    context.update(get_language_context(request))

    # Traitement du formulaire de devis
    if request.method == 'POST' and request.POST.get('quote_form'):
        name = request.POST.get('name', '').strip()
        email = request.POST.get('email', '').strip()
        message = request.POST.get('message', '').strip()

        # Validation basique
        if not all([name, email, message]):
            context['form_submitted'] = True
            context['form_error'] = 'Please fill in all required fields.'
            return render(request, 'index.html', context)

        try:
            # Email HTML stylisé pour Hasan
            email_subject = f'🔔 Nouvelle demande de devis KOATSU - {name}'
            
            notification_html = f"""
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f5f5f5;">
    <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f5f5f5; padding: 40px 20px;">
        <tr>
            <td align="center">
                <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.1);">
                    
                    <!-- Header avec logo et gradient -->
                    <tr>
                        <td style="background: linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%); padding: 40px 30px; text-align: center;">
                            <h1 style="color: #ffffff; margin: 0; font-size: 32px; font-weight: 700; letter-spacing: 3px;">KOATSU</h1>
                            <p style="color: #c9a227; margin: 10px 0 0 0; font-size: 14px; letter-spacing: 2px;">GLOBAL LIMITED</p>
                        </td>
                    </tr>
                    
                    <!-- Bande dorée décorative -->
                    <tr>
                        <td style="background: linear-gradient(90deg, #c9a227, #d4af37, #c9a227); height: 4px;"></td>
                    </tr>
                    
                    <!-- Alerte nouvelle demande de devis -->
                    <tr>
                        <td style="background-color: #fff3cd; padding: 20px 30px; border-left: 5px solid #c9a227;">
                            <h2 style="color: #856404; margin: 0; font-size: 20px;">
                                💰 Nouvelle demande de devis !
                            </h2>
                            <p style="color: #856404; margin: 10px 0 0 0; font-size: 14px;">
                                Un visiteur a demandé un devis via le formulaire de la page d'accueil.
                            </p>
                        </td>
                    </tr>
                    
                    <!-- Informations du client -->
                    <tr>
                        <td style="padding: 30px;">
                            <h3 style="color: #1a1a2e; margin: 0 0 20px 0; font-size: 18px; border-bottom: 2px solid #c9a227; padding-bottom: 10px;">
                                👤 Informations du client
                            </h3>
                            
                            <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom: 25px;">
                                <tr>
                                    <td style="padding: 12px 0; border-bottom: 1px solid #eeeeee;">
                                        <strong style="color: #1a1a2e; display: inline-block; width: 120px;">Nom:</strong>
                                        <span style="color: #333333; font-size: 16px;">{name}</span>
                                    </td>
                                </tr>
                                <tr>
                                    <td style="padding: 12px 0; border-bottom: 1px solid #eeeeee;">
                                        <strong style="color: #1a1a2e; display: inline-block; width: 120px;">Email:</strong>
                                        <a href="mailto:{email}" style="color: #0066cc; text-decoration: none; font-size: 16px;">{email}</a>
                                    </td>
                                </tr>
                            </table>
                            
                            <!-- Détails et exigences -->
                            <h3 style="color: #1a1a2e; margin: 0 0 15px 0; font-size: 18px; border-bottom: 2px solid #c9a227; padding-bottom: 10px;">
                                📋 Détails & Exigences
                            </h3>
                            
                            <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f8f9fa; border-radius: 8px; border-left: 4px solid #c9a227;">
                                <tr>
                                    <td style="padding: 20px;">
                                        <p style="color: #333333; margin: 0; font-size: 15px; line-height: 1.8; white-space: pre-wrap;">{message}</p>
                                    </td>
                                </tr>
                            </table>
                            
                            <!-- Bouton répondre -->
                            <table width="100%" cellpadding="0" cellspacing="0" style="margin-top: 30px;">
                                <tr>
                                    <td align="center">
                                        <a href="mailto:{email}?subject=Re: Demande de devis KOATSU" style="display: inline-block; background: linear-gradient(135deg, #c9a227 0%, #d4af37 100%); color: #1a1a2e; text-decoration: none; padding: 15px 40px; border-radius: 8px; font-weight: 600; font-size: 16px;">
                                            📧 Répondre au client
                                        </a>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                    
                    <!-- Footer -->
                    <tr>
                        <td style="background-color: #1a1a2e; padding: 25px; text-align: center;">
                            <p style="color: #888888; margin: 0; font-size: 12px;">
                                Cet email a été envoyé automatiquement depuis le formulaire de devis KOATSU.
                            </p>
                            <p style="color: #c9a227; margin: 10px 0 0 0; font-size: 11px;">
                                © 2025 KOATSU Global Limited
                            </p>
                        </td>
                    </tr>
                    
                </table>
            </td>
        </tr>
    </table>
</body>
</html>
"""
            
            # Version texte de secours
            notification_text = f"""🔔 NOUVELLE DEMANDE DE DEVIS KOATSU

Un visiteur a demandé un devis via le formulaire de la page d'accueil.

INFORMATIONS DU CLIENT
----------------------
Nom: {name}
Email: {email}

DÉTAILS & EXIGENCES
-------------------
{message}

----------------------
Pour répondre, envoyez un email à: {email}
"""

            # Envoyer l'email HTML à Hasan
            from django.core.mail import EmailMultiAlternatives
            
            email_message = EmailMultiAlternatives(
                subject=email_subject,
                body=notification_text,
                from_email=settings.DEFAULT_FROM_EMAIL,
                to=[settings.CONTACT_EMAIL]
            )
            email_message.attach_alternative(notification_html, "text/html")
            email_message.send(fail_silently=False)

            context['form_submitted'] = True
            context['form_success'] = True

        except Exception as e:
            context['form_submitted'] = True
            context['form_error'] = f'Error: {str(e)}'
            print(f'Email error: {e}')
            import traceback
            traceback.print_exc()

    return render(request, 'index.html', context)


def services(request):
    """Vue de la page services"""
    context = {
        'title': 'Services - KOATSU',
        'page_title': 'Services',
        'message': 'Our transport and logistics services'
    }
    context.update(get_language_context(request))
    return render(request, 'services.html', context)


def about(request):
    """Vue de la page about"""
    context = {
        'title': 'About Us - KOATSU Global',
        'page_title': 'About Us'
    }
    context.update(get_language_context(request))
    return render(request, 'about.html', context)


def contact(request):
    """Vue de la page contact avec traitement du formulaire"""
    context = {
        'title': 'Contact Us - KOATSU Global',
        'page_title': 'Contact Us',
        'form_submitted': False,
        'form_success': False,
        'form_error': None
    }
    context.update(get_language_context(request))

    if request.method == 'POST':
        # Récupérer les données du formulaire
        name = request.POST.get('name', '').strip()
        email = request.POST.get('email', '').strip()
        company = request.POST.get('company', '').strip()
        subject = request.POST.get('subject', '').strip()
        message = request.POST.get('message', '').strip()

        # Validation basique
        if not all([name, email, subject, message]):
            context['form_submitted'] = True
            context['form_error'] = 'Please fill in all required fields.'
            return render(request, 'contact.html', context)

        try:
            # Email HTML stylisé pour Hasan
            email_subject = f'🔔 Nouveau client KOATSU - {name}'

            notification_html = f"""
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f5f5f5;">
    <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f5f5f5; padding: 40px 20px;">
        <tr>
            <td align="center">
                <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.1);">

                    <!-- Header avec logo et gradient -->
                    <tr>
                        <td style="background: linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%); padding: 40px 30px; text-align: center;">
                            <h1 style="color: #ffffff; margin: 0; font-size: 32px; font-weight: 700; letter-spacing: 3px;">KOATSU</h1>
                            <p style="color: #c9a227; margin: 10px 0 0 0; font-size: 14px; letter-spacing: 2px;">GLOBAL LIMITED</p>
                        </td>
                    </tr>

                    <!-- Bande dorée décorative -->
                    <tr>
                        <td style="background: linear-gradient(90deg, #c9a227, #d4af37, #c9a227); height: 4px;"></td>
                    </tr>

                    <!-- Alerte nouveau client -->
                    <tr>
                        <td style="background-color: #d4edda; padding: 20px 30px; border-left: 5px solid #28a745;">
                            <h2 style="color: #155724; margin: 0; font-size: 20px;">
                                🎉 Nouveau client potentiel !
                            </h2>
                            <p style="color: #155724; margin: 10px 0 0 0; font-size: 14px;">
                                Un visiteur a rempli le formulaire de contact sur le site KOATSU.
                            </p>
                        </td>
                    </tr>

                    <!-- Informations du client -->
                    <tr>
                        <td style="padding: 30px;">
                            <h3 style="color: #1a1a2e; margin: 0 0 20px 0; font-size: 18px; border-bottom: 2px solid #c9a227; padding-bottom: 10px;">
                                👤 Informations du client
                            </h3>

                            <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom: 25px;">
                                <tr>
                                    <td style="padding: 12px 0; border-bottom: 1px solid #eeeeee;">
                                        <strong style="color: #1a1a2e; display: inline-block; width: 120px;">Nom:</strong>
                                        <span style="color: #333333; font-size: 16px;">{name}</span>
                                    </td>
                                </tr>
                                <tr>
                                    <td style="padding: 12px 0; border-bottom: 1px solid #eeeeee;">
                                        <strong style="color: #1a1a2e; display: inline-block; width: 120px;">Email:</strong>
                                        <a href="mailto:{email}" style="color: #0066cc; text-decoration: none; font-size: 16px;">{email}</a>
                                    </td>
                                </tr>
                                <tr>
                                    <td style="padding: 12px 0; border-bottom: 1px solid #eeeeee;">
                                        <strong style="color: #1a1a2e; display: inline-block; width: 120px;">Entreprise:</strong>
                                        <span style="color: #333333; font-size: 16px;">{company if company else '<em style="color: #999;">Non spécifiée</em>'}</span>
                                    </td>
                                </tr>
                                <tr>
                                    <td style="padding: 12px 0;">
                                        <strong style="color: #1a1a2e; display: inline-block; width: 120px;">Sujet:</strong>
                                        <span style="color: #333333; font-size: 16px;">{subject}</span>
                                    </td>
                                </tr>
                            </table>

                            <!-- Message du client -->
                            <h3 style="color: #1a1a2e; margin: 0 0 15px 0; font-size: 18px; border-bottom: 2px solid #c9a227; padding-bottom: 10px;">
                                💬 Message
                            </h3>

                            <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f8f9fa; border-radius: 8px; border-left: 4px solid #c9a227;">
                                <tr>
                                    <td style="padding: 20px;">
                                        <p style="color: #333333; margin: 0; font-size: 15px; line-height: 1.8; white-space: pre-wrap;">{message}</p>
                                    </td>
                                </tr>
                            </table>

                            <!-- Bouton répondre -->
                            <table width="100%" cellpadding="0" cellspacing="0" style="margin-top: 30px;">
                                <tr>
                                    <td align="center">
                                        <a href="mailto:{email}?subject=Re: {subject}" style="display: inline-block; background: linear-gradient(135deg, #c9a227 0%, #d4af37 100%); color: #1a1a2e; text-decoration: none; padding: 15px 40px; border-radius: 8px; font-weight: 600; font-size: 16px;">
                                            📧 Répondre au client
                                        </a>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>

                    <!-- Footer -->
                    <tr>
                        <td style="background-color: #1a1a2e; padding: 25px; text-align: center;">
                            <p style="color: #888888; margin: 0; font-size: 12px;">
                                Cet email a été envoyé automatiquement depuis le site web KOATSU.
                            </p>
                            <p style="color: #c9a227; margin: 10px 0 0 0; font-size: 11px;">
                                © 2025 KOATSU Global Limited
                            </p>
                        </td>
                    </tr>

                </table>
            </td>
        </tr>
    </table>
</body>
</html>
"""

            # Version texte de secours
            notification_text = f"""🔔 NOUVEAU CLIENT KOATSU

Un visiteur a rempli le formulaire de contact sur le site web.

INFORMATIONS DU CLIENT
----------------------
Nom: {name}
Email: {email}
Entreprise: {company if company else 'Non spécifiée'}
Sujet: {subject}

MESSAGE
-------
{message}

----------------------
Pour répondre, envoyez un email à: {email}
"""

            # Envoyer l'email HTML à Hasan
            from django.core.mail import EmailMultiAlternatives

            email_message = EmailMultiAlternatives(
                subject=email_subject,
                body=notification_text,
                from_email=settings.DEFAULT_FROM_EMAIL,
                to=[settings.CONTACT_EMAIL]
            )
            email_message.attach_alternative(notification_html, "text/html")
            email_message.send(fail_silently=False)

            context['form_submitted'] = True
            context['form_success'] = True

        except Exception as e:
            context['form_submitted'] = True
            context['form_error'] = f'Error: {str(e)}'
            print(f'Email error: {e}')
            import traceback
            traceback.print_exc()

    return render(request, 'contact.html', context)
