## Overview
A recreation of the Previous Microvolts reward systems, bringing back the achievement and reward mechanics from Microvolts Unplugged and ToyHeroes Offline. 

```
    |  \/  | \ \ / /  / _ \  
    | |\/| |  \ V /  | (_) | 
    |_|__|_|  _\_/_   \___/  
    _|"""""|_| """"|_|"""""| 
    `-0-0-'  `-0-0-'  `-0-0-` 
    
MVO v0.5
──────────────────────────────────────────────────────────────
```


The following features were fully implemented though testing was not comprehensive:
- Referral Wheel
- Event Shop
- Achievement system
- daily playtime chest

### Achievement GUI Status
This project was intended as a backend implementation, and due to limitations with EJS templating, the web interface for the achievement system is technically functional but visually problematic. The CSS scaling is completely off and it's not responsive whatsoever. It works well enough for testing backend functionality, but don't expect it to look good on any screen size.

![Current Achievements GUI State](docs/achievements-buggy.png)

I might get around to adding the shop GUI later on as it could be easier to implement.

### Achievement System
The original setup rewarded MP, Battery, Coins, and a few special items unlocked after reaching level 90. However, progression relied heavily on farming, which made it feel overly grindy. The current setup still rewards the same currencies but also introduces RT, coupons, and WC variants for levels 50 and above. Try to keep a good balance so players do not get items too early or too late.

You will need to manually edit the `generateAchievements.js` script located at `util/scripts/generateAchievements.js`. The script is simple enough to modify, so customizing the rewards should not be difficult.


Integration with the [MicrovoltsEmulator](https://github.com/SoWeBegin/MicrovoltsEmulator) is already in place, so achievements can directly trigger reward delivery to players. You can test the server endpoints with Postman to verify that achievements and reward calls work correctly.


### Installation & Configuration

For a complete guide on installation, setup, configuration, and API usage, check out [Installation & Configuration](docs/configuration.md)


### Note
Parts of the documentation were originally generated and may contain duplicated or inconsistently formatted sections.
I’m actively revising and refining these docs to make them clearer, more concise, and easier to follow.

If you spot any unclear or repetitive parts, feel free to open an issue or suggest edits. The goal is to make the documentation fully consistent and user-friendly over time.




  
