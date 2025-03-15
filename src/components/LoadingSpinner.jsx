/**
 * Loading spinner component
 */
function LoadingSpinner() {
  return (
    <div className="w-full max-w-2xl mx-auto flex justify-center items-center py-12">
      <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-600"></div>
      <p className="ml-4 text-lg text-gray-700">Generating your image...</p>
      <p className="text-sm text-gray-500 mt-2">
        This may take up to 30 seconds
      </p>
    </div>
  );
}

export default LoadingSpinner;
