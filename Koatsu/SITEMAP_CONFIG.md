# Configuration du Sitemap et SEO

## 📋 Vue d'ensemble

Ce document explique la configuration du sitemap XML et des fichiers SEO pour le site Koatsu.

## 🗺️ Sitemap

### Fichiers créés

1. **`Site/sitemaps.py`** - Configuration du sitemap
2. **`Site/robots.py`** - Génération du fichier robots.txt

### Configuration

Le sitemap est accessible à l'URL : **`https://votre-domaine.com/sitemap.xml`**

#### Pages incluses dans le sitemap :

| Page | URL | Priorité | Fréquence de mise à jour |
|------|-----|----------|--------------------------|
| Accueil | `/` | 1.0 | daily |
| Services | `/services/` | 0.9 | weekly |
| Contact | `/contact/` | 0.8 | monthly |
| À propos | `/about/` | 0.7 | monthly |

### Priorités expliquées

- **1.0** : Page la plus importante (Accueil)
- **0.9** : Pages très importantes (Services)
- **0.8** : Pages importantes (Contact)
- **0.7** : Pages secondaires (À propos)

### Fréquences de mise à jour

- **daily** : Mise à jour quotidienne (Accueil)
- **weekly** : Mise à jour hebdomadaire (Services)
- **monthly** : Mise à jour mensuelle (À propos, Contact)

## 🤖 Robots.txt

Le fichier `robots.txt` est généré dynamiquement et accessible à : **`https://votre-domaine.com/robots.txt`**

### Contenu du robots.txt

```txt
User-agent: *
Disallow: /admin/
Disallow: /api/

# Sitemap
Sitemap: https://votre-domaine.com/sitemap.xml
```

### Règles :

- **Autorisé** : Toutes les pages publiques du site
- **Interdit** : 
  - `/admin/` - Interface d'administration Django
  - `/api/` - API endpoints internes
- **Sitemap** : Référence automatique au sitemap.xml

## 🚀 Déploiement

### 1. Vérification locale

Lancez le serveur de développement :

```bash
python manage.py runserver
```

Testez les URLs suivantes :
- http://127.0.0.1:8000/sitemap.xml
- http://127.0.0.1:8000/robots.txt

### 2. Validation du sitemap

Vérifiez que le XML est valide en visitant `/sitemap.xml`. Vous devriez voir :

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://votre-domaine.com/</loc>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
  ...
</urlset>
```

## 📊 Soumission aux moteurs de recherche

### Google Search Console

1. Allez sur https://search.google.com/search-console
2. Ajoutez votre propriété (domaine)
3. Dans le menu "Sitemaps", ajoutez : `https://votre-domaine.com/sitemap.xml`
4. Cliquez sur "Envoyer"

### Bing Webmaster Tools

1. Allez sur https://www.bing.com/webmasters
2. Ajoutez votre site
3. Soumettez le sitemap : `https://votre-domaine.com/sitemap.xml`

## 🔧 Maintenance

### Ajouter une nouvelle page au sitemap

Modifiez `Site/sitemaps.py` :

```python
def items(self):
    return [
        'site:home',
        'site:services',
        'site:about',
        'site:contact',
        'site:nouvelle_page',  # Ajoutez ici
    ]

def priority(self, item):
    priorities = {
        'site:home': 1.0,
        'site:services': 0.9,
        'site:about': 0.7,
        'site:contact': 0.8,
        'site:nouvelle_page': 0.6,  # Ajoutez la priorité
    }
    return priorities.get(item, 0.5)
```

### Vérifier les erreurs

```bash
python manage.py check
```

## ✅ Checklist de déploiement

- [ ] Le sitemap.xml est accessible
- [ ] Le robots.txt est accessible
- [ ] Toutes les pages importantes sont dans le sitemap
- [ ] Les priorités sont correctement définies
- [ ] Le sitemap a été soumis à Google Search Console
- [ ] Le sitemap a été soumis à Bing Webmaster Tools
- [ ] Le domaine est correctement configuré (pas de localhost)

## 🔍 Vérification du référencement

Après quelques jours/semaines, vérifiez :

1. **Google Search Console** : 
   - Nombre de pages indexées
   - Erreurs d'exploration
   - Performance dans les résultats de recherche

2. **Commande Google** :
   ```
   site:votre-domaine.com
   ```

3. **Outils de vérification** :
   - https://www.xml-sitemaps.com/validate-xml-sitemap.html
   - https://search.google.com/test/rich-results

## 📝 Notes importantes

- Le sitemap est généré dynamiquement par Django
- Pas besoin de fichier XML statique
- Les URLs utilisent le protocole HTTPS en production
- Le sitemap se met à jour automatiquement

## 🆘 Dépannage

### Erreur 404 sur sitemap.xml

Vérifiez que :
- `django.contrib.sitemaps` est dans `INSTALLED_APPS`
- Les imports sont corrects dans `Koatsu/urls.py`
- Le serveur a été redémarré

### Sitemap vide

Vérifiez que :
- Les noms d'URL correspondent exactement à ceux définis dans `Site/urls.py`
- La méthode `items()` retourne les bons noms

### Domaine incorrect dans le sitemap

En production, assurez-vous que :
- `ALLOWED_HOSTS` contient votre domaine
- Les requêtes utilisent le bon domaine
- Le protocole HTTPS est activé

## 📚 Ressources

- [Documentation Django Sitemaps](https://docs.djangoproject.com/en/stable/ref/contrib/sitemaps/)
- [Google Sitemaps Protocol](https://www.sitemaps.org/protocol.html)
- [Robots.txt Best Practices](https://developers.google.com/search/docs/crawling-indexing/robots/intro)
