import { useState } from "react";
import PromptForm from "./components/PromptForm";
import ImageDisplay from "./components/ImageDisplay";
import LoadingSpinner from "./components/LoadingSpinner";
import imageService from "./services/imageService";
import "./App.css";

/**
 * Main application component
 */
function App() {
  const [imageUrl, setImageUrl] = useState("");
  const [currentPrompt, setCurrentPrompt] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  /**
   * Handle image generation
   * @param {string} prompt - The text prompt to generate an image from
   * @param {string} apiKey - The Hugging Face API key
   */
  const handleGenerateImage = async (prompt, apiKey) => {
    setIsLoading(true);
    setError("");
    setCurrentPrompt(prompt);

    try {
      const generatedImageUrl = await imageService.generateImage(
        prompt,
        apiKey
      );
      setImageUrl(generatedImageUrl);
    } catch (err) {
      console.error("Error generating image:", err);
      setError(
        err.response?.status === 401
          ? "Invalid API key. Please check your Hugging Face API key and try again."
          : "An error occurred while generating the image. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Text to Image Generator
          </h1>
          <p className="text-lg text-gray-600">
            Transform your text descriptions into stunning images using AI
          </p>
        </header>

        <PromptForm onGenerate={handleGenerateImage} isLoading={isLoading} />

        {error && (
          <div className="w-full max-w-2xl mx-auto bg-red-50 border border-red-200 text-red-800 rounded-lg p-4 mb-8">
            <p>{error}</p>
          </div>
        )}

        {isLoading ? (
          <LoadingSpinner />
        ) : (
          imageUrl && (
            <ImageDisplay imageUrl={imageUrl} prompt={currentPrompt} />
          )
        )}

        <footer className="mt-16 text-center text-sm text-gray-500">
          <p>
            Powered by Hugging Face's Stable Diffusion XL model.
            <a
              href="https://huggingface.co/stabilityai/stable-diffusion-xl-base-1.0"
              target="_blank"
              rel="noreferrer"
              className="text-blue-600 hover:underline ml-1"
            >
              Learn more
            </a>
          </p>
        </footer>
      </div>
    </div>
  );
}

export default App;
