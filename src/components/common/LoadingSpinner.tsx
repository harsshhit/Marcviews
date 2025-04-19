import React from "react";

export function LoadingSpinner() {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white p-4 rounded-lg shadow-lg flex flex-col items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent-teal"></div>
        <p className="mt-2 text-gray-700">Loading...</p>
      </div>
    </div>
  );
}
