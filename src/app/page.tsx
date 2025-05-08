"use client"
import Link from "next/link"

export default function HeroPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-[#C04000] text-white flex flex-col items-center justify-center">
      <div className="w-full max-w-5xl mx-auto px-4 py-16 flex flex-col items-center">
        
        
        {/* Small badge/pill at the top */}
        <div className="mb-16">
          <Link
            href="/app"
            className="inline-flex items-center px-4 py-2 rounded-full text-sm bg-white/10 hover:bg-white/15 transition-colors"
          >
            <span>New features</span>
            <span className="ml-2">→</span>
          </Link>
        </div>

        {/* Main heading */}
        <h1 className="text-5xl md:text-7xl bg-[#C04000] italic rounded-2xl px-6 py-4 font-bold text-center mb-6 tracking-tight">trackly</h1>

        {/* Subheading */}
        <p className="text-xl md:text-2xl text-center text-gray-300 max-w-3xl mb-12">
          Streamline your job search process with a modern, minimalist application tracking system.
        </p>

        {/* CTA buttons */}
        <div className="flex flex-col sm:flex-row gap-4 mb-24">
          <Link
            href="/app"
            className="px-6 py-3 text-center rounded-lg bg-white text-black font-medium hover:bg-gray-100 transition-colors"
          >
            Manage
          </Link>
          <Link
            href="https://github.com/Ashish4793/trackly"
            className="px-6 py-3 text-center rounded-lg bg-transparent border border-white/20 font-medium hover:bg-white/5 transition-colors"
          >
            View on GitHub
          </Link>
        </div>

        {/* Feature grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
          {[
            "Track all your job applications",
            "Monitor application status",
            "Store interview details",
            "Dark & light mode support",
            "Minimalist interface",
            "No account required",
          ].map((feature, index) => (
            <div
              key={index}
              className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-6 hover:bg-white/10 transition-colors"
            >
              <p className="text-gray-300">{feature}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <footer className="w-full py-6 text-center text-white text-sm mt-auto">
        <p>Made with ❤️ by Ashish</p>
      </footer>
    </div>
  )
}
