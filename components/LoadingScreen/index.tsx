'use client';

import { useImageStore } from '@/lib/imageStore';
import { useLayerStore } from '@/lib/layerStore';
import loadingAnimation from '@/public/animations/loading.json';
import Lottie from 'lottie-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '../ui/dialog';

export default function Loading() {
  const generating = useImageStore((state) => state.generating);
  const setGenerating = useImageStore((state) => state.setGenerating);
  const activeLayer = useLayerStore((state) => state.activeLayer);

  return (
    <Dialog open={generating} onOpenChange={setGenerating}>
      <DialogContent className="flex flex-col items-center sm:max-w-[420px]">
        <DialogHeader>
          <DialogTitle>{activeLayer?.name}</DialogTitle>
          <DialogDescription>
            Please note that this operation might take up to a couple of
            seconds.
          </DialogDescription>
        </DialogHeader>
        <Lottie className="w-36" animationData={loadingAnimation} />
      </DialogContent>
    </Dialog>
  );
}
