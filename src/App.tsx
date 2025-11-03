import { useState } from "react";
import { useMutation, useQuery } from "convex/react";
import { api } from "../convex/_generated/api";
import { toast, Toaster } from "sonner";
import About from "./About";

export default function App() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [currentPage, setCurrentPage] = useState<"home" | "about">("home");

  const submitWaitlist = useMutation(api.waitlist.submitWaitlistEntry);
  const stats = useQuery(api.waitlist.getWaitlistStats);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!fullName.trim() || !email.trim()) {
      toast.error("Please fill in all fields");
      return;
    }

    setIsSubmitting(true);
    
    try {
      await submitWaitlist({
        fullName: fullName.trim(),
        email: email.trim(),
      });
      
      setIsSubmitted(true);
      toast.success("Successfully joined the waitlist!");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to join waitlist");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (currentPage === "about") {
    return <About onNavigateHome={() => setCurrentPage("home")} />;
  }

  return (
    <>
      <Toaster position="top-center" richColors />
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
                onClick={() => setCurrentPage("about")}
                className="text-gray-400 hover:text-white transition-colors text-sm font-medium"
              >
                About Us
              </button>
              <a
                href="#faq"
                className="text-gray-400 hover:text-white transition-colors text-sm font-medium"
              >
                FAQ
              </a>
            </div>
          </div>
        </header>

        {/* Hero Section */}
        <section className="pt-32 pb-20 px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-6xl md:text-7xl font-bold mb-6 leading-tight">
              OrbitSpace
            </h1>
            <p className="text-2xl md:text-3xl text-gray-300 mb-4">
              A coding agent that asks before it builds.
            </p>
            <p className="text-lg text-gray-400 mb-12 max-w-2xl mx-auto">
              An exclusive platform for pioneers, innovators, and visionaries. Your journey into the next generation of digital creation starts here.
            </p>

            {/* Waitlist Form */}
            {!isSubmitted ? (
              <div className="max-w-md mx-auto">
                <form onSubmit={handleSubmit} className="space-y-4">
                  <input
                    type="text"
                    placeholder="Full Name"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                    disabled={isSubmitting}
                  />
                  
                  <input
                    type="email"
                    placeholder="Professional Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                    disabled={isSubmitting}
                  />
                  
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full px-6 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-lg hover:from-purple-600 hover:to-pink-600 focus:outline-none focus:ring-2 focus:ring-purple-400 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? "Requesting..." : "Request Access"}
                  </button>
                </form>
              </div>
            ) : (
              <div className="py-12">
                <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-4xl">✓</span>
                </div>
                <h2 className="text-4xl font-bold text-white mb-4">
                  You're on the list!
                </h2>
                <p className="text-xl text-gray-300 mb-4">
                  We'll notify you as soon as OrbitSpace launches.
                </p>
                <p className="text-gray-400">
                  Check your email for confirmation.
                </p>
              </div>
            )}
          </div>
        </section>

        {/* The Hidden Cost Section */}
        <section className="py-20 px-6 bg-gradient-to-b from-black to-gray-900">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold text-center mb-4">
              The Hidden Cost of Autonomous AI
            </h2>
            <p className="text-xl text-gray-400 text-center mb-16 max-w-3xl mx-auto">
              Most coding agents create more problems than they solve, leaving you with a tangled mess of unmaintainable code.
            </p>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="p-8 bg-white/5 border border-white/10 rounded-xl">
                <h3 className="text-2xl font-bold mb-4">The Illusion of Speed</h3>
                <p className="text-gray-400">
                  Autonomous agents move fast and break things. You're left with a fragile codebase that only gets more complex and costly to fix.
                </p>
              </div>

              <div className="p-8 bg-white/5 border border-white/10 rounded-xl">
                <h3 className="text-2xl font-bold mb-4">The Black Box Problem</h3>
                <p className="text-gray-400">
                  When errors surface, you're debugging code you didn't write and don't understand. The agent's solution? More layers of confusing patches.
                </p>
              </div>

              <div className="p-8 bg-white/5 border border-white/10 rounded-xl">
                <h3 className="text-2xl font-bold mb-4">The Rewrite Cycle</h3>
                <p className="text-gray-400">
                  What starts as a promising prototype quickly devolves into a rewrite project. You spend more time cleaning up AI output than building.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* How OrbitSpace Works */}
        <section className="py-20 px-6">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold text-center mb-4">
              How OrbitSpace Works
            </h2>
            <p className="text-xl text-gray-400 text-center mb-16">
              A transparent, collaborative process that puts you in control.
            </p>

            <div className="space-y-16">
              {/* Step 1 */}
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div>
                  <div className="text-purple-500 font-bold mb-2">1. Research</div>
                  <h3 className="text-3xl font-bold mb-4">Gathers comprehensive context</h3>
                  <p className="text-gray-400 text-lg">
                    OrbitSpace starts by analyzing your codebase, patterns, and existing implementations to understand your unique way of building.
                  </p>
                </div>
                <div className="bg-gray-900 border border-white/10 rounded-xl p-6 font-mono text-sm">
                  <div className="text-green-400 mb-2">Branch Created: [your_frontend]</div>
                  <div className="text-blue-400 mb-2">Grep: Pattern `user_profile`</div>
                  <div className="text-yellow-400 mb-2">Read: `components/UserProfile.tsx`</div>
                  <div className="text-purple-400">Bash: Check database schema</div>
                </div>
              </div>

              {/* Step 2 */}
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div className="order-2 md:order-1">
                  <div className="bg-gray-900 border border-white/10 rounded-xl p-6 font-mono text-sm">
                    <div className="text-gray-400 mb-2">Analyzing requirements...</div>
                    <div className="text-yellow-400 mb-2">Asks: Layout preference?</div>
                    <div className="text-green-400 mb-2">Answered: Centered Layout</div>
                    <div className="text-yellow-400 mb-2">Asks: Use existing auth pattern?</div>
                    <div className="text-green-400">Answered: Use existing auth</div>
                  </div>
                </div>
                <div className="order-1 md:order-2">
                  <div className="text-purple-500 font-bold mb-2">2. Planning</div>
                  <h3 className="text-3xl font-bold mb-4">Collaborates on a detailed plan</h3>
                  <p className="text-gray-400 text-lg">
                    It works with you to create a blueprint, asking clarifying questions until it knows exactly what to build, ensuring alignment from the start.
                  </p>
                </div>
              </div>

              {/* Step 3 */}
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div>
                  <div className="text-purple-500 font-bold mb-2">3. Implementation</div>
                  <h3 className="text-3xl font-bold mb-4">Builds with continuous oversight</h3>
                  <p className="text-gray-400 text-lg">
                    While building, OrbitSpace continuously checks the agent's work against your plan. If anything seems unclear, it stops and asks instead of making risky assumptions.
                  </p>
                </div>
                <div className="bg-gray-900 border border-white/10 rounded-xl p-6 font-mono text-sm">
                  <div className="text-blue-400 mb-2">Edit: `components/ProfileCard.tsx`</div>
                  <div className="text-green-400 mb-2">Write: `components/SuccessToast.tsx`</div>
                  <div className="text-yellow-400 mb-2">Asks: Success toast message?</div>
                  <div className="text-green-400">Answered: 'Profile saved successfully'</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Why Review Section */}
        <section className="py-20 px-6 bg-gradient-to-b from-gray-900 to-black">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold text-center mb-4">
              Why review AI code after it's broken?
            </h2>
            <p className="text-xl text-gray-400 text-center mb-16 max-w-3xl mx-auto">
              Right now, developers use autonomous agents to write code, then use AI PR review tools to catch mistakes. This is backwards. Instead of patching problems after they happen, OrbitSpace prevents them during development with built-in review that guides the agent in real-time.
            </p>

            <div className="grid md:grid-cols-2 gap-12">
              {/* Old Way */}
              <div className="p-8 bg-red-950/20 border border-red-500/20 rounded-xl">
                <h3 className="text-2xl font-bold mb-6 text-red-400">The Old Way: Post-Facto Review</h3>
                <p className="text-gray-400 mb-8">
                  Conventional workflows use AI to generate work, then rely on separate tools to find and fix the inevitable errors and misalignments.
                </p>
                <div className="space-y-4 font-mono text-sm">
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                    <span>AI Agent</span>
                  </div>
                  <div className="ml-6 border-l-2 border-gray-700 pl-6 py-2">
                    <div className="flex items-center space-x-3">
                      <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                      <span className="text-red-400">Flawed Output</span>
                    </div>
                  </div>
                  <div className="ml-6 border-l-2 border-gray-700 pl-6 py-2">
                    <div className="flex items-center space-x-3">
                      <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                      <span>Review Tool</span>
                    </div>
                  </div>
                  <div className="ml-6 border-l-2 border-gray-700 pl-6 py-2">
                    <div className="flex items-center space-x-3">
                      <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                      <span>Corrections</span>
                    </div>
                  </div>
                  <div className="ml-6 border-l-2 border-gray-700 pl-6 py-2">
                    <div className="flex items-center space-x-3">
                      <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                      <span>Your Time</span>
                    </div>
                  </div>
                  <div className="ml-6 pl-6 py-2">
                    <div className="flex items-center space-x-3">
                      <div className="w-3 h-3 bg-gray-500 rounded-full"></div>
                      <span className="text-gray-500">Manual Fixes</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* OrbitSpace Way */}
              <div className="p-8 bg-green-950/20 border border-green-500/20 rounded-xl">
                <h3 className="text-2xl font-bold mb-6 text-green-400">The OrbitSpace Method: Real-Time Guidance</h3>
                <p className="text-gray-400 mb-8">
                  Our intelligent "Overseer" acts as a co-pilot, guiding the AI in real-time to ensure every action aligns with your vision from the start.
                </p>
                <div className="space-y-4 font-mono text-sm">
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                    <span>AI Agent</span>
                  </div>
                  <div className="ml-6 border-l-2 border-gray-700 pl-6 py-2">
                    <div className="text-gray-400 text-xs mb-2">is implementing...</div>
                  </div>
                  <div className="ml-6 border-l-2 border-gray-700 pl-6 py-2">
                    <div className="flex items-center space-x-3 mb-2">
                      <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                      <span>Overseer</span>
                    </div>
                    <div className="text-yellow-400 text-xs">Question: What should the success toast say?</div>
                  </div>
                  <div className="ml-6 border-l-2 border-gray-700 pl-6 py-2">
                    <div className="flex items-center space-x-3 mb-2">
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      <span>You</span>
                    </div>
                    <div className="text-green-400 text-xs">Answer: "Profile saved successfully"</div>
                  </div>
                  <div className="ml-6 pl-6 py-2">
                    <div className="flex items-center space-x-3">
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      <span className="text-green-400">Pristine Output</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-20 px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Build code you control, not code that controls you.
            </h2>
            {stats && (
              <p className="text-gray-400 mb-8">
                Join {stats.total} pioneers already on the waitlist
              </p>
            )}
          </div>
        </section>

        {/* Footer */}
        <footer className="px-6 py-8 border-t border-white/10">
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
    </>
  );
}
