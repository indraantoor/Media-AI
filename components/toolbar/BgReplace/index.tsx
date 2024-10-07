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
import { bgReplace } from '@/server/bgReplace';

import { ImageOff } from 'lucide-react';
import { useState } from 'react';

export default function BgReplace() {
  const setGenerating = useImageStore((state) => state.setGenerating);
  const activeLayer = useLayerStore((state) => state.activeLayer);
  const addLayer = useLayerStore((state) => state.addLayer);
  const setActiveLayer = useLayerStore((state) => state.setActiveLayer);
  const generating = useImageStore((state) => state.generating);

  const [prompt, setPrompt] = useState('');

  return (
    <Popover>
      <PopoverTrigger disabled={!activeLayer?.url} asChild>
        <Button variant="outline" className="w-full p-8">
          <span className="flex flex-col items-center justify-center gap-1 text-xs font-medium">
            BG Replace <ImageOff size={20} />
          </span>
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-full">
        <div>
          <h3>Generative Background Replace</h3>
          <p className="text-sm text-muted-foreground">
            Remove the background of an image with AI-generated content.
          </p>
        </div>

        <div className="grid gap-2">
          <Label htmlFor="prompt">Prompt</Label>
          <Input
            id="prompt"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Describe the new background"
          />
        </div>

        <Button
          disabled={!activeLayer?.url || generating}
          onClick={async () => {
            const newLayerId = crypto.randomUUID();

            setGenerating(true);

            const res = await bgReplace({
              activeImage: activeLayer.url!,
              prompt,
            });

            console.log('Res', { res });

            if (res?.data?.success) {
              addLayer({
                id: newLayerId,
                url: res.data.success,
                format: activeLayer.format,
                height: activeLayer.height,
                width: activeLayer.width,
                name: 'bgReplaced' + activeLayer.name,
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
          {generating ? 'Generating...' : 'Replace Background'}
        </Button>
      </PopoverContent>
    </Popover>
  );
}
