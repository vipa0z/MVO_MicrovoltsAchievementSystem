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

### GUI Status
This project was intended as a backend implementation, and due to limitations with EJS templating, the web interface for the achievement system is technically functional but visually problematic. The CSS scaling is completely off and it's not responsive whatsoever. It works well enough for testing backend functionality, but don't expect it to look good on any screen size.

![Current GUI State](docs/achievements-buggy.png)
 i might get around to adding the shop GUI later on as it may be easier to implement.
## Achievement system
The original setup rewarded MP, Battery, coins..., and some special items unlocked after reaching level 90, those rewards relied heavily on farming, which made progression feel grindy. try to keep a good balance so players do not get items too early or too late.

You will need to manually edit the generateAchievements.js script located at `util/scripts/generateAchievements.js`. The script is simple enough to modify, so customizing achievements or reward values should not be difficult.

To generate achievement data, run the server with:
```
node server.js --generate-achievements
```
Integration with the [MicrovoltsEmulator](https://github.com/SoWeBegin/MicrovoltsEmulator) is already in place, so achievements can directly trigger reward delivery to players. You can test the server endpoints with Postman to verify that achievements and reward calls work correctly.

## Documentation
For a complete guide on setup, configuration, and API usage, Read the **[Docs](./docs/README.md)**.


  
