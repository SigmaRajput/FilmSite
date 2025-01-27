const fs = require('fs').promises;
const path = require('path');

// Configuration
const config = {
    imageDirectory: path.join(__dirname, '../assets/images'),
    supportedFormats: ['.jpg', '.jpeg', '.png', '.gif', '.webp'],
    cacheTimeout: 2000 // 2 seconds
};

let imageCache = null;
let lastCacheTime = 0;

async function getImages(req, res) {
    try {
        const currentTime = Date.now();
        
        // Return cached results if valid
        if (imageCache && (currentTime - lastCacheTime < config.cacheTimeout)) {
            return res.json(imageCache);
        }

        // Read directory
        const files = await fs.readdir(config.imageDirectory);
        
        // Filter and map image files
        const images = files
            .filter(file => {
                const ext = path.extname(file).toLowerCase();
                return config.supportedFormats.includes(ext);
            })
            .map(filename => ({
                filename,
                alt: path.parse(filename).name,
                path: `/assets/images/${filename}`,
                timestamp: Date.now()
            }));

        // Update cache
        imageCache = images;
        lastCacheTime = currentTime;

        // Send response
        res.json(images);

    } catch (error) {
        console.error('Error reading images:', error);
        res.status(500).json({ 
            error: 'Failed to load images',
            details: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
}

module.exports = getImages;