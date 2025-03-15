import { useState } from "react";

/**
 * Form component for entering text prompts and API key
 */
function PromptForm({ onGenerate, isLoading }) {
  const [prompt, setPrompt] = useState("");
  const [apiKey, setApiKey] = useState("");

  /**
   * Handle form submission
   * @param {Event} e - The form submission event
   */
  const handleSubmit = (e) => {
    e.preventDefault();
    if (prompt.trim() && apiKey.trim()) {
      onGenerate(prompt, apiKey);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto bg-white rounded-lg shadow-md p-6 mb-8">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">
        Generate an Image
      </h2>

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            htmlFor="apiKey"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Hugging Face API Key
          </label>
          <input
            type="password"
            id="apiKey"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your Hugging Face API key"
            required
          />
          <p className="mt-1 text-xs text-gray-500">
            Get your API key from{" "}
            <a
              href="https://huggingface.co/settings/tokens"
              target="_blank"
              rel="noreferrer"
              className="text-blue-600 hover:underline"
            >
              Hugging Face
            </a>
          </p>
        </div>

        <div className="mb-4">
          <label
            htmlFor="prompt"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Text Prompt
          </label>
          <textarea
            id="prompt"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Describe the image you want to generate..."
            rows="4"
            required
          />
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className={`w-full py-2 px-4 rounded-md text-white font-medium ${
            isLoading
              ? "bg-blue-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {isLoading ? "Generating..." : "Generate Image"}
        </button>
      </form>
    </div>
  );
}

export default PromptForm;
