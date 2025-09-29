
const express = require('express');
const router = express.Router();
const { authUser } = require('../middlewares/auth');

// Login page
router.get('/login', (req, res) => {
    res.render('login', {
        title: 'Login'
    });
});

// Achievement GUI page
router.get('/achievements', authUser, (req, res) => {
    res.render('achievements-gui', {
        title: 'Game Achievements',
        user: req.user
    });
});

module.exports = router;