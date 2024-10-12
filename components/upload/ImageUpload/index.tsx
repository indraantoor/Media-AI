'use client';

import { Card, CardContent } from '@/components/ui/card';
import { useImageStore } from '@/lib/imageStore';
import { useLayerStore } from '@/lib/layerStore';
import { cn } from '@/lib/utils';
import imageUploadAnimation from '@/public/animations/imageUpload.json';
import { uploadImage } from '@/server/uploadImage';
import Lottie from 'lottie-react';
import { useDropzone } from 'react-dropzone';

const ImageUpload = () => {
  const setGenerating = useImageStore((state) => state.setGenerating);
  const activeLayer = useLayerStore((state) => state.activeLayer);
  const updateLayer = useLayerStore((state) => state.updateLayer);
  const setActiveLayer = useLayerStore((state) => state.setActiveLayer);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    maxFiles: 1,
    accept: {
      'image/png': ['.png'],
      'image/jpg': ['.jpg'],
      'image/webp': ['.webp'],
      'image/jpeg': ['.jpeg'],
    },
    onDrop: async (acceptedFiles) => {
      if (acceptedFiles.length) {
        const formData = new FormData();
        const file = acceptedFiles[0];
        formData.append('image', file);
        const objectUrl = URL.createObjectURL(file);
        setGenerating(true);

        updateLayer({
          id: activeLayer.id,
          url: objectUrl,
          width: 0,
          height: 0,
          name: 'uploading',
          publicId: '',
          format: '',
          resourceType: 'image',
        });

        setActiveLayer(activeLayer.id);

        const res = await uploadImage({ image: formData });

        if (res?.data?.success) {
          updateLayer({
            id: activeLayer.id,
            url: res.data.success.url,
            width: res.data.success.width,
            height: res.data.success.height,
            name: res.data.success.original_filename,
            publicId: res.data.success.public_id,
            format: res.data.success.format,
            resourceType: res.data.success.resource_type,
          });

          setActiveLayer(activeLayer.id);
          setGenerating(false);
        }

        if (res?.data?.error) {
          setGenerating(false);
        }
      }
    },
  });

  if (!activeLayer.url)
    return (
      <Card
        className={cn(
          'transition-all ease-in-out hover:cursor-pointer hover:border-primary hover:bg-secondary',
          `${isDragActive ? 'animate-pulse border-primary bg-secondary' : ''}`
        )}
        {...getRootProps()}
      >
        <CardContent className="flex h-full flex-col items-center justify-center px-2 py-24 text-xs">
          <input type="text" {...getInputProps()} />
          <div className="flex flex-col items-center justify-center gap-4">
            <Lottie className="h-48" animationData={imageUploadAnimation} />
            <p className="text-2xl text-muted-foreground">
              {isDragActive
                ? 'Drop your image here'
                : 'Start by uploading an image'}
            </p>
            <p className="text-muted-foreground">
              Supported formats .jpeg .png .webp .jpg
            </p>
          </div>
        </CardContent>
      </Card>
    );
};

export default ImageUpload;
