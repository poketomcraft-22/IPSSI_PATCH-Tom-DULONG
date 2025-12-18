const userService = require('../services/userService');

// Récupérer tous les utilisateurs
exports.getAllUsers = async (req, res) => {
    try {
        const users = await userService.getAllUsers();
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Récupérer un utilisateur par ID (NOUVEAU)
exports.getUserById = async (req, res) => {
    try {
        const { id } = req.params; // L'ID vient de l'URL (/api/users/:id)
        const user = await userService.getUserById(parseInt(id)); // Convertir en nombre
        if (user) {
            res.json(user);
        } else {
            res.status(404).json({ message: "Utilisateur non trouvé" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


// Peupler un utilisateur aléatoire
exports.populateRandomUser = async (req, res) => {
    try {
        const newUser = await userService.populateRandomUser();
        res.status(201).json(newUser);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.resetDatabase = async (req, res) => {
    try {
        const result = await userService.resetDatabase();
        res.json(result);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};