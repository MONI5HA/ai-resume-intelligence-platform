import React from 'react';

export default function LoadingSpinner() {
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="relative w-16 h-16 mb-4">
        <div className="absolute inset-0 border-4 border-blue-200 rounded-full"></div>
        <div className="absolute inset-0 border-4 border-transparent border-t-blue-600 border-r-blue-600 rounded-full animate-spin"></div>
      </div>
      <p className="text-gray-700 font-semibold">✨ AI is optimizing your resume...</p>
      <p className="text-gray-500 text-sm mt-2">This usually takes 10-30 seconds</p>
    </div>
  );
}
