
import React from 'react';
import { Camera, Trash2, Image as ImageIcon } from 'lucide-react';

interface PhotoUploadProps {
  onPhotoCapture: (base64: string) => void;
  onClear: () => void;
  photo?: string;
}

const PhotoUpload: React.FC<PhotoUploadProps> = ({ onPhotoCapture, onClear, photo }) => {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        onPhotoCapture(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  if (photo) {
    return (
      <div className="relative w-full h-32 rounded-lg overflow-hidden border border-gray-200">
        <img src={photo} alt="Evidencia" className="w-full h-full object-cover" />
        <button 
          onClick={onClear}
          className="absolute top-2 right-2 p-1.5 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
        >
          <Trash2 size={16} />
        </button>
      </div>
    );
  }

  return (
    <div className="relative group">
      <input
        type="file"
        accept="image/*"
        capture="environment"
        onChange={handleFileChange}
        className="hidden"
        id="camera-input"
      />
      <label
        htmlFor="camera-input"
        className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer bg-gray-50 hover:bg-indigo-50 hover:border-indigo-300 transition-all duration-200"
      >
        <div className="flex flex-col items-center justify-center pt-5 pb-6">
          <Camera className="w-8 h-8 text-gray-400 group-hover:text-indigo-500 mb-2" />
          <p className="text-xs text-gray-500 group-hover:text-indigo-600 font-medium">Capturar Evidencia</p>
        </div>
      </label>
    </div>
  );
};

export default PhotoUpload;
