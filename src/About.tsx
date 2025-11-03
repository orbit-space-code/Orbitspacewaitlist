interface AboutProps {
  onNavigateHome: () => void;
}

export default function About({ onNavigateHome }: AboutProps) {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-sm border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">O</span>
            </div>
            <span className="text-white text-xl font-bold">OrbitSpace</span>
          </div>
          <div className="flex items-center space-x-6">
            <button
              onClick={onNavigateHome}
              className="text-gray-400 hover:text-white transition-colors text-sm font-medium"
            >
              Home
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="pt-32 px-6 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
              Where Ideas Take Flight
            </h1>
            <p className="text-xl text-gray-300 leading-relaxed">
              Welcome to OrbitSpace – a revolutionary platform designed to transform the way developers, 
              creators, and innovators bring their ideas to life. We believe that technology should empower 
              everyone, making complex development accessible, intuitive, and beautiful.
            </p>
          </div>

          {/* Mission Section */}
          <div className="mb-16 p-8 bg-white/5 border border-white/10 rounded-xl">
            <h2 className="text-3xl font-bold text-white mb-4">Our Mission</h2>
            <p className="text-gray-300 leading-relaxed mb-4">
              At OrbitSpace, we're on a mission to democratize software development. We envision a world 
              where anyone with a dream can build, deploy, and scale applications without the traditional 
              barriers of complexity and cost. Our platform combines cutting-edge AI technology with an 
              intuitive interface, enabling creators to focus on what matters most – their vision.
            </p>
            <p className="text-gray-300 leading-relaxed">
              In a rapidly evolving digital landscape, we understand that speed, efficiency, and creativity 
              are paramount. OrbitSpace bridges the gap between imagination and implementation, providing 
              powerful tools that adapt to your workflow, not the other way around.
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-2 gap-6 mb-16">
            <div className="p-6 bg-white/5 border border-white/10 rounded-xl">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl">🤖</span>
              </div>
              <h3 className="text-white font-semibold text-xl mb-2">AI-Powered Development</h3>
              <p className="text-gray-400">
                Leverage intelligent assistance that understands your goals and helps you code smarter.
              </p>
            </div>

            <div className="p-6 bg-white/5 border border-white/10 rounded-xl">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl">⚡</span>
              </div>
              <h3 className="text-white font-semibold text-xl mb-2">Lightning Fast</h3>
              <p className="text-gray-400">
                Build and iterate at the speed of thought with our optimized infrastructure.
              </p>
            </div>

            <div className="p-6 bg-white/5 border border-white/10 rounded-xl">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl">🎨</span>
              </div>
              <h3 className="text-white font-semibold text-xl mb-2">Beautiful by Design</h3>
              <p className="text-gray-400">
                Create stunning applications with our design-first approach and modern UI components.
              </p>
            </div>

            <div className="p-6 bg-white/5 border border-white/10 rounded-xl">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl">🚀</span>
              </div>
              <h3 className="text-white font-semibold text-xl mb-2">Built for Everyone</h3>
              <p className="text-gray-400">
                From solo developers to enterprise teams, OrbitSpace scales with your ambitions.
              </p>
            </div>
          </div>

          {/* Philosophy Section */}
          <div className="mb-16 p-8 bg-white/5 border border-white/10 rounded-xl">
            <p className="text-gray-300 leading-relaxed mb-4">
              We're more than just a platform – we're a community of builders, dreamers, and doers who 
              believe that the future of technology is collaborative, accessible, and boundlessly creative. 
              Every feature we build, every line of code we write, is driven by our commitment to your success.
            </p>
            <p className="text-gray-300 leading-relaxed">
              Join us on this journey as we redefine what's possible in software development. Together, 
              we'll reach new heights and explore uncharted territories in the vast universe of innovation. 
              You taught us that technology without purpose is hollow, that excellence demands integrity, 
              and that the greatest achievements are those that lift others up. OrbitSpace embodies these truths.
            </p>
          </div>

          {/* Founder Section */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-white mb-8 text-center">Meet the Founder</h2>
            <div className="max-w-md mx-auto p-8 bg-white/5 border border-white/10 rounded-xl text-center">
              <div className="w-24 h-24 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold text-3xl">HR</span>
              </div>
              <h3 className="text-white font-semibold text-2xl mb-2">Harshavardhan Ravilla</h3>
              <a 
                href="mailto:harsha@orbitspace.org" 
                className="text-gray-400 hover:text-gray-300 transition-colors"
              >
                harsha@orbitspace.org
              </a>
            </div>
          </div>

          {/* Dedication Section */}
          <div className="p-8 bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 rounded-xl text-center">
            <h2 className="text-2xl font-bold text-white mb-4">Dedication to PK</h2>
            <p className="text-gray-300 leading-relaxed italic">
              In every success we achieve, you are there—not as a memory, but as a guiding light. 
              Thank you for believing in us. Thank you for everything.
            </p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="px-6 py-8 border-t border-white/10 mt-12">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-gray-400 text-sm mb-2">
            © 2025 OrbitSpace. All Rights Reserved.
          </p>
          <p className="text-gray-500 text-sm">
            OrbitSpace is built with ❤️ and we dedicate this to PK.
          </p>
        </div>
      </footer>
    </div>
  );
}
