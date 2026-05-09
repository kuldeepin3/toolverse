import { Link } from 'react-router-dom';
import { ArrowRight, Calendar, User } from 'lucide-react';

const blogPosts = [
  {
    id: 1,
    title: 'Top 10 Essential Extensions Every Developer Needs in 2024',
    excerpt: 'Boost your productivity and streamline your workflow with these must-have VS Code extensions.',
    date: 'Oct 15, 2024',
    author: 'Alex Dev',
    category: 'Development',
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 2,
    title: 'How to Maintain a 9.0+ CGPA Without Burning Out',
    excerpt: 'A comprehensive guide for students on balancing academics, projects, and personal life effectively.',
    date: 'Sep 28, 2024',
    author: 'Sarah Scholar',
    category: 'Student Life',
    image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 3,
    title: 'Understanding JSON: A Beginner\'s Guide',
    excerpt: 'Learn the basics of JSON, why it is so popular, and how to format and parse it effectively.',
    date: 'Sep 10, 2024',
    author: 'Mark Tech',
    category: 'Tutorials',
    image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 4,
    title: 'The Ultimate Guide to Password Security in 2024',
    excerpt: 'Are your passwords safe? Discover the latest practices for creating and managing secure passwords.',
    date: 'Aug 22, 2024',
    author: 'Jane Security',
    category: 'Security',
    image: 'https://images.unsplash.com/photo-1614064641936-6250325b3e66?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
  }
];

const Blog = () => {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-6">
            The ToolVerse <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-indigo-600 dark:from-primary-400 dark:to-indigo-400">Blog</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Insights, tutorials, and guides on development, student life, and digital productivity.
          </p>
        </div>

        {/* Featured Post (First one) */}
        <div className="mb-16">
          <div className="glass-card rounded-3xl overflow-hidden shadow-xl grid grid-cols-1 lg:grid-cols-2 group hover:shadow-2xl transition-all duration-300">
            <div className="h-64 lg:h-auto overflow-hidden">
              <img 
                src={blogPosts[0].image} 
                alt={blogPosts[0].title}
                className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="p-8 md:p-12 flex flex-col justify-center">
              <span className="inline-block px-3 py-1 bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 text-sm font-semibold rounded-full mb-4 w-max">
                {blogPosts[0].category}
              </span>
              <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                <Link to="#">{blogPosts[0].title}</Link>
              </h2>
              <p className="text-slate-600 dark:text-slate-400 mb-6 text-lg">
                {blogPosts[0].excerpt}
              </p>
              <div className="flex items-center text-sm text-slate-500 dark:text-slate-400 gap-4 mb-8">
                <span className="flex items-center gap-1"><User size={16} /> {blogPosts[0].author}</span>
                <span className="flex items-center gap-1"><Calendar size={16} /> {blogPosts[0].date}</span>
              </div>
              <Link to="#" className="inline-flex items-center text-primary-600 dark:text-primary-400 font-bold hover:underline gap-1">
                Read Article <ArrowRight size={18} />
              </Link>
            </div>
          </div>
        </div>

        {/* Recent Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.slice(1).map((post) => (
            <div key={post.id} className="glass-card rounded-2xl overflow-hidden shadow-lg group hover:-translate-y-1 transition-all duration-300 flex flex-col">
              <div className="h-48 overflow-hidden relative">
                <img 
                  src={post.image} 
                  alt={post.title}
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md text-slate-900 dark:text-white text-xs font-semibold rounded-full shadow-sm">
                    {post.category}
                  </span>
                </div>
              </div>
              <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                  <Link to="#">{post.title}</Link>
                </h3>
                <p className="text-slate-600 dark:text-slate-400 text-sm mb-6 flex-grow">
                  {post.excerpt}
                </p>
                <div className="flex justify-between items-center text-xs text-slate-500 dark:text-slate-400 border-t border-slate-100 dark:border-slate-800 pt-4 mt-auto">
                  <span className="flex items-center gap-1"><User size={14} /> {post.author}</span>
                  <span className="flex items-center gap-1"><Calendar size={14} /> {post.date}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default Blog;
