const express = require('express');
const router = express.Router();
const configController = require("../controllers/configController")
const wheelController = require('../controllers/wheelController');
const shopController = require('../controllers/eventShopController');
const authController = require("../controllers/authController")
const dailyPlaytimeController = require('../controllers/dailyPlaytimeController');
const { authUser, authAdmin } = require('../middlewares/auth');
const achievements = require('../controllers/achievementsController');

const registerAdminRoutes = () => {
    //auth    
    router.post('/register-staff', authAdmin, authController.registerStaffMember)

    // config 
    router.post('/config/wheel', authAdmin, configController.configureItems('wheel_items_data'));
    router.post('/config/shop', authAdmin, configController.configureItems('shop_items_data'));
    router.post('/config/achievements', authAdmin, configController.configureItems('achievements_data'));
    router.post('/config/daily-chest', authAdmin, configController.configureItems('playtime_draw_data')); 
}


const registerUserRoutes = () => {
    router.post('/register', authController.register)
    router.post('/login', authController.login)
    router.post('/logout', authController.logout)
    
    // Debug endpoint
    router.get('/debug/achievements', authUser, async (req, res) => {
        try {
            const MemoryLoader = require('../util/MemoryLoader');
            const raw = MemoryLoader.getAchievementsData();
            res.json({
                rawType: Array.isArray(raw) ? 'array' : 'object',
                hasAchievements: raw && raw.achievements ? true : false,
                achievementsCount: Array.isArray(raw) ? raw.length : (raw.achievements ? raw.achievements.length : 0),
                sample: Array.isArray(raw) ? raw[0] : (raw.achievements ? raw.achievements[0] : null)
            });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    });

    // wheel
    router.get('/wheel/items', authUser, wheelController.getWheelItems);
    router.post('/wheel/draw', authUser, wheelController.drawWheel);

    // shop
    router.get('/shop/items', authUser, shopController.getEventShop);
    router.post('/shop/buy', authUser, shopController.purchaseEventItem);

    //achievements
    router.post('/achievements/claim', authUser, achievements.claimAchievement);

    router.get('/achievements/self', authUser, achievements.getSelfAchievements); // achievements for current user (includes progress/data not shown to other players)
    // view other player achievements
    router.get('/achievements/:nickname', authUser, achievements.getSocialAchievements); // claimed only
    


    //daily chest
    router.get('/daily-chest/progress', authUser, dailyPlaytimeController.getDailyPlaytimeProgress);
    router.post('/daily-chest/claim', authUser, dailyPlaytimeController.drawDailyPlaytimeReward);

}







module.exports = { registerAdminRoutes, registerUserRoutes, router };