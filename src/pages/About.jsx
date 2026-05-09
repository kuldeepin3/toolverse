import { Rocket, Users, Shield, Zap } from 'lucide-react';

const About = () => {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-16">
        
        {/* Header */}
        <div className="text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-6">
            About <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-indigo-600 dark:from-primary-400 dark:to-indigo-400">ToolVerse</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            We build simple, fast, and free online tools to help students, developers, and creators work more efficiently.
          </p>
        </div>

        {/* Mission */}
        <div className="glass-card rounded-3xl p-8 md:p-12 shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary-400/10 rounded-full mix-blend-multiply filter blur-3xl -translate-y-1/2 translate-x-1/3"></div>
          
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4 relative z-10">Our Mission</h2>
          <p className="text-slate-600 dark:text-slate-400 mb-6 leading-relaxed relative z-10">
            In a world filled with paywalls, ads, and complex interfaces, ToolVerse aims to provide a breath of fresh air. 
            We believe that basic utility tools should be free, accessible, and enjoyable to use. That's why we're committed 
            to building high-quality, ad-free tools that solve real problems without the hassle.
          </p>
          <p className="text-slate-600 dark:text-slate-400 leading-relaxed relative z-10">
            Whether you're a student trying to calculate your CGPA, a developer needing to format JSON, or a creator compressing images,
            ToolVerse is here to make your life just a little bit easier.
          </p>
        </div>

        {/* Values Grid */}
        <div>
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-10 text-center">Why Choose Us?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="glass-card p-6 rounded-2xl flex gap-4">
              <div className="flex-shrink-0 mt-1">
                <div className="p-3 bg-primary-100 dark:bg-slate-800 text-primary-600 dark:text-primary-400 rounded-xl">
                  <Zap size={24} />
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Lightning Fast</h3>
                <p className="text-slate-600 dark:text-slate-400 text-sm">
                  Our tools run entirely in your browser. No server processing means instant results and faster workflows.
                </p>
              </div>
            </div>
            
            <div className="glass-card p-6 rounded-2xl flex gap-4">
              <div className="flex-shrink-0 mt-1">
                <div className="p-3 bg-indigo-100 dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 rounded-xl">
                  <Shield size={24} />
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Privacy First</h3>
                <p className="text-slate-600 dark:text-slate-400 text-sm">
                  We don't store your data. Since most tools run client-side, your files, passwords, and data never leave your device.
                </p>
              </div>
            </div>
            
            <div className="glass-card p-6 rounded-2xl flex gap-4">
              <div className="flex-shrink-0 mt-1">
                <div className="p-3 bg-rose-100 dark:bg-slate-800 text-rose-600 dark:text-rose-400 rounded-xl">
                  <Users size={24} />
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">User Centric</h3>
                <p className="text-slate-600 dark:text-slate-400 text-sm">
                  We design our tools with a focus on simplicity and aesthetics, ensuring an intuitive and pleasing user experience.
                </p>
              </div>
            </div>
            
            <div className="glass-card p-6 rounded-2xl flex gap-4">
              <div className="flex-shrink-0 mt-1">
                <div className="p-3 bg-amber-100 dark:bg-slate-800 text-amber-600 dark:text-amber-400 rounded-xl">
                  <Rocket size={24} />
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Constantly Evolving</h3>
                <p className="text-slate-600 dark:text-slate-400 text-sm">
                  We are continually adding new tools and improving existing ones based on user feedback and technological advancements.
                </p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default About;
