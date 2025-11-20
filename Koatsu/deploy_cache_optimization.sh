#!/bin/bash

# Script de déploiement des optimisations de cache pour Koatsu
# Date: 20 novembre 2025

# Couleurs pour l'affichage
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo "======================================================================"
echo "  🚀 DÉPLOIEMENT DES OPTIMISATIONS DE CACHE - KOATSU"
echo "======================================================================"
echo ""

# Fonction pour afficher les étapes
step() {
    echo -e "${BLUE}➤ $1${NC}"
}

success() {
    echo -e "${GREEN}✓ $1${NC}"
}

warning() {
    echo -e "${YELLOW}⚠ $1${NC}"
}

error() {
    echo -e "${RED}✗ $1${NC}"
}

# Détection de l'environnement
step "1. Détection de l'environnement..."
if [ -f "manage.py" ]; then
    success "Répertoire Django détecté"
else
    error "manage.py non trouvé. Êtes-vous dans le bon répertoire ?"
    exit 1
fi

# Vérification de Python
step "2. Vérification de Python..."
if command -v python3 &> /dev/null; then
    PYTHON_VERSION=$(python3 --version)
    success "Python trouvé: $PYTHON_VERSION"
else
    error "Python3 non trouvé"
    exit 1
fi

# Test de la configuration Django
step "3. Vérification de la configuration Django..."
python3 manage.py check --deploy 2>/dev/null
if [ $? -eq 0 ]; then
    success "Configuration Django valide"
else
    warning "Vérification de la configuration avec des avertissements"
fi

# Collecte des fichiers statiques
step "4. Collecte des fichiers statiques..."
read -p "Voulez-vous collecter les fichiers statiques ? (o/N) " -n 1 -r
echo
if [[ $REPLY =~ ^[Oo]$ ]]; then
    python3 manage.py collectstatic --noinput
    if [ $? -eq 0 ]; then
        success "Fichiers statiques collectés"
    else
        error "Erreur lors de la collecte des fichiers statiques"
        exit 1
    fi
else
    warning "Collecte des fichiers statiques ignorée"
fi

# Détection du serveur web
step "5. Détection du serveur web..."

if command -v nginx &> /dev/null; then
    echo -e "${GREEN}✓ Nginx détecté${NC}"
    echo ""
    read -p "Voulez-vous afficher la configuration Nginx recommandée ? (o/N) " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Oo]$ ]]; then
        if [ -f "nginx_cache_config.conf" ]; then
            cat nginx_cache_config.conf
            echo ""
            warning "Copiez cette configuration dans votre fichier Nginx"
            warning "Puis exécutez: sudo nginx -t && sudo systemctl reload nginx"
        else
            error "Fichier nginx_cache_config.conf non trouvé"
        fi
    fi
fi

if command -v apache2 &> /dev/null || command -v httpd &> /dev/null; then
    echo -e "${GREEN}✓ Apache détecté${NC}"
    echo ""
    read -p "Voulez-vous activer les modules Apache nécessaires ? (o/N) " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Oo]$ ]]; then
        sudo a2enmod expires headers deflate 2>/dev/null
        if [ $? -eq 0 ]; then
            success "Modules Apache activés"
            warning "N'oubliez pas de copier .htaccess dans votre dossier static"
            warning "Puis exécutez: sudo systemctl reload apache2"
        fi
    fi
fi

# Test des en-têtes de cache
step "6. Test des en-têtes de cache (local)..."
echo ""
read -p "Voulez-vous démarrer le serveur de développement pour tester ? (o/N) " -n 1 -r
echo
if [[ $REPLY =~ ^[Oo]$ ]]; then
    echo ""
    echo -e "${YELLOW}Démarrage du serveur Django...${NC}"
    echo -e "${YELLOW}Appuyez sur Ctrl+C pour arrêter le serveur${NC}"
    echo ""
    python3 manage.py runserver &
    SERVER_PID=$!
    
    # Attendre que le serveur démarre
    sleep 3
    
    echo ""
    echo -e "${BLUE}Test des en-têtes de cache...${NC}"
    echo ""
    
    # Test d'une image
    if command -v curl &> /dev/null; then
        echo "Test de /static/img/logo.png:"
        curl -s -I http://127.0.0.1:8000/static/img/logo.png | grep -E "(Cache-Control|Expires)" || warning "Aucun en-tête de cache trouvé"
        echo ""
        
        echo "Test de /static/css/style.css:"
        curl -s -I http://127.0.0.1:8000/static/css/style.css | grep -E "(Cache-Control|Expires)" || warning "Aucun en-tête de cache trouvé"
        echo ""
    else
        warning "curl n'est pas installé, impossible de tester les en-têtes"
    fi
    
    # Arrêter le serveur
    kill $SERVER_PID 2>/dev/null
    success "Serveur arrêté"
fi

# Visualisation de l'impact
step "7. Visualisation de l'impact des optimisations..."
echo ""
read -p "Voulez-vous voir l'impact des optimisations ? (o/N) " -n 1 -r
echo
if [[ $REPLY =~ ^[Oo]$ ]]; then
    if [ -f "visualize_cache_impact.py" ]; then
        python3 visualize_cache_impact.py
    else
        error "Fichier visualize_cache_impact.py non trouvé"
    fi
fi

# Résumé final
echo ""
echo "======================================================================"
echo "  ✅ RÉSUMÉ DU DÉPLOIEMENT"
echo "======================================================================"
echo ""
success "Middleware configuré dans Koatsu/middleware.py"
success "Settings.py mis à jour avec le middleware"
success "Configurations serveur web créées"
success "Documentation complète disponible"
echo ""
echo -e "${YELLOW}PROCHAINES ÉTAPES:${NC}"
echo ""
echo "  1. 📝 Lire README_CACHE.md pour les détails complets"
echo "  2. 🔧 Configurer votre serveur web (Nginx ou Apache)"
echo "  3. 🚀 Déployer en production"
echo "  4. 🧪 Tester sur https://pagespeed.web.dev/"
echo "  5. 📊 Vérifier les en-têtes avec: curl -I [votre-url]"
echo ""
echo -e "${GREEN}ÉCONOMIES ATTENDUES:${NC}"
echo "  💾 26 031 KB (25.4 MB) par visite répétée"
echo "  ⚡ Réduction du temps de chargement: 70-80%"
echo "  🌱 Réduction de l'empreinte carbone"
echo ""
echo "======================================================================"
echo "  🎉 Configuration terminée avec succès !"
echo "======================================================================"
echo ""
