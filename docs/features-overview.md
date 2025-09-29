# Features Overview

**🏠 [Home](README.md)** | **📋 Features Overview** | **⚙️ [Configuration](configuration.md)** | **📚 [API Reference](api-reference/)**

This document provides a high-level overview of all reward systems and features available in the Microvolts Reward Server.

## Quick Links to Features
- 🛒 **[Event Shop](event-shop.md)** - Premium currency store
- 🎡 **[Referral Wheel](referral-wheel.md)** - Time-gated spinning rewards  
- 📦 **[Daily Chest](daily-chest.md)** - Frequent playtime rewards
- 🏆 **[Achievement System](achievements.md)** - Progression tracking

## Core Reward Systems

### 🛒 [Event Shop](event-shop.md)
Premium store for exclusive items using Event Currency.
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

## Configuration Management

All systems use the Config API for item management:
- **Event Shop**: `/api/admin/config/shop` (requires `price` field)
- **Wheel**: `/api/admin/config/wheel`
- **Daily Chest**: `/api/admin/config/playtime-draw` (requires `dropRate` field)
- **Achievements**: Generated via `--generate-achievements` script

## Time-Based Mechanics

The server uses configurable time triggers:
- **Wheel Spins**: `WHEEL_DRAW_TRIGGER` (default: 160 hours)
- **Daily Chest**: `DAILY_PLAYTIME_DRAW_TRIGGER` (default: 2 hours)

## Currency System

**Event Currency** is the primary premium currency:
- Earned through achievements, daily rewards, and special events
- Spent in the Event Shop for exclusive items
- Tracked per player with transaction logging

## Development Notes

- Achievement script may require editing for new achievement types
- GUI scaling issues exist in achievement system
- All systems support both API and web interface access
- Comprehensive logging and error handling implemented

---

## Navigation

**🏠 [Home](README.md)** | **📋 Features Overview** | **⚙️ [Configuration](configuration.md)** | **📚 [API Reference](api-reference/)**

### Feature Details
- 🛒 **[Event Shop](event-shop.md)** - Premium currency store
- 🎡 **[Referral Wheel](referral-wheel.md)** - Time-gated spinning rewards  
- 📦 **[Daily Chest](daily-chest.md)** - Frequent playtime rewards
- 🏆 **[Achievement System](achievements.md)** - Progression tracking