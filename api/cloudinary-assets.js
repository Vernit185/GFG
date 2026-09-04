// Serverless function for Vercel/Netlify environments
export default async function handler(req, res) {
  try {
    const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
    const apiKey = process.env.CLOUDINARY_API;
    const apiSecret = process.env.CLOUDINARY_SECRET;

    if (!cloudName || !apiKey || !apiSecret) {
      return res.status(500).json({ success: false, error: 'Missing Cloudinary credentials' });
    }

    const { folder = '' } = req.query || {};
    const expression = folder 
      ? `asset_folder="${folder}*" OR folder="${folder}*"`
      : '';

    const authHeader = 'Basic ' + Buffer.from(`${apiKey}:${apiSecret}`).toString('base64');
    const cldRes = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/resources/search`, {
      method: 'POST',
      headers: {
        'Authorization': authHeader,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        expression,
        max_results: 500,
        sort_by: [{ public_id: 'asc' }]
      })
    });

    if (!cldRes.ok) {
      const errText = await cldRes.text();
      return res.status(cldRes.status).json({ success: false, error: errText });
    }

    const data = await cldRes.json();
    const resources = (data.resources || []).map(r => {
      const optimizedUrl = r.resource_type === 'video'
        ? r.secure_url
        : r.secure_url.replace('/upload/', '/upload/q_auto,f_auto,w_1200,c_limit/');
      const alt = r.public_id ? r.public_id.split('/').pop().replace(/[_-]/g, ' ') : 'Asset';
      return {
        id: r.asset_id || r.public_id,
        publicId: r.public_id,
        folder: r.asset_folder || r.folder || '',
        src: optimizedUrl,
        url: r.secure_url,
        alt,
        title: alt,
        format: r.format,
        resourceType: r.resource_type,
        createdAt: r.created_at
      };
    });

    return res.status(200).json({ success: true, folder, resources });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
}
