// src/components/Events.tsx

export function Events() {
  return (
    <div className="min-h-screen pt-24 px-4 pb-16 bg-primary text-white max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold mb-8">
        Welcome to MarcViews Networks Events Hub!
      </h1>

      <p className="text-white/80 text-lg mb-6">
        Discover our latest industry gatherings, workshops, and seminars
        designed to empower you with the latest insights and knowledge in
        cybersecurity and technology.
      </p>
      <p className="italic text-white/70 mb-10">
        Let's connect, learn, and innovate together!
      </p>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">
          Explore Upcoming Interests
        </h2>
        <ul className="space-y-3 pl-4 list-disc text-white/90">
          <li>Network Security Events</li>
        </ul>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Past Events</h2>
        <ul className="space-y-3 pl-4 list-disc text-white/90">
          <li>Global Threat Report Review</li>
          <li>Solving Cloud Challenges</li>
          <li>2024 Data Breach Investigation</li>
        </ul>
      </section>

      <section className="pt-8 border-t border-white/10">
        <h3 className="text-2xl font-semibold mb-4">
          Subscribe to Our Newsletter for Latest Updates
        </h3>
        <div className="flex gap-2">
          <input
            type="email"
            placeholder="Email"
            className="p-3 rounded bg-white/10 border border-white/20 w-full"
          />
          <button className="bg-accent-teal px-5 py-3 rounded hover:bg-accent-purple transition">
            Sign up
          </button>
        </div>
      </section>
    </div>
  );
}
