import { useState, useEffect } from 'react';
import { homeCarouselConfig } from '../data/galleryConfig';

function normalizeKey(str) {
  return (str || '').toLowerCase().replace(/[^a-z0-9]/g, '');
}

/**
 * Hook to dynamically fetch Home Page photos from Cloudinary.
 * Fallback to pre-synced initialPhotos.
 */
export function useCloudinaryHome(initialPhotos = []) {
  const [photos, setPhotos] = useState(initialPhotos);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let isMounted = true;

    async function fetchHomeAssets() {
      try {
        setLoading(true);
        const res = await fetch('/api/cloudinary-assets?folder=Home Page');
        if (!res.ok) return;

        const data = await res.json();
        if (isMounted && data.success && Array.isArray(data.resources)) {
          const imageResources = data.resources.filter(r => r.resourceType === 'image');
          const defaultDate = homeCarouselConfig.dateText || 
            (homeCarouselConfig.month && homeCarouselConfig.year 
              ? `${homeCarouselConfig.month} ${homeCarouselConfig.year}` 
              : '');

          const mapped = imageResources.map((r, idx) => {
            const existing = initialPhotos.find(p => p.image === r.src || (r.src && p.image.includes(r.src.split('/').pop())));
            return {
              id: r.id || idx + 1,
              title: existing && existing.title ? existing.title : (r.title || 'Highlight'),
              category: existing && existing.category ? existing.category : (r.category || homeCarouselConfig.category || 'Featured'),
              description: existing && existing.description ? existing.description : '',
              image: r.src,
              date: defaultDate || (r.createdAt
                ? new Date(r.createdAt).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
                : '')
            };
          });
          setPhotos(mapped);
        }
      } catch (err) {
        // Silently use pre-synced data
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    fetchHomeAssets();

    return () => {
      isMounted = false;
    };
  }, []);

  return { photos, loading };
}

/**
 * Hook to dynamically fetch Events Page photos from Cloudinary.
 * Maps subfolders (e.g. 'Websprint', 'Hack Matrix 4.0') to respective event highlights.
 */
export function useCloudinaryEvents(initialHighlights = []) {
  const [highlights, setHighlights] = useState(initialHighlights);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let isMounted = true;

    async function fetchEventAssets() {
      try {
        setLoading(true);
        const res = await fetch('/api/cloudinary-assets?folder=Events Page');
        if (!res.ok) return;

        const data = await res.json();
        if (isMounted && data.success && Array.isArray(data.resources)) {
          const folderImagesMap = {};

          for (const r of data.resources) {
            if (r.resourceType !== 'image') continue;
            const folderPath = r.folder || '';
            const subfolder = folderPath.replace(/^Events Page\/?/i, '').trim();
            if (!subfolder) continue;

            const key = normalizeKey(subfolder);
            if (!folderImagesMap[key]) {
              folderImagesMap[key] = {
                folderName: subfolder,
                images: []
              };
            }
            folderImagesMap[key].images.push({
              src: r.src,
              alt: r.alt || 'Event Photo'
            });
          }

          // Update initial highlights with live photos
          const updated = initialHighlights.map(h => {
            const key = normalizeKey(h.folder) || normalizeKey(h.title);
            const matched = folderImagesMap[key];
            return {
              ...h,
              images: matched ? matched.images : []
            };
          });

          // Also discover any newly added subfolders not currently in initialHighlights
          let nextId = updated.length + 1;
          for (const [key, folderData] of Object.entries(folderImagesMap)) {
            const exists = initialHighlights.some(h =>
              normalizeKey(h.folder) === key || normalizeKey(h.title) === key
            );
            if (!exists) {
              updated.push({
                id: nextId++,
                date: 'Recent Event',
                title: folderData.folderName,
                folder: folderData.folderName,
                images: folderData.images
              });
            }
          }

          setHighlights(updated);
        }
      } catch (err) {
        // Silently use pre-synced highlights
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    fetchEventAssets();

    return () => {
      isMounted = false;
    };
  }, []);

  return { highlights, loading };
}
