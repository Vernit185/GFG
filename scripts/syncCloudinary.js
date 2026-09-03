import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Read .env
const envPath = path.resolve(__dirname, '../.env');
if (!fs.existsSync(envPath)) {
  console.error('.env file not found!');
  process.exit(1);
}

const envContent = fs.readFileSync(envPath, 'utf8');
const env = {};
envContent.split('\n').forEach(line => {
  const [key, ...rest] = line.trim().split('=');
  if (key && rest.length) {
    env[key.trim()] = rest.join('=').trim().replace(/^["']|["']$/g, '');
  }
});

const cloudName = env.CLOUDINARY_CLOUD_NAME;
const apiKey = env.CLOUDINARY_API;
const apiSecret = env.CLOUDINARY_SECRET;

if (!cloudName || !apiKey || !apiSecret) {
  console.error('Missing Cloudinary credentials in .env!');
  process.exit(1);
}

console.log(`📡 Connecting to Cloudinary (${cloudName})...`);

const authHeader = 'Basic ' + Buffer.from(`${apiKey}:${apiSecret}`).toString('base64');

async function fetchFolderImages(folderName) {
  try {
    const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/resources/search`, {
      method: 'POST',
      headers: {
        'Authorization': authHeader,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        expression: `asset_folder="${folderName}" OR folder="${folderName}"`,
        max_results: 100,
        sort_by: [{ public_id: 'asc' }]
      })
    });

    if (!response.ok) {
      const err = await response.text();
      throw new Error(`Cloudinary API Error: ${response.status} ${err}`);
    }

    const data = await response.json();
    return (data.resources || []).map(r => {
      // Build optimized Cloudinary URL
      const optimizedUrl = r.secure_url.replace('/upload/', '/upload/q_auto,f_auto,w_800,c_limit/');
      return {
        src: optimizedUrl,
        alt: r.public_id || 'Event Photo'
      };
    });
  } catch (err) {
    console.error(`Error fetching folder ${folderName}:`, err.message);
    return [];
  }
}

async function sync() {
  console.log('🔍 Fetching photos from "Websprint" folder...');
  const websprintImages = await fetchFolderImages('Websprint');

  console.log(`✅ Found ${websprintImages.length} images for Websprint.`);

  // Read existing eventsData.js
  const eventsDataPath = path.resolve(__dirname, '../src/data/eventsData.js');
  let currentContent = fs.readFileSync(eventsDataPath, 'utf8');

  // If we found images in Websprint, update the WEBSPRINT pastHighlights event
  if (websprintImages.length > 0) {
    const formattedImages = JSON.stringify(websprintImages, null, 6)
      .replace(/"src":/g, 'src:')
      .replace(/"alt":/g, 'alt:')
      .replace(/"/g, "'");

    const updatedPastHighlights = `export const pastHighlights = [
  {
    id: 1,
    date: 'August 18, 2026',
    title: 'WEBSPRINT',
    images: ${formattedImages}
  },
  {
    id: 2,
    date: 'August 28, 2024',
    title: 'Expert Session with Sandeep Jain',
    images: [
      {
        src: 'https://res.cloudinary.com/dvkwaq6y/image/upload/q_auto,f_auto,w_800,c_limit/v1788413394/IMG_4157.jpg',
        alt: 'Session'
      },
      {
        src: 'https://res.cloudinary.com/dvkwaq6y/image/upload/q_auto,f_auto,w_800,c_limit/v1788413366/IMG_4131.jpg',
        alt: 'Speaker'
      },
      {
        src: 'https://res.cloudinary.com/dvkwaq6y/image/upload/q_auto,f_auto,w_800,c_limit/v1788412995/IMG_4118.jpg',
        alt: 'Audience'
      }
    ]
  }
];`;

    // Replace the pastHighlights section in eventsData.js
    const pastHighlightsRegex = /export const pastHighlights = [\s\S]*?;$/m;
    if (pastHighlightsRegex.test(currentContent)) {
      currentContent = currentContent.replace(pastHighlightsRegex, updatedPastHighlights);
    } else {
      currentContent += '\n\n' + updatedPastHighlights;
    }

    fs.writeFileSync(eventsDataPath, currentContent, 'utf8');
    console.log('🎉 Successfully synced Cloudinary photos into src/data/eventsData.js!');
  } else {
    console.log('⚠️ No images found in Cloudinary folder "Websprint". Keeping existing data.');
  }
}

sync();
