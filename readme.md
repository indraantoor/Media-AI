<a id="readme-top"></a>

<!-- PROJECT LOGO -->
<br />
<div align="center">
<h1 align="center">Media AI</h1>

  <p align="center">
   AI based platform to manipulate videos and images.
    <br />
    <a href="https://github.com/indraantoor/Media-AI"><strong>Explore the docs »</strong></a>
    <br />
    <br />

  </p>
</div>

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li><a href="#features">Features</a></li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#contact">Contact</a></li>

  </ol>
</details>

<!-- ABOUT THE PROJECT -->

## About The Project

**Media AI** is a tool designed to simplify the process of editing images and videos using artificial intelligence. It offers functionalities for images and videos, making media editing faster and more efficient.

For **images**, Media AI allows you to:

- **Remove unwanted objects** from an image using smart AI, ensuring seamless edits.
- **Background Removal**: Instantly remove the background of any image with a single click.
- **Generative Background Replacement**: Remove an image’s background and replace it with AI-generated content for a creative twist.
- **Generative Fill**: Modify an image’s height and width by expanding it with AI-generated extensions that blend naturally with the original.
- **AI Extraction**: Extract specific objects or areas from an image, with multiple options like transparent background, masking, or keeping the background intact.

For **videos**, Media AI offers:

- **AI-Generated Transcriptions**: Automatically generate transcriptions for your video, making it easier to create captions or subtitles.
- **Smart Crop**: Automatically crop your videos to focus on the subject while adjusting to different platform requirements, such as social media or specific aspect ratios.

Media AI empowers users to quickly and easily create professional-grade edits, making it ideal for content creators, designers, and anyone looking to streamline their media workflows.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Built With

- [Next.js](https://nextjs.org/) - React framework for production
- [React](https://reactjs.org/) - JavaScript library for building user interfaces
- [Tailwind CSS](https://tailwindcss.com/) - Utility first CSS framework
- [Zustand](https://zustand-demo.pmnd.rs/) - State management library for React
- [React Hook Form](https://react-hook-form.com/) - Performant form library for React
- [Zod](https://zod.dev/) - TypeScript first schema declaration and validation
- [shadcn/ui](https://ui.shadcn.dev/) - Beautifully designed components using Radix and Tailwind CSS
- [Lucide React](https://lucide.dev/) - Beautiful & consistent icon toolkit
- [Lottie React](https://lottiefiles.com/) - Animation library for React
- [Cloudinary](https://cloudinary.com/) - Media management platform
- [Cloudinary AI](https://cloudinary.com/) - AI based operations
- [Tailwind CSS Animate](https://github.com/joe-bell/tailwindcss-animate) - Animation utilities for Tailwind CSS
- [TypeScript](https://www.typescriptlang.org/) - Typed superset of JavaScript
- [ESLint](https://eslint.org/) - Linting utility for JavaScript and TypeScript
- [Prettier](https://prettier.io/) - Code formatter for consistent style
- [Husky](https://typicode.github.io/husky/) - Git hooks for better commits
- [Lint Staged](https://github.com/okonet/lint-staged) - Run linters on staged Git files
- [Commitlint](https://commitlint.js.org/) - Lint commit messages
- [PostCSS](https://postcss.org/) - Tool for transforming CSS
- [Next Safe Action](https://github.com/calendso/next-safe-action) - Secure API route handling for Next.js

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Features

### Image Features

- **Smart AI Remove**
  - Effortlessly remove any unwanted part of an image with the power of AI, enabling users to edit images seamlessly and precisely.
- **Background Removal**

  - Instantly remove the background of an image with just a click, perfect for isolating subjects and creating transparent backgrounds.

- **Generative Background Replace**

  - Replace backgrounds using AI-generated content, giving users the ability to create entirely new environments or scenes for their images.

- **Generative Fill**

  - Expand the image’s height and width with AI-driven generative fill. This feature allows users to extend the canvas while maintaining visual consistency.

- **AI Extract**
  - Extract specific areas or objects from an image using AI. This feature supports:
    - **Extract Multiple Objects:** Select and extract multiple objects in one go.
    - **Default (Transparent Background):** The extracted objects are provided with a transparent background for easy reuse.
    - **Mask:** Create a mask over selected areas for further editing.
    - **Invert (Keep Background):** Invert the selection to retain the background and remove other elements.

---

### Video Features

- **AI Generated Video Transcriptions**

  - Automatically generate transcriptions for any video. This feature provides accurate text captions or subtitles for accessibility and content indexing.

- **Smart Crop**
  - AI powered cropping that intelligently focuses on the subject of a video. This is optimized for different platform requirements (e.g., square for Instagram, vertical for TikTok), making videos platform-ready in no time.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- GETTING STARTED -->

## Getting Started

To get a local copy up and running follow these simple steps.

### Prerequisites

This is an example of how to list things you need to use the software and how to install them.

- Node

- npm
  ```sh
  npm install npm@latest -g
  ```

### Installation

1. Get Cloudinary API Key. Register and get a free API Key at Cloudinary.

2. Clone the repo
   ```sh
   git clone https://github.com/indraantoor/Media-AI
   ```
3. Install NPM packages
   ```sh
   npm install
   ```
4. Set Up Environment Variables: Create a .env.local file in the root directory and add your Cloudinary configuration:
   ```sh
   CLOUDINARY_NAME=your_cloudinary_name
   CLOUDINARY_KEY=your_cloudinary_key
   CLOUDINARY_SECRET=your_cloudinary_secret
   CLOUDINARY_URL=your_cloudinary_url
   CLOUDINARY_UPLOAD_PRESET=your_upload_preset
   ```
5. Run the application
   ```sh
   npm run dev
   ```
6. To run the app in production mode
   ```sh
   npm start
   ```

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Usage

Using Media AI is simple and intuitive. Here's how to utilize each feature:

### Common Upload Process

To get started with any feature, click the "Upload" button to select and upload your image or video file. The platform will process your file and make the available features accessible.

### Image Features

- **Smart AI Remove**:

  1. Upload your image.
  2. Enter the description of the part as a prompt. The AI will process the request and remove the selected part seamlessly.

- **Background Removal**:

  1. Upload your image.
  2. Click the "Remove Background" button. The AI will automatically eliminate the background, leaving your subject intact.

- **Generative Background Replace**:

  1. Upload your image.
  2. Remove the background using the Background Removal feature.
  3. Click on "Replace Background" to generate and insert a new AI Created background which was generated using your prompt.

- **Generative Fill**:

  1. Upload your image.
  2. Specify the areas to be modified, and adjust the height and width as needed.
  3. The AI will expand the image according to your specifications, by smartly filling out the details using AI to expand the image.

- **AI Extract**:

  1. Upload your image.
  2. Choose the "Extract" option.
  3. Enter 1 or multiple prompts of desired objects or areas to extract, choosing from the options (multiple objects, default, mask, or invert).
  4. The selected areas will be extracted based on your choice.

- **Compare Slider**:
  1. Upload the original and modified images.
  2. Use the compare slider to visualize the differences between the two images, allowing you to see the impact of the edits.

### Video Features

- **AI Video Transcription**:

  1. Upload your video.
  2. Click the "Transcribe" button. The AI will generate and display the transcription of your video on your video.

- **Smart Crop**:
  1. Upload your video.
  2. Choose the "Smart Crop" option, which will analyze the video and crop it based on the main subject, optimizing it for various platforms.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- CONTACT -->

## Contact

Project Link: [https://github.com/indraantoor/Media-AI](https://github.com/indraantoor/Media-AI)

<a href="https://in.linkedin.com/in/indraantoor"><img src="https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555" /></a>

<p align="right">(<a href="#readme-top">back to top</a>)</p>
