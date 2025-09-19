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
#### Environment Variables

The server is configured using a .env file. Create this file by copying the provided .env.example and filling in the values.
    
    <SNIP>
    DB_X:  variables to handle database connection
    USER_JWT_SECRET: A secret key for signing JSON Web Tokens (JWTs) for regular users.
    ADMIN_JWT_SECRET: A secret key for signing JWTs for admin/staff users.
    EMU_JWT_SECRET: The same JWT secret used by the Microvolts Emulator's web server.
    EMU_API_URL: The base URL for the Microvolts Emulator API (e.g., http://localhost:8080/api).
    DAILY_PLAYTIME_DRAW_TRIGGER: The number of hours a player must be playing to be eligible for a daily playtime reward. Default is 2 hours.
    WHEEL_DRAW_TRIGGER: The number of hours a player must complete to earn one spin on the wheel. Default is 160 hours.

after editing, rename `.env.example` to `.env`

---
Command-Line Option Details
To run the server or execute specific scripts, use the node server.js command followed by the desired options.
```
node server.js [--populate] [--create-admin <username> <password>] [--help]

Options

    --populate:(REQUIRED) Run DB migrations/updates before starting.
    --cache-reset: (Optional) Updates the cached itemsinfo file after changing ItemInfo.json.
    --create-admin (Optional) <username> <password>: Create initial admin user.
    --generate-achievements: (Optional) Runs the generateAchievementData.js script.
    --generate-chest: (Optional) : Runs the generateDailyChestItems.js script.
    --help: Show this help message.
```
---

This section provides more detailed information on specific command-line options.
--populate (Database Setup)

The --populate command is a one-time setup step that prepares your database. It should be run before the first server startup or after significant database schema changes.

Usage:

node server.js --populate

This command executes the dbUpdater.js script, which performs the following actions:

    Ensures Reward Columns Exist: It checks the users table for the following columns and adds them if they are missing. This is crucial for the server to function correctly.
        WheelSpinsClaimed (INT, DEFAULT 0)
        TwoHoursCounter (INT, DEFAULT 0)
        dailySpinsClaimed (INT, DEFAULT 0)
        EventCurrency (INT, DEFAULT 0)

    Ensures Player Achievements Table Exists: It creates the player_achievements table if it does not already exist. This table tracks which achievements each player has claimed.

After running successfully, the script will exit. You can then proceed with the rest of the guide.

---

### admin user creation

The `--create-admin` command allows you to create an initial administrator account.

the account will be assigned Grade 7, which is the highest. the grade privileges will allow you to add staff members with grades above 1 and manage  wheel and shop data via the MVO API.
Usage:

node server.js --create-admin <username> <password>

Example:

node server.js --create-admin AdminUser P@ssword123!

Requirements:

    Username: Must be at least 3 characters long and contain only alphanumeric characters (A-Z, a-z, 0-9).
    Password: Must be at least 6 characters long and include at least one non-alphanumeric symbol (e.g., !, @, #, _).

---
### Configuring wheel and shop items:
you can add wheel rewards or shop items via the API or by manually modifying the `/data/config` files. more on this can be found in [data configuration](api-reference/configuration.md)
