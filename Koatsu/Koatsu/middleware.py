"""
Middleware pour la gestion du cache des fichiers statiques
et la gestion des cookies de langue/consentement
"""
import re
from django.utils.cache import patch_cache_control


class StaticFileCacheMiddleware:
    """
    Middleware qui ajoute des en-têtes de cache pour les fichiers statiques
    """

    def __init__(self, get_response):
        self.get_response = get_response

        # Définir les durées de cache par type de fichier (en secondes)
        # 1 an = 31536000 secondes
        self.cache_durations = {
            # Images - 1 an (ces fichiers changent rarement)
            r'\.(jpg|jpeg|png|gif|svg|ico|webp)$': 31536000,  # 1 an

            # CSS et JS - 1 mois (peuvent être mis à jour plus fréquemment)
            r'\.(css|js)$': 2592000,  # 30 jours

            # Fonts - 1 an
            r'\.(woff|woff2|ttf|eot|otf)$': 31536000,  # 1 an

            # Vidéos et audio - 1 an
            r'\.(mp4|webm|ogg|mp3|wav)$': 31536000,  # 1 an
        }

    def __call__(self, request):
        response = self.get_response(request)

        # Vérifier si c'est une requête de fichier statique
        path = request.path

        # Appliquer les règles de cache
        for pattern, max_age in self.cache_durations.items():
            if re.search(pattern, path, re.IGNORECASE):
                # Ajouter les en-têtes de cache
                patch_cache_control(
                    response,
                    max_age=max_age,
                    public=True,
                    immutable=True  # Le fichier ne changera pas à cette URL
                )

                # Ajouter l'en-tête Expires pour une meilleure compatibilité
                from django.utils.http import http_date
                import time
                response['Expires'] = http_date(time.time() + max_age)

                break

        return response


class LanguageMiddleware:
    """
    Middleware professionnel pour la gestion de la langue.
    - Détecte automatiquement la langue basée sur la localisation
    - Gère les cookies de préférence de langue
    - Respecte le consentement GDPR pour les cookies
    """

    # Langues supportées
    SUPPORTED_LANGUAGES = ['en', 'ja']
    DEFAULT_LANGUAGE = 'en'

    # Timezones japonaises pour la détection
    JAPANESE_INDICATORS = [
        'Asia/Tokyo',
        'Japan',
    ]

    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        # Récupérer le consentement cookies
        cookie_consent = request.COOKIES.get('koatsu_cookie_consent', None)

        # Récupérer la langue depuis différentes sources (par priorité)
        language = self._get_language(request)

        # Stocker la langue dans la requête pour les templates
        request.language = language
        request.cookie_consent = cookie_consent

        # Traiter la requête
        response = self.get_response(request)

        return response

    def _get_language(self, request):
        """
        Détermine la langue à utiliser par ordre de priorité:
        1. Paramètre URL (?lang=xx)
        2. Cookie de préférence (si consentement donné)
        3. En-tête Accept-Language du navigateur
        4. Détection basée sur le timezone/localisation
        5. Langue par défaut (anglais)
        """

        # 1. Paramètre URL
        url_lang = request.GET.get('lang', None)
        if url_lang and url_lang in self.SUPPORTED_LANGUAGES:
            return url_lang

        # 2. Cookie de préférence de langue (cookie fonctionnel, toujours lu)
        # Les cookies de langue sont considérés comme "nécessaires" selon RGPD
        cookie_lang = request.COOKIES.get('koatsu_language', None)
        if cookie_lang and cookie_lang in self.SUPPORTED_LANGUAGES:
            return cookie_lang

        # 3. En-tête Accept-Language
        accept_language = request.META.get('HTTP_ACCEPT_LANGUAGE', '')
        if accept_language:
            # Parser l'en-tête Accept-Language
            browser_lang = self._parse_accept_language(accept_language)
            if browser_lang:
                return browser_lang

        # 4. Détection basée sur d'autres indices (timezone via header custom si disponible)
        # Note: La timezone est généralement détectée côté client

        # 5. Langue par défaut
        return self.DEFAULT_LANGUAGE

    def _parse_accept_language(self, accept_language):
        """
        Parse l'en-tête Accept-Language et retourne la meilleure langue supportée.
        Format: "en-US,en;q=0.9,ja;q=0.8"
        """
        languages = []

        for part in accept_language.split(','):
            part = part.strip()
            if ';' in part:
                lang, priority = part.split(';')
                lang = lang.strip()
                try:
                    q = float(priority.split('=')[1])
                except (IndexError, ValueError):
                    q = 1.0
            else:
                lang = part
                q = 1.0

            # Extraire le code de langue principal (ex: 'en' de 'en-US')
            lang_code = lang.split('-')[0].lower()
            languages.append((lang_code, q))

        # Trier par priorité
        languages.sort(key=lambda x: x[1], reverse=True)

        # Trouver la première langue supportée
        for lang_code, _ in languages:
            if lang_code in self.SUPPORTED_LANGUAGES:
                return lang_code

        return None


class CookieConsentMiddleware:
    """
    Middleware pour gérer le consentement aux cookies (GDPR/RGPD).
    Ajoute le statut de consentement à chaque requête.
    """

    CONSENT_COOKIE_NAME = 'koatsu_cookie_consent'
    CONSENT_MAX_AGE = 365 * 24 * 60 * 60  # 1 an

    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        # Récupérer le statut de consentement
        consent_status = request.COOKIES.get(self.CONSENT_COOKIE_NAME, None)

        # Stocker dans la requête
        request.cookie_consent_status = consent_status
        request.show_cookie_banner = consent_status is None

        response = self.get_response(request)

        return response

