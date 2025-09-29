# Event Shop

**🏠 [Home](README.md)** | **📋 [Features Overview](features-overview.md)** | **🛒 Event Shop** | **🎡 [Referral Wheel](referral-wheel.md)** | **📦 [Daily Chest](daily-chest.md)** | **🏆 [Achievements](achievements.md)**

## Overview
The Event Shop is a  store where players can purchase exclusive items using Event Currency. This system provides a way for players to spend accumulated event currency on desirable rewards.

## Purpose
- Offers exclusive items not available through other reward systems
- Creates incentive for players to participate in events and activities that award Event Currency

## Configuration Requirements
Event Shop items must be configured with a **price field** using the Config API. Each item requires:
- `itemId`: The item identifier(s)
- `itemName`: Display name of the item
- `itemOption`: Item configuration options
- `price`: Cost in Event Currency (required)

## API Endpoints

### Get Shop Items
```
GET /api/event-shop
```
Returns all available shop items and player's current Event Currency balance.

**Response:**
```json
{
  "success": true,
  "message": "Shop items loaded successfully",
  "data": {
    "items": [...],
    "playerCurrency": 36
  }
}
```

### Purchase Item
```
POST /api/event-shop/purchase
```
Allows players to purchase items from the event shop.

**Request Body:**
```json
{
  "itemName": "Devil Headband"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Item purchased successfully",
  "data": {
    "item": {...},
    "currencyAmount": 1200
  }
}
```

## Configuration
Shop items are configured via the Config API at `/api/admin/config/shop`. Items must include the required price field to be valid for the event shop.
```json
[
  {
    "itemId": 12345,
    "itemName": "itemname",
    "itemOption": "item stat (speed/tank) it's also an optional field",
    "price": 50
  },
  {
    "itemId": 67890,
    "itemName": "itemname2",
    "itemOption": "stat-here",
    "price": 25
  }
]
```
## Currency Source
Players earn Event Currency through playing fifteen(15) minutes or longer matches

---

## Navigation

**🏠 [Home](README.md)** | **📋 [Features Overview](features-overview.md)**

### Other Features
- **🎡 [Referral Wheel](referral-wheel.md)** - Time-gated spinning rewards  
- **📦 [Daily Chest](daily-chest.md)** - Frequent playtime rewards
- **🏆 [Achievement System](achievements.md)** - Progression tracking

### Technical Documentation
- **⚙️ [Configuration](configuration.md)** - Server configuration details
- **📚 [API Reference](api-reference/)** - Complete API documentation
