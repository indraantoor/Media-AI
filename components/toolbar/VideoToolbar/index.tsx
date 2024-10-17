'use client';

import { useLayerStore } from '@/lib/layerStore';
import SmartCrop from '../SmartCrop';
import VideoTranscription from '../VideoTranscription';

export default function VideoTools() {
  const activeLayer = useLayerStore((state) => state.activeLayer);

  if (activeLayer.resourceType === 'video') {
    return (
      <div className="flex w-full flex-col gap-4">
        <VideoTranscription />
        <SmartCrop />
      </div>
    );
  }
}
