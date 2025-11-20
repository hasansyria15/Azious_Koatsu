# 🚀 Guide de Déploiement PythonAnywhere - KOATSU

## ⚠️ IMPORTANT : Configuration Spécifique PythonAnywhere

PythonAnywhere ne vous donne pas accès à Nginx, donc nous utilisons **WhiteNoise** à la place.

---

## 📋 Modifications Effectuées

### ✅ Dans `settings.py`
- ✅ `DEBUG = False` (production)
- ✅ `ALLOWED_HOSTS` mis à jour avec PythonAnywhere
- ✅ **WhiteNoise** ajouté dans MIDDLEWARE
- ✅ `STORAGES` configuré avec WhiteNoise
- ✅ Paramètres de sécurité activés (HTTPS, cookies sécurisés)

### ✅ Dans `views.py`
- ✅ Cache de vue retiré (peut causer des problèmes)

### ✅ Fichier `requirements.txt` créé
- Django
- WhiteNoise

---

## 🔧 ÉTAPES DE DÉPLOIEMENT SUR PYTHONANYWHERE

### 1️⃣ Installer WhiteNoise

Dans la **console Bash** de PythonAnywhere :

```bash
cd ~/votre-projet
pip install --user whitenoise
```

Ou installez depuis requirements.txt :

```bash
pip install --user -r requirements.txt
```

### 2️⃣ Collecter les Fichiers Statiques

```bash
python manage.py collectstatic --noinput
```

### 3️⃣ Vérifier la Configuration

```bash
python manage.py check --deploy
```

### 4️⃣ Configuration du Fichier WSGI

Dans l'onglet **Web** de PythonAnywhere, éditez votre fichier WSGI et assurez-vous qu'il ressemble à ceci :

```python
import os
import sys

# Ajouter le chemin de votre projet
path = '/home/VOTRE_USERNAME/votre-projet'
if path not in sys.path:
    sys.path.append(path)

# Configuration de Django
os.environ['DJANGO_SETTINGS_MODULE'] = 'Koatsu.settings'

from django.core.wsgi import get_wsgi_application
application = get_wsgi_application()
```

### 5️⃣ Configurer les Fichiers Statiques dans PythonAnywhere

Dans l'onglet **Web** :
- URL : `/static/`
- Directory : `/home/VOTRE_USERNAME/votre-projet/staticfiles`

### 6️⃣ Redémarrer l'Application

Cliquez sur le gros bouton vert **"Reload"** dans l'onglet Web.

---

## 🧪 VÉRIFICATION

### Test 1 : Vérifier les Headers de Cache

Ouvrez la console de votre navigateur (F12 → Network) et rechargez votre site.

Sélectionnez une image et vérifiez les headers :
- Vous devriez voir : `Cache-Control: public, max-age=31536000, immutable`

### Test 2 : Google PageSpeed Insights

```
https://pagespeed.web.dev/analysis?url=https://VOTRE_SITE.pythonanywhere.com
```

Vérifiez que le problème "Utiliser des durées de mise en cache efficaces" est résolu.

---

## 📊 Ce Que WhiteNoise Fait

✅ **Compression automatique** des fichiers CSS/JS  
✅ **Cache des fichiers statiques** avec headers optimisés  
✅ **Gestion des versions** (manifest pour cache busting)  
✅ **Pas besoin de Nginx** - tout se fait via Django  

### Headers Ajoutés Automatiquement

```
Cache-Control: public, max-age=31536000, immutable
Content-Encoding: gzip
Vary: Accept-Encoding
```

---

## ⚡ RÉSULTATS ATTENDUS

### Avant WhiteNoise
- ❌ Pas de cache
- ❌ Fichiers non compressés
- ❌ 26 MB rechargés à chaque visite

### Après WhiteNoise
- ✅ Cache de 1 an sur les fichiers statiques
- ✅ Compression Gzip/Brotli automatique
- ✅ 0 MB rechargés (cache navigateur)
- ✅ Fichiers versionnés automatiquement

---

## 🐛 DÉPANNAGE

### Les fichiers statiques ne se chargent pas

```bash
# Re-collecter les fichiers statiques
python manage.py collectstatic --clear --noinput

# Vérifier que WhiteNoise est installé
pip show whitenoise

# Redémarrer l'app sur PythonAnywhere
```

### Les modifications CSS/JS ne s'affichent pas

```bash
# Re-collecter avec clear
python manage.py collectstatic --clear --noinput

# Reload PythonAnywhere
# Vider le cache du navigateur (Cmd+Shift+R)
```

### Erreur 500

```bash
# Vérifier les logs dans PythonAnywhere
# Onglet Web → Error log

# Vérifier DEBUG
# DEBUG doit être False en production

# Vérifier ALLOWED_HOSTS
# Doit contenir votre domaine PythonAnywhere
```

---

## 🔐 SÉCURITÉ (DEBUG=False)

Avec `DEBUG=False`, Django ne servira plus vos fichiers statiques automatiquement.  
**C'est normal !** WhiteNoise s'en charge maintenant.

**Pages d'erreur personnalisées** :

Créez dans `Site/templates/` :
- `404.html` - Page non trouvée
- `500.html` - Erreur serveur

---

## 📝 CHECKLIST DE DÉPLOIEMENT

- [x] WhiteNoise ajouté dans MIDDLEWARE
- [x] STORAGES configuré
- [x] DEBUG = False
- [x] ALLOWED_HOSTS mis à jour
- [x] Paramètres de sécurité activés
- [ ] WhiteNoise installé sur PythonAnywhere
- [ ] collectstatic exécuté
- [ ] Configuration Web PythonAnywhere mise à jour
- [ ] Application rechargée
- [ ] Test PageSpeed Insights effectué

---

## 🎯 COMMANDES RAPIDES

```bash
# Sur PythonAnywhere Console

# 1. Installer les dépendances
pip install --user -r requirements.txt

# 2. Collecter les fichiers statiques
python manage.py collectstatic --noinput

# 3. Vérifier la configuration
python manage.py check --deploy

# 4. Redémarrer (via l'interface Web)
```

---

## 📈 AMÉLIORATION ATTENDUE

### Google PageSpeed Insights

**Avant** :
- Score : ~60-70
- Cache TTL : None
- Fichiers non compressés

**Après** :
- Score : ~85-95
- Cache TTL : 1 an
- Fichiers compressés (Gzip)
- Économie : 26 MB par visite répétée

---

## 🆘 AIDE SUPPLÉMENTAIRE

### Documentation
- WhiteNoise : http://whitenoise.evans.io/
- PythonAnywhere : https://help.pythonanywhere.com/
- Django Deployment : https://docs.djangoproject.com/en/stable/howto/deployment/

### Vérifier que WhiteNoise fonctionne

```bash
# Tester localement avec DEBUG=False
python manage.py runserver --insecure

# Puis ouvrir http://127.0.0.1:8000
# et vérifier les headers dans DevTools
```

---

## ✅ RÉSUMÉ

WhiteNoise remplace Nginx pour servir les fichiers statiques sur PythonAnywhere.

**Vous n'avez pas besoin de** :
- ❌ Configuration Nginx (vous n'y avez pas accès)
- ❌ Middleware personnalisé (WhiteNoise gère tout)
- ❌ .htaccess (PythonAnywhere utilise Nginx en backend)

**Vous avez juste besoin de** :
- ✅ WhiteNoise dans MIDDLEWARE
- ✅ STORAGES configuré
- ✅ collectstatic
- ✅ Reload PythonAnywhere

---

**Date** : 20 novembre 2025  
**Status** : ✅ Prêt pour PythonAnywhere  
**Version** : 2.0 (PythonAnywhere Edition)
