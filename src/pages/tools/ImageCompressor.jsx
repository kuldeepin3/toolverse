import { useState, useRef } from 'react';
import { Image as ImageIcon, Upload, Download, RefreshCw } from 'lucide-react';

const ImageCompressor = () => {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [compressedImage, setCompressedImage] = useState(null);
  const [quality, setQuality] = useState(0.8);
  const [originalSize, setOriginalSize] = useState(0);
  const [compressedSize, setCompressedSize] = useState(0);
  const [isCompressing, setIsCompressing] = useState(false);
  
  const fileInputRef = useRef(null);

  const formatSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) return;
    
    if (!selectedFile.type.startsWith('image/')) {
      alert('Please select an image file.');
      return;
    }

    setFile(selectedFile);
    setOriginalSize(selectedFile.size);
    setCompressedImage(null);
    setCompressedSize(0);

    const reader = new FileReader();
    reader.onload = (e) => setPreview(e.target.result);
    reader.readAsDataURL(selectedFile);
  };

  const compressImage = () => {
    if (!file || !preview) return;
    
    setIsCompressing(true);
    
    const img = new Image();
    img.src = preview;
    img.onload = () => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      
      canvas.width = img.width;
      canvas.height = img.height;
      
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      
      // Compress
      const dataUrl = canvas.toDataURL('image/jpeg', quality);
      
      setCompressedImage(dataUrl);
      
      // Calculate new size
      const base64str = dataUrl.split(',')[1];
      const decoded = atob(base64str);
      setCompressedSize(decoded.length);
      
      setIsCompressing(false);
    };
  };

  const downloadImage = () => {
    if (!compressedImage) return;
    
    const link = document.createElement('a');
    link.href = compressedImage;
    link.download = `compressed_${file.name.replace(/\.[^/.]+$/, "")}.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center h-16 w-16 rounded-2xl bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 mb-6 shadow-sm">
            <ImageIcon size={32} />
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-4">Image Compressor</h1>
          <p className="text-slate-600 dark:text-slate-400">Reduce image file size instantly without losing quality.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div className="glass-card rounded-3xl p-6 sm:p-8 shadow-xl">
              <input
                type="file"
                accept="image/*"
                className="hidden"
                ref={fileInputRef}
                onChange={handleFileChange}
              />
              
              <div 
                onClick={() => fileInputRef.current.click()}
                className="border-2 border-dashed border-slate-300 dark:border-slate-600 hover:border-primary-500 dark:hover:border-primary-400 rounded-2xl p-8 text-center cursor-pointer transition-colors bg-white/50 dark:bg-slate-800/50 group"
              >
                <div className="h-16 w-16 mx-auto bg-slate-100 dark:bg-slate-700 text-slate-400 group-hover:text-primary-500 rounded-full flex items-center justify-center mb-4 transition-colors">
                  <Upload size={28} />
                </div>
                <p className="text-slate-900 dark:text-white font-medium mb-1">Click to upload an image</p>
                <p className="text-slate-500 dark:text-slate-400 text-sm">JPG, PNG, WebP (Max 10MB)</p>
              </div>

              {file && (
                <div className="mt-6 space-y-6">
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Image Quality</label>
                      <span className="text-sm font-bold text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-900/30 px-2 py-1 rounded">{Math.round(quality * 100)}%</span>
                    </div>
                    <input
                      type="range"
                      min="0.1"
                      max="1"
                      step="0.05"
                      value={quality}
                      onChange={(e) => setQuality(parseFloat(e.target.value))}
                      className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-primary-600"
                    />
                    <p className="text-xs text-slate-500 mt-2">Lower quality = smaller file size</p>
                  </div>

                  <button
                    onClick={compressImage}
                    disabled={isCompressing}
                    className="w-full flex items-center justify-center gap-2 py-3 bg-gradient-to-r from-primary-600 to-indigo-600 hover:from-primary-700 hover:to-indigo-700 text-white rounded-xl font-bold transition-all shadow-md hover:shadow-lg disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {isCompressing ? <RefreshCw className="animate-spin" size={20} /> : <ImageIcon size={20} />}
                    {isCompressing ? 'Compressing...' : 'Compress Image'}
                  </button>
                </div>
              )}
            </div>
          </div>

          <div className="glass-card rounded-3xl p-6 sm:p-8 shadow-xl flex flex-col h-full">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">Preview</h3>
            
            {preview ? (
              <div className="flex-grow flex flex-col items-center">
                <div className="relative w-full aspect-video bg-slate-100 dark:bg-slate-800 rounded-xl overflow-hidden flex items-center justify-center mb-6">
                  <img 
                    src={compressedImage || preview} 
                    alt="Preview" 
                    className="max-w-full max-h-full object-contain"
                  />
                  {compressedImage && (
                    <div className="absolute top-2 right-2 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-md shadow">
                      Compressed
                    </div>
                  )}
                </div>

                <div className="w-full grid grid-cols-2 gap-4 mb-6">
                  <div className="bg-slate-100 dark:bg-slate-800/50 p-4 rounded-xl border border-slate-200 dark:border-slate-700 text-center">
                    <div className="text-xs text-slate-500 font-medium uppercase tracking-wider mb-1">Original Size</div>
                    <div className="text-lg font-bold text-slate-900 dark:text-white">{formatSize(originalSize)}</div>
                  </div>
                  <div className={`p-4 rounded-xl border text-center ${compressedImage ? 'bg-primary-50 dark:bg-primary-900/20 border-primary-200 dark:border-primary-800/50' : 'bg-slate-100 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700'}`}>
                    <div className="text-xs text-slate-500 font-medium uppercase tracking-wider mb-1">New Size</div>
                    <div className={`text-lg font-bold ${compressedImage ? 'text-primary-600 dark:text-primary-400' : 'text-slate-900 dark:text-white'}`}>
                      {compressedImage ? formatSize(compressedSize) : '-'}
                    </div>
                  </div>
                </div>

                {compressedImage && (
                  <div className="w-full animate-fade-in-up mt-auto">
                    <div className="bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 p-3 rounded-lg text-sm text-center font-medium mb-4">
                      Saved {formatSize(originalSize - compressedSize)} ({Math.round(((originalSize - compressedSize) / originalSize) * 100)}%)
                    </div>
                    <button
                      onClick={downloadImage}
                      className="w-full flex items-center justify-center gap-2 py-3 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-xl font-bold transition-all shadow-md hover:shadow-lg"
                    >
                      <Download size={20} /> Download Compressed
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex-grow flex items-center justify-center text-slate-400 border-2 border-dashed border-slate-200 dark:border-slate-700 rounded-xl p-8 text-center bg-slate-50 dark:bg-slate-800/30">
                <div>
                  <ImageIcon size={48} className="mx-auto mb-4 opacity-20" />
                  <p>Upload an image to see preview</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageCompressor;
