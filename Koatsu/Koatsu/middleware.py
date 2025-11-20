"""
Middleware pour la gestion du cache des fichiers statiques
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
