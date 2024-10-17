'use client';

import { useLayerStore } from '@/lib/layerStore';
import VideoTranscription from '../VideoTranscription';

export default function VideoTools() {
  const activeLayer = useLayerStore((state) => state.activeLayer);

  if (activeLayer.resourceType === 'video') {
    return (
      <div>
        <VideoTranscription />
      </div>
    );
  }
}
