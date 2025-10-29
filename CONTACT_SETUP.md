# Configuration du Formulaire de Contact

## ✅ Solution actuelle : Mailto automatique

Le formulaire de contact fonctionne **immédiatement** sans configuration !

### Comment ça marche :
1. L'utilisateur remplit le formulaire
2. Le formulaire ouvre automatiquement le client email (Gmail, Outlook, etc.)
3. Le message est pré-rempli avec les informations du formulaire

### Pour tester :
1. Redémarrez le serveur : `npm run dev`
2. Allez sur la page Contact
3. Remplissez et soumettez le formulaire
4. Votre client email s'ouvrira automatiquement

---

## 📧 Configuration EmailJS (Optionnel)

Si vous souhaitez envoyer les emails directement depuis le site (sans ouvrir le client email) :

### 1. Créez un compte EmailJS
- Allez sur https://www.emailjs.com/
- Inscrivez-vous gratuitement

### 2. Configurez un Service Email
- Dans le dashboard EmailJS : **Email Services** → **Add New Service**
- Choisissez Gmail, Outlook, ou autre
- Suivez les instructions de connexion

### 3. Créez un Template
- Allez dans **Email Templates** → **Create New Template**
- Utilisez ces variables dans votre template :
  ```
  De: {{from_name}} <{{from_email}}>
  À: {{to_email}}
  
  Message:
  {{message}}
  ```

### 4. Obtenez vos clés
- **Service ID** : Dans Email Services
- **Template ID** : Dans Email Templates
- **Public Key** : Account → General → Public Key

### 5. Configurez le fichier .env
Créez/modifiez le fichier `.env` à la racine du projet :
```bash
VITE_EMAILJS_SERVICE_ID=service_votre_id
VITE_EMAILJS_TEMPLATE_ID=template_votre_id
VITE_EMAILJS_PUBLIC_KEY=votre_cle_publique
```

### 6. Redémarrez le serveur
```bash
npm run dev
```

---

## 🔧 Dépannage

### Le formulaire ne fonctionne pas ?
1. **Rechargez la page** (Ctrl + Shift + R)
2. **Vérifiez la console** (F12 → Console)
3. **Vérifiez que le serveur tourne** : L'URL devrait être `http://localhost:5173`

### L'email ne s'ouvre pas ?
- Vérifiez que vous avez un client email installé (Gmail app, Outlook, Thunderbird, etc.)
- Sur Windows : Vérifiez les paramètres par défaut dans **Paramètres** → **Applications** → **Applications par défaut** → **Email**

### EmailJS configuré mais ne fonctionne pas ?
1. Vérifiez que les clés dans `.env` sont correctes
2. Vérifiez que le template EmailJS utilise les bonnes variables
3. Regardez la console du navigateur pour les erreurs
4. Le formulaire basculera automatiquement vers mailto en cas d'erreur

---

## 📝 Notes

- **Gratuit** : EmailJS offre 200 emails/mois gratuitement
- **Sécurité** : Les clés publiques sont sûres pour le frontend
- **Fallback** : Le système bascule automatiquement vers mailto si EmailJS échoue
