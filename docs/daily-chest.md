# Daily Chest (Playtime Draw)

**🏠 [Home](README.md)** | **📋 [Features Overview](features-overview.md)** | **🛒 [Event Shop](event-shop.md)** | **🎡 [Referral Wheel](referral-wheel.md)** | **📦 Daily Chest** | **🏆 [Achievements](achievements.md)**

## Overview
The Daily Chest system allows players to claim rewards every 2 hours of active playtime. This system incorporates drop rates to create varied reward experiences and encourages regular gameplay sessions.

## Purpose
- Rewards consistent short-term gameplay sessions
- Provides frequent reward opportunities to maintain engagement
- Uses drop rate mechanics to create reward variety and rarity
- Encourages players to return regularly for rewards

## Mechanics
- **Time Requirement**: Players must accumulate 2 hours of playtime to claim a reward
- **Drop Rates**: Each reward has a configured drop rate determining its probability
- **Automatic Reset**: Counter resets after successful claim
- **Immediate Availability**: No daily cooldown, purely based on playtime accumulation

## API Endpoints

### Get Progress
```
GET /api/daily-playtime/progress
```
Returns player's current progress toward next chest.

**Response:**
```json
{
  "success": true,
  "data": {
    "canDraw": false,
    "progress": 1.5,
    "progressPercentage": 75,
    "hoursRequired": 2
  }
}
```

### Claim Reward
```
POST /api/daily-playtime/draw
```
Claims a reward when eligible.

**Response:**
```json
{
  "success": true,
  "data": {
    "success": true,
    "message": "Congratulations you won Rare Weapon",
    "progress": 0,
    "progressPercentage": 0
  }
}
```

## Drop Rate System
The chest system uses weighted random selection based on configured drop rates:
- Higher drop rate = more common reward
- Lower drop rate = rarer reward
- Total drop rates don't need to equal 100%

## Configuration
Chest items are configured via the Config API at `/api/admin/config/playtime-draw`. Each item requires:
- `itemId`: The item identifier(s)
- `itemName`: Display name of the item
- `itemOption`: Item configuration options
- `dropRate`: Probability weight for the item (required)

## Time Tracking
The system tracks active playtime and the 2-hour requirement is configurable via the `DAILY_PLAYTIME_DRAW_TRIGGER` environment variable.

---

## Navigation

**🏠 [Home](README.md)** | **📋 [Features Overview](features-overview.md)**

### Other Features
- **🛒 [Event Shop](event-shop.md)** - Premium currency store
- **🎡 [Referral Wheel](referral-wheel.md)** - Time-gated spinning rewards
- **🏆 [Achievement System](achievements.md)** - Progression tracking

### Technical Documentation
- **⚙️ [Configuration](configuration.md)** - Server configuration details
- **📚 [API Reference](api-reference/)** - Complete API documentation