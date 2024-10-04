'use client';

import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { uploadImage } from '@/server/uploadImage';
import { useDropzone } from 'react-dropzone';

const ImageUpload = () => {
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

        // TODO: state management with handling layers

        const res = await uploadImage({ image: formData });

        console.log(res, objectUrl);
      }
    },
  });

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
