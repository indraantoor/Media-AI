'use client';

import { useLayerStore } from '@/lib/layerStore';
import { useState } from 'react';
import ImageUpload from '../ImageUpload';

export default function UploadForm() {
  const activeLayer = useLayerStore((state) => state.activeLayer);
  const [selectedType] = useState<'image' | 'video'>('image');

  if (!activeLayer.url) {
    return (
      <div className="flex h-full w-full flex-col justify-center p-24">
        {selectedType == 'image' ? <ImageUpload /> : null}
      </div>
    );
  }
}
