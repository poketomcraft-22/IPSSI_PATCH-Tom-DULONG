const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Route pour récupérer tous les utilisateurs
router.get('/', userController.getAllUsers);

// Route pour récupérer un utilisateur par son ID
router.get('/:id', userController.getUserById); // NOUVEAU !

// Route pour peupler un utilisateur aléatoire
router.post('/populate', userController.populateRandomUser);

router.delete('/reset', userController.resetDatabase);

module.exports = router;