const { PrismaClient } = require('@prisma/client');
const { fakerFR: faker } = require('@faker-js/faker');

const prisma = new PrismaClient();

exports.getAllUsers = async () => {
    try {
        return await prisma.user.findMany();
    } catch (e) {
        console.error("❌ Erreur service (getAllUsers):", e.message);
        return [];
    }
};

// Nouvelle fonction pour récupérer par ID
exports.getUserById = async (id) => {
    try {
        return await prisma.user.findUnique({
            where: { id: id },
        });
    } catch (e) {
        console.error(`❌ Erreur service (getUserById - ID: ${id}):`, e.message);
        return null; // Retourne null si non trouvé ou erreur
    }
};

exports.populateRandomUser = async () => {
    try {
        return await prisma.user.create({
            data: {
                name: faker.person.fullName(),
                email: faker.internet.email(),
            },
        });
    } catch (e) {
        console.error("❌ Erreur service (populate):", e.message);
        return { error: e.message };
    }
};

exports.resetDatabase = async () => {
    try {
        // Supprime tous les utilisateurs
        await prisma.user.deleteMany();
        
        // Optionnel pour SQLite : Réinitialise l'auto-incrément (ID repart à 1)
        await prisma.$executeRaw`DELETE FROM sqlite_sequence WHERE name='User'`;
        
        return { message: "Base de données réinitialisée" };
    } catch (e) {
        console.error("❌ Erreur reset :", e.message);
        throw e;
    }
};