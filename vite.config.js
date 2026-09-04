import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

function cloudinaryDevPlugin() {
  return {
    name: 'cloudinary-dev-api',
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        const url = new URL(req.url, 'http://localhost');
        if (url.pathname === '/api/cloudinary-assets') {
          try {
            const env = loadEnv(process.env.NODE_ENV || 'development', process.cwd(), '');
            const cloudName = env.CLOUDINARY_CLOUD_NAME;
            const apiKey = env.CLOUDINARY_API;
            const apiSecret = env.CLOUDINARY_SECRET;

            if (!cloudName || !apiKey || !apiSecret) {
              res.statusCode = 500;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ success: false, error: 'Missing Cloudinary credentials' }));
              return;
            }

            const folder = url.searchParams.get('folder') || '';
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
              res.statusCode = cldRes.status;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ success: false, error: errText }));
              return;
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

            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ success: true, folder, resources }));
          } catch (error) {
            console.error('Error in /api/cloudinary-assets:', error);
            res.statusCode = 500;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ success: false, error: error.message }));
          }
          return;
        }
        next();
      });
    }
  };
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), cloudinaryDevPlugin()],
  server: {
    port: 3000,
    open: false,
    watch: {
      ignored: ['**/*.mp4', '**/*.mov', '**/*.avi', '**/*.webm', '**/*.mkv']
    }
  }
});
