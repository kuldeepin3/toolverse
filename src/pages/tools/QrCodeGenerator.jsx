import { useState, useRef } from 'react';
import { QrCode, Download } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';

const QrCodeGenerator = () => {
  const [value, setValue] = useState('');
  const [fgColor, setFgColor] = useState('#0f172a'); // slate-900
  const [bgColor, setBgColor] = useState('#ffffff'); // white
  const qrRef = useRef(null);

  const downloadQR = () => {
    if (!value) return;
    const svg = qrRef.current.querySelector('svg');
    const svgData = new XMLSerializer().serializeToString(svg);
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();
    
    img.onload = () => {
      // Add padding
      const padding = 20;
      canvas.width = img.width + padding * 2;
      canvas.height = img.height + padding * 2;
      
      // Draw background
      ctx.fillStyle = bgColor;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Draw QR code
      ctx.drawImage(img, padding, padding);
      
      const pngFile = canvas.toDataURL('image/png');
      const downloadLink = document.createElement('a');
      downloadLink.download = 'qrcode.png';
      downloadLink.href = pngFile;
      downloadLink.click();
    };
    
    img.src = 'data:image/svg+xml;base64,' + btoa(unescape(encodeURIComponent(svgData)));
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center h-16 w-16 rounded-2xl bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 mb-6 shadow-sm">
            <QrCode size={32} />
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-4">QR Code Generator</h1>
          <p className="text-slate-600 dark:text-slate-400">Create custom QR codes for your links, text, or contacts.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="glass-card rounded-3xl p-6 sm:p-8 shadow-xl">
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Content (URL or Text)</label>
                <textarea
                  rows="4"
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                  className="w-full bg-white dark:bg-slate-800 border-0 ring-1 ring-slate-200 dark:ring-slate-700 focus:ring-2 focus:ring-primary-500 rounded-xl px-4 py-3 text-slate-900 dark:text-white transition-all resize-none"
                  placeholder="https://example.com"
                ></textarea>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Foreground</label>
                  <div className="flex items-center gap-3">
                    <input
                      type="color"
                      value={fgColor}
                      onChange={(e) => setFgColor(e.target.value)}
                      className="w-10 h-10 rounded cursor-pointer border-0 p-0"
                    />
                    <span className="text-sm text-slate-500 font-mono">{fgColor}</span>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Background</label>
                  <div className="flex items-center gap-3">
                    <input
                      type="color"
                      value={bgColor}
                      onChange={(e) => setBgColor(e.target.value)}
                      className="w-10 h-10 rounded cursor-pointer border-0 p-0"
                    />
                    <span className="text-sm text-slate-500 font-mono">{bgColor}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="glass-card rounded-3xl p-6 sm:p-8 shadow-xl flex flex-col items-center justify-center">
            {value ? (
              <div className="animate-fade-in-up w-full flex flex-col items-center">
                <div 
                  ref={qrRef}
                  className="bg-white p-4 rounded-2xl shadow-sm mb-6 inline-block"
                  style={{ backgroundColor: bgColor }}
                >
                  <QRCodeSVG
                    value={value}
                    size={256}
                    bgColor={bgColor}
                    fgColor={fgColor}
                    level="H"
                    includeMargin={false}
                  />
                </div>
                <button
                  onClick={downloadQR}
                  className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-primary-600 to-indigo-600 hover:from-primary-700 hover:to-indigo-700 text-white rounded-xl font-medium transition-all shadow-md hover:shadow-lg"
                >
                  <Download size={18} /> Download PNG
                </button>
              </div>
            ) : (
              <div className="text-center text-slate-400 py-12">
                <QrCode size={64} className="mx-auto mb-4 opacity-20" />
                <p>Enter some text or a URL to generate a QR code.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default QrCodeGenerator;
