const Achievements = require("../services/AchievementService")
const Player = require("../database/Player")
exports.getSelfAchievements = async (req, res) => {
    const playerId = req.user.id;
    const playernickname = req.user.nickname;
    try {
        console.log('Getting achievements for user:', { playerId, playernickname });
        const achievements = new Achievements(playerId, playernickname)
        const achievementData = await achievements.getAchievements()
        const achievementMeta = await achievements.getItemMetadata()

        // Combine achievement metadata with progress data
        const combinedAchievements = achievementMeta.map(template => {
            const progress = achievementData.find(a => a.slug === template.achievementSlug);
            return {
                ...template,
                slug: template.achievementSlug,
                state: progress?.state || 'locked',
                inProgress: progress?.inProgress || false,
                overallPercent: progress?.overallPercent || 0
            };
        });

        res.status(200).json({
            success: true,
            achievements: combinedAchievements
        })
    } catch (error) {
        console.error('Error in getSelfAchievements:', error)
        return res.status(500).json({
            success: false,
            error: "internal server error"
        })
    }
}
exports.getSocialAchievements = async (req, res) => {
    const playernickname = req.params.nickname;
    if (!playernickname) {
        return res.status(400).json({
            success: false,
            error: "Missing nickname parameter"
        })
    }
    const doesPlayerExist = await Player.findUserBynickname(playernickname)
    if (!doesPlayerExist) {
        return res.status(404).json({
            success: false,
            error: "Player not found"
        })
    }
    try {
        const socialAchievements = await Achievements.getSocialAchievements(playernickname)

        res.status(200).json({
            success: true,
            data: socialAchievements
        })
    } catch (error) {
        console.error(error)
        return res.status(500).json({
            success: false,
            error: "internal server error"
        })
    }
}
exports.claimAchievement = async (req, res) => {
    const achievementSlug = req.body.achievementSlug;
    const playerId = req.user.id;
    const playernickname = req.user.nickname;
    if (!achievementSlug) {
        return res.status(400).json({
            success: false,
            error: "Missing achievement slug"
        })
    }
    if (!req.user) {
        return res.status(401).json({
            success: false,
            error: "Unauthorized"
        })
    }
    try {
        const achievements = new Achievements(playerId, playernickname)
        const achievementData = await achievements.claimAchievement(achievementSlug)
        if (!achievementData.error) {
            return res.status(200).json({
                success: achievementData.success,
                data: { message: achievementData.message, achievement: achievementData.achievement }
            })
        } else {
            return res.status(400).json({
                success: achievementData.success,
                error: achievementData.error
            })
        }
    } catch (error) {
        console.error(error)
        return res.status(500).json({
            success: false,
            error: "internal server error"
        })
    }
}