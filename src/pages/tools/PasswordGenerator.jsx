import { useState } from 'react';
import { KeyRound, Copy, RotateCcw, Check } from 'lucide-react';

const PasswordGenerator = () => {
  const [password, setPassword] = useState('');
  const [length, setLength] = useState(16);
  const [options, setOptions] = useState({
    uppercase: true,
    lowercase: true,
    numbers: true,
    symbols: true
  });
  const [copied, setCopied] = useState(false);

  const generatePassword = () => {
    const charset = {
      uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
      lowercase: 'abcdefghijklmnopqrstuvwxyz',
      numbers: '0123456789',
      symbols: '!@#$%^&*()_+~`|}{[]:;?><,./-='
    };

    let characters = '';
    if (options.uppercase) characters += charset.uppercase;
    if (options.lowercase) characters += charset.lowercase;
    if (options.numbers) characters += charset.numbers;
    if (options.symbols) characters += charset.symbols;

    if (characters === '') {
      alert('Please select at least one character type.');
      return;
    }

    let generatedPassword = '';
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      generatedPassword += characters[randomIndex];
    }

    setPassword(generatedPassword);
    setCopied(false);
  };

  const copyToClipboard = () => {
    if (!password) return;
    navigator.clipboard.writeText(password);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const toggleOption = (key) => {
    setOptions(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center h-16 w-16 rounded-2xl bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 mb-6 shadow-sm">
            <KeyRound size={32} />
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-4">Password Generator</h1>
          <p className="text-slate-600 dark:text-slate-400">Create strong, secure, and random passwords instantly.</p>
        </div>

        <div className="glass-card rounded-3xl p-6 sm:p-8 shadow-xl">
          {/* Password Display */}
          <div className="relative mb-8 group">
            <div className="absolute inset-y-0 right-2 flex items-center gap-2">
              <button
                onClick={generatePassword}
                className="p-2 text-slate-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                title="Regenerate"
              >
                <RotateCcw size={20} />
              </button>
              <button
                onClick={copyToClipboard}
                className={`p-2 rounded-lg transition-colors ${copied ? 'bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400' : 'text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-primary-600 dark:hover:text-primary-400'}`}
                title="Copy to clipboard"
              >
                {copied ? <Check size={20} /> : <Copy size={20} />}
              </button>
            </div>
            <input
              type="text"
              readOnly
              value={password}
              placeholder="Click Generate"
              className="w-full bg-slate-100 dark:bg-slate-800 border-0 rounded-2xl py-4 pl-6 pr-24 text-xl sm:text-2xl font-mono text-slate-900 dark:text-white focus:ring-2 focus:ring-primary-500 transition-shadow"
            />
          </div>

          {/* Controls */}
          <div className="space-y-6">
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Password Length</label>
                <span className="text-lg font-bold text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-900/30 px-3 py-1 rounded-lg">{length}</span>
              </div>
              <input
                type="range"
                min="4"
                max="64"
                value={length}
                onChange={(e) => setLength(parseInt(e.target.value))}
                className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-primary-600"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { id: 'uppercase', label: 'Uppercase (A-Z)' },
                { id: 'lowercase', label: 'Lowercase (a-z)' },
                { id: 'numbers', label: 'Numbers (0-9)' },
                { id: 'symbols', label: 'Symbols (!@#$)' }
              ].map(opt => (
                <label key={opt.id} className="flex items-center gap-3 p-4 border border-slate-200 dark:border-slate-700 rounded-xl cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                  <div className="relative flex items-center">
                    <input
                      type="checkbox"
                      checked={options[opt.id]}
                      onChange={() => toggleOption(opt.id)}
                      className="w-5 h-5 border-2 border-slate-300 dark:border-slate-600 rounded text-primary-600 focus:ring-primary-500 bg-transparent transition-colors cursor-pointer"
                    />
                  </div>
                  <span className="text-sm font-medium text-slate-700 dark:text-slate-300">{opt.label}</span>
                </label>
              ))}
            </div>

            <button
              onClick={generatePassword}
              className="w-full py-4 bg-gradient-to-r from-primary-600 to-indigo-600 hover:from-primary-700 hover:to-indigo-700 text-white rounded-xl font-bold text-lg transition-all shadow-lg hover:shadow-xl"
            >
              Generate Password
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PasswordGenerator;
