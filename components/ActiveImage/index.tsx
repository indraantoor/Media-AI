import { useImageStore } from '@/lib/imageStore';
import { Layer, useLayerStore } from '@/lib/layerStore';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import ImageComparision from '../layers/ImageComparision';

export default function ActiveImage() {
  const generating = useImageStore((state) => state.generating);
  const activeLayer = useLayerStore((state) => state.activeLayer);
  const layers = useLayerStore((state) => state.layers);
  const layerComparisonMode = useLayerStore(
    (state) => state.layerComparisonMode
  );
  const comparedLayers = useLayerStore((state) => state.comparedLayers);

  if (!activeLayer.url && comparedLayers.length == 0) return null;

  const renderLayer = (layer: Layer) => (
    <div className="relative flex h-full w-full items-center justify-center">
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

  if (layerComparisonMode && comparedLayers.length > 0) {
    const comparisionLayers = comparedLayers
      .map((id) => layers.find((l) => l.id === id))
      .filter(Boolean) as Layer[];

    return (
      <div className="relative flex h-svh w-full flex-col items-center justify-center bg-secondary p-24">
        <ImageComparision layers={comparisionLayers} />
      </div>
    );
  }

  return (
    <div className="relative flex h-svh w-full flex-col items-center justify-center bg-secondary p-24">
      {renderLayer(activeLayer)}
    </div>
  );
}
