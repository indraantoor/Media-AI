'use server';

import { actionClient } from '@/lib/safeAction';
import { v2 as cloudinary } from 'cloudinary';
import z from 'zod';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

const bgRemoveSchema = z.object({
  activeImage: z.string(),
  format: z.string(),
});

async function checkImageProcessing(url: string) {
  try {
    const response = await fetch(url);
    if (response.ok) {
      return true;
    }
    return false;
  } catch (error) {
    console.log('Error checking image processing:', error);
    return false;
  }
}

export const bgRemoval = actionClient
  .schema(bgRemoveSchema)
  .action(async ({ parsedInput: { activeImage, format } }) => {
    const form = activeImage.split(format);
    const pngConvert = form[0] + 'png';
    const parts = pngConvert.split('/upload/');
    const removeUrl = `${parts[0]}/upload/e_background_removal/${parts[1]}`;

    // Poll the URL to check if the image is processed
    let isProcessed = false;
    const maxAttempts = 20;
    const delay = 1000; // 1 second
    for (let attempt = 0; attempt < maxAttempts; attempt++) {
      isProcessed = await checkImageProcessing(removeUrl);
      console.log(removeUrl);
      if (isProcessed) {
        break;
      }
      await new Promise((resolve) => setTimeout(resolve, delay));
    }

    if (!isProcessed) {
      throw new Error('Image processing timed out');
    }
    console.log(removeUrl);
    return { success: removeUrl };
  });
