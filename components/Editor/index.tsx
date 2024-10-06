'use client';

import { ModeToggle } from '@/components/theme/modeToggle';
import ActiveImage from '../ActiveImage';
import Layers from '../layers/Layers';
import UploadForm from '../upload/UploadForm';

const Editor = () => {
  return (
    <div className="flex h-full">
      <div className="shrink-0 basis-[240px] px-4 py-6">
        <div className="pb-12 text-center">
          <ModeToggle />
        </div>
      </div>
      <UploadForm />
      <ActiveImage />
      <Layers />
    </div>
  );
};

export default Editor;
