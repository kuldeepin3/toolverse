import { useState, useRef, useEffect } from 'react';
import { FileDown, Upload, Download, RefreshCw, FileText, Settings } from 'lucide-react';
import { PDFDocument } from 'pdf-lib';
import * as pdfjsLib from 'pdfjs-dist';
import jsPDF from 'jspdf';

// Setup pdf.js worker for Vite
import pdfWorkerUrl from 'pdfjs-dist/build/pdf.worker.mjs?url';
pdfjsLib.GlobalWorkerOptions.workerSrc = pdfWorkerUrl;

const PdfCompressor = () => {
  const [file, setFile] = useState(null);
  const [compressedPdfBlob, setCompressedPdfBlob] = useState(null);
  const [originalSize, setOriginalSize] = useState(0);
  const [compressedSize, setCompressedSize] = useState(0);
  const [isCompressing, setIsCompressing] = useState(false);
  const [progress, setProgress] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  
  // Compression options
  const [compressionMode, setCompressionMode] = useState('recommended'); // 'basic', 'recommended', 'extreme'
  
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
    
    if (selectedFile.type !== 'application/pdf') {
      alert('Please select a PDF file.');
      return;
    }

    if (selectedFile.size > 100 * 1024 * 1024) {
      alert('File size exceeds the 100MB limit. Please choose a smaller file.');
      return;
    }

    setFile(selectedFile);
    setOriginalSize(selectedFile.size);
    setCompressedPdfBlob(null);
    setCompressedSize(0);
    setErrorMsg('');
    setProgress('');
  };

  const compressPdf = async () => {
    if (!file) return;
    
    setIsCompressing(true);
    setErrorMsg('');
    setProgress('Initializing...');
    
    try {
      const arrayBuffer = await file.arrayBuffer();

      if (compressionMode === 'basic') {
        // Basic compression using pdf-lib (removes unused objects)
        setProgress('Optimizing PDF structure...');
        const pdfDoc = await PDFDocument.load(arrayBuffer);
        const compressedBytes = await pdfDoc.save({ useObjectStreams: true });
        
        const blob = new Blob([compressedBytes], { type: 'application/pdf' });
        setCompressedPdfBlob(blob);
        setCompressedSize(blob.size);
        
        if (blob.size >= arrayBuffer.byteLength) {
           setErrorMsg("This PDF is already highly optimized. Try a stronger compression mode.");
        }
      } else {
        // Advanced compression (Rasterizing using pdfjs + jspdf)
        setProgress('Reading PDF document...');
        
        // Define quality settings based on mode
        const settings = compressionMode === 'recommended' 
          ? { scale: 1.5, quality: 0.7 } 
          : { scale: 1.0, quality: 0.4 }; // extreme

        // Load document
        const loadingTask = pdfjsLib.getDocument({ data: arrayBuffer });
        const pdf = await loadingTask.promise;
        const totalPages = pdf.numPages;
        
        // Create new jsPDF instance (we will set page size dynamically)
        const doc = new jsPDF({ unit: 'pt', compress: true });
        doc.deletePage(1); // Remove the default first page
        
        for (let pageNum = 1; pageNum <= totalPages; pageNum++) {
          setProgress(`Compressing page ${pageNum} of ${totalPages}...`);
          
          const page = await pdf.getPage(pageNum);
          const viewport = page.getViewport({ scale: settings.scale });
          
          // Render page to canvas
          const canvas = document.createElement('canvas');
          const ctx = canvas.getContext('2d');
          canvas.width = viewport.width;
          canvas.height = viewport.height;
          
          await page.render({
            canvasContext: ctx,
            viewport: viewport
          }).promise;
          
          // Get compressed JPEG image
          const imgData = canvas.toDataURL('image/jpeg', settings.quality);
          
          // Get original dimensions to keep the same PDF page size
          const originalViewport = page.getViewport({ scale: 1.0 });
          
          // Add page to new PDF
          doc.addPage([originalViewport.width, originalViewport.height]);
          doc.addImage(imgData, 'JPEG', 0, 0, originalViewport.width, originalViewport.height);
        }
        
        setProgress('Finalizing compressed document...');
        const blob = doc.output('blob');
        
        setCompressedPdfBlob(blob);
        setCompressedSize(blob.size);
        
        if (blob.size >= arrayBuffer.byteLength) {
           setErrorMsg("The output is larger than the original! This happens if the original PDF consisted mostly of text and vectors rather than images.");
        }
      }
    } catch (error) {
      console.error(error);
      setErrorMsg("An error occurred. The PDF might be password protected, corrupted, or too complex to render.");
    } finally {
      setIsCompressing(false);
      setProgress('');
    }
  };

  const downloadPdf = () => {
    if (!compressedPdfBlob) return;
    
    const url = URL.createObjectURL(compressedPdfBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `compressed_${file.name}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center h-16 w-16 rounded-2xl bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 mb-6 shadow-sm">
            <FileDown size={32} />
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-4">PDF Size Reducer</h1>
          <p className="text-slate-600 dark:text-slate-400">Reduce PDF file size significantly directly in your browser.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div className="glass-card rounded-3xl p-6 sm:p-8 shadow-xl">
              <input
                type="file"
                accept="application/pdf"
                className="hidden"
                ref={fileInputRef}
                onChange={handleFileChange}
              />
              
              <div 
                onClick={() => fileInputRef.current.click()}
                className="border-2 border-dashed border-slate-300 dark:border-slate-600 hover:border-primary-500 dark:hover:border-primary-400 rounded-2xl p-8 text-center cursor-pointer transition-colors bg-white/50 dark:bg-slate-800/50 group mb-6"
              >
                <div className="h-16 w-16 mx-auto bg-slate-100 dark:bg-slate-700 text-slate-400 group-hover:text-primary-500 rounded-full flex items-center justify-center mb-4 transition-colors">
                  <Upload size={28} />
                </div>
                <p className="text-slate-900 dark:text-white font-medium mb-1">Click to upload a PDF file</p>
                <p className="text-slate-500 dark:text-slate-400 text-sm">Max 100MB</p>
              </div>

              {file && (
                <div className="animate-fade-in-up">
                  <div className="flex items-center gap-4 p-4 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm mb-6">
                    <div className="w-12 h-12 rounded-lg bg-rose-100 dark:bg-rose-900/30 text-rose-500 flex items-center justify-center flex-shrink-0">
                      <FileText size={24} />
                    </div>
                    <div className="flex-grow min-w-0">
                      <p className="text-sm font-medium text-slate-900 dark:text-white truncate">
                        {file.name}
                      </p>
                      <p className="text-xs text-slate-500 dark:text-slate-400">
                        {formatSize(originalSize)}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-4 mb-6">
                    <div className="flex items-center gap-2 mb-2">
                      <Settings size={18} className="text-slate-500" />
                      <h3 className="font-medium text-slate-900 dark:text-white">Compression Level</h3>
                    </div>
                    
                    <div className="grid grid-cols-1 gap-3">
                      <label className={`flex items-start gap-3 p-3 rounded-xl border cursor-pointer transition-colors ${compressionMode === 'basic' ? 'bg-primary-50 border-primary-300 dark:bg-primary-900/20 dark:border-primary-700' : 'bg-white border-slate-200 dark:bg-slate-800 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600'}`}>
                        <input type="radio" name="compression" value="basic" checked={compressionMode === 'basic'} onChange={() => setCompressionMode('basic')} className="mt-1 accent-primary-600" />
                        <div>
                          <div className="font-medium text-slate-900 dark:text-white text-sm">Basic (Fastest)</div>
                          <div className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Keeps text searchable. Removes unused data. Best for mostly-text PDFs.</div>
                        </div>
                      </label>
                      
                      <label className={`flex items-start gap-3 p-3 rounded-xl border cursor-pointer transition-colors ${compressionMode === 'recommended' ? 'bg-primary-50 border-primary-300 dark:bg-primary-900/20 dark:border-primary-700' : 'bg-white border-slate-200 dark:bg-slate-800 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600'}`}>
                        <input type="radio" name="compression" value="recommended" checked={compressionMode === 'recommended'} onChange={() => setCompressionMode('recommended')} className="mt-1 accent-primary-600" />
                        <div>
                          <div className="font-medium text-slate-900 dark:text-white text-sm">Strong (Recommended)</div>
                          <div className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Rasterizes pages. Good balance of quality and file size.</div>
                        </div>
                      </label>

                      <label className={`flex items-start gap-3 p-3 rounded-xl border cursor-pointer transition-colors ${compressionMode === 'extreme' ? 'bg-primary-50 border-primary-300 dark:bg-primary-900/20 dark:border-primary-700' : 'bg-white border-slate-200 dark:bg-slate-800 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600'}`}>
                        <input type="radio" name="compression" value="extreme" checked={compressionMode === 'extreme'} onChange={() => setCompressionMode('extreme')} className="mt-1 accent-primary-600" />
                        <div>
                          <div className="font-medium text-slate-900 dark:text-white text-sm">Extreme (Smallest)</div>
                          <div className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Maximum compression. Noticeable quality loss. Best for large scanned documents.</div>
                        </div>
                      </label>
                    </div>
                  </div>

                  <button
                    onClick={compressPdf}
                    disabled={isCompressing}
                    className="w-full flex flex-col items-center justify-center py-3 bg-gradient-to-r from-primary-600 to-indigo-600 hover:from-primary-700 hover:to-indigo-700 text-white rounded-xl font-bold transition-all shadow-md hover:shadow-lg disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    <div className="flex items-center gap-2">
                      {isCompressing ? <RefreshCw className="animate-spin" size={20} /> : <FileDown size={20} />}
                      {isCompressing ? 'Compressing...' : 'Compress PDF'}
                    </div>
                    {progress && <div className="text-xs font-normal text-primary-100 mt-1">{progress}</div>}
                  </button>
                </div>
              )}
            </div>
          </div>

          <div className="glass-card rounded-3xl p-6 sm:p-8 shadow-xl flex flex-col justify-center h-full">
            {!compressedPdfBlob ? (
               <div className="text-center text-slate-400 py-12">
                 <FileText size={64} className="mx-auto mb-4 opacity-20" />
                 <p>Upload and compress a PDF to see the results here.</p>
               </div>
            ) : (
              <div className="w-full space-y-6 animate-fade-in-up">
                <div className="text-center mb-6">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 text-green-500 mb-4">
                    <FileDown size={32} />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white">Compression Complete!</h3>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-slate-100 dark:bg-slate-800/50 p-4 rounded-xl border border-slate-200 dark:border-slate-700 text-center">
                    <div className="text-xs text-slate-500 font-medium uppercase tracking-wider mb-1">Original Size</div>
                    <div className="text-lg font-bold text-slate-900 dark:text-white">{formatSize(originalSize)}</div>
                  </div>
                  <div className={`p-4 rounded-xl border text-center ${originalSize > compressedSize ? 'bg-primary-50 dark:bg-primary-900/20 border-primary-200 dark:border-primary-800/50' : 'bg-slate-100 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700'}`}>
                    <div className="text-xs text-slate-500 font-medium uppercase tracking-wider mb-1">New Size</div>
                    <div className={`text-lg font-bold ${originalSize > compressedSize ? 'text-primary-600 dark:text-primary-400' : 'text-slate-900 dark:text-white'}`}>
                      {formatSize(compressedSize)}
                    </div>
                  </div>
                </div>

                {originalSize > compressedSize && (
                  <div className="bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 p-3 rounded-lg text-center font-bold text-lg">
                    Saved {formatSize(originalSize - compressedSize)} ({Math.round(((originalSize - compressedSize) / originalSize) * 100)}%)
                  </div>
                )}
                
                {errorMsg && (
                  <div className="p-4 bg-amber-50 dark:bg-amber-900/20 text-amber-700 dark:text-amber-400 rounded-xl text-sm text-center font-medium">
                    {errorMsg}
                  </div>
                )}

                <button
                  onClick={downloadPdf}
                  className="w-full flex items-center justify-center gap-2 py-4 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-xl font-bold text-lg transition-all shadow-md hover:shadow-lg mt-4"
                >
                  <Download size={20} /> Download File
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PdfCompressor;
