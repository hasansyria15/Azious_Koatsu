# 🚨 FIX ERREUR 500 - PythonAnywhere

## ✅ CORRECTIFS APPLIQUÉS

### 1. **DEBUG = True temporairement**
- Pour voir les vraies erreurs
- Vous le remettrez à `False` après avoir testé

### 2. **ALLOWED_HOSTS corrigé**
- Supprimé la duplication
- Ajouté `*.pythonanywhere.com`

### 3. **SECURE_SSL désactivé**
- Les paramètres HTTPS étaient trop stricts
- À réactiver plus tard si nécessaire

---

## 🔧 ÉTAPES À FAIRE SUR PYTHONANYWHERE

### 1️⃣ Push les modifications

Sur votre machine locale :

```bash
cd /Users/hasouni/Development/Azious_Koatsu/Koatsu
git add .
git commit -m "Fix: Configuration PythonAnywhere - Erreur 500"
git push
```

### 2️⃣ Pull sur PythonAnywhere

Dans la **console Bash** de PythonAnywhere :

```bash
cd ~/votre-projet
git pull
```

### 3️⃣ Installer WhiteNoise

```bash
pip3 install --user whitenoise
```

### 4️⃣ Collecter les fichiers statiques

```bash
python manage.py collectstatic --clear --noinput
```

### 5️⃣ Vérifier ALLOWED_HOSTS

Assurez-vous que `ALLOWED_HOSTS` contient votre domaine exact :

```python
ALLOWED_HOSTS = [
    'votre-username.pythonanywhere.com',  # Remplacez par votre vrai username
    'www.koatsu-global.com',
    'koatsu-global.com',
]
```

### 6️⃣ Reload l'application

Dans l'onglet **Web**, cliquez sur le bouton vert **"Reload"**.

### 7️⃣ Vérifier les logs

Si l'erreur persiste :
- Onglet "Web" → Cliquez sur "error log" (lien rouge)
- Lisez la dernière erreur
- Copiez-la et partagez-la

---

## 🔍 DIAGNOSTIC DES ERREURS COURANTES

### Erreur : "DisallowedHost"

```
ALLOWED_HOSTS = ['votre-domaine-exact.pythonanywhere.com']
```

### Erreur : "No module named 'whitenoise'"

```bash
pip3 install --user whitenoise
```

### Erreur : "FileNotFoundError: staticfiles"

```bash
python manage.py collectstatic --noinput
```

### Erreur : "ImproperlyConfigured: STORAGES"

Vérifiez que vous avez Django >= 4.2. Sinon, remplacez dans `settings.py` :

```python
# Ancienne méthode (Django < 4.2)
STATICFILES_STORAGE = 'whitenoise.storage.CompressedManifestStaticFilesStorage'

# Au lieu de STORAGES
```

---

## 📝 CHECKLIST DE VÉRIFICATION

- [ ] Git push effectué depuis votre machine
- [ ] Git pull effectué sur PythonAnywhere
- [ ] WhiteNoise installé (`pip3 show whitenoise`)
- [ ] collectstatic exécuté sans erreur
- [ ] ALLOWED_HOSTS contient votre domaine PythonAnywhere exact
- [ ] Application rechargée (bouton Reload)
- [ ] Error log consulté si erreur persiste

---

## 🎯 COMMANDES COMPLÈTES (dans l'ordre)

Sur **PythonAnywhere Console** :

```bash
# 1. Aller dans le projet
cd ~/votre-projet

# 2. Récupérer les modifications
git pull

# 3. Installer les dépendances
pip3 install --user whitenoise

# 4. Collecter les fichiers statiques
python manage.py collectstatic --clear --noinput

# 5. Vérifier la config
python manage.py check

# 6. Voir les migrations si besoin
python manage.py migrate
```

Puis dans l'onglet **Web** → Cliquez sur **Reload** ✅

---

## 📊 VERSION DEBUG vs PRODUCTION

### Avec DEBUG = True (actuel)
✅ Vous verrez les erreurs détaillées  
✅ Plus facile de déboguer  
❌ Ne pas utiliser en production longtemps  

### Quand tout fonctionne → DEBUG = False
✅ Sécurisé pour la production  
✅ Messages d'erreur génériques  
✅ Meilleure performance  

---

## 🆘 SI TOUJOURS ERREUR 500

Copiez **le contenu complet du error log** et partagez-le.

Pour le voir :
1. Onglet "Web" sur PythonAnywhere
2. Cliquez sur "error log" (lien rouge en haut)
3. Copiez les dernières lignes (avec le traceback complet)

---

**Date** : 20 novembre 2025  
**Status** : 🔧 Configuration de dépannage  
**Prochaine étape** : Pousser les modifications et tester
