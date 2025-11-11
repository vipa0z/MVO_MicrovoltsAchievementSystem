# Referral Wheel

**🏠 [Home](README.md)** | **📋 [Features Overview](features-overview.md)** | **🛒 [Event Shop](event-shop.md)** | **🎡 Referral Wheel** | **📦 [Daily Chest](daily-chest.md)** | **🏆 [Achievements](achievements.md)**

## Overview
The Referral Wheel is a time-gated reward system that allows players to spin for random reward from the wheel item list every 160 hours of playtime.

## Mechanics
- **Spin Requirement**: Players must accumulate 160 hours of playtime to earn one spin
- **Random Rewards**: Rewards are drawn randomly from the configured wheel items pool
- **Multiple Spins**: Players can accumulate multiple spins if they exceed the hour requirement
- **Log Output**: The Referral Wheel automatically generates a wheel.log file in the public directory, similar to the legacy MicroVolts system.
## Configuration
Wheel items can be manually configured at
`/data/config/wheel.json`
or via the API endpoint:
`/api/admin/config/wheel`

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



## Navigation

**🏠 [Home](README.md)** | **📋 [Features Overview](features-overview.md)**

### Other Features
- **🛒 [Event Shop](event-shop.md)** - Premium currency store
- **📦 [Daily Chest](daily-chest.md)** - Frequent playtime rewards
- **🏆 [Achievement System](achievements.md)** - Progression tracking

### Technical Documentation
- **⚙️ [Configuration](configuration.md)** - Server configuration details
- **📚 [API Reference](api-reference/)** - Complete API documentation
