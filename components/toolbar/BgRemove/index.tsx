'use client';

import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { useImageStore } from '@/lib/imageStore';
import { useLayerStore } from '@/lib/layerStore';
import { bgRemoval } from '@/server/bgRemove';

import { Image } from 'lucide-react';

export default function BgRemove() {
  const setGenerating = useImageStore((state) => state.setGenerating);
  const activeLayer = useLayerStore((state) => state.activeLayer);
  const addLayer = useLayerStore((state) => state.addLayer);
  const setActiveLayer = useLayerStore((state) => state.setActiveLayer);
  const generating = useImageStore((state) => state.generating);

  return (
    <Popover>
      <PopoverTrigger disabled={!activeLayer?.url} asChild>
        <Button variant="outline" className="w-full p-8">
          <span className="flex flex-col items-center justify-center gap-1 text-xs font-medium">
            BG Removal <Image size={20} />
          </span>
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-full">
        <div>
          <h3>Background Removal</h3>
          <p className="text-sm text-muted-foreground">
            Remove the background of an image with one simple click
          </p>
        </div>

        <Button
          disabled={!activeLayer?.url || generating}
          onClick={async () => {
            const newLayerId = crypto.randomUUID();

            setGenerating(true);

            const res = await bgRemoval({
              activeImage: activeLayer.url!,
              format: activeLayer.format!,
            });

            console.log('Res', { res });

            if (res?.data?.success) {
              addLayer({
                id: newLayerId,
                url: res.data.success,
                format: 'png',
                height: activeLayer.height,
                width: activeLayer.width,
                name: 'bgRemoved' + activeLayer.name,
                publicId: activeLayer.publicId,
                resourceType: 'image',
              });
              setActiveLayer(newLayerId);
              setGenerating(false);
            }

            if (res?.serverError) {
              setGenerating(false);
            }
          }}
          className="mt-4 w-full"
        >
          {generating ? 'Removing...' : 'Remove Background'}
        </Button>
      </PopoverContent>
    </Popover>
  );
}
