import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { useImageStore } from '@/lib/imageStore';
import { useLayerStore } from '@/lib/layerStore';
import { cn } from '@/lib/utils';
import { ArrowRight, Images, Layers2 } from 'lucide-react';
import Image from 'next/image';
import { useMemo } from 'react';
import ImageLayer from '../ImageLayer';
import LayerInfo from '../LayerInfo';

export default function Layers() {
  const layers = useLayerStore((state) => state.layers);
  const activeLayer = useLayerStore((state) => state.activeLayer);
  const setActiveLayer = useLayerStore((state) => state.setActiveLayer);
  const generating = useImageStore((state) => state.generating);
  const addLayer = useLayerStore((state) => state.addLayer);
  const layerComparisonMode = useLayerStore(
    (state) => state.layerComparisonMode
  );
  const setLayerComparisionMode = useLayerStore(
    (state) => state.setLayerComparisonMode
  );
  const comparedLayers = useLayerStore((state) => state.comparedLayers);
  const toggleComparedLayer = useLayerStore(
    (state) => state.toggleComparedLayer
  );
  const setComparedLayers = useLayerStore((state) => state.setComparedLayers);

  const getLayerName = useMemo(
    () => (id: string) => {
      const layer = layers.find((layer) => layer.id === id);
      return layer ? layer.url : 'Nothing more';
    },
    [layers]
  );

  const visibleLayers = useMemo(
    () =>
      layerComparisonMode
        ? layers.filter((layer) => layer.url && layer.resourceType === 'image')
        : layers,
    [layerComparisonMode, layers]
  );

  return (
    <Card className="scrollbar-thin scrollbar-track-secondary scrollbar-thumb-primary scrollbar-thumb-rounded-full scrollbar-track-rounded-full relative flex shrink-0 basis-[360px] flex-col overflow-x-hidden overflow-y-scroll shadow-2xl">
      <CardHeader className="sticky top-0 z-50 min-h-24 bg-card px-4 py-6 shadow-sm">
        {layerComparisonMode ? (
          <div>
            <CardTitle className="text-sm">Comparing...</CardTitle>
            <CardDescription className="flex items-center gap-2">
              <Image
                alt="compare"
                width={32}
                height={32}
                src={getLayerName(comparedLayers[0]) as string}
              />
              {comparedLayers.length > 0 && <ArrowRight />}
              {comparedLayers.length > 1 ? (
                <Image
                  alt="compare"
                  width={32}
                  height={32}
                  src={getLayerName(comparedLayers[1]) as string}
                />
              ) : (
                'Nothing here'
              )}
            </CardDescription>
          </div>
        ) : null}

        <div>
          <CardTitle className="text-sm">
            {activeLayer.name || 'Layers'}
          </CardTitle>
          {activeLayer.width && activeLayer.height ? (
            <CardDescription>
              {activeLayer.width} x {activeLayer.height}
            </CardDescription>
          ) : null}
        </div>
      </CardHeader>

      <CardContent className="flex flex-1 flex-col">
        {visibleLayers.map((layer, index) => (
          <div
            key={layer.id}
            className={cn(
              'cursor-pointer border border-transparent ease-in-out hover:bg-secondary',
              {
                'animate-pulse': generating,
                'border-primary': layerComparisonMode
                  ? comparedLayers.includes(layer.id)
                  : activeLayer.id === layer.id,
              }
            )}
            onClick={() => {
              if (generating) return;

              if (layerComparisonMode) {
                toggleComparedLayer(layer.id);
              } else {
                setActiveLayer(layer.id);
              }
            }}
          >
            <div className="relative flex items-center p-4">
              <div className="flex h-8 w-full items-center justify-between gap-2">
                {!layer.url ? (
                  <p className="justify-self-end text-xs font-medium">
                    New Layer
                  </p>
                ) : null}

                <ImageLayer layer={layer} />
                <LayerInfo layer={layer} layerIndex={index} />
              </div>
            </div>
          </div>
        ))}
      </CardContent>

      <div className="sticky bottom-0 flex shrink-0 gap-2 bg-card p-4">
        <Button
          onClick={() => {
            addLayer({
              id: crypto.randomUUID(),
              url: '',
              height: 0,
              width: 0,
              publicId: '',
              name: '',
              format: '',
            });
          }}
          className="flex w-full gap-2"
          variant={'outline'}
        >
          <span>Create Layer</span>
          <Layers2 size={18} className="text-secondary-foreground" />
        </Button>

        <Button
          disabled={!activeLayer.url || activeLayer.resourceType == 'video'}
          onClick={() => {
            if (layerComparisonMode) {
              setLayerComparisionMode(!layerComparisonMode);
            } else {
              setComparedLayers([activeLayer.id]);
            }
          }}
          className="flex items-center gap-2"
          variant="outline"
        >
          <span>
            {layerComparisonMode ? 'Stop Comparing' : 'Compare Layers'}
          </span>
          {!layerComparisonMode && (
            <Images size={14} className="text-secondary-foreground" />
          )}
        </Button>
      </div>
    </Card>
  );
}
