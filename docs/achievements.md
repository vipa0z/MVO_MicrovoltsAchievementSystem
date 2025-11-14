# Achievement System


## Overview
The Achievement System tracks player progress across various in-game activities and rewards players for reaching specific milestones. The system supports both personal achievement tracking and social achievement viewing.

## Purpose
- Provides long-term goals and progression tracking
- Rewards players for diverse gameplay activities
- Creates social features through achievement sharing
- Encourages exploration of different game mechanics

## Achievement States
- **Locked**: Achievement requirements not yet met
- **Unlocked**: Achievement requirements fulfilled, ready to claim
- **Claimed**: Achievement reward has been collected
- **In Progress**: Player has made progress toward the achievement




### Configuration & Data Generation
Achievements are configured through the `generateAchievements` script:

```bash
node server.js --generate-achievements
```

This script may need editing to:
- Add new achievement types
- Modify reward structures
- Update progression requirements
- Add seasonal or event achievements


## API Endpoints

### Get Personal Achievements
```
GET /api/achievements
```
Returns player's achievement progress and metadata.

**Response:**
```json
{
  "success": true,
  "achievements": [
    {
      "slug": "sharpshooter-4",
      "name": "Sharpshooter",
      "description": "Achieve 3000 kills with Rifle",
      "state": "completed",
      "inProgress": true,
      "overallPercent": 100,
      "rewards": [...]
    }
    {...},
    {...}
  ]
}
```

### Get Social Achievements
```
GET /api/achievements/social/:nickname
```
View another player's completed achievements.

### Claim Achievement
```
POST /api/achievements/claim
```
Claims a completed achievement and awards rewards.

**Request Body:**
```json
{
  "achievementSlug": "sharpshooter-4"
}
```

The system tracks various metrics including:
- Kill counts by weapon type
- Playtime milestones
- Special event participation
- Currency accumulation
- And many more activities


## Social Features
Players can view each other's completed achievements, creating a social aspect to the achievement system and allowing for friendly competition.

---

## Navigation

**🏠 [Home](README.md)** | **📋 [Features Overview](features-overview.md)**

### Other Features
- **🛒 [Event Shop](event-shop.md)** - Premium currency store
- **🎡 [Referral Wheel](referral-wheel.md)** - Time-gated spinning rewards
- **📦 [Daily Chest](daily-chest.md)** - Frequent playtime rewards

### Technical Documentation
- **⚙️ [Configuration](configuration.md)** - Server configuration details
- **📚 [API Reference](api-reference/)** - Complete API documentation
