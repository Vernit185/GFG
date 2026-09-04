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

/**
 * Fetch resources from Cloudinary Search API matching a folder expression
 */
async function fetchFolderResources(folderExpression) {
  try {
    const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/resources/search`, {
      method: 'POST',
      headers: {
        'Authorization': authHeader,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        expression: folderExpression,
        max_results: 500,
        sort_by: [{ public_id: 'asc' }]
      })
    });

    if (!response.ok) {
      const err = await response.text();
      throw new Error(`Cloudinary API Error: ${response.status} ${err}`);
    }

    const data = await response.json();
    return data.resources || [];
  } catch (err) {
    console.error(`Error fetching resources for "${folderExpression}":`, err.message);
    return [];
  }
}

async function fetchAssetFolderResources(folderName) {
  try {
    const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/resources/by_asset_folder?asset_folder=${encodeURIComponent(folderName)}&max_results=500`, {
      headers: { 'Authorization': authHeader }
    });
    if (!response.ok) return [];
    const data = await response.json();
    return data.resources || [];
  } catch (err) {
    return [];
  }
}

function optimizeUrl(resource, width = 1200) {
  if (resource.resource_type === 'video') {
    return resource.secure_url;
  }
  return resource.secure_url.replace('/upload/', `/upload/q_auto,f_auto,w_${width},c_limit/`);
}

function cleanTitle(publicId) {
  const baseName = publicId.split('/').pop() || publicId;
  return baseName
    .replace(/[_-]/g, ' ')
    .replace(/\b\w/g, c => c.toUpperCase());
}

function normalizeKey(str) {
  return (str || '').toLowerCase().replace(/[^a-z0-9]/g, '');
}

async function sync() {
  console.log('\n--- 1. Syncing Home Page folder ---');
  const homeResources = await fetchFolderResources('asset_folder="Home Page" OR folder="Home Page"');
  console.log(`✅ Found ${homeResources.length} assets for Home Page.`);

  // Read galleryConfig if available
  let configDate = 'September 2026';
  try {
    const configPath = path.resolve(__dirname, '../src/data/galleryConfig.js');
    if (fs.existsSync(configPath)) {
      const configCode = fs.readFileSync(configPath, 'utf8');
      const dateTextMatch = configCode.match(/dateText:\s*['"]([^'"]+)['"]/);
      const monthMatch = configCode.match(/month:\s*['"]([^'"]+)['"]/);
      const yearMatch = configCode.match(/year:\s*['"]([^'"]+)['"]/);
      if (dateTextMatch) configDate = dateTextMatch[1];
      else if (monthMatch && yearMatch) configDate = `${monthMatch[1]} ${yearMatch[1]}`;
    }
  } catch (e) {}

  const homePhotos = homeResources
    .filter(r => r.resource_type === 'image')
    .map((r, index) => ({
      id: index + 1,
      title: cleanTitle(r.public_id),
      category: 'Featured',
      description: '',
      image: optimizeUrl(r, 1200),
      date: configDate || new Date(r.created_at).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
    }));

  const galleryDataPath = path.resolve(__dirname, '../src/data/galleryData.js');
  const galleryFileContent = `// Automatically generated from Cloudinary 'Home Page' folder
// Do NOT hardcode generic images. Only genuine assets from Cloudinary are used.
export { homeCarouselConfig } from './galleryConfig';

export const galleryPhotos = ${JSON.stringify(homePhotos, null, 2)};
`;
  fs.writeFileSync(galleryDataPath, galleryFileContent, 'utf8');
  console.log(`📝 Updated ${galleryDataPath}`);

  console.log('\n--- 2. Syncing About Page folder ---');
  const [aboutSearchResources, aboutFolderResources] = await Promise.all([
    fetchFolderResources('asset_folder="About Page" OR folder="About Page"'),
    fetchAssetFolderResources('About Page')
  ]);

  const aboutMap = new Map();
  [...aboutSearchResources, ...aboutFolderResources].forEach(r => {
    if (r.public_id) aboutMap.set(r.public_id, r);
  });
  const aboutResources = Array.from(aboutMap.values());
  console.log(`✅ Found ${aboutResources.length} assets for About Page.`);

  const findMatch = (pattern) => aboutResources.find(r => 
    (r.display_name && pattern.test(r.display_name)) ||
    (r.public_id && pattern.test(r.public_id))
  );

  const oneAsset = findMatch(/^one$/i) || aboutResources.find(r => r.public_id === 'moving_hands');
  const twoAsset = findMatch(/^two$/i) || aboutResources.find(r => r.public_id === 'clsroom');
  const threeAsset = findMatch(/^(three|third)$/i) || aboutResources.find(r => r.public_id.includes('website'));
  const fourAsset = findMatch(/^four$/i) || aboutResources.find(r => r.public_id.includes('professional'));

  const oneUrl = oneAsset ? oneAsset.secure_url : 'https://res.cloudinary.com/dvkwaq6y/video/upload/v1788506272/moving_hands.mp4';
  const twoUrl = twoAsset ? twoAsset.secure_url : 'https://res.cloudinary.com/dvkwaq6y/video/upload/v1788506283/clsroom.mp4';
  const threeUrl = threeAsset ? threeAsset.secure_url : 'https://res.cloudinary.com/dvkwaq6y/video/upload/v1788502882/Animate_image_for_website_202609041145.mp4';
  const fourUrl = fourAsset ? fourAsset.secure_url : 'https://res.cloudinary.com/dvkwaq6y/video/upload/v1788504290/Animate_image_for_professional_w__202609041213.mp4';

  const aboutImages = aboutResources
    .filter(r => r.resource_type === 'image')
    .map(r => ({
      src: optimizeUrl(r, 1200),
      alt: cleanTitle(r.public_id)
    }));

  const aboutDataPath = path.resolve(__dirname, '../src/data/aboutData.js');
  const aboutFileContent = `// Automatically generated from Cloudinary 'About Page' folder
export const aboutAssets = {
  domainGifs: {
    one: '${oneUrl}',
    two: '${twoUrl}',
    three: '${threeUrl}',
    four: '${fourUrl}'
  },
  movingHandsVideo: '${oneUrl}',
  classroomVideo: '${twoUrl}',
  images: ${JSON.stringify(aboutImages, null, 2)}
};
`;
  fs.writeFileSync(aboutDataPath, aboutFileContent, 'utf8');
  console.log(`📝 Updated ${aboutDataPath}`);

  console.log('\n--- 3. Syncing Events Page folders ---');
  const eventResources = await fetchFolderResources('asset_folder="Events Page*" OR folder="Events Page*"');
  console.log(`✅ Found ${eventResources.length} total assets under Events Page.`);

  // Group assets by subfolder name
  const folderImagesMap = {};
  for (const r of eventResources) {
    if (r.resource_type !== 'image') continue;
    const folderPath = r.asset_folder || r.folder || '';
    // e.g. "Events Page/Websprint" -> "Websprint"
    const subfolder = folderPath.replace(/^Events Page\/?/i, '').trim();
    if (!subfolder) continue;

    const normalized = normalizeKey(subfolder);
    if (!folderImagesMap[normalized]) {
      folderImagesMap[normalized] = {
        folderName: subfolder,
        images: []
      };
    }
    folderImagesMap[normalized].images.push({
      src: optimizeUrl(r, 800),
      alt: r.public_id ? r.public_id.split('/').pop() : 'Event Photo'
    });
  }

  // Predefined list of known past highlights with fallback metadata
  const knownHighlights = [
    {
      id: 1,
      date: 'August 18, 2026',
      title: 'WEBSPRINT',
      folder: 'Websprint'
    },
    {
      id: 2,
      date: 'March 21-22, 2026',
      title: 'HACKMATRIX 4.0',
      folder: 'Hack Matrix 4.0'
    },
    {
      id: 3,
      date: 'February 2026',
      title: 'Web dev Bootcamp',
      folder: 'Web Dev bootcamp'
    }
  ];

  const pastHighlights = knownHighlights.map(kh => {
    const key = normalizeKey(kh.folder) || normalizeKey(kh.title);
    const matched = folderImagesMap[key];
    return {
      ...kh,
      images: matched ? matched.images : []
    };
  });

  // Check if there are any additional subfolders from Cloudinary not in knownHighlights
  let nextId = 4;
  for (const [key, data] of Object.entries(folderImagesMap)) {
    const exists = knownHighlights.some(kh => 
      normalizeKey(kh.folder) === key || normalizeKey(kh.title) === key
    );
    if (!exists) {
      pastHighlights.push({
        id: nextId++,
        date: 'Recent Event',
        title: cleanTitle(data.folderName),
        folder: data.folderName,
        images: data.images
      });
    }
  }

  const eventsDataPath = path.resolve(__dirname, '../src/data/eventsData.js');
  let eventsContent = fs.readFileSync(eventsDataPath, 'utf8');

  // Extract upcomingEvents section so we don't clobber it
  const upcomingEventsMatch = eventsContent.match(/export const upcomingEvents = [\s\S]*?\];/);
  const upcomingEventsStr = upcomingEventsMatch 
    ? upcomingEventsMatch[0] 
    : `export const upcomingEvents = [
  {
    id: 1,
    category: 'Hackathon',
    title: 'HACK MATRIX 5.0',
    description: '',
    date: 'Oct 10, 2026',
    location: 'New Reading Hall / Architecture Hall PCCOE',
    registrationLink: '#',
  }
];`;

  const formattedHighlights = JSON.stringify(pastHighlights, null, 2)
    .replace(/"src":/g, 'src:')
    .replace(/"alt":/g, 'alt:')
    .replace(/"id":/g, 'id:')
    .replace(/"date":/g, 'date:')
    .replace(/"title":/g, 'title:')
    .replace(/"folder":/g, 'folder:')
    .replace(/"images":/g, 'images:');

  const newEventsContent = `${upcomingEventsStr}

export const pastHighlights = ${formattedHighlights};
`;

  fs.writeFileSync(eventsDataPath, newEventsContent, 'utf8');
  console.log(`📝 Updated ${eventsDataPath}`);

  // Write snapshot cache
  const snapshotPath = path.resolve(__dirname, '../src/data/cloudinaryAssets.json');
  fs.writeFileSync(snapshotPath, JSON.stringify({
    syncedAt: new Date().toISOString(),
    home: homePhotos,
    about: { domainGifs: { one: oneUrl, two: twoUrl, three: threeUrl, four: fourUrl }, movingHandsVideo: oneUrl, classroomVideo: twoUrl, images: aboutImages },
    events: pastHighlights
  }, null, 2), 'utf8');
  console.log(`📝 Updated ${snapshotPath}`);

  console.log('\n🎉 Cloudinary assets successfully synchronized!');
}

sync();
