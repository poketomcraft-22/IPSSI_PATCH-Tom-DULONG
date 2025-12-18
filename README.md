# 🚀 IPSSI PATCH - User Management System

Une application web full-stack moderne pour la gestion d'utilisateurs, construite avec **React**, **Node.js (Express)** et **Prisma ORM**.

## 🛠️ Stack Technique

- **Frontend :** React.js (Hooks, Styles Inline)
- **Backend :** Node.js, Express.js
- **Base de données :** SQLite (via Prisma)
- **ORM :** Prisma v5.x (pour une stabilité maximale sur Windows)
- **Génération de données :** Faker.js

## 📁 Architecture du Projet

Le projet suit une architecture propre en couches pour séparer les responsabilités :

```text
backend/
├── prisma/             # Schéma de base de données et SQLite
├── src/
│   ├── controllers/    # Logique de réponse HTTP (req, res)
│   ├── routes/         # Définition des points d'entrée API
│   └── services/       # Logique métier et appels Prisma (ORM)
└── server.js           # Point d'entrée du serveur Express
|
frontend/
└── my-app/src/App.js   # Interface utilisateur React unique
```
⚙️ Installation et Lancement
1. Prérequis

    Node.js installé.

    Un terminal ouvert dans le dossier du projet.

2. Configuration du Backend
```
cd backend
npm install

# Synchroniser la base de données
npx prisma generate
npx prisma db push

# Lancer le serveur (port 5000)
npm start
```
3. Configuration du Frontend
```
cd frontend/my-app
npm install

# Lancer l'interface (port 3000)
npm start
```
💡 Fonctionnalités

    Génération Aléatoire : Création instantanée d'utilisateurs avec des noms et emails réalistes via Faker.js.

    Sélecteur d'ID : Focus sur un utilisateur spécifique pour voir ses détails complets.

    Répertoire Dynamique : Liste complète des utilisateurs enregistrés en base de données.

    Reset Database : Bouton de sécurité pour vider la base de données et réinitialiser les compteurs d'ID.

⚠️ Notes Spécifiques (Correction Bugs Windows/Prisma)

Si vous rencontrez des erreurs de type URL_INVALID ou P1012 avec Prisma :

    Assurez-vous d'utiliser Prisma v5.x (plus stable pour les environnements locaux Windows).

    Le fichier schema.prisma contient l'URL directe : url = "file:./database.db".

    Le serveur backend force l'injection de la variable d'environnement au démarrage dans server.js.

🛡️ Sécurité

    Utilisation de Helmet pour protéger les headers HTTP.

    Gestion des CORS pour sécuriser les échanges entre le frontend et le backend.
```
---

### Comment l'utiliser ?
1. Dans ton dossier principal, fais un clic droit -> **Nouveau fichier**.
2. Nomme-le **README.md**.
3. Colle le texte ci-dessus.

C'est une excellente pratique pour tes projets IPSSI, cela montre que ton code est documenté et facile à reprendre par quelqu'un d'autre !

Souhaites-tu que je t'aide pour une autre fonctionnalité sur ton Dashboard ?
```
Projet réalisé avec l'aide de l'outil d'intelligence Artificiel GEMINI by Google.
