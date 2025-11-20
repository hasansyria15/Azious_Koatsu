# Configuration du Cache - Koatsu

## 📋 Résumé

Cette configuration optimise le cache des fichiers statiques pour améliorer les performances du site web. Elle permet d'économiser **26 032 KiB** de bande passante et d'accélérer considérablement les visites répétées.

## 🚀 Optimisations Mises en Place

### 1. Middleware Django (Koatsu/middleware.py)

Un middleware personnalisé ajoute automatiquement les en-têtes de cache appropriés à tous les fichiers statiques :

- **Images** (jpg, png, gif, svg, webp) : Cache de **1 an**
- **CSS et JavaScript** : Cache de **30 jours**
- **Fonts** (woff, woff2, ttf) : Cache de **1 an**
- **Vidéos et Audio** : Cache de **1 an**

### 2. Configuration Django (settings.py)

- Ajout du middleware `StaticFileCacheMiddleware`
- Configuration du système de cache Django
- En production : utilisation de `ManifestStaticFilesStorage` pour versionner les fichiers statiques

### 3. Configuration Serveur Web

#### Pour Nginx (nginx_cache_config.conf)
- Configuration de la compression Gzip
- En-têtes de cache optimisés par type de fichier
- Headers `Cache-Control` avec `public` et `immutable`

#### Pour Apache (.htaccess)
- Module `mod_expires` pour définir les durées d'expiration
- Module `mod_headers` pour les en-têtes Cache-Control
- Module `mod_deflate` pour la compression Gzip

## 📊 Impact sur les Performances

### Avant
- Aucun cache configuré (TTL: None)
- Taille totale : **26 030 KiB** rechargés à chaque visite
- Temps de chargement plus lent pour les visites répétées

### Après
- Cache de **1 an** pour les images (23 KiB)
- Cache de **30 jours** pour CSS/JS (11 KiB)
- **Réduction drastique** du temps de chargement pour les visites répétées
- **Économie de bande passante** : 26 032 KiB par visite répétée

## 🔧 Installation et Déploiement

### Étape 1 : Développement Local

Le middleware est déjà configuré dans `settings.py`. Pour tester localement :

```bash
python manage.py runserver
```

### Étape 2 : Production

#### Pour Nginx :

1. Copiez la configuration de `nginx_cache_config.conf` dans votre fichier Nginx
2. Modifiez le chemin `/chemin/vers/votre/staticfiles/` avec le vrai chemin
3. Testez la configuration : `sudo nginx -t`
4. Rechargez Nginx : `sudo systemctl reload nginx`

#### Pour Apache :

1. Assurez-vous que les modules sont activés :
```bash
sudo a2enmod expires
sudo a2enmod headers
sudo a2enmod deflate
```

2. Le fichier `.htaccess` est déjà créé
3. Rechargez Apache : `sudo systemctl reload apache2`

### Étape 3 : Collecte des Fichiers Statiques

Avant le déploiement en production :

```bash
python manage.py collectstatic --noinput
```

## 🧪 Vérification

### Tester les en-têtes de cache :

```bash
# Vérifier les en-têtes d'une image
curl -I https://www.koatsu-global.com/static/img/logo.png

# Vérifier les en-têtes d'un fichier CSS
curl -I https://www.koatsu-global.com/static/css/style.css
```

Vous devriez voir des en-têtes comme :
```
Cache-Control: max-age=31536000, public, immutable
Expires: [date dans 1 an]
```

### Outils en ligne :
- Google PageSpeed Insights : https://pagespeed.web.dev/
- GTmetrix : https://gtmetrix.com/
- WebPageTest : https://www.webpagetest.org/

## 📝 Notes Importantes

1. **Version des fichiers** : Quand vous modifiez un fichier CSS/JS/image, pensez à :
   - Renommer le fichier (ex: `style.v2.css`)
   - OU utiliser un paramètre de version (ex: `style.css?v=2`)
   - OU utiliser `ManifestStaticFilesStorage` en production (déjà configuré)

2. **Cache navigateur vs Cache serveur** :
   - Ces configurations gèrent le cache côté navigateur
   - Pour un cache serveur (Redis, Memcached), voir la configuration Django CACHES

3. **Mode DEBUG** :
   - En mode DEBUG=True, le cache est moins agressif
   - En production (DEBUG=False), les optimisations maximales sont appliquées

## 🎯 Résultats Attendus

Après cette configuration, Google PageSpeed Insights devrait montrer :
- ✅ "Utiliser des durées de mise en cache efficaces" : **RÉGLÉ**
- ✅ Économies : **26 032 KiB**
- ✅ Amélioration du score de performance
- ✅ Meilleur LCP (Largest Contentful Paint)
- ✅ Meilleur FCP (First Contentful Paint)

## 🔄 Maintenance

- Surveillez régulièrement les performances avec PageSpeed Insights
- Ajustez les durées de cache si nécessaire
- Pensez à optimiser également la taille des images (compression, formats modernes comme WebP)

## 🆘 Dépannage

### Le cache ne fonctionne pas :
1. Vérifiez que le middleware est bien dans `MIDDLEWARE` dans `settings.py`
2. Videz le cache de votre navigateur
3. Vérifiez les en-têtes avec `curl -I`

### Les changements ne s'affichent pas :
1. Videz le cache du navigateur (Ctrl+Shift+R ou Cmd+Shift+R)
2. Vérifiez que vous utilisez un système de versioning pour les fichiers statiques
3. En production, relancez `collectstatic`

---

**Dernière mise à jour** : 20 novembre 2025
