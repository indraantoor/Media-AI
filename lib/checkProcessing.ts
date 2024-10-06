export async function checkImageProcessing(url: string) {
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
