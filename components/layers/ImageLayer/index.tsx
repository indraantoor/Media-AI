'use client';

import { Layer } from '@/lib/layerStore';
import Image from 'next/image';

export default function ImageLayer({ layer }: { layer: Layer }) {
  if (layer.url && layer.name) {
    return (
      <div className="flex h-12 w-12 items-center justify-center">
        <Image
          className="h-full w-full rounded-sm object-contain"
          alt={layer.name}
          src={layer.format == 'mp4' ? layer.poster || layer.url : layer.url}
          width={50}
          height={50}
        />
        <div>
          <p>
            {layer.name.slice(0, 15)}.${layer.format}
          </p>
        </div>
      </div>
    );
  }
}
