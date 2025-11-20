#!/usr/bin/env python3
"""
Script de test pour vérifier les en-têtes de cache
"""

import requests
import sys

def test_cache_headers(url, expected_max_age):
    """
    Teste si une URL retourne les bons en-têtes de cache
    """
    try:
        response = requests.head(url, allow_redirects=True)
        cache_control = response.headers.get('Cache-Control', '')
        expires = response.headers.get('Expires', '')
        
        print(f"\n🔍 Test de: {url}")
        print(f"   Status: {response.status_code}")
        print(f"   Cache-Control: {cache_control}")
        print(f"   Expires: {expires}")
        
        if 'max-age' in cache_control:
            # Extraire la valeur max-age
            max_age = cache_control.split('max-age=')[1].split(',')[0]
            if int(max_age) >= expected_max_age:
                print(f"   ✅ Cache correctement configuré (max-age={max_age})")
                return True
            else:
                print(f"   ❌ Cache insuffisant (attendu: {expected_max_age}, actuel: {max_age})")
                return False
        else:
            print(f"   ❌ Aucun en-tête de cache trouvé")
            return False
            
    except Exception as e:
        print(f"   ❌ Erreur: {e}")
        return False

def main():
    """
    Teste les principaux fichiers statiques du site
    """
    base_url = "http://127.0.0.1:8000"  # Changez pour votre URL
    
    # Définir les tests
    tests = [
        # Images - 1 an (31536000 secondes)
        (f"{base_url}/static/img/logo.png", 31536000),
        (f"{base_url}/static/img/services/service1.png", 31536000),
        (f"{base_url}/static/img/services/service3.png", 31536000),
        (f"{base_url}/static/img/background/background1.jpg", 31536000),
        
        # CSS - 30 jours (2592000 secondes)
        (f"{base_url}/static/css/style.css", 2592000),
        
        # JavaScript - 30 jours (2592000 secondes)
        (f"{base_url}/static/js/script.js", 2592000),
    ]
    
    print("="*60)
    print("🚀 Test des en-têtes de cache - Koatsu")
    print("="*60)
    
    results = []
    for url, expected_max_age in tests:
        results.append(test_cache_headers(url, expected_max_age))
    
    # Résumé
    print("\n" + "="*60)
    print("📊 Résumé")
    print("="*60)
    passed = sum(results)
    total = len(results)
    print(f"✅ Tests réussis: {passed}/{total}")
    print(f"❌ Tests échoués: {total - passed}/{total}")
    
    if passed == total:
        print("\n🎉 Tous les tests sont passés ! Le cache est correctement configuré.")
        return 0
    else:
        print("\n⚠️  Certains tests ont échoué. Vérifiez la configuration.")
        return 1

if __name__ == "__main__":
    try:
        sys.exit(main())
    except KeyboardInterrupt:
        print("\n\n⚠️  Test interrompu par l'utilisateur")
        sys.exit(1)
