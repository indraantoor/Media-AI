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
import { genFill } from '@/server/genFill';

import { Crop } from 'lucide-react';
import { useMemo, useState } from 'react';

export default function GenerativeFill() {
  const setGenerating = useImageStore((state) => state.setGenerating);
  const activeLayer = useLayerStore((state) => state.activeLayer);
  const addLayer = useLayerStore((state) => state.addLayer);
  const setActiveLayer = useLayerStore((state) => state.setActiveLayer);
  const generating = useImageStore((state) => state.generating);

  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);

  const PREVIEW_SIZE = 250;
  const EXPANSION_THRESHOLD = 250;

  const ExpansionIndicator = ({
    value,
    axis,
  }: {
    value: number;
    axis: 'x' | 'y';
  }) => {
    const isVisible = Math.abs(value) >= EXPANSION_THRESHOLD;
    const position =
      axis === 'x'
        ? {
            top: '50%',
            [value > 0 ? 'right' : 'left']: 0,
            transform: 'translateY(-50%)',
          }
        : {
            left: '50%',
            [value > 0 ? 'bottom' : 'top']: 0,
            transform: 'translateX(-50%)',
          };

    return (
      isVisible && (
        <div
          className="absolute rounded-md bg-primary px-2 py-1 text-xs font-bold text-white dark:text-black"
          style={position}
        >
          {Math.abs(value)}px
        </div>
      )
    );
  };

  const previewStyle = useMemo(() => {
    if (!activeLayer.width || !activeLayer.height) return {};

    const newWidth = activeLayer.width + width;
    const newHeight = activeLayer.height + height;

    const scale = Math.min(PREVIEW_SIZE / newWidth, PREVIEW_SIZE / newHeight);

    return {
      width: `${newWidth * scale}px`,
      height: `${newHeight * scale}px`,
      backgroundImage: `url(${activeLayer.url})`,
      backgroundSize: `${activeLayer.width * scale}px ${
        activeLayer.height * scale
      }px`,
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      position: 'relative' as const,
    };
  }, [activeLayer, width, height]);

  const previewOverlayStyle = useMemo(() => {
    if (!activeLayer.width || !activeLayer.height) return {};

    const scale = Math.min(
      PREVIEW_SIZE / (activeLayer.width + width),
      PREVIEW_SIZE / (activeLayer.height + height)
    );

    const leftWidth = width > 0 ? `${(width / 2) * scale}px` : '0';
    const rightWidth = width > 0 ? `${(width / 2) * scale}px` : '0';
    const topHeight = height > 0 ? `${(height / 2) * scale}px` : '0';
    const bottomHeight = height > 0 ? `${(height / 2) * scale}px` : '0';

    return {
      position: 'absolute' as const,
      top: '0',
      left: '0',
      right: '0',
      bottom: '0',
      boxShadow: `inset ${leftWidth} ${topHeight} 0 rgba(48, 119, 255, 1), 
                  inset -${rightWidth} ${topHeight} 0 rgba(48, 119, 255, 1), 
                  inset ${leftWidth} -${bottomHeight} 0 rgba(48, 119, 255, 1), 
                  inset -${rightWidth} -${bottomHeight} 0 rgba(48, 119, 255,1)`,
    };
  }, [activeLayer, width, height]);

  return (
    <Popover>
      <PopoverTrigger disabled={!activeLayer?.url} asChild>
        <Button variant="outline" className="w-full p-8">
          <span className="flex flex-col items-center justify-center gap-1 text-xs font-medium">
            Generative Fill <Crop size={20} />
          </span>
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-full">
        <div className="flex h-full flex-col">
          <div className="pb-4">
            <h3>Generative Fill</h3>
            <p className="text-sm text-muted-foreground">
              Expand your photo using AI.
            </p>
          </div>
          {activeLayer.width && activeLayer.height ? (
            <div className="flex justify-evenly">
              <div className="flex flex-col items-center">
                <span className="text-xs">Current Size:</span>
                <p className="text-sm font-bold text-primary">
                  {activeLayer.width}x{activeLayer.height}
                </p>
              </div>

              <div className="flex flex-col items-center">
                <span className="text-xs">New Size</span>
                <p className="text-sm font-bold text-primary">
                  {activeLayer.width + width}x{activeLayer.height + height}
                </p>
              </div>
            </div>
          ) : null}
        </div>

        <div className="flex items-center justify-center gap-2">
          <div className="text-center">
            <Label htmlFor="width">Modify Width</Label>
            <Input
              name="width"
              type="range"
              max={activeLayer.width}
              value={width}
              onChange={(e) => setWidth(+e.target.value)}
              className="h-8"
            />
          </div>

          <div className="text-center">
            <Label htmlFor="height">Modify Height</Label>
            <Input
              name="height"
              type="range"
              max={activeLayer.height}
              min={-activeLayer.height! + 100}
              value={height}
              onChange={(e) => setHeight(+e.target.value)}
              className="h-8"
            />
          </div>
        </div>

        <div
          className="preview-container flex-grow"
          style={{
            width: `${PREVIEW_SIZE}px`,
            height: `${PREVIEW_SIZE}px`,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            overflow: 'hidden',
            margin: 'auto',
          }}
        >
          <div style={previewStyle}>
            <div className="animate-pulse" style={previewOverlayStyle}></div>
            <ExpansionIndicator value={width} axis="x" />
            <ExpansionIndicator value={height} axis="y" />
          </div>
        </div>

        <Button
          disabled={!activeLayer?.url || generating}
          onClick={async () => {
            const newLayerId = crypto.randomUUID();

            setGenerating(true);

            const res = await genFill({
              aspect: '1:1',
              height: height + activeLayer.height!,
              width: width + activeLayer.width!,
              activeImage: activeLayer.url!,
            });

            console.log('Res', { res });

            if (res?.data?.success) {
              addLayer({
                id: newLayerId,
                url: res.data.success,
                format: activeLayer.format,
                height: activeLayer.height! + height,
                width: activeLayer.width! + width,
                name: 'genFilled' + activeLayer.name,
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
          {generating ? 'Generating...' : 'Generative Fill'}
        </Button>
      </PopoverContent>
    </Popover>
  );
}
