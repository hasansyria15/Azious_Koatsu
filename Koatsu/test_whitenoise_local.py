#!/usr/bin/env python3
"""
Script de test local avec WhiteNoise (simule PythonAnywhere)
"""

import os
import sys
import subprocess

def print_step(step, message):
    print(f"\n{'='*70}")
    print(f"  {step}. {message}")
    print('='*70)

def main():
    print("\n" + "="*70)
    print("  🧪 TEST LOCAL AVEC WHITENOISE (Mode Production)")
    print("="*70)
    
    # Étape 1 : Vérifier WhiteNoise
    print_step("1", "Vérification de WhiteNoise")
    try:
        import whitenoise
        print(f"✅ WhiteNoise installé : version {whitenoise.__version__}")
    except ImportError:
        print("❌ WhiteNoise n'est pas installé")
        print("\n📦 Installation de WhiteNoise...")
        subprocess.run([sys.executable, "-m", "pip", "install", "whitenoise"])
        print("✅ WhiteNoise installé !")
    
    # Étape 2 : Collecter les fichiers statiques
    print_step("2", "Collecte des fichiers statiques")
    print("Exécution de: python manage.py collectstatic --noinput")
    result = subprocess.run([sys.executable, "manage.py", "collectstatic", "--noinput"])
    if result.returncode == 0:
        print("✅ Fichiers statiques collectés")
    else:
        print("❌ Erreur lors de la collecte")
        return 1
    
    # Étape 3 : Vérifier la configuration
    print_step("3", "Vérification de la configuration Django")
    print("Exécution de: python manage.py check --deploy")
    result = subprocess.run([sys.executable, "manage.py", "check", "--deploy"])
    if result.returncode == 0:
        print("✅ Configuration OK")
    else:
        print("⚠️  Avertissements de configuration (normal en dev)")
    
    # Étape 4 : Instructions pour le test
    print_step("4", "Test du Serveur")
    print("\n⚠️  IMPORTANT : Ce test va démarrer le serveur avec DEBUG=False")
    print("Les fichiers statiques seront servis par WhiteNoise.\n")
    print("📝 Commandes de test :\n")
    print("  1. Démarrer le serveur :")
    print("     python manage.py runserver --insecure\n")
    print("  2. Dans un autre terminal, tester les headers :")
    print("     curl -I http://127.0.0.1:8000/static/img/logo.png\n")
    print("  3. Ou ouvrir le navigateur :")
    print("     http://127.0.0.1:8000\n")
    print("  4. Vérifier dans DevTools (F12 → Network) que vous voyez :")
    print("     Cache-Control: public, max-age=31536000, immutable\n")
    
    # Résumé
    print("="*70)
    print("  ✅ PRÊT POUR LE TEST")
    print("="*70)
    print("\n💡 Après le test local réussi, vous pouvez déployer sur PythonAnywhere")
    print("   Voir : PYTHONANYWHERE_DEPLOY.md\n")

if __name__ == "__main__":
    try:
        sys.exit(main())
    except KeyboardInterrupt:
        print("\n\n⚠️  Test interrompu")
        sys.exit(1)
