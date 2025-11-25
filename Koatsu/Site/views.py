from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.http import require_POST
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
    """Vue de la page d'accueil"""
    context = {
        'title': 'Home - KOATSU',
        'message': 'Welcome to KOATSU!'
    }
    context.update(get_language_context(request))
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
    """Vue de la page contact"""
    context = {
        'title': 'Contact Us - KOATSU Global',
        'page_title': 'Contact Us'
    }
    context.update(get_language_context(request))
    return render(request, 'contact.html', context)
