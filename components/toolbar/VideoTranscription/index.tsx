'use client';

import { Button } from '@/components/ui/button';
import { useImageStore } from '@/lib/imageStore';
import { useLayerStore } from '@/lib/layerStore';
import { initiateTranscription } from '@/server/transcribe';
import { Captions } from 'lucide-react';
import { useState } from 'react';

export default function VideoTranscription() {
  const activeLayer = useLayerStore((state) => state.activeLayer);
  const updateLayer = useLayerStore((state) => state.updateLayer);
  const [transcribing, setTranscribing] = useState(false);
  const setGenerating = useImageStore((state) => state.setGenerating);
  const setActiveLayer = useLayerStore((state) => state.setActiveLayer);

  const handleTranscribe = async () => {
    if (!activeLayer.publicId || activeLayer.resourceType !== 'video') {
      return;
    }

    setTranscribing(true);
    setGenerating(true);

    try {
      const result = await initiateTranscription({
        publicId: activeLayer.publicId,
      });

      if (result) {
        if (result.data && 'success' in result.data) {
          if (result.data.subtitledVideoUrl) {
            updateLayer({
              ...activeLayer,
              transcriptionURL: result.data.subtitledVideoUrl,
            });
            setActiveLayer(activeLayer.id);
          }
        }
      }
    } catch (error) {
      console.error('Transcription error:', error);
    } finally {
      setTranscribing(false);
      setGenerating(false);
    }
  };

  return (
    <div className="flex items-center">
      {!activeLayer.transcriptionURL && (
        <Button
          className="w-full py-8"
          onClick={handleTranscribe}
          disabled={transcribing || activeLayer.resourceType !== 'video'}
          variant={'outline'}
        >
          <span className="flex flex-col items-center justify-center gap-1 text-xs font-medium">
            {transcribing ? 'Transcribing...' : 'Transcribe'}
            <Captions size={18} />
          </span>
        </Button>
      )}

      {activeLayer.transcriptionURL && (
        <Button className="w-full py-8" variant={'outline'} asChild>
          <a
            href={activeLayer.transcriptionURL}
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className="flex flex-col items-center justify-center gap-1 text-xs font-medium">
              View Transcription
              <Captions size={18} />
            </span>
          </a>
        </Button>
      )}
    </div>
  );
}
