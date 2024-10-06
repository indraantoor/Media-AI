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
import { Layers2 } from 'lucide-react';
import ImageLayer from '../ImageLayer';
import LayerInfo from '../LayerInfo';

export default function Layers() {
  const layers = useLayerStore((state) => state.layers);
  const activeLayer = useLayerStore((state) => state.activeLayer);
  const setActiveLayer = useLayerStore((state) => state.setActiveLayer);
  const generating = useImageStore((state) => state.generating);
  const addLayer = useLayerStore((state) => state.addLayer);

  return (
    <Card className="scrollbar-thin scrollbar-track-secondary scrollbar-thumb-primary scrollbar-thumb-rounded-full scrollbar-track-rounded-full relative flex shrink-0 basis-[320px] flex-col overflow-x-hidden overflow-y-scroll shadow-2xl">
      <CardHeader>
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
        {layers.map((layer, index) => (
          <div
            key={layer.id}
            className={cn(
              'cursor-pointer border border-transparent ease-in-out hover:bg-secondary',
              {
                'animate-pulse': generating,
                'border-primary': activeLayer.id === layer.id,
              }
            )}
            onClick={() => {
              if (generating) return;
              setActiveLayer(layer.id);
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
      <div className="sticky bottom-0 flex shrink-0 gap-2 bg-card">
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
      </div>
    </Card>
  );
}
