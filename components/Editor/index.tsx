'use client';

import { ModeToggle } from '@/components/theme/modeToggle';
import { useLayerStore } from '@/lib/layerStore';
import ActiveImage from '../ActiveImage';
import Layers from '../layers/Layers';
import Loading from '../LoadingScreen';
import ImageTools from '../toolbar/ImageToolbar';
import UploadForm from '../upload/UploadForm';

const Editor = () => {
  const activeLayer = useLayerStore((state) => state.activeLayer);

  return (
    <div className="flex h-full">
      <div className="shrink-0 basis-[240px] px-4 py-6">
        <div className="pb-12 text-center">
          <ModeToggle />
        </div>
        <div className="flex flex-col gap-4">
          {activeLayer.resourceType == 'image' ? <ImageTools /> : null}
        </div>
      </div>
      <Loading />
      <UploadForm />
      <ActiveImage />
      <Layers />
    </div>
  );
};

export default Editor;
