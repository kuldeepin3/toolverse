import { useState } from 'react';
import { Type, Copy, Trash2 } from 'lucide-react';

const WordCounter = () => {
  const [text, setText] = useState('');

  const stats = {
    words: text.trim() ? text.trim().split(/\s+/).length : 0,
    characters: text.length,
    charactersNoSpaces: text.replace(/\s/g, '').length,
    paragraphs: text.trim() ? text.split(/\n+/).filter(p => p.trim().length > 0).length : 0,
    sentences: text.trim() ? text.split(/[.!?]+/).filter(s => s.trim().length > 0).length : 0,
    readingTime: Math.ceil((text.trim() ? text.trim().split(/\s+/).length : 0) / 200) // 200 words per minute avg
  };

  const copyToClipboard = () => {
    if (!text) return;
    navigator.clipboard.writeText(text);
  };

  const clearText = () => {
    if (window.confirm("Are you sure you want to clear the text?")) {
      setText('');
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center h-16 w-16 rounded-2xl bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 mb-6 shadow-sm">
            <Type size={32} />
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-4">Word Counter</h1>
          <p className="text-slate-600 dark:text-slate-400">Instantly count words, characters, and estimate reading time.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            <div className="glass-card rounded-3xl shadow-xl overflow-hidden flex flex-col h-full">
              <div className="bg-slate-100 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-700 px-4 py-3 flex justify-between items-center">
                <span className="text-sm font-medium text-slate-500 dark:text-slate-400">Input Text</span>
                <div className="flex gap-2">
                  <button onClick={copyToClipboard} className="p-1.5 text-slate-500 hover:text-primary-600 dark:hover:text-primary-400 transition-colors rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700" title="Copy">
                    <Copy size={18} />
                  </button>
                  <button onClick={clearText} className="p-1.5 text-slate-500 hover:text-rose-600 dark:hover:text-rose-400 transition-colors rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700" title="Clear">
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
              <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Type or paste your text here..."
                className="w-full flex-grow min-h-[400px] p-6 bg-transparent border-0 focus:ring-0 resize-none text-slate-900 dark:text-white"
              ></textarea>
            </div>
          </div>

          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="glass-card p-6 rounded-2xl text-center shadow-md border-t-4 border-t-primary-500">
                <div className="text-3xl font-bold text-slate-900 dark:text-white mb-1">{stats.words}</div>
                <div className="text-xs font-medium text-slate-500 uppercase tracking-wider">Words</div>
              </div>
              <div className="glass-card p-6 rounded-2xl text-center shadow-md border-t-4 border-t-indigo-500">
                <div className="text-3xl font-bold text-slate-900 dark:text-white mb-1">{stats.characters}</div>
                <div className="text-xs font-medium text-slate-500 uppercase tracking-wider">Characters</div>
              </div>
            </div>
            
            <div className="glass-card rounded-2xl p-6 shadow-md">
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">Detailed Stats</h3>
              <ul className="space-y-3">
                <li className="flex justify-between items-center py-2 border-b border-slate-100 dark:border-slate-800">
                  <span className="text-slate-600 dark:text-slate-400 text-sm">Characters (no spaces)</span>
                  <span className="font-semibold text-slate-900 dark:text-white">{stats.charactersNoSpaces}</span>
                </li>
                <li className="flex justify-between items-center py-2 border-b border-slate-100 dark:border-slate-800">
                  <span className="text-slate-600 dark:text-slate-400 text-sm">Sentences</span>
                  <span className="font-semibold text-slate-900 dark:text-white">{stats.sentences}</span>
                </li>
                <li className="flex justify-between items-center py-2 border-b border-slate-100 dark:border-slate-800">
                  <span className="text-slate-600 dark:text-slate-400 text-sm">Paragraphs</span>
                  <span className="font-semibold text-slate-900 dark:text-white">{stats.paragraphs}</span>
                </li>
                <li className="flex justify-between items-center py-2">
                  <span className="text-slate-600 dark:text-slate-400 text-sm">Reading Time</span>
                  <span className="font-semibold text-slate-900 dark:text-white bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 px-2 py-1 rounded text-xs">
                    ~{stats.readingTime} min
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WordCounter;
