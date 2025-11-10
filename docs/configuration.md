
**🏠 [Home](README.md)** | **📋 [Features Overview](features-overview.md)** | **⚙️ Configuration** | **📚 [API Reference](api-reference/)**

## Server Configuration

This guide covers the initial setup and configuration of the Server.

## Initial Setup & Dependencies

### Prerequisites

*   **Node.js >= 20**
*   **npm:** Node Package Manager (comes bundled with Node.js).

### 1. Install Dependencies

The server requires the following packages: `axios`,`chalk`, `cookie-parser`, `cors`, `crypto`, `dotenv`, `ejs`, `express`, `express-validator`, `jimp`, `jsonwebtoken`, `logger`, `mariadb`, `sharp`, `winston`, and `zod`.

You must install these dependencies before running the server.

**Usage:**

1.  Navigate to the root directory of the project in your terminal.
2.  Run the dependency installation command:

```
npm install
```


## 2. Data Files
The server relies on specific JSON files for item and weapon information. These files are required in the `data/` folder and represent the transformed, structured item data used by the server's logic.

**Using the Provided Master list**

A pre-transformed file combining itemsInfo and weaponsInfo is already included at:
`/data/items.transformed.json`

#### **Importing your own JSON files from cgd.dip**

1. Unpack the `cgd.dip` file using a tool like **[mvarchiver](https://github.com/d3v1l401/Microvolt-Archiver)** (by d3v1l401).
2. Transform the extracted `.cdb` files into the required JSON format using a utility like **[cdb_parser](https://github.com/M4sterG/cdb_parser)** (by m4ster4g).
3. place your JSON files in `/data/SRC_JSON_FILES`.
4. delete the existing item pool cache `items.transformed.json` file.
5. Restart the server with the `--cache-reset` option to rebuild the item pool list. 
6. the new item pool cache `items.transformed.json` file should be generated in the `/data` folder.

#### example:

```
# Remove the existing transformed items file
PS > rm .\data\items.transformed.json

# verify json files exist:
PS > ls .\data\SRC_JSON_FILES\


-a----          7/9/2025  11:18 PM       85365880 iteminfo.json
-a----          7/9/2025  11:18 PM       44213687 itemweaponsinfo.json

# Rebuild the master list
$ node server.js --reset-cache

                      <SNIP>

MVO v0.5
──────────────────────────────────────────────────────────────
[INFO] Generating Master Item Pool...
[SUCCESS] Master list 'items.transformed.json' has been updated!

# Verify generated data
$ ls .\data\
                        <SNIP>
-a----        11/10/2025   7:13 PM       12762219 items.transformed.json


```

## 3. Environment Variables

The server is configured using a `.env` file. Create this file by copying the provided `.env.example` and filling in the values.

*   `PORT`: The port the server will run on (e.g., `3000`).
*   `DB_HOST`: The hostname or IP address of your MySQL database.
*   `DB_USER`: The username for your MySQL database.
*   `DB_PASSWORD`: The password for your MySQL database.
*   `DB_NAME`: The name of your MySQL database.
*   `USER_JWT_SECRET`: A secret key for signing JSON Web Tokens (JWTs) for regular users.
*   `ADMIN_JWT_SECRET`: A secret key for signing JWTs for admin/staff users.
*   `EMU_JWT_SECRET`: The JWT secret used by the Microvolts Emulator for API communication.
*   `EMU_API_URL`: The base URL for the Microvolts Emulator API (e.g., `http://localhost:8080/api`).
*   `DAILY_PLAYTIME_DRAW_TRIGGER`: The number of hours a player must be playing to be eligible for a daily playtime reward. Default is 2 hours.
*   `WHEEL_DRAW_TRIGGER`: The number of hours a player must complete to earn one spin on the wheel. Default is 160 hours.



## 4. Database Initialization (populate & create admin)

### **Populating the database**

The --populate option is a one-time setup command that prepares your database for use with the server. It ensures all required tables and reward-related columns exist before you start running the API.
```
node server.js --populate
```

This command executes the `dbUpdater.js` script, which performs the following actions:
Ensure Reward Columns Exist:
1. It checks the users table for the following columns and adds them if they are missing. This is crucial for the server to function correctly.
        
        WheelSpinsClaimed (INT, DEFAULT 0)
        TwoHoursCounter (INT, DEFAULT 0)
        dailySpinsClaimed (INT, DEFAULT 0)
        EventCurrency (INT, DEFAULT 0)

2. Ensures Player Achievements Table Exists: It creates the `player_achievements` table if it does not already exist. This table tracks which achievements each player has claimed, More on this later.

After running successfully, the script will exit. You can then proceed with the rest of the guide.


### **Admin User Creation**

The `--create-admin` command allows you to create an initial administrator account.

the account will be assigned Grade 7, which is the highest. the grade privileges will allow you to add staff members with grades above 1 and manage  wheel and shop data via the MVO API.
Usage:

node server.js --create-admin <username> <password>

Example:

node server.js --create-admin AdminUser P@ssword123!

Requirements:

    Username: Must be at least 3 characters long and contain only alphanumeric characters (A-Z, a-z, 0-9).
    Password: Must be at least 6 characters long and include at least one non-alphanumeric symbol (e.g., !, @, #, _).



After running successfully, the script will exit. You can then start the server normally.


## Next Steps

After completing the installation:

1. **Explore Features**: Start with the [Features Overview](features-overview.md) to understand all available systems
2. **Configure Items**: Set up your [Event Shop](event-shop.md), [Referral Wheel](referral-wheel.md), and [Daily Chest](daily-chest.md) items
3. **Set Up Achievements**: Configure the [Achievement System](achievements.md) for your players
4. **API Integration**: Review the [API Reference](api-reference/) for integration details

---

## Navigation

**🏠 [Home](README.md)** | **📋 [Features Overview](features-overview.md)** | **⚙️ Configuration** | **📚 [API Reference](api-reference/)**

### Feature Documentation
- **🛒 [Event Shop](event-shop.md)** - Premium currency store
- **🎡 [Referral Wheel](referral-wheel.md)** - Time-gated spinning rewards
- **📦 [Daily Chest](daily-chest.md)** - Frequent playtime rewards
- **🏆 [Achievement System](achievements.md)** - Progression tracking
