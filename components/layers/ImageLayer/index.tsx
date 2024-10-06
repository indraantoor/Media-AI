'use client';

import { Layer } from '@/lib/layerStore';
import Image from 'next/image';

export default function ImageLayer({ layer }: { layer: Layer }) {
  if (layer.url && layer.name) {
    return (
      <div className="flex h-12 w-full items-center gap-2">
        <Image
          className="h-full w-full max-w-12 rounded-sm object-contain"
          alt={layer.name}
          src={layer.format == 'mp4' ? layer.poster || layer.url : layer.url}
          width={50}
          height={50}
        />
        <div>
          <p className="text-sm">
            {layer.name.slice(0, 8)}.{layer.format}
          </p>
        </div>
      </div>
    );
  }
}
