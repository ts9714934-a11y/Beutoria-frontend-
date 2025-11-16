
import React, { useState, useCallback } from 'react';
import { Header } from './components/Header';
import { ImageUploader } from './components/ImageUploader';
import { AnalysisResults } from './components/AnalysisResults';
import { Loader } from './components/Loader';
import { analyzeImage } from './services/geminiService';
import type { AnalysisResult } from './types';
import { Footer } from './components/Footer';

const App: React.FC = () => {
  const [image, setImage] = useState<string | null>(null);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleImageAnalysis = useCallback(async (file: File) => {
    setIsLoading(true);
    setError(null);
    setAnalysisResult(null);

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = async () => {
      try {
        const base64Image = (reader.result as string).split(',')[1];
        if (!base64Image) {
            throw new Error("Failed to read image data.");
        }
        
        setImage(reader.result as string);
        const result = await analyzeImage(base64Image, file.type);
        setAnalysisResult(result);
      } catch (err) {
        console.error(err);
        setError('Sorry, something went wrong during the analysis. Please try a different photo.');
      } finally {
        setIsLoading(false);
      }
    };
    reader.onerror = () => {
        setError('Failed to read the selected file.');
        setIsLoading(false);
    }
  }, []);

  const handleReset = () => {
    setImage(null);
    setAnalysisResult(null);
    setError(null);
    setIsLoading(false);
  };

  return (
    <div className="bg-white min-h-screen font-sans text-brand-text flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8 md:py-12 flex flex-col items-center justify-center">
        {!image && !isLoading && <ImageUploader onImageUpload={handleImageAnalysis} />}
        {isLoading && <Loader />}
        {error && (
            <div className="text-center p-8 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-red-600 font-semibold">{error}</p>
                <button onClick={handleReset} className="mt-4 px-6 py-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors">
                    Try Again
                </button>
            </div>
        )}
        {analysisResult && image && !isLoading && (
            <AnalysisResults result={analysisResult} image={image} onReset={handleReset} />
        )}
      </main>
      <Footer />
    </div>
  );
};

export default App;
