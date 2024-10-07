'use server';

import { actionClient } from '@/lib/safeAction';
import { v2 as cloudinary } from 'cloudinary';
import z from 'zod';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

const bgReplaceSchema = z.object({
  activeImage: z.string(),
  prompt: z.string(),
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

export const bgReplace = actionClient
  .schema(bgReplaceSchema)
  .action(async ({ parsedInput: { activeImage, prompt } }) => {
    const parts = activeImage.split('/upload/');

    const bgReplaceUrl = prompt
      ? `${parts[0]}/upload/e_gen_background_replace:prompt_${prompt}/${parts[1]}`
      : `${parts[0]}/upload/e_gen_background_replace/${parts[1]}`;

    // Poll the URL to check if the image is processed
    let isProcessed = false;
    const maxAttempts = 20;
    const delay = 1000; // 1 second
    for (let attempt = 0; attempt < maxAttempts; attempt++) {
      isProcessed = await checkImageProcessing(bgReplaceUrl);
      console.log(bgReplaceUrl);
      if (isProcessed) {
        break;
      }
      await new Promise((resolve) => setTimeout(resolve, delay));
    }

    if (!isProcessed) {
      throw new Error('Image processing timed out');
    }
    console.log(bgReplaceUrl);
    return { success: bgReplaceUrl };
  });
