import { useState } from 'react';
import { Activity } from 'lucide-react';

const BmiCalculator = () => {
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [unit, setUnit] = useState('metric'); // metric or imperial
  const [result, setResult] = useState(null);

  const calculateBMI = () => {
    let h = parseFloat(height);
    let w = parseFloat(weight);

    if (isNaN(h) || isNaN(w) || h <= 0 || w <= 0) {
      alert("Please enter valid height and weight values.");
      return;
    }

    let bmiValue;

    if (unit === 'metric') {
      // height in cm, convert to meters
      h = h / 100;
      bmiValue = w / (h * h);
    } else {
      // height in inches, weight in lbs
      bmiValue = 703 * (w / (h * h));
    }

    let category = '';
    let colorClass = '';

    if (bmiValue < 18.5) {
      category = 'Underweight';
      colorClass = 'text-amber-500';
    } else if (bmiValue >= 18.5 && bmiValue < 24.9) {
      category = 'Normal weight';
      colorClass = 'text-green-500';
    } else if (bmiValue >= 25 && bmiValue < 29.9) {
      category = 'Overweight';
      colorClass = 'text-orange-500';
    } else {
      category = 'Obese';
      colorClass = 'text-rose-500';
    }

    setResult({
      value: bmiValue.toFixed(1),
      category,
      colorClass
    });
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-xl mx-auto">
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center h-16 w-16 rounded-2xl bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 mb-6 shadow-sm">
            <Activity size={32} />
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-4">BMI Calculator</h1>
          <p className="text-slate-600 dark:text-slate-400">Check your Body Mass Index to monitor your health.</p>
        </div>

        <div className="glass-card rounded-3xl p-6 sm:p-8 shadow-xl">
          <div className="flex justify-center mb-8">
            <div className="inline-flex bg-slate-100 dark:bg-slate-800 p-1 rounded-xl">
              <button
                onClick={() => { setUnit('metric'); setResult(null); setHeight(''); setWeight(''); }}
                className={`px-6 py-2 rounded-lg text-sm font-medium transition-colors ${unit === 'metric' ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm' : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'}`}
              >
                Metric (cm/kg)
              </button>
              <button
                onClick={() => { setUnit('imperial'); setResult(null); setHeight(''); setWeight(''); }}
                className={`px-6 py-2 rounded-lg text-sm font-medium transition-colors ${unit === 'imperial' ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm' : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'}`}
              >
                Imperial (in/lbs)
              </button>
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                Height ({unit === 'metric' ? 'cm' : 'inches'})
              </label>
              <input
                type="number"
                min="0"
                value={height}
                onChange={(e) => setHeight(e.target.value)}
                className="w-full bg-white dark:bg-slate-800 border-0 ring-1 ring-slate-200 dark:ring-slate-700 focus:ring-2 focus:ring-primary-500 rounded-xl px-4 py-3 text-slate-900 dark:text-white transition-all"
                placeholder={unit === 'metric' ? 'e.g. 175' : 'e.g. 70'}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                Weight ({unit === 'metric' ? 'kg' : 'lbs'})
              </label>
              <input
                type="number"
                min="0"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                className="w-full bg-white dark:bg-slate-800 border-0 ring-1 ring-slate-200 dark:ring-slate-700 focus:ring-2 focus:ring-primary-500 rounded-xl px-4 py-3 text-slate-900 dark:text-white transition-all"
                placeholder={unit === 'metric' ? 'e.g. 70' : 'e.g. 150'}
              />
            </div>

            <button
              onClick={calculateBMI}
              className="w-full py-4 bg-gradient-to-r from-primary-600 to-indigo-600 hover:from-primary-700 hover:to-indigo-700 text-white rounded-xl font-bold text-lg transition-all shadow-lg hover:shadow-xl mt-4"
            >
              Calculate BMI
            </button>
          </div>

          {result && (
            <div className="mt-8 p-6 bg-slate-100 dark:bg-slate-800/50 rounded-2xl border border-slate-200 dark:border-slate-700 text-center animate-fade-in-up">
              <h3 className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-2">Your BMI</h3>
              <div className={`text-6xl font-extrabold mb-4 ${result.colorClass}`}>
                {result.value}
              </div>
              <p className="text-lg font-medium text-slate-700 dark:text-slate-300">
                You are considered <span className={result.colorClass}>{result.category}</span>.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BmiCalculator;
