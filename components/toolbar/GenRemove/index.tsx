'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { useImageStore } from '@/lib/imageStore';
import { useLayerStore } from '@/lib/layerStore';
import { genRemove } from '@/server/genRemove';

import { Eraser } from 'lucide-react';
import { useState } from 'react';

export default function GenRemove() {
  const setGenerating = useImageStore((state) => state.setGenerating);
  const activeLayer = useLayerStore((state) => state.activeLayer);
  const addLayer = useLayerStore((state) => state.addLayer);
  const setActiveLayer = useLayerStore((state) => state.setActiveLayer);

  const [activeTag, setActiveTag] = useState('');

  return (
    <Popover>
      <PopoverTrigger disabled={!activeLayer?.url} asChild>
        <Button variant="outline" className="w-full p-8">
          <span className="flex flex-col items-center justify-center gap-1 text-xs font-medium">
            Content Aware <Eraser size={20} />
          </span>
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-full">
        <div>
          <h3>Smart AI Remove</h3>
          <p className="text-sm text-muted-foreground">
            Generative Remove any part of the image
          </p>
        </div>

        <div className="grid grid-cols-3 items-center gap-4">
          <Label htmlFor="selection">Selection</Label>
          <Input
            className="col-span-2 h-8"
            value={activeTag}
            onChange={(e) => {
              setActiveTag(e.target.value);
            }}
          />
        </div>

        <Button
          onClick={async () => {
            const newLayerId = crypto.randomUUID();

            setGenerating(true);

            const res = await genRemove({
              prompt: activeTag,
              activeImage: activeLayer.url!,
            });

            if (res?.data?.success) {
              setGenerating(false);
              addLayer({
                id: newLayerId,
                url: res.data.success,
                format: activeLayer.format,
                height: activeLayer.height,
                width: activeLayer.width,
                name: 'genRemoved' + activeLayer.name,
                publicId: activeLayer.publicId,
                resourceType: 'image',
              });
              setActiveLayer(newLayerId);
            }
          }}
          className="mt-4 w-full"
        >
          Magic Remove
        </Button>
      </PopoverContent>
    </Popover>
  );
}
