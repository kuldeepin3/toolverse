import { Link } from 'react-router-dom';
import { Rocket, MessageCircle, Code, Briefcase, Mail } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="bg-gradient-to-br from-primary-500 to-indigo-600 p-1.5 rounded-lg text-white">
                <Rocket size={20} />
              </div>
              <span className="font-bold text-xl bg-clip-text text-transparent bg-gradient-to-r from-primary-600 to-indigo-600 dark:from-primary-400 dark:to-indigo-400">
                ToolVerse
              </span>
            </Link>
            <p className="text-slate-600 dark:text-slate-400 mb-6 max-w-sm">
              Free, fast, and simple online tools for students, developers, and creators. Elevate your productivity today.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-slate-400 hover:text-primary-500 transition-colors">
                <MessageCircle size={20} />
              </a>
              <a href="#" className="text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors">
                <Code size={20} />
              </a>
              <a href="#" className="text-slate-400 hover:text-indigo-500 transition-colors">
                <Briefcase size={20} />
              </a>
              <a href="#" className="text-slate-400 hover:text-rose-500 transition-colors">
                <Mail size={20} />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="font-semibold text-slate-900 dark:text-white mb-4">Quick Links</h3>
            <ul className="space-y-3">
              <li><Link to="/tools" className="text-slate-600 dark:text-slate-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">All Tools</Link></li>
              <li><Link to="/blog" className="text-slate-600 dark:text-slate-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">Blog</Link></li>
              <li><Link to="/about" className="text-slate-600 dark:text-slate-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">About Us</Link></li>
              <li><Link to="/contact" className="text-slate-600 dark:text-slate-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-slate-900 dark:text-white mb-4">Categories</h3>
            <ul className="space-y-3">
              <li><Link to="/tools?category=Student" className="text-slate-600 dark:text-slate-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">Student Utilities</Link></li>
              <li><Link to="/tools?category=Developer" className="text-slate-600 dark:text-slate-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">Developer Tools</Link></li>
              <li><Link to="/tools?category=Media" className="text-slate-600 dark:text-slate-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">Media Converters</Link></li>
              <li><Link to="/tools?category=Health" className="text-slate-600 dark:text-slate-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">Health Calculators</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-slate-200 dark:border-slate-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-slate-500 dark:text-slate-400 text-sm">
            &copy; {new Date().getFullYear()} ToolVerse. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0 text-sm text-slate-500 dark:text-slate-400">
            <Link to="/privacy" className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
