# 🖼️ Problème de Cache d'Images - Solution

## 🔍 Pourquoi l'ancienne image s'affiche toujours ?

### Causes possibles :

1. **Cache du navigateur** : Le navigateur garde l'ancienne version en mémoire
2. **Cache de WhiteNoise** : Django n'a pas recollecté les fichiers statiques
3. **Cache du serveur** : Le serveur de développement garde l'ancienne version

---

## ✅ Solutions Rapides

### Solution 1 : Vider le Cache du Navigateur

#### Sur Chrome/Edge (Mac) :
```
Cmd + Shift + R
```
ou
```
Cmd + Option + E (vider cache) + Cmd + R (recharger)
```

#### Sur Chrome/Edge (Windows) :
```
Ctrl + Shift + R
```
ou
```
Ctrl + Shift + Delete (ouvrir paramètres) → Vider le cache
```

#### Sur Safari (Mac) :
```
Cmd + Option + E (vider cache) + Cmd + R (recharger)
```

#### Sur Firefox :
```
Cmd + Shift + R (Mac)
Ctrl + Shift + R (Windows)
```

---

### Solution 2 : Navigation Privée

Testez dans une **fenêtre de navigation privée/incognito** :
- **Chrome** : `Cmd + Shift + N` (Mac) ou `Ctrl + Shift + N` (Windows)
- **Safari** : `Cmd + Shift + N`
- **Firefox** : `Cmd + Shift + P` (Mac) ou `Ctrl + Shift + P` (Windows)

---

## 🔧 Solution Permanente : Recollection des Fichiers Statiques

### Étape 1 : Arrêter le Serveur

Si le serveur tourne, arrêtez-le avec `Ctrl + C`

### Étape 2 : Collecter les Fichiers Statiques

```bash
cd /Users/hasouni/Development/Azious_Koatsu/Koatsu
python3 manage.py collectstatic --clear --noinput
```

**Explication :**
- `collectstatic` : Collecte tous les fichiers statiques
- `--clear` : Supprime l'ancien cache avant de recolleter
- `--noinput` : Ne demande pas de confirmation

### Étape 3 : Redémarrer le Serveur

```bash
python3 manage.py runserver
```

### Étape 4 : Vider le Cache du Navigateur

Appuyez sur `Cmd + Shift + R` pour forcer le rechargement

---

## 🎯 Vérification

Après avoir suivi ces étapes, vérifiez :

1. ✅ L'image `service2.png` existe dans `/Site/static/img/services/`
2. ✅ La commande `collectstatic` s'est exécutée sans erreur
3. ✅ Le serveur est redémarré
4. ✅ Le cache du navigateur est vidé

---

## 🚀 Commandes Rapides (Script)

Créez un script pour automatiser le processus :

### Sur Mac/Linux :

```bash
#!/bin/bash
# Fichier: refresh_static.sh

echo "🔄 Arrêt du serveur..."
pkill -f "python3 manage.py runserver"

echo "🗑️  Nettoyage des fichiers statiques..."
python3 manage.py collectstatic --clear --noinput

echo "✅ Fichiers statiques recollectés"
echo "🚀 Redémarrage du serveur..."
python3 manage.py runserver
```

Rendez-le exécutable :
```bash
chmod +x refresh_static.sh
./refresh_static.sh
```

---

## 📝 Checklist de Dépannage

- [ ] Vérifier que la nouvelle image existe bien dans le dossier
- [ ] Exécuter `collectstatic --clear`
- [ ] Redémarrer le serveur Django
- [ ] Vider le cache du navigateur (`Cmd + Shift + R`)
- [ ] Tester en navigation privée
- [ ] Vérifier les outils de développement (F12) → onglet Network
- [ ] S'assurer que le fichier chargé a bien le bon timestamp

---

## 🔍 Diagnostic Avancé

### Vérifier quel fichier est chargé :

1. Ouvrez votre site
2. Appuyez sur **F12** (Outils de développement)
3. Allez dans l'onglet **Network** (Réseau)
4. Rechargez la page avec **Cmd + R**
5. Cherchez `service2.png` dans la liste
6. Cliquez dessus pour voir :
   - Le chemin complet
   - La taille du fichier
   - Le statut (200, 304, etc.)
   - Les en-têtes de cache

**Statut 304** = Le navigateur utilise la version en cache
**Statut 200** = Le navigateur télécharge la nouvelle version

---

## 💡 Conseils pour l'Avenir

### 1. Renommer l'image avec un numéro de version

Au lieu de remplacer `service2.png`, créez `service2_v2.png` :

```html
<img src="{% static 'img/services/service2_v2.png' %}" alt="Service 2">
```

### 2. Utiliser ManifestStaticFilesStorage (Déjà configuré ✅)

Votre `settings.py` utilise déjà :
```python
'staticfiles': {
    'BACKEND': 'whitenoise.storage.CompressedManifestStaticFilesStorage',
}
```

Cela ajoute automatiquement un hash aux fichiers (ex: `service2.abc123.png`)

### 3. Désactiver le cache en développement

Modifiez temporairement `settings.py` :

```python
if DEBUG:
    STORAGES = {
        'default': {
            'BACKEND': 'django.core.files.storage.FileSystemStorage',
        },
        'staticfiles': {
            'BACKEND': 'django.contrib.staticfiles.storage.StaticFilesStorage',
        },
    }
```

---

## 🎓 Comprendre le Système de Cache

### WhiteNoise + ManifestStaticFilesStorage

1. **Première collecte** : Django crée un hash unique pour chaque fichier
   - `service2.png` → `service2.abc123.png`
2. **Templates** : Django remplace automatiquement les URLs
3. **Cache navigateur** : Le navigateur peut cacher longtemps car le hash change à chaque modification
4. **Problème** : Si vous ne recollectez pas, l'ancien hash reste

### Solution :
**Toujours exécuter `collectstatic` après avoir modifié un fichier statique !**

---

## 📞 Besoin d'Aide ?

Si le problème persiste :

1. Vérifiez les logs du serveur Django
2. Vérifiez la console du navigateur (F12)
3. Essayez de supprimer le dossier `staticfiles/` complètement
4. Réexécutez `collectstatic`

---

**Date de création** : 25 novembre 2025
**Problème** : Image service2.png affiche l'ancienne version
**Solution** : Cache du navigateur + recollection des fichiers statiques
