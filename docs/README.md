# Microvolts Reward Server Documentation

## Table of Contents

### Getting Started
- [Installation & Setup](#installation)
- [Environment Configuration](#environment-variables)
- [Database Setup](#configuration.md)
- [Admin User Creation](#admin-user-creation)

### Feature Documentation
-  **[Features Overview](features-overview.md)** - High-level overview of all systems

- **[Achievement System](achievements.md)** -   progression tracking system

- **[Event Shop](event-shop.md)** - store using Event Currency
- **[Referral Wheel](referral-wheel.md)** - Time-gated spinning wheel rewards
- **[Daily Chest](daily-chest.md)** - daily based rewards with drop rates


### Detailed Documentation
- **[Configuration Guide](configuration.md)** - Detailed server configuration
- **[Config Loading](config-loading.md)** - Configuration loading mechanisms
- **[Memory Caching](memory-caching.md)** - Caching system details
- **[API Reference](api-reference/)** - Complete API documentation

---

## Installation
This section covers the initial setup and configuration of the Server.
Data Files

1.  **Clone the repository:**
    ```bash
    git clone <repository-url>
    cd MicrovoltsRewardServer
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```
## importing item data

### Required JSON Files (Prequisites):
- itemsInfo.json
- itemWeaponInfo.json

The server relies on specific item files parsed to JSON (orginally in .cdb) for item and weapon information. These files should be placed in the data/ folder. the server already comes with the required .JSON files but, due to the github upload limits, they're uploaded to github as `.rar`. so if you intend to use the provided files you should decompress them before running the server.
 > You can use your own custom itemsInfo.json and itemWeaponInfo.json files by placing them in the data/ folder and Refresh the cache using --cache-reset.

## Using the Provided Archive

The JSON files are provided in a .rar archive within the data/ folder. To use them:

Extract the files from the archive:
```
# Example using unrar (ensure unrar is installed)
unrar x data/archive.rar data/
```
After extracting/adding the json files, you should run the server with the --cache-reset flag to generate a master item list.
```
node server.js --cache-reset
```
---
