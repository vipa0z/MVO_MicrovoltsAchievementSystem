# Features Overview

**🏠 [Home](README.md)** | **📋 Features Overview** | **⚙️ [Configuration](configuration.md)** | **📚 [API Reference](api-reference/)**

This document provides a high-level overview of all reward systems and features available in the Microvolts Reward Server.

## Core Reward Systems

### 🛒 [Event Shop](event-shop.md)
Event store for exclusive items using Event Currency.
- **Purpose**: Currency sink for event rewards
- **Requirement**: Items must have price field configured via Config API
- **Currency Source**: Earned through various activities and achievements

### 🎡 [Referral Wheel](referral-wheel.md) 
Time-gated spinning wheel with random rewards.
- **Purpose**: Long-term engagement incentive
- **Mechanics**: Spin every 160 hours of playtime
- **Rewards**: Randomly drawn from configured item pool

### 📦 [Daily Chest](daily-chest.md)
Frequent reward system with drop rate mechanics.
- **Purpose**: Short-term engagement and regular rewards
- **Mechanics**: Claim every 2 hours of playtime
- **System**: Incorporates weighted drop rates for reward variety

### 🏆 [Achievement System](achievements.md)
Comprehensive progression tracking and milestone rewards.
- **Purpose**: Long-term goals and diverse activity rewards
- **Features**: Personal progress tracking and social achievement viewing
- **Status**: GUI needs rewriting (scaling issues), API fully functional
- Achievement script may require tweaking
- GUI scaling issue


## Configuration Management

All systems use the Config API for item management:
- **Achievements**: Generated via `--generate-achievements` script (requires manual tweaks)
- **Daily Chest**: generate via `--generate-chest` (currently not implemented)
- **Event Shop**: `/api/admin/config/shop` (requires `price` field)
- **Wheel**: `/api/admin/config/wheel`

---

## Navigation

**🏠 [Home](README.md)** | **📋 Features Overview** | **⚙️ [Configuration](configuration.md)** | **📚 [API Reference](api-reference/)**

### Feature Details
- 🛒 **[Event Shop](event-shop.md)** - Premium currency store
- 🎡 **[Referral Wheel](referral-wheel.md)** - Time-gated spinning rewards  
- 📦 **[Daily Chest](daily-chest.md)** - Frequent playtime rewards
- 🏆 **[Achievement System](achievements.md)** - Progression tracking
