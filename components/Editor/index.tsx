'use client';

import { ModeToggle } from '@/components/theme/modeToggle';
import Layers from '../layers/Layers';
import ImageUpload from '../upload/ImageUpload';

const Editor = () => {
  return (
    <div className="flex h-full">
      <div className="shrink-0 basis-[240px] px-4 py-6">
        <div className="pb-12 text-center">
          <ModeToggle />
        </div>
      </div>
      <ImageUpload />
      <Layers />
    </div>
  );
};

export default Editor;
