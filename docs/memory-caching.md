## In-Memory Caching & Item Transformation

The server loads item configurations and the master item list into memory at startup, managed by `util/MemoryLoader.js`.

The source files are `itemInfo.json` and `itemsWeaponInfo.json`. Since they use snake_case keys, the data is transformed once into camelCase and cached for faster restarts.

### `loadAndTransformItemsInfo`

1. **Check cache** → Look for `data/itemInfo.transformed.json`.  
2. **Load from cache** → If found, read directly into memory.  
3. **Transform and cache** → If not found, read `itemInfo.json`, convert keys to camelCase, save as `itemInfo.transformed.json`.  
4. **Store in memory** → Keep the transformed data in `MemoryLoader.allItems`.

---

## Reward Configurations

Reward configs (wheel, shop, etc.) are also cached in memory.

### `loadCategoryItemsIntoMemory`

1. Read the config file from `data/configs/`.  
2. Parse JSON.  
3. Store in `MemoryLoader.items[category]`.

---

## Accessing Cached Data

- `MemoryLoader.getAllItems()` → full item list  
- `MemoryLoader.getItems(category)` → reward items for a category  
- `MemoryLoader.getAchievementsData()` → achievements config  

---

## Hot-Reloading

`MemoryLoader.reloadCategory(category)` reloads a config at runtime, updating the cache without restarting the server.
