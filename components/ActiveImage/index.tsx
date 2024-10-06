import { useImageStore } from '@/lib/imageStore';
import { Layer, useLayerStore } from '@/lib/layerStore';
import { cn } from '@/lib/utils';
import Image from 'next/image';

export default function ActiveImage() {
  const generating = useImageStore((state) => state.generating);
  const activeLayer = useLayerStore((state) => state.activeLayer);

  if (!activeLayer.url) return null;

  const renderLayer = (layer: Layer) => (
    <div>
      {layer.resourceType === 'image' && (
        <Image
          src={layer.url!}
          alt={layer.name!}
          fill={true}
          className={cn(
            'rounded-lg object-contain',
            generating ? 'animate-pulse' : ''
          )}
        />
      )}

      {layer.resourceType === 'video' && (
        <video
          width={layer.width}
          height={layer.height}
          controls
          className="max-h-full max-w-full rounded-lg object-contain"
          src={layer.transcriptionURL || layer.url}
        />
      )}
    </div>
  );

  return (
    <div className="relative flex h-svh w-full flex-col items-center justify-center bg-secondary p-24">
      {renderLayer(activeLayer)}
    </div>
  );
}
