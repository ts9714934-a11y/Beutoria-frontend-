import React, { useCallback, useState } from 'react';

interface ImageUploaderProps {
  onImageUpload: (file: File) => void;
}

const UploadIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-brand-highlight" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
);


export const ImageUploader: React.FC<ImageUploaderProps> = ({ onImageUpload }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      validateAndUpload(file);
    }
  };

  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
        validateAndUpload(file);
    }
  }, [onImageUpload]);

  const validateAndUpload = (file: File) => {
    if (!file.type.startsWith('image/')) {
        setError("Please upload a valid image file (JPEG, PNG).");
        return;
    }
    setError(null);
    onImageUpload(file);
  }

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };
  
  const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };
  
  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };


  return (
    <div className="w-full max-w-2xl text-center flex flex-col items-center p-4">
        <div className="bg-white/70 backdrop-blur-sm p-8 rounded-3xl shadow-lg w-full">
            <h2 className="font-serif text-4xl font-bold mb-3 text-brand-dark">Discover Your Unique Beauty</h2>
            <p className="text-gray-600 mb-8 max-w-lg mx-auto">Upload a clear, front-facing photo to receive a personalized analysis and constructive tips from our advanced AI.</p>

            <div 
                className={`w-full p-8 border-2 border-dashed rounded-2xl transition-all duration-300 ${isDragging ? 'border-brand-highlight bg-purple-50 shadow-inner' : 'border-purple-200 bg-white'}`}
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onDragEnter={handleDragEnter}
                onDragLeave={handleDragLeave}
            >
                <input
                    type="file"
                    id="imageUpload"
                    className="hidden"
                    accept="image/png, image/jpeg"
                    onChange={handleFileChange}
                />
                <label htmlFor="imageUpload" className="cursor-pointer flex flex-col items-center justify-center">
                    <UploadIcon />
                    <p className="mt-4 text-lg font-semibold text-brand-text">
                        Drag & Drop or <span className="text-purple-600 font-bold">Click to Upload</span>
                    </p>
                    <p className="text-sm text-gray-500 mt-1">PNG or JPG. High-resolution preferred.</p>
                </label>
            </div>
            {error && <p className="mt-4 text-sm text-red-500">{error}</p>}
        </div>
        <div className="mt-8 text-xs text-gray-600 p-4 bg-white/50 backdrop-blur-sm rounded-2xl max-w-md shadow-sm">
            <h4 className="font-bold mb-2 text-brand-dark">For Best Results:</h4>
            <ul className="list-disc list-inside text-left space-y-1">
                <li>Use a well-lit, clear photo.</li>
                <li>Face forward with a neutral expression.</li>
                <li>Avoid heavy makeup for a more accurate skin analysis.</li>
            </ul>
        </div>
    </div>
  );
};