'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useLayerStore } from '@/lib/layerStore';
import { cn } from '@/lib/utils';
import { ImageIcon, VideoIcon } from 'lucide-react';
import { useState } from 'react';
import ImageUpload from '../ImageUpload';
import VideoUpload from '../VideoUpload';

export default function UploadForm() {
  const activeLayer = useLayerStore((state) => state.activeLayer);
  const [selectedType, setSelectedType] = useState('image');

  if (!activeLayer.url) {
    return (
      <div className="flex h-full w-full flex-col justify-center p-24">
        {selectedType == 'image' ? <ImageUpload /> : null}
        {selectedType == 'video' ? <VideoUpload /> : null}

        <RadioGroup
          defaultValue="image"
          onValueChange={(e) => setSelectedType(e)}
          className="flex items-center justify-center gap-8 py-8"
        >
          <Card
            onClick={() => setSelectedType('image')}
            className={cn(
              'flex cursor-pointer flex-col items-center justify-center gap-4 px-6 py-4',
              selectedType == 'image' ? 'border-primary' : null
            )}
          >
            <CardContent className="flex items-center space-x-2 p-0">
              <RadioGroupItem value="image" id="image-mode" hidden />
              <Label
                className={`${selectedType == 'image' ? 'text-primary' : null}`}
              >
                Image Mode
              </Label>
            </CardContent>
            <ImageIcon
              size={36}
              className={`${selectedType == 'image' ? 'text-primary' : null}`}
            />
          </Card>

          <Card
            onClick={() => setSelectedType('video')}
            className={cn(
              'flex cursor-pointer flex-col items-center justify-center gap-4 px-6 py-4',
              selectedType == 'video' ? 'border-primary' : null
            )}
          >
            <CardContent className="flex items-center space-x-2 p-0">
              <RadioGroupItem value="video" id="image-mode" hidden />
              <Label
                className={`${selectedType == 'video' ? 'text-primary' : null}`}
              >
                Video Mode
              </Label>
            </CardContent>
            <VideoIcon
              size={36}
              className={`${selectedType == 'video' ? 'text-primary' : null}`}
            />
          </Card>
        </RadioGroup>
      </div>
    );
  }
}
