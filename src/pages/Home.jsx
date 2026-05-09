import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, ArrowRight, Star } from 'lucide-react';
import { toolsData } from '../data/toolsData';

const Home = () => {
  const [searchQuery, setSearchQuery] = useState('');
  
  const popularTools = toolsData.filter(tool => tool.popular);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-20 pb-24 lg:pt-32 lg:pb-32">
        {/* Background Gradients */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full overflow-hidden -z-10 pointer-events-none">
          <div className="absolute top-0 right-1/4 w-96 h-96 bg-primary-400/20 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob"></div>
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-400/20 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-8 left-1/3 w-96 h-96 bg-rose-400/20 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-4000 dark:bg-rose-500/10 dark:mix-blend-screen"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white mb-6">
            Free <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-indigo-600 dark:from-primary-400 dark:to-indigo-400">Student & Developer</span> Tools
          </h1>
          <p className="mt-4 max-w-2xl text-lg md:text-xl text-slate-600 dark:text-slate-300 mx-auto mb-10">
            Fast, simple, and useful online tools for students, programmers, and creators. Elevate your workflow with our premium utilities.
          </p>
          
          <div className="max-w-2xl mx-auto relative group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-slate-400 group-focus-within:text-primary-500 transition-colors" />
            </div>
            <input
              type="text"
              placeholder="Search for tools (e.g., CGPA, QR Code, JSON)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="block w-full pl-12 pr-4 py-4 rounded-2xl border-0 ring-1 ring-slate-200 dark:ring-slate-700 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm text-slate-900 dark:text-white shadow-lg focus:ring-2 focus:ring-primary-500 transition-all text-lg"
            />
            <div className="absolute inset-y-2 right-2 flex items-center">
              <Link 
                to={`/tools${searchQuery ? `?search=${searchQuery}` : ''}`}
                className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-2 rounded-xl font-medium transition-colors"
              >
                Find Tool
              </Link>
            </div>
          </div>
          
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Link to="/tools" className="px-8 py-3 rounded-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-semibold hover:bg-slate-800 dark:hover:bg-slate-100 transition-all shadow-md hover:shadow-lg flex items-center gap-2">
              Explore All Tools <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Tools */}
      <section className="py-16 bg-white dark:bg-slate-900 transition-colors duration-300 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-10">
            <div>
              <h2 className="text-3xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Star className="text-amber-500 fill-amber-500" size={28} /> Popular Tools
              </h2>
              <p className="mt-2 text-slate-600 dark:text-slate-400">Our most frequently used utilities.</p>
            </div>
            <Link to="/tools" className="hidden sm:flex text-primary-600 dark:text-primary-400 font-medium items-center gap-1 hover:underline">
              View all <ArrowRight size={16} />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {popularTools.map((tool) => (
              <Link 
                key={tool.id} 
                to={tool.path}
                className="group flex flex-col glass-card rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:border-primary-500/30 dark:hover:border-primary-400/30"
              >
                <div className="h-12 w-12 rounded-xl bg-primary-100 dark:bg-slate-800 text-primary-600 dark:text-primary-400 flex items-center justify-center mb-4 group-hover:scale-110 group-hover:bg-primary-600 group-hover:text-white transition-all duration-300">
                  <tool.icon size={24} />
                </div>
                <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">{tool.title}</h3>
                <p className="text-slate-600 dark:text-slate-400 text-sm flex-grow mb-4">{tool.description}</p>
                <div className="mt-auto flex items-center text-sm font-medium text-primary-600 dark:text-primary-400 group-hover:gap-2 transition-all">
                  Open Tool <ArrowRight size={16} className="ml-1 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                </div>
              </Link>
            ))}
          </div>
          
          <div className="mt-8 text-center sm:hidden">
            <Link to="/tools" className="inline-flex items-center justify-center px-6 py-3 border border-slate-300 dark:border-slate-700 rounded-full text-base font-medium text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors w-full">
              View all tools
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-primary-600 dark:bg-primary-900 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl md:text-5xl font-bold text-white mb-2">10+</div>
              <div className="text-primary-100 font-medium">Free Tools</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold text-white mb-2">0</div>
              <div className="text-primary-100 font-medium">Ads</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold text-white mb-2">100%</div>
              <div className="text-primary-100 font-medium">Free forever</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold text-white mb-2">24/7</div>
              <div className="text-primary-100 font-medium">Available</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
