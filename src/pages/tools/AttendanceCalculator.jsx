import { useState } from 'react';
import { CalendarDays } from 'lucide-react';

const AttendanceCalculator = () => {
  const [attended, setAttended] = useState('');
  const [total, setTotal] = useState('');
  const [target, setTarget] = useState('75');
  const [result, setResult] = useState(null);

  const calculate = () => {
    const a = parseInt(attended);
    const t = parseInt(total);
    const targetPct = parseInt(target);

    if (isNaN(a) || isNaN(t) || isNaN(targetPct) || a < 0 || t < 0 || a > t || targetPct < 1 || targetPct > 100) {
      alert('Please enter valid numbers. Attended classes cannot be greater than total classes.');
      return;
    }

    const currentPct = (a / t) * 100;
    
    let message = '';
    let classesToAttend = 0;
    let classesToSkip = 0;

    if (currentPct < targetPct) {
      // Need to attend more classes
      // (a + x) / (t + x) >= target/100
      // 100a + 100x = target*t + target*x
      // x(100 - target) = target*t - 100a
      classesToAttend = Math.ceil((targetPct * t - 100 * a) / (100 - targetPct));
      message = `You need to attend ${classesToAttend} more consecutive classes to reach ${targetPct}%.`;
    } else if (currentPct > targetPct) {
      // Can skip some classes
      // a / (t + x) = target/100
      // 100a = target*t + target*x
      classesToSkip = Math.floor((100 * a - targetPct * t) / targetPct);
      message = `You can safely skip the next ${classesToSkip} classes and stay above ${targetPct}%.`;
    } else {
      message = `You are exactly at ${targetPct}%. Don't skip the next class!`;
    }

    setResult({
      currentPct: currentPct.toFixed(2),
      message
    });
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-xl mx-auto">
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center h-16 w-16 rounded-2xl bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 mb-6 shadow-sm">
            <CalendarDays size={32} />
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-4">Attendance Calculator</h1>
          <p className="text-slate-600 dark:text-slate-400">Find out how many classes you need to attend or can skip.</p>
        </div>

        <div className="glass-card rounded-3xl p-6 sm:p-8 shadow-xl">
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Classes Attended</label>
              <input
                type="number"
                min="0"
                value={attended}
                onChange={(e) => setAttended(e.target.value)}
                className="w-full bg-white dark:bg-slate-800 border-0 ring-1 ring-slate-200 dark:ring-slate-700 focus:ring-2 focus:ring-primary-500 rounded-xl px-4 py-3 text-slate-900 dark:text-white transition-all"
                placeholder="e.g. 30"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Total Classes Conducted</label>
              <input
                type="number"
                min="0"
                value={total}
                onChange={(e) => setTotal(e.target.value)}
                className="w-full bg-white dark:bg-slate-800 border-0 ring-1 ring-slate-200 dark:ring-slate-700 focus:ring-2 focus:ring-primary-500 rounded-xl px-4 py-3 text-slate-900 dark:text-white transition-all"
                placeholder="e.g. 45"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Target Attendance (%)</label>
              <input
                type="number"
                min="1"
                max="100"
                value={target}
                onChange={(e) => setTarget(e.target.value)}
                className="w-full bg-white dark:bg-slate-800 border-0 ring-1 ring-slate-200 dark:ring-slate-700 focus:ring-2 focus:ring-primary-500 rounded-xl px-4 py-3 text-slate-900 dark:text-white transition-all"
                placeholder="e.g. 75"
              />
            </div>

            <button
              onClick={calculate}
              className="w-full py-4 bg-gradient-to-r from-primary-600 to-indigo-600 hover:from-primary-700 hover:to-indigo-700 text-white rounded-xl font-bold text-lg transition-all shadow-lg hover:shadow-xl mt-4"
            >
              Calculate
            </button>
          </div>

          {result && (
            <div className="mt-8 p-6 bg-slate-100 dark:bg-slate-800/50 rounded-2xl border border-slate-200 dark:border-slate-700 text-center animate-fade-in-up">
              <h3 className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-2">Current Attendance</h3>
              <div className={`text-5xl font-extrabold mb-4 ${parseFloat(result.currentPct) >= parseInt(target) ? 'text-green-500' : 'text-rose-500'}`}>
                {result.currentPct}%
              </div>
              <p className="text-lg font-medium text-slate-700 dark:text-slate-300 leading-relaxed">
                {result.message}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AttendanceCalculator;
