import axios from "axios";

/**
 * Service for handling text-to-image generation API requests
 */
const imageService = {
  /**
   * Generate an image from text using the Hugging Face API
   * @param {string} prompt - The text prompt to generate an image from
   * @param {string} apiKey - The Hugging Face API key
   * @returns {Promise<string>} - A promise that resolves to the image data URL
   */
  generateImage: async (prompt, apiKey) => {
    try {
      // If no API key is provided, return an error
      if (!apiKey) {
        throw new Error("API key is required");
      }

      // Make a request to the Hugging Face API
      const response = await axios({
        url: "https://api-inference.huggingface.co/models/stabilityai/stable-diffusion-xl-base-1.0",
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        data: JSON.stringify({
          inputs: prompt,
          options: {
            wait_for_model: true,
          },
        }),
        responseType: "arraybuffer",
      });

      // Convert the response to a base64 data URL
      const base64 = btoa(
        Array.from(new Uint8Array(response.data))
          .map((byte) => String.fromCharCode(byte))
          .join("")
      );
      return `data:image/jpeg;base64,${base64}`;
    } catch (error) {
      console.error("Error generating image:", error);
      throw error;
    }
  },
};

export default imageService;
