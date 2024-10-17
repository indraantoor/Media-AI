'use client';

import { Card, CardContent } from '@/components/ui/card';
import { useImageStore } from '@/lib/imageStore';
import { useLayerStore } from '@/lib/layerStore';
import { cn } from '@/lib/utils';
import videoAnimation from '@/public/animations/videoUpload.json';
import { uploadVideo } from '@/server/uploadVideo';
import Lottie from 'lottie-react';
import { useDropzone } from 'react-dropzone';

export default function VideoUpload() {
  const setGenerating = useImageStore((state) => state.setGenerating);
  const activeLayer = useLayerStore((state) => state.activeLayer);
  const updateLayer = useLayerStore((state) => state.updateLayer);
  const setActiveLayer = useLayerStore((state) => state.setActiveLayer);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    maxFiles: 1,
    accept: {
      'video/mp4': ['.mp4', '.MP4'],
    },

    onDrop: async (acceptedFiles, fileRejections) => {
      if (acceptedFiles.length) {
        const formData = new FormData();
        formData.append('video', acceptedFiles[0]);
        setGenerating(true);

        const res = await uploadVideo({ video: formData });

        if (res?.data?.success) {
          const videoUrl = res.data.success.url;
          const thumbnailUrl = videoUrl.replace(/\.[^/.]+$/, '.jpg');
          console.log(res.data.success);
          updateLayer({
            id: activeLayer.id,
            url: res.data.success.url,
            width: res.data.success.width,
            height: res.data.success.height,
            name: res.data.success.original_filename,
            publicId: res.data.success.public_id,
            format: res.data.success.format,
            poster: thumbnailUrl,
            resourceType: res.data.success.resource_type,
          });
          setActiveLayer(activeLayer.id);
          console.log(res.data.success);
          setGenerating(false);
        }
        if (res?.data?.error) {
          setGenerating(false);
        }
      }

      if (fileRejections.length) {
        console.log('rejected');
      }
    },
  });

  return (
    <Card
      {...getRootProps()}
      className={cn(
        'transition-all ease-in-out hover:cursor-pointer hover:border-primary hover:bg-secondary',
        `${isDragActive ? 'animate-pulse border-primary bg-secondary' : ''}`
      )}
    >
      <CardContent className="flex h-full flex-col items-center justify-center px-2 py-24 text-xs">
        <input {...getInputProps()} />
        <div className="flex flex-col items-center justify-center gap-4">
          <Lottie className="h-48" animationData={videoAnimation} />
          <p className="text-2xl text-muted-foreground">
            {isDragActive
              ? 'Drop your video here!'
              : 'Start by uploading a video'}
          </p>
          <p className="text-muted-foreground">Supported Format: .mp4</p>
        </div>
      </CardContent>
    </Card>
  );
}
