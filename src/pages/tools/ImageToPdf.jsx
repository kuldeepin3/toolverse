import { useState, useRef } from 'react';
import { FileImage, Upload, Download, Trash2, GripVertical } from 'lucide-react';
import jsPDF from 'jspdf';

const ImageToPdf = () => {
  const [images, setImages] = useState([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    
    const imageFiles = selectedFiles.filter(file => file.type.startsWith('image/'));
    
    if (imageFiles.length === 0) return;

    // Read all files and convert to data URLs
    Promise.all(
      imageFiles.map(file => {
        return new Promise((resolve) => {
          const reader = new FileReader();
          reader.onload = (e) => {
            resolve({
              id: Date.now() + Math.random().toString(36).substr(2, 9),
              file,
              url: e.target.result
            });
          };
          reader.readAsDataURL(file);
        });
      })
    ).then(newImages => {
      setImages(prev => [...prev, ...newImages]);
    });
    
    // Clear input so same files can be selected again
    e.target.value = '';
  };

  const removeImage = (id) => {
    setImages(images.filter(img => img.id !== id));
  };

  const clearAll = () => {
    setImages([]);
  };

  const moveImage = (index, direction) => {
    if (
      (direction === -1 && index === 0) || 
      (direction === 1 && index === images.length - 1)
    ) return;

    const newImages = [...images];
    const temp = newImages[index];
    newImages[index] = newImages[index + direction];
    newImages[index + direction] = temp;
    setImages(newImages);
  };

  const generatePDF = async () => {
    if (images.length === 0) return;
    setIsGenerating(true);

    try {
      // Create new PDF document (A4 portrait)
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();

      for (let i = 0; i < images.length; i++) {
        if (i > 0) pdf.addPage();

        const img = new Image();
        img.src = images[i].url;
        
        await new Promise(resolve => {
          img.onload = () => {
            const imgWidth = img.width;
            const imgHeight = img.height;
            
            // Calculate ratio to fit inside A4 page while preserving aspect ratio
            const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
            
            const finalWidth = imgWidth * ratio;
            const finalHeight = imgHeight * ratio;
            
            // Center the image
            const x = (pdfWidth - finalWidth) / 2;
            const y = (pdfHeight - finalHeight) / 2;

            pdf.addImage(images[i].url, 'JPEG', x, y, finalWidth, finalHeight);
            resolve();
          };
        });
      }

      pdf.save('toolverse_images.pdf');
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('An error occurred while generating the PDF.');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center h-16 w-16 rounded-2xl bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 mb-6 shadow-sm">
            <FileImage size={32} />
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-4">Image to PDF</h1>
          <p className="text-slate-600 dark:text-slate-400">Convert multiple images into a single PDF document easily.</p>
        </div>

        <div className="glass-card rounded-3xl p-6 sm:p-8 shadow-xl">
          <input
            type="file"
            accept="image/*"
            multiple
            className="hidden"
            ref={fileInputRef}
            onChange={handleFileChange}
          />

          <div 
            onClick={() => fileInputRef.current.click()}
            className="border-2 border-dashed border-slate-300 dark:border-slate-600 hover:border-primary-500 dark:hover:border-primary-400 rounded-2xl p-10 text-center cursor-pointer transition-colors bg-white/50 dark:bg-slate-800/50 group mb-8"
          >
            <div className="h-16 w-16 mx-auto bg-slate-100 dark:bg-slate-700 text-slate-400 group-hover:text-primary-500 rounded-full flex items-center justify-center mb-4 transition-colors">
              <Upload size={28} />
            </div>
            <p className="text-slate-900 dark:text-white font-medium text-lg mb-2">Click to select images</p>
            <p className="text-slate-500 dark:text-slate-400 text-sm">You can select multiple files at once</p>
          </div>

          {images.length > 0 && (
            <div className="animate-fade-in-up">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-bold text-slate-900 dark:text-white">Selected Images ({images.length})</h3>
                <button 
                  onClick={clearAll}
                  className="text-sm text-rose-500 hover:text-rose-600 font-medium transition-colors"
                >
                  Clear All
                </button>
              </div>

              <div className="space-y-3 mb-8 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                {images.map((img, index) => (
                  <div key={img.id} className="flex items-center gap-4 p-3 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm group transition-all hover:border-primary-300 dark:hover:border-primary-700">
                    <div className="flex flex-col gap-1 text-slate-300 dark:text-slate-600">
                      <button 
                        onClick={() => moveImage(index, -1)}
                        disabled={index === 0}
                        className="hover:text-primary-500 disabled:opacity-30 disabled:hover:text-slate-300"
                      >
                        ▲
                      </button>
                      <button 
                        onClick={() => moveImage(index, 1)}
                        disabled={index === images.length - 1}
                        className="hover:text-primary-500 disabled:opacity-30 disabled:hover:text-slate-300"
                      >
                        ▼
                      </button>
                    </div>
                    
                    <div className="w-16 h-16 rounded-lg overflow-hidden bg-slate-100 dark:bg-slate-900 flex-shrink-0">
                      <img src={img.url} alt="preview" className="w-full h-full object-cover" />
                    </div>
                    
                    <div className="flex-grow min-w-0">
                      <p className="text-sm font-medium text-slate-900 dark:text-white truncate">
                        {img.file.name}
                      </p>
                      <p className="text-xs text-slate-500 dark:text-slate-400">
                        Page {index + 1}
                      </p>
                    </div>

                    <button
                      onClick={() => removeImage(img.id)}
                      className="p-2 text-slate-400 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-900/20 rounded-lg transition-colors flex-shrink-0"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                ))}
              </div>

              <button
                onClick={generatePDF}
                disabled={isGenerating}
                className="w-full flex items-center justify-center gap-2 py-4 bg-gradient-to-r from-primary-600 to-indigo-600 hover:from-primary-700 hover:to-indigo-700 text-white rounded-xl font-bold text-lg transition-all shadow-lg hover:shadow-xl disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isGenerating ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Generating PDF...
                  </>
                ) : (
                  <>
                    <Download size={20} /> Download PDF
                  </>
                )}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ImageToPdf;
