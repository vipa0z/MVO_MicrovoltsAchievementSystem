# Referral Wheel

**🏠 [Home](README.md)** | **📋 [Features Overview](features-overview.md)** | **🛒 [Event Shop](event-shop.md)** | **🎡 Referral Wheel** | **📦 [Daily Chest](daily-chest.md)** | **🏆 [Achievements](achievements.md)**

## Overview
The Referral Wheel is a time-gated reward system that allows players to spin for random reward from the wheel item list every 160 hours of playtime.

## Mechanics
- **Spin Requirement**: Players must accumulate 160 hours of playtime to earn one spin
- **Random Rewards**: Rewards are drawn randomly from the configured wheel items pool
- **Multiple Spins**: Players can accumulate multiple spins if they exceed the hour requirement

## API Endpoints

### Get Wheel Status
```
GET /api/wheel
```
Returns player's wheel eligibility and available items.

**Response:**
```json
{
  "success": true,
  "data": {
    "canSpin": true,
    "remainingSpins": 2,
    "hoursUntilNextSpin": 0,
    "wheelItems": [...]
  }
}
```

### Spin Wheel
```
POST /api/wheel/spin
```
Performs a wheel spin and awards a random item.

**Response:**
```json
{
  "success": true,
  "data": {
    "message": "Congratulations! You won Apsu",
    "remainingSpins": 1
  }
}
```

## Configuration
Wheel items are configured via the Config API at `/api/admin/config/wheel`. Items are randomly selected based on equal probability distribution.

## Time Tracking
The system tracks player playtime and automatically calculates eligibility. The 160-hour requirement is configurable via the `WHEEL_DRAW_TRIGGER` environment variable.

---

## Navigation

**🏠 [Home](README.md)** | **📋 [Features Overview](features-overview.md)**

### Other Features
- **🛒 [Event Shop](event-shop.md)** - Premium currency store
- **📦 [Daily Chest](daily-chest.md)** - Frequent playtime rewards
- **🏆 [Achievement System](achievements.md)** - Progression tracking

### Technical Documentation
- **⚙️ [Configuration](configuration.md)** - Server configuration details
- **📚 [API Reference](api-reference/)** - Complete API documentation