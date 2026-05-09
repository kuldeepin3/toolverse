import { useState } from 'react';
import { Plus, Trash2, Calculator, RotateCcw } from 'lucide-react';

const CgpaCalculator = () => {
  const [semesters, setSemesters] = useState([
    { id: 1, name: 'Semester 1', sgpa: '', credits: '' }
  ]);
  const [result, setResult] = useState(null);

  const addSemester = () => {
    setSemesters([...semesters, { id: Date.now(), name: `Semester ${semesters.length + 1}`, sgpa: '', credits: '' }]);
  };

  const removeSemester = (id) => {
    if (semesters.length > 1) {
      setSemesters(semesters.filter(sem => sem.id !== id));
    }
  };

  const updateSemester = (id, field, value) => {
    setSemesters(semesters.map(sem => 
      sem.id === id ? { ...sem, [field]: value } : sem
    ));
  };

  const calculateCGPA = () => {
    let totalCredits = 0;
    let totalPoints = 0;
    let valid = true;

    semesters.forEach(sem => {
      const sgpa = parseFloat(sem.sgpa);
      const credits = parseFloat(sem.credits);

      if (isNaN(sgpa) || isNaN(credits) || sgpa < 0 || sgpa > 10 || credits <= 0) {
        valid = false;
      } else {
        totalCredits += credits;
        totalPoints += (sgpa * credits);
      }
    });

    if (valid && totalCredits > 0) {
      const cgpa = (totalPoints / totalCredits).toFixed(2);
      setResult({ cgpa, totalCredits });
    } else {
      alert("Please enter valid SGPA (0-10) and Credits (>0) for all fields.");
    }
  };

  const reset = () => {
    setSemesters([{ id: 1, name: 'Semester 1', sgpa: '', credits: '' }]);
    setResult(null);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center h-16 w-16 rounded-2xl bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 mb-6 shadow-sm">
            <Calculator size={32} />
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-4">CGPA Calculator</h1>
          <p className="text-slate-600 dark:text-slate-400">Calculate your Cumulative Grade Point Average easily.</p>
        </div>

        <div className="glass-card rounded-3xl p-6 sm:p-8 shadow-xl">
          <div className="space-y-4 mb-8">
            <div className="grid grid-cols-12 gap-4 text-sm font-semibold text-slate-500 dark:text-slate-400 mb-2 px-2 hidden sm:grid">
              <div className="col-span-5">Semester Name</div>
              <div className="col-span-3">SGPA (0-10)</div>
              <div className="col-span-3">Credits</div>
              <div className="col-span-1 text-center">Action</div>
            </div>

            {semesters.map((sem, index) => (
              <div key={sem.id} className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-center bg-white dark:bg-slate-800 p-4 sm:p-2 rounded-xl border border-slate-100 dark:border-slate-700 transition-all hover:border-primary-300 dark:hover:border-primary-700">
                <div className="col-span-1 sm:col-span-5">
                  <label className="block sm:hidden text-xs font-medium text-slate-500 mb-1">Semester Name</label>
                  <input
                    type="text"
                    value={sem.name}
                    onChange={(e) => updateSemester(sem.id, 'name', e.target.value)}
                    className="w-full bg-transparent border-0 ring-1 ring-slate-200 dark:ring-slate-700 focus:ring-2 focus:ring-primary-500 rounded-lg px-3 py-2 text-slate-900 dark:text-white"
                  />
                </div>
                <div className="col-span-1 sm:col-span-3">
                  <label className="block sm:hidden text-xs font-medium text-slate-500 mb-1">SGPA</label>
                  <input
                    type="number"
                    min="0"
                    max="10"
                    step="0.01"
                    placeholder="e.g. 8.5"
                    value={sem.sgpa}
                    onChange={(e) => updateSemester(sem.id, 'sgpa', e.target.value)}
                    className="w-full bg-transparent border-0 ring-1 ring-slate-200 dark:ring-slate-700 focus:ring-2 focus:ring-primary-500 rounded-lg px-3 py-2 text-slate-900 dark:text-white"
                  />
                </div>
                <div className="col-span-1 sm:col-span-3">
                  <label className="block sm:hidden text-xs font-medium text-slate-500 mb-1">Credits</label>
                  <input
                    type="number"
                    min="1"
                    placeholder="e.g. 20"
                    value={sem.credits}
                    onChange={(e) => updateSemester(sem.id, 'credits', e.target.value)}
                    className="w-full bg-transparent border-0 ring-1 ring-slate-200 dark:ring-slate-700 focus:ring-2 focus:ring-primary-500 rounded-lg px-3 py-2 text-slate-900 dark:text-white"
                  />
                </div>
                <div className="col-span-1 flex justify-end sm:justify-center">
                  <button
                    onClick={() => removeSemester(sem.id)}
                    disabled={semesters.length === 1}
                    className="p-2 text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-500/10 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    title="Remove Semester"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap gap-4 mb-8">
            <button
              onClick={addSemester}
              className="flex items-center gap-2 px-4 py-2 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-xl font-medium hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
            >
              <Plus size={18} /> Add Semester
            </button>
            <button
              onClick={reset}
              className="flex items-center gap-2 px-4 py-2 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-xl font-medium hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors ml-auto"
            >
              <RotateCcw size={18} /> Reset
            </button>
            <button
              onClick={calculateCGPA}
              className="flex items-center justify-center w-full sm:w-auto gap-2 px-8 py-3 bg-gradient-to-r from-primary-600 to-indigo-600 hover:from-primary-700 hover:to-indigo-700 text-white rounded-xl font-medium transition-all shadow-md hover:shadow-lg"
            >
              Calculate CGPA
            </button>
          </div>

          {result && (
            <div className="mt-8 p-6 bg-gradient-to-br from-primary-50 to-indigo-50 dark:from-primary-900/20 dark:to-indigo-900/20 rounded-2xl border border-primary-100 dark:border-primary-800/30 text-center animate-fade-in-up">
              <h3 className="text-lg font-medium text-slate-600 dark:text-slate-400 mb-2">Your Estimated CGPA</h3>
              <div className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-indigo-600 dark:from-primary-400 dark:to-indigo-400 mb-4">
                {result.cgpa}
              </div>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Based on {result.totalCredits} total credits.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CgpaCalculator;
