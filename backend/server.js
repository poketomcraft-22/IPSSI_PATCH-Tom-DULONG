/**
 * FORCE l'URL de la base de données au tout début du processus.
 * C'est indispensable pour Prisma 7 sous Windows pour éviter l'erreur URL_INVALID.
 */
process.env.DATABASE_URL = "file:./prisma/database.db";

const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const path = require('path');

// Import des routes (vérifie que le chemin est correct selon ton projet)
const userRoutes = require('./src/routes/userRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// --- MIDDLEWARES ---

// Sécurité : Helmet aide à protéger l'application de certaines vulnérabilités
app.use(helmet());

// CORS : Autorise ton frontend (port 3000) à communiquer avec ton backend (port 5000)
app.use(cors({
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}));

// Parsing JSON : Pour pouvoir lire les corps des requêtes API
app.use(express.json());

// --- ROUTES ---

// Route de test pour vérifier que le serveur tourne
app.get('/', (req, res) => {
    res.json({ message: "Le serveur IPSSI PATCH fonctionne parfaitement !" });
});

// Utilisation des routes utilisateurs
app.use('/api/users', userRoutes);

// --- GESTION D'ERREURS GLOBALE ---
app.use((err, req, res, next) => {
    console.error("❌ Erreur Serveur :", err.stack);
    res.status(500).json({ 
        error: "Une erreur interne est survenue sur le serveur.",
        details: err.message 
    });
});

// --- LANCEMENT ---
app.listen(PORT, () => {
    console.log(`
    🚀 Serveur lancé sur http://localhost:${PORT}
    🔒 Sécurité Helmet : Activée
    📂 Architecture : Services/Controllers séparés
    💎 ORM : Prisma 7 (LibSQL adapter)
    📁 DB : ${process.env.DATABASE_URL}
    `);
});