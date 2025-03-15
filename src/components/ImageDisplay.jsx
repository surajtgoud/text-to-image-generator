/**
 * Component to display the generated image
 */
function ImageDisplay({ imageUrl, prompt }) {
  if (!imageUrl) {
    return null;
  }

  /**
   * Handle image download
   */
  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = imageUrl;
    link.download = `generated-image-${Date.now()}.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="w-full max-w-2xl mx-auto bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Generated Image</h2>

      <div className="mb-4">
        <p className="text-sm text-gray-600 mb-2">
          <span className="font-medium">Prompt:</span> {prompt}
        </p>
        <div className="border border-gray-200 rounded-lg overflow-hidden">
          <img
            src={imageUrl}
            alt={`Generated from: ${prompt}`}
            className="w-full h-auto"
          />
        </div>
      </div>

      <button
        onClick={handleDownload}
        className="w-full py-2 px-4 bg-green-600 hover:bg-green-700 text-white font-medium rounded-md"
      >
        Download Image
      </button>
    </div>
  );
}

export default ImageDisplay;
