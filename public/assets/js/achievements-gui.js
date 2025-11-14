// Achievement GUI JavaScript
class AchievementGUI {
    constructor() {
        this.achievements = [];
        this.currentAchievement = null;
        this.init();
    }

    async init() {
        await this.loadIconsInfo();
        await this.loadAchievements();
        this.renderAchievements();
        this.updateStats();
    }

    async loadIconsInfo() {
        try {
            // Load icons info
            const iconsResponse = await fetch('/data/SRC_JSON_FILES/iconsInfo.json');
            const iconsData = await iconsResponse.json();
            this.iconsInfo = {};
            
            // Create a lookup map for faster access
            iconsData.forEach(icon => {
                this.iconsInfo[icon.ii_id] = icon;
            });
            
            console.log('Loaded icons info:', Object.keys(this.iconsInfo).length, 'icons');
            
            // Load items info for itemId -> iconId mapping
            const itemsResponse = await fetch('/data/items.transformed.json');
            const itemsData = await itemsResponse.json();
            this.itemsInfo = {};
            
            // Create itemId -> iconId lookup map
            itemsData.forEach(item => {
                if (item.itemId && item.iconId) {
                    this.itemsInfo[item.itemId] = item;
                }
            });
            
            console.log('Loaded items info:', Object.keys(this.itemsInfo).length, 'items');
        } catch (error) {
            console.error('Failed to load icons/items info:', error);
            this.iconsInfo = {};
            this.itemsInfo = {};
        }
    }

    async loadAchievements() {
        try {
            console.log('Loading achievements...');
            const response = await fetch('/api/achievements/self');
            console.log('Response status:', response.status);
            
            if (!response.ok) {
                console.error('Response not OK:', response.status, response.statusText);
                const errorText = await response.text();
                console.error('Error response:', errorText);
                this.achievements = [];
                return;
            }
            
            const data = await response.json();
            console.log('Achievement data:', data);
            
            if (data.success && data.achievements) {
                this.achievements = data.achievements;
                console.log('Loaded achievements count:', this.achievements.length);
                console.log('Sample achievement:', this.achievements[0]);
            } else {
                console.error('API returned unsuccessful response:', data);
                this.achievements = [];
            }
        } catch (error) {
            console.error('Failed to load achievements:', error);
            this.achievements = [];
        }
    }

    renderAchievements() {
        const grid = document.getElementById('achievements-grid');
        grid.innerHTML = '';

        if (this.achievements.length === 0) {
            grid.innerHTML = '<div style="grid-column: 1/-1; text-align: center; padding: 40px; color: #666;">No achievements found. Check console for errors.</div>';
            return;
        }

        this.achievements.forEach((achievement) => {
            const box = this.createAchievementBox(achievement);
            grid.appendChild(box);
        });
    }

    createAchievementBox(achievement) {
        const box = document.createElement('div');
        box.className = 'achievement-box';

        // Determine achievement state and styling
        const state = this.getAchievementState(achievement);
        box.classList.add(state);

        // Add frame styling based on achievement type and level
        if (achievement.slug && (achievement.slug.includes('level') || achievement.name.includes('Level'))) {
            box.classList.add('level-achievement');
        } else if (achievement.slug && achievement.slug.includes('kill')) {
            box.classList.add('weapon-achievement');
            // Add difficulty-based frame for weapon achievements
            const level = this.getAchievementLevel(achievement);
            if (level) {
                box.classList.add(`level-${level}`);
            }
        } else {
            // Default frame for other achievements
            box.classList.add('level-1');
        }

        // Create icon container
        const icon = document.createElement('div');
        icon.className = 'achievement-icon';

        // Add base achievement icon
        let baseIcon = null;
        
        if (achievement.iconId && this.iconsInfo) {
            // Use specific achievement icon if available
            const iconInfo = this.getIconInfo(achievement.iconId);
            if (iconInfo) {
                baseIcon = this.createIconFromSpriteSheet(iconInfo);
            }
        }
        
        // If no specific icon, create a default achievement icon
        if (!baseIcon) {
            baseIcon = this.createDefaultAchievementIcon(achievement);
        }
        
        if (baseIcon) {
            baseIcon.className = 'achievement-base-icon';
            icon.appendChild(baseIcon);
        }

        // Add appropriate overlay based on state
        if (state === 'locked') {
            // For locked achievements, replace the icon entirely with a lock
            icon.innerHTML = ''; // Clear any existing content
            icon.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
            icon.style.display = 'flex';
            icon.style.alignItems = 'center';
            icon.style.justifyContent = 'center';
            
            const lockImg = document.createElement('img');
            lockImg.src = '/assets/locked.jpg';
            lockImg.style.width = '32px';
            lockImg.style.height = '32px';
            lockImg.style.objectFit = 'contain';
            icon.appendChild(lockImg);
        } else if (state === 'unlocked') {
            const overlay = document.createElement('div');
            overlay.className = 'achievement-overlay';
            overlay.style.display = 'flex';
            overlay.style.alignItems = 'center';
            overlay.style.justifyContent = 'center';
            const claimableImg = document.createElement('img');
            claimableImg.src = '/assets/claimable.gif';
            claimableImg.style.width = '40px';
            claimableImg.style.height = '40px';
            claimableImg.style.objectFit = 'contain';
            overlay.appendChild(claimableImg);
            icon.appendChild(overlay);
        }
        // For claimed state, just show the base icon without overlay

        box.appendChild(icon);

        // Add click handler
        box.addEventListener('click', () => this.openAchievementModal(achievement));

        return box;
    }
    getAchievementState(achievement) {
        return achievement.state || 'locked';
    }

    getAchievementLevel(achievement) {
        // Extract level from achievement slug or name
        const slug = achievement.slug || '';
        const name = achievement.name || '';

        // For level-up achievements
        if (slug.includes('level-up') || name.includes('Level Up')) {
            const levelMatch = slug.match(/level-up-(\d+)/) || name.match(/Level Up (\d+)/);
            if (levelMatch) {
                const level = parseInt(levelMatch[1]);
                if (level <= 20) return 1;
                if (level <= 40) return 2;
                if (level <= 60) return 3;
                if (level <= 80) return 4;
                return 5;
            }
        }

        // For kill-based achievements
        if (slug.includes('kill') || name.includes('Kill')) {
            if (slug.includes('-1') || name.includes(' 1')) return 1;
            if (slug.includes('-2') || name.includes(' 2')) return 2;
            if (slug.includes('-3') || name.includes(' 3')) return 3;
            return 1;
        }

        return 1; // Default level
    }



    getLevelFromAchievement(achievement) {
        const slug = achievement.slug || '';
        const name = achievement.name || '';

        // Extract level number from slug or name
        const levelMatch = slug.match(/level-up-(\d+)/) || name.match(/Level Up (\d+)/);
        if (levelMatch) {
            return parseInt(levelMatch[1], 10);
        }
        return 1; // Default to level 1
    }

    getSpritePosition(level) {
        // Level icons are arranged from left to right, levels 0 to 105
        // Level 0 = offset 0, Level 1 = offset 1, etc.
        const offset = level;

        // Assuming 32x32 icons arranged in a grid (same as test-sprites.html)
        const iconSize = 32;
        const cols = 16; // Common sprite sheet layout (16 icons per row)

        const col = offset % cols;
        const row = Math.floor(offset / cols);

        return {
            x: col * iconSize,
            y: row * iconSize,
            offset: offset
        };
    }



    updateStats() {
        const total = this.achievements.length;
        const unlocked = this.achievements.filter(a => a.state === 'unlocked' || a.state === 'claimed').length;
        const collected = this.achievements.filter(a => a.state === 'claimed').length;

        document.getElementById('total-count').textContent = total;
        document.getElementById('total-count-2').textContent = total;
        document.getElementById('unlocked-count').textContent = unlocked;
        document.getElementById('collected-count').textContent = collected;
    }

    openAchievementModal(achievement) {
        this.currentAchievement = achievement;

        // Populate modal content
        document.getElementById('modal-title').textContent = achievement.name || 'Unknown Achievement';
        document.getElementById('modal-description').textContent = achievement.description || 'No description available';

        // Set achievement icon using the same logic as achievement boxes
        const modalIconContainer = document.querySelector('.achievement-icon-large');
        modalIconContainer.innerHTML = '';
        
        let modalIcon = null;
        
        if (achievement.iconId && this.iconsInfo) {
            // Use specific achievement icon if available
            const iconInfo = this.getIconInfo(achievement.iconId);
            if (iconInfo) {
                modalIcon = this.createIconFromSpriteSheet(iconInfo);
            }
        }
        
        // If no specific icon, create a default achievement icon
        if (!modalIcon) {
            if (achievement.slug && achievement.slug.includes('level')) {
                // For level achievements, create a larger level icon
                const level = this.getLevelFromAchievement(achievement);
                modalIcon = this.createLevelIcon(level);
                modalIcon.style.width = '80px';
                modalIcon.style.height = '80px';
            } else {
                modalIcon = this.createDefaultAchievementIcon(achievement);
            }
        }
        
        if (modalIcon) {
            modalIconContainer.appendChild(modalIcon);
        }

        // Populate requirements
        const requirementsList = document.getElementById('modal-requirements');
        requirementsList.innerHTML = '';
        if (achievement.requirements) {
            Object.entries(achievement.requirements).forEach(([key, value]) => {
                const li = document.createElement('li');
                li.textContent = `${key}: ${value}`;
                requirementsList.appendChild(li);
            });
        }

        // Populate rewards
        const rewardsGrid = document.getElementById('modal-rewards');
        rewardsGrid.innerHTML = '';
        if (achievement.rewards && Array.isArray(achievement.rewards)) {
            achievement.rewards.forEach(reward => {
                const rewardItem = this.createRewardItem(reward);
                rewardsGrid.appendChild(rewardItem);
            });
        }

        // Update progress bar and button
        const progress = achievement.overallPercent || 0;
        document.getElementById('modal-progress').style.width = `${progress}%`;
        document.getElementById('modal-progress-text').textContent = `${Math.floor(progress)}/100`;

        // Show/hide and style claim button
        const claimBtn = document.getElementById('claim-btn');
        if (achievement.state === 'unlocked') {
            claimBtn.classList.add('claimable');
            claimBtn.disabled = false;
            claimBtn.textContent = 'Collect';
        } else if (achievement.state === 'claimed') {
            claimBtn.disabled = true;
            claimBtn.textContent = 'Collected';
            claimBtn.classList.remove('claimable');
        } else {
            claimBtn.disabled = true;
            claimBtn.textContent = 'Collect';
            claimBtn.classList.remove('claimable');
        }

        // Show modal
        document.getElementById('achievement-modal').classList.remove('hidden');
    }

    async claimAchievement() {
        if (!this.currentAchievement) return;

        const claimBtn = document.getElementById('claim-btn');
        claimBtn.disabled = true;
        claimBtn.textContent = 'Claiming...';

        try {
            const response = await fetch('/api/achievements/claim', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    achievementSlug: this.currentAchievement.slug
                })
            });

            const result = await response.json();

            if (result.success) {
                // Update achievement status
                this.currentAchievement.state = 'claimed';

                // Refresh the display
                this.renderAchievements();
                this.updateStats();

                // Close modal
                this.closeModal();

                // Show success message
                alert('Achievement claimed successfully!');
            } else {
                alert(result.message || 'Failed to claim achievement');
                claimBtn.disabled = false;
                claimBtn.textContent = 'Claim Reward';
            }
        } catch (error) {
            console.error('Error claiming achievement:', error);
            alert('Error claiming achievement. Please try again.');
            claimBtn.disabled = false;
            claimBtn.textContent = 'Claim Reward';
        }
    }

    createRewardItem(reward) {
        const rewardItem = document.createElement('div');
        rewardItem.className = 'reward-item';

        // Add quantity badge if present (positioned at top-left)
        if (reward.quantity && reward.quantity > 1) {
            const quantityBadge = document.createElement('div');
            quantityBadge.className = 'reward-quantity';
            quantityBadge.textContent = reward.quantity;
            rewardItem.appendChild(quantityBadge);
        }

        // Create icon container
        const iconContainer = document.createElement('div');
        iconContainer.className = 'reward-icon';

        // Create reward icon based on item type
        const iconImg = this.createRewardIcon(reward);
        iconContainer.appendChild(iconImg);

        // Create name label (optional, can be hidden for cleaner look)
        const nameLabel = document.createElement('div');
        nameLabel.className = 'reward-name';
        nameLabel.textContent = reward.itemName || 'Item';

        rewardItem.appendChild(iconContainer);
        rewardItem.appendChild(nameLabel);

        return rewardItem;
    }

    createRewardIcon(reward) {
        console.log('Creating reward icon for:', reward);
        
        // Use the proper itemId -> iconId -> icon lookup chain
        if (reward.itemId && this.iconsInfo && this.itemsInfo) {
            console.log(`Looking for icon with itemId: ${reward.itemId}`);
            const iconInfo = this.getIconInfo(reward.itemId);
            if (iconInfo) {
                console.log('Found icon info:', iconInfo);
                return this.createIconFromSpriteSheet(iconInfo);
            }
        }
        
        // Return placeholder if no icon found
        const iconDiv = document.createElement('div');
        iconDiv.style.width = '100%';
        iconDiv.style.height = '100%';
        iconDiv.style.backgroundColor = '#2d3748';
        iconDiv.style.border = '1px solid #4a5568';
        iconDiv.style.display = 'flex';
        iconDiv.style.alignItems = 'center';
        iconDiv.style.justifyContent = 'center';
        iconDiv.style.fontSize = '8px';
        iconDiv.style.color = '#a0aec0';
        iconDiv.textContent = reward.itemId ? `#${reward.itemId}` : '?';
        iconDiv.title = `Item ID: ${reward.itemId} (No icon found)`;
        
        return iconDiv;
    }

    createIconFromSpriteSheet(iconInfo) {
        const iconDiv = document.createElement('div');
        iconDiv.style.width = '100%';
        iconDiv.style.height = '100%';
        
        // Use the converted PNG files
        const pngFilename = iconInfo.ii_filename.replace('.dds', '.png');
        iconDiv.style.backgroundImage = `url(/icons/${pngFilename})`;
        
        // Calculate sprite position based on offset
        const spriteWidth = iconInfo.ii_width || 102;
        const spriteHeight = iconInfo.ii_height || 84;
        const offset = iconInfo.ii_offset || 0;
        
        // Assuming a standard grid layout (adjust as needed)
        const cols = Math.floor(512 / spriteWidth); // Assuming 512px wide sprite sheets
        const col = offset % cols;
        const row = Math.floor(offset / cols);
        
        iconDiv.style.backgroundPosition = `-${col * spriteWidth}px -${row * spriteHeight}px`;
        iconDiv.style.backgroundSize = `${cols * spriteWidth}px auto`;
        iconDiv.style.backgroundRepeat = 'no-repeat';
        
        // Add fallback styling in case image doesn't load
        iconDiv.style.backgroundColor = '#2d3748';
        iconDiv.style.border = '1px solid #4a5568';
        
        // Add a title for debugging
        iconDiv.title = `Icon: ${iconInfo.ii_filename} (ID: ${iconInfo.ii_id})`;
        
        return iconDiv;
    }

    createDefaultAchievementIcon(achievement) {
        const iconDiv = document.createElement('div');
        iconDiv.style.width = '100%';
        iconDiv.style.height = '100%';
        iconDiv.style.display = 'flex';
        iconDiv.style.alignItems = 'center';
        iconDiv.style.justifyContent = 'center';
        iconDiv.style.backgroundColor = '#2d3748';
        iconDiv.style.border = '1px solid #4a5568';
        iconDiv.style.borderRadius = '4px';

        if (achievement.slug && achievement.slug.includes('level')) {
            // For level achievements, use the level icon sprite
            const level = this.getLevelFromAchievement(achievement);
            return this.createLevelIcon(level);
        }

        // For non-level achievements, try to use iconId
        if (achievement.iconId && this.iconsInfo) {
            const iconInfo = this.getIconInfo(achievement.iconId);
            if (iconInfo) {
                return this.createIconFromSpriteSheet(iconInfo);
            }
        }

        // Fallback for other achievements or if icon lookup fails
        const img = document.createElement('img');
        img.style.width = '80%';
        img.style.height = '80%';
        img.style.objectFit = 'contain';

        let iconPath = '/assets/rifle.png'; // Default icon
        if (achievement.slug) {
            if (achievement.slug.includes('mp') || achievement.name.includes('MP')) {
                iconPath = '/assets/currency_MP1.png';
            } else if (achievement.slug.includes('rt') || achievement.name.includes('RT')) {
                iconPath = '/assets/currency_RT.png';
            }
        }

        img.src = iconPath;
        img.title = `Achievement: ${achievement.name}`;
        iconDiv.appendChild(img);
        return iconDiv;
    }

    createLevelIcon(level) {
        // Super-defensive parsing
        const numericLevel = parseInt(level, 10);
        if (isNaN(numericLevel)) {
            console.error('Invalid level provided to createLevelIcon:', level);
            const errorDiv = document.createElement('div');
            errorDiv.textContent = '?';
            return errorDiv;
        }

        const baseIconId = 90001200;
        const iconId = baseIconId + numericLevel;
        console.log(`Creating level icon for level ${numericLevel}, base: ${baseIconId}, result iconId: ${iconId}`);
        
        if (this.iconsInfo && this.iconsInfo[iconId]) {
            const iconInfo = this.iconsInfo[iconId];
            console.log('Found icon info for level', numericLevel, iconInfo);
            return this.createIconFromSpriteSheet(iconInfo);
        }

        console.warn(`No icon info found for level ${numericLevel} (iconId: ${iconId}). Falling back to old method.`);
        // Fallback to the old method if the icon isn't in iconsinfo.json
        const iconDiv = document.createElement('div');
        iconDiv.style.width = '100%';
        iconDiv.style.height = '100%';
        iconDiv.style.backgroundImage = 'url(/assets/level_icons.png)';
        iconDiv.style.backgroundRepeat = 'no-repeat';
        iconDiv.style.imageRendering = 'pixelated';
        
        // Get sprite position for this level
        const pos = this.getSpritePosition(numericLevel);
        iconDiv.style.backgroundPosition = `-${pos.x}px -${pos.y}px`;
        
        // Set background size dynamically based on actual image dimensions
        this.setDynamicBackgroundSize(iconDiv);
        
        iconDiv.title = `Level ${numericLevel} Achievement`;
        
        return iconDiv;
    }

    setDynamicBackgroundSize(iconDiv) {
        // Create a temporary image to get actual dimensions - same as test-sprites.html
        const testImg = new Image();
        testImg.onload = function() {
            // Update background-size based on actual image dimensions
            iconDiv.style.backgroundSize = `${this.naturalWidth}px ${this.naturalHeight}px`;
        };
        testImg.onerror = function() {
            // Fallback to auto if image fails to load
            iconDiv.style.backgroundSize = 'auto auto';
        };
        testImg.src = '/assets/level_icons.png';
        
        // Set initial background size to auto (same as test-sprites.html)
        iconDiv.style.backgroundSize = 'auto auto';
    }



    getIconInfo(itemId) {
        if (!this.iconsInfo || !this.itemsInfo || !itemId) {
            console.log('getIconInfo: Missing data or itemId', { 
                iconsInfo: !!this.iconsInfo, 
                itemsInfo: !!this.itemsInfo, 
                itemId 
            });
            return null;
        }
        
        // Step 1: Look up itemId in items to get iconId
        const itemInfo = this.itemsInfo[itemId];
        if (!itemInfo || !itemInfo.iconId) {
            console.log(`getIconInfo: No item found for itemId ${itemId} or no iconId`);
            return null;
        }
        
        // Step 2: Look up iconId in icons to get icon info
        const iconInfo = this.iconsInfo[itemInfo.iconId];
        if (!iconInfo) {
            console.log(`getIconInfo: No icon found for iconId ${itemInfo.iconId} (from itemId ${itemId})`);
            return null;
        }
        
        console.log(`getIconInfo: Found icon for itemId ${itemId} -> iconId ${itemInfo.iconId}`, iconInfo);
        return iconInfo;
    }

    closeModal() {
        document.getElementById('achievement-modal').classList.add('hidden');
        this.currentAchievement = null;
    }
}

// Global functions for modal
function closeModal() {
    if (window.achievementGUI) {
        window.achievementGUI.closeModal();
    }
}

function claimAchievement() {
    if (window.achievementGUI) {
        window.achievementGUI.claimAchievement();
    }
}

// Initialize when page loads
document.addEventListener('DOMContentLoaded', () => {
    window.achievementGUI = new AchievementGUI();
});

// Close modal when clicking outside
document.addEventListener('click', (e) => {
    const modal = document.getElementById('achievement-modal');
    if (e.target === modal) {
        closeModal();
    }
});