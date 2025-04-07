// src/components/Careers.tsx

export function Careers() {
  return (
    <div className="min-h-screen pt-24 px-4 pb-16 bg-primary text-white max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold mb-8">Careers</h1>

      <section className="mb-12">
        <p className="text-white/80 text-lg mb-4">
          Join our team of technical experts
        </p>
        <h2 className="text-2xl font-semibold mb-4">Open Roles</h2>
        <div className="bg-secondary-dark p-6 rounded-lg border border-white/10 shadow mb-4">
          <h3 className="text-xl font-medium">
            Network Security Infrastructure (Senior)
          </h3>
          <p className="text-white/70 mb-2">Location: Toronto, ON, Canada</p>
          <button className="bg-accent-teal px-4 py-2 rounded hover:bg-accent-purple transition">
            Apply
          </button>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Join Our Talent Pool</h2>
        <p className="text-white/80 mb-6">
          If these open positions are not suited for you, join our talent pool.
          We will reach out to you once we have other roles open.
        </p>
        <form className="space-y-4">
          <div>
            <label className="block text-white/70 mb-1">Name*</label>
            <input className="w-full p-3 rounded bg-secondary-dark text-white border border-white/20" />
          </div>
          <div>
            <label className="block text-white/70 mb-1">Phone*</label>
            <input className="w-full p-3 rounded bg-secondary-dark text-white border border-white/20" />
          </div>
          <div>
            <label className="block text-white/70 mb-1">Email*</label>
            <input
              type="email"
              className="w-full p-3 rounded bg-secondary-dark text-white border border-white/20"
            />
          </div>
          <div>
            <label className="block text-white/70 mb-1">
              LinkedIn Profile*
            </label>
            <input className="w-full p-3 rounded bg-secondary-dark text-white border border-white/20" />
          </div>
          <div>
            <label className="block text-white/70 mb-1">
              For which position you are applying?
            </label>
            <input className="w-full p-3 rounded bg-secondary-dark text-white border border-white/20" />
          </div>
          <div>
            <label className="block text-white/70 mb-1">Attach Resume</label>
            <input type="file" className="w-full text-white" />
          </div>
          <button className="bg-accent-teal px-6 py-3 rounded-lg hover:bg-accent-purple transition">
            Submit Application
          </button>
        </form>
        <p className="text-xs text-white/60 mt-2">
          This site is protected by reCAPTCHA and the Google Privacy Policy and
          Terms of Service apply.
        </p>
      </section>

      <section className="mt-12 pt-8 border-t border-white/10">
        <h3 className="text-2xl font-semibold mb-4">
          Subscribe for latest update
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
