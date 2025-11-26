# Mise à jour des Coordonnées de Contact - KOATSU

## 📞 Modifications Effectuées

### Numéros de Contact Mis à Jour

#### Téléphone Principal
- **Ancien numéro** : +1 (234) 567-890
- **Nouveau numéro** : **03-6892-4040** (Japon)
- **Format international** : +81-3-6892-4040

#### Fax (Nouveau)
- **Numéro** : **03-6892-4041**
- **Format international** : +81-3-6892-4041

### Format des Numéros Japonais

Les numéros de téléphone japonais suivent ce format :
- **Format local** : 03-6892-4040 (utilisé au Japon)
- **Format international** : +81-3-6892-4040 (utilisé depuis l'étranger)

**Note** : Le préfixe "03" est l'indicatif régional de Tokyo.

## 📁 Fichiers Modifiés

### 1. `Site/templates/index.html`
**Changements** :
- ✅ Numéro de téléphone mis à jour : `03-6892-4040`
- ✅ Lien tel: mis à jour : `tel:+81368924040`
- ✅ Section fax ajoutée avec icône `<i class="fas fa-fax"></i>`
- ✅ Numéro de fax ajouté : `03-6892-4041`

**Ligne 323-339** :
```html
<!-- Phone -->
<div class="contact-item">
    <div class="contact-icon">
        <i class="fas fa-phone"></i>
    </div>
    <div class="contact-text">
        <span class="contact-label" data-i18n="contact.phone">Phone</span>
        <a href="tel:+81368924040" class="contact-value">03-6892-4040</a>
    </div>
</div>

<!-- Fax -->
<div class="contact-item">
    <div class="contact-icon">
        <i class="fas fa-fax"></i>
    </div>
    <div class="contact-text">
        <span class="contact-label" data-i18n="contact.fax">Fax</span>
        <span class="contact-value">03-6892-4041</span>
    </div>
</div>
```

### 2. `Site/static/js/i18n.js`
**Changements** :
- ✅ Traduction anglaise ajoutée : `'contact.fax': 'Fax'`
- ✅ Traduction japonaise ajoutée : `'contact.fax': 'ファックス'`

**Lignes modifiées** :
- Ligne 95 (section anglaise) : Ajout de `'contact.fax': 'Fax',`
- Ligne 430 (section japonaise) : Ajout de `'contact.fax': 'ファックス',`

## 🌐 Où Apparaissent les Coordonnées

### Page d'Accueil (index.html)
Section "Contact & Map" - affiche :
- ✅ Email : contact@koatsu-global.com
- ✅ **Téléphone : 03-6892-4040** (nouveau)
- ✅ **Fax : 03-6892-4041** (nouveau)
- ✅ Adresse : Harajuku, Shibuya-ku, Tokyo, Japan

### Autres Pages
- **contact.html** : Aucun numéro de téléphone affiché (formulaire de contact uniquement)
- **about.html** : Aucun numéro de téléphone affiché
- **services.html** : Aucun numéro de téléphone affiché
- **footer.html** : Pas d'informations de téléphone/fax

## 🔍 Vérification

### Test des Liens
1. **Lien téléphone** : `tel:+81368924040`
   - Sur mobile : devrait ouvrir l'application téléphone
   - Sur desktop : selon le système (Skype, FaceTime, etc.)

2. **Affichage visuel** : `03-6892-4040`
   - Format local japonais pour meilleure lisibilité

### Langues Supportées
- ✅ **Anglais** : "Phone" / "Fax"
- ✅ **Japonais** : "電話" / "ファックス"

## 📋 Checklist de Déploiement

- [x] Numéro de téléphone mis à jour partout
- [x] Numéro de fax ajouté
- [x] Traductions en anglais ajoutées
- [x] Traductions en japonais ajoutées
- [x] Format international du lien tel: correct
- [x] Icône FontAwesome fax utilisée
- [x] Structure HTML cohérente avec les autres contact-items

## 🎨 Design

Le nouveau champ fax suit exactement le même style que les autres éléments de contact :
- Icône à gauche (FontAwesome `fa-fax`)
- Label avec traduction i18n
- Valeur du numéro
- Espacement et style identiques

## 🚀 Prochaines Étapes

1. **Tester localement** :
   ```bash
   python manage.py runserver
   ```
   Visitez : http://127.0.0.1:8000/

2. **Vérifier l'affichage** :
   - Section contact sur la page d'accueil
   - Changement de langue (EN ↔ JA)
   - Clic sur le lien téléphone (mobile)

3. **Déployer en production** :
   - Commit des changements
   - Push vers le repository
   - Déploiement sur PythonAnywhere

## 📞 Informations de Contact Complètes

**KOATSU Global Limited**
- 📧 Email : contact@koatsu-global.com
- ☎️ Téléphone : 03-6892-4040
- 📠 Fax : 03-6892-4041
- 📍 Adresse : Harajuku, Shibuya-ku, Tokyo, Japan
- 🕐 Horaires : Lun-Ven 9:00-18:00 JST

---

**Date de mise à jour** : 25 novembre 2025
**Effectué par** : GitHub Copilot
