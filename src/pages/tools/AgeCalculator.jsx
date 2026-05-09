import { useState } from 'react';
import { Clock } from 'lucide-react';

const AgeCalculator = () => {
  const [dob, setDob] = useState('');
  const [result, setResult] = useState(null);

  const calculateAge = () => {
    if (!dob) {
      alert("Please select a valid date of birth.");
      return;
    }

    const birthDate = new Date(dob);
    const today = new Date();

    if (birthDate > today) {
      alert("Date of birth cannot be in the future!");
      return;
    }

    let years = today.getFullYear() - birthDate.getFullYear();
    let months = today.getMonth() - birthDate.getMonth();
    let days = today.getDate() - birthDate.getDate();

    if (days < 0) {
      months--;
      // Get the number of days in the previous month
      const previousMonth = new Date(today.getFullYear(), today.getMonth(), 0).getDate();
      days += previousMonth;
    }

    if (months < 0) {
      years--;
      months += 12;
    }

    // Calculate next birthday
    const nextBirthday = new Date(today.getFullYear(), birthDate.getMonth(), birthDate.getDate());
    if (today > nextBirthday) {
      nextBirthday.setFullYear(today.getFullYear() + 1);
    }
    
    const diffTime = Math.abs(nextBirthday - today);
    const daysToNextBirthday = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    setResult({
      years,
      months,
      days,
      daysToNextBirthday
    });
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-xl mx-auto">
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center h-16 w-16 rounded-2xl bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 mb-6 shadow-sm">
            <Clock size={32} />
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-4">Age Calculator</h1>
          <p className="text-slate-600 dark:text-slate-400">Calculate your exact age and see when your next birthday is.</p>
        </div>

        <div className="glass-card rounded-3xl p-6 sm:p-8 shadow-xl">
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Date of Birth</label>
              <input
                type="date"
                value={dob}
                onChange={(e) => setDob(e.target.value)}
                className="w-full bg-white dark:bg-slate-800 border-0 ring-1 ring-slate-200 dark:ring-slate-700 focus:ring-2 focus:ring-primary-500 rounded-xl px-4 py-3 text-slate-900 dark:text-white transition-all"
              />
            </div>

            <button
              onClick={calculateAge}
              className="w-full py-4 bg-gradient-to-r from-primary-600 to-indigo-600 hover:from-primary-700 hover:to-indigo-700 text-white rounded-xl font-bold text-lg transition-all shadow-lg hover:shadow-xl mt-4"
            >
              Calculate Age
            </button>
          </div>

          {result && (
            <div className="mt-8 animate-fade-in-up">
              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="bg-slate-100 dark:bg-slate-800/50 p-4 rounded-2xl border border-slate-200 dark:border-slate-700 text-center">
                  <div className="text-3xl font-bold text-primary-600 dark:text-primary-400">{result.years}</div>
                  <div className="text-xs text-slate-500 font-medium uppercase tracking-wider mt-1">Years</div>
                </div>
                <div className="bg-slate-100 dark:bg-slate-800/50 p-4 rounded-2xl border border-slate-200 dark:border-slate-700 text-center">
                  <div className="text-3xl font-bold text-primary-600 dark:text-primary-400">{result.months}</div>
                  <div className="text-xs text-slate-500 font-medium uppercase tracking-wider mt-1">Months</div>
                </div>
                <div className="bg-slate-100 dark:bg-slate-800/50 p-4 rounded-2xl border border-slate-200 dark:border-slate-700 text-center">
                  <div className="text-3xl font-bold text-primary-600 dark:text-primary-400">{result.days}</div>
                  <div className="text-xs text-slate-500 font-medium uppercase tracking-wider mt-1">Days</div>
                </div>
              </div>
              
              <div className="bg-gradient-to-r from-primary-50 to-indigo-50 dark:from-primary-900/20 dark:to-indigo-900/20 p-6 rounded-2xl border border-primary-100 dark:border-primary-800/30 text-center">
                <p className="text-slate-600 dark:text-slate-400 font-medium mb-1">Your next birthday is in</p>
                <div className="text-2xl font-bold text-slate-900 dark:text-white">
                  {result.daysToNextBirthday} {result.daysToNextBirthday === 1 ? 'day' : 'days'}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AgeCalculator;
