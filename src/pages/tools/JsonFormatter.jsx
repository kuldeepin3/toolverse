import { useState } from 'react';
import { FileJson, Copy, Check, Minimize2, Maximize2, AlertCircle } from 'lucide-react';

const JsonFormatter = () => {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState(null);
  const [copied, setCopied] = useState(false);

  const formatJson = () => {
    try {
      if (!input.trim()) return;
      const parsed = JSON.parse(input);
      setOutput(JSON.stringify(parsed, null, 2));
      setError(null);
    } catch (err) {
      setError(err.message);
      setOutput('');
    }
  };

  const minifyJson = () => {
    try {
      if (!input.trim()) return;
      const parsed = JSON.parse(input);
      setOutput(JSON.stringify(parsed));
      setError(null);
    } catch (err) {
      setError(err.message);
      setOutput('');
    }
  };

  const copyToClipboard = () => {
    if (!output) return;
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const clearAll = () => {
    setInput('');
    setOutput('');
    setError(null);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center h-16 w-16 rounded-2xl bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 mb-6 shadow-sm">
            <FileJson size={32} />
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-4">JSON Formatter</h1>
          <p className="text-slate-600 dark:text-slate-400">Validate, format, and minify your JSON data instantly.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Input Section */}
          <div className="glass-card rounded-3xl shadow-xl flex flex-col overflow-hidden h-[600px]">
            <div className="bg-slate-100 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-700 p-4 flex justify-between items-center">
              <span className="font-semibold text-slate-700 dark:text-slate-300">Input</span>
              <button 
                onClick={clearAll}
                className="text-sm text-slate-500 hover:text-rose-500 transition-colors"
              >
                Clear
              </button>
            </div>
            <textarea
              value={input}
              onChange={(e) => {
                setInput(e.target.value);
                if (error) setError(null);
              }}
              placeholder="Paste your JSON here..."
              className="flex-grow w-full bg-white dark:bg-slate-800 border-0 p-6 font-mono text-sm resize-none focus:ring-0 text-slate-900 dark:text-slate-100"
            ></textarea>
            
            <div className="p-4 bg-slate-50 dark:bg-slate-800/80 border-t border-slate-200 dark:border-slate-700 flex gap-4">
              <button
                onClick={formatJson}
                className="flex-1 flex items-center justify-center gap-2 py-3 bg-gradient-to-r from-primary-600 to-indigo-600 hover:from-primary-700 hover:to-indigo-700 text-white rounded-xl font-bold transition-all shadow-md hover:shadow-lg"
              >
                <Maximize2 size={18} /> Beautify
              </button>
              <button
                onClick={minifyJson}
                className="flex-1 flex items-center justify-center gap-2 py-3 bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 text-slate-800 dark:text-white rounded-xl font-bold transition-all shadow-sm"
              >
                <Minimize2 size={18} /> Minify
              </button>
            </div>
          </div>

          {/* Output Section */}
          <div className="glass-card rounded-3xl shadow-xl flex flex-col overflow-hidden h-[600px] relative">
            <div className="bg-slate-100 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-700 p-4 flex justify-between items-center">
              <span className="font-semibold text-slate-700 dark:text-slate-300">Output</span>
              <button
                onClick={copyToClipboard}
                disabled={!output}
                className={`flex items-center gap-1 text-sm transition-colors ${copied ? 'text-green-500' : 'text-slate-500 hover:text-primary-600 dark:hover:text-primary-400'} disabled:opacity-50 disabled:cursor-not-allowed`}
              >
                {copied ? <Check size={16} /> : <Copy size={16} />}
                {copied ? 'Copied!' : 'Copy'}
              </button>
            </div>
            
            {error ? (
              <div className="flex-grow p-6 bg-rose-50 dark:bg-rose-900/10">
                <div className="flex items-start gap-3 text-rose-600 dark:text-rose-400">
                  <AlertCircle className="mt-0.5 flex-shrink-0" size={20} />
                  <div>
                    <h3 className="font-bold mb-1">Invalid JSON</h3>
                    <p className="font-mono text-sm break-all">{error}</p>
                  </div>
                </div>
              </div>
            ) : (
              <textarea
                readOnly
                value={output}
                placeholder="Result will appear here..."
                className="flex-grow w-full bg-slate-50 dark:bg-slate-900 border-0 p-6 font-mono text-sm resize-none focus:ring-0 text-slate-800 dark:text-slate-300"
              ></textarea>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default JsonFormatter;
