import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, Filter, ArrowRight } from 'lucide-react';
import { toolsData } from '../data/toolsData';

const Tools = () => {
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  
  const categories = ['All', ...new Set(toolsData.map(tool => tool.category))];

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const search = params.get('search');
    const category = params.get('category');
    
    if (search) setSearchQuery(search);
    if (category && categories.includes(category)) setActiveCategory(category);
  }, [location]);

  const filteredTools = toolsData.filter(tool => {
    const matchesSearch = tool.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          tool.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === 'All' || tool.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 transition-colors duration-300 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4">
            All Tools
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Browse our collection of free utilities designed to make your life easier.
          </p>
        </div>

        {/* Search and Filter */}
        <div className="flex flex-col md:flex-row gap-4 mb-10 justify-between items-center">
          <div className="relative w-full md:max-w-md">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-slate-400" />
            </div>
            <input
              type="text"
              placeholder="Search tools..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="block w-full pl-10 pr-3 py-3 rounded-xl border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-sm focus:ring-2 focus:ring-primary-500 transition-colors"
            />
          </div>

          <div className="flex gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-hide">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  activeCategory === category
                    ? 'bg-primary-600 text-white'
                    : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Tools Grid */}
        {filteredTools.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredTools.map((tool) => (
              <Link 
                key={tool.id} 
                to={tool.path}
                className="group flex flex-col glass-card rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:border-primary-500/30 dark:hover:border-primary-400/30"
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="h-12 w-12 rounded-xl bg-primary-100 dark:bg-slate-800 text-primary-600 dark:text-primary-400 flex items-center justify-center group-hover:scale-110 group-hover:bg-primary-600 group-hover:text-white transition-all duration-300">
                    <tool.icon size={24} />
                  </div>
                  <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300">
                    {tool.category}
                  </span>
                </div>
                <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">{tool.title}</h3>
                <p className="text-slate-600 dark:text-slate-400 text-sm flex-grow mb-4">{tool.description}</p>
                <div className="mt-auto flex items-center text-sm font-medium text-primary-600 dark:text-primary-400 group-hover:gap-2 transition-all">
                  Open Tool <ArrowRight size={16} className="ml-1 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 glass-card rounded-2xl">
            <Filter className="mx-auto h-12 w-12 text-slate-400 mb-4" />
            <h3 className="text-lg font-medium text-slate-900 dark:text-white mb-2">No tools found</h3>
            <p className="text-slate-500 dark:text-slate-400">
              We couldn't find any tools matching your current search or filter.
            </p>
            <button 
              onClick={() => { setSearchQuery(''); setActiveCategory('All'); }}
              className="mt-4 text-primary-600 dark:text-primary-400 font-medium hover:underline"
            >
              Clear all filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Tools;
