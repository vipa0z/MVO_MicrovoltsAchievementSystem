# Event Shop

**🏠 [Home](README.md)** | **📋 [Features Overview](features-overview.md)** | **🛒 Event Shop** | **🎡 [Referral Wheel](referral-wheel.md)** | **📦 [Daily Chest](daily-chest.md)** | **🏆 [Achievements](achievements.md)**

## Overview
The Event Shop is a  store where players can purchase exclusive items using Event Currency. This system provides a way for players to spend accumulated event currency on desirable rewards.

## Purpose
- Offers exclusive items not available through other reward systems
- Creates incentive for players to participate in events or activities that award Event Currency

## Currency Source
Players earn Event Currency through playing fifteen(15) minutes or longer matches. 

## Configuration Requirements
Event Shop items must be configured with a **price field** using the Config API. Each item requires:
- `itemId`: The item identifier(s)
- `itemName`: Display name of the item
- `itemOption`: Item configuration options
- `price`: Cost in Event Currency (required)

## API Endpoints

```
/api/config/shop
```
Shop items are configured via the Config endpoint at `/api/admin/config/shop` and can be manually inserted into the config file at`/data/configs`. Items must have valid IDs and a price field set.

Example:
```json
[
  {
    "itemId": 12345,
    "itemName": "devil headband",
    "itemOption": "Shotgun bullets",
    "price": 30
  },
  {
    "itemId": 67890,
    "itemName": "troll face",
    "itemOption": "sniper bullets",
    "price": 25
  }
]
```

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

```
POST /api/event-shop/purchase
```
Allows players to purchase items from the event shop. 

Suppose an item costs 30:

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
    "currencyAmount": 6
  }
}
```


---

## Navigation

**🏠 [Home](README.md)** | **📋 [Features Overview](features-overview.md)**

### Other Features
- **🎡 [Referral Wheel](referral-wheel.md)** - Time-gated spinning rewards  
- **📦 [Daily Chest](daily-chest.md)** - Frequent playtime rewards
- **🏆 [Achievement System](achievements.md)** - Progression tracking

### Config and API Documentation
- **⚙️ [Configuration](configuration.md)** - Server configuration details
- **📚 [API Reference](api-reference/)** - Complete API documentation
