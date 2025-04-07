// src/components/Blogs.tsx

const blogPosts = [
  {
    date: "February 19, 2025",
    categories:
      "Agents, AI, Critical Infrastructure, Incident Response, SOC Center, Threat Hunting, Vulnerabilities",
    title: "Agentic Security Operation Center (SOC)",
    author: "Kumar Shanu | CISO | Toronto",
  },
  {
    date: "January 20, 2025",
    categories: "Opinion",
    title: "Opinion: How Trump Presidency will impact our lives?",
    author: "Kumar Shanu, CISO & CTO, MarcViews Networks, Toronto",
  },
  {
    date: "November 26, 2024",
    categories: "AI, Partnerships",
    title: "New Partnership with Sirix Monitoring for Physical Security",
    author: "MarcViews Team, Toronto",
  },
  {
    date: "November 25, 2024",
    categories:
      "AI, Cloud, Critical Infrastructure, Incident Response, SOC Center, Threat Hunting",
    title: "SIEM vs Data Lake : A complementary relationship.",
    author: "Kumar Shanu, CISO, MarcViews Networks, Toronto",
  },
  {
    date: "November 20, 2024",
    categories: "Incident Response, Plans",
    title: "Good preparation is essential, an Incident Response (IR) Planning",
    author: "Kumar Shanu, CISO, MarcViews Networks, Toronto",
  },
  {
    date: "October 13, 2024",
    categories: "AI",
    title: "Protecting Digital Attack Surface in Gen-AI world",
    author: "Kumar Shanu, CISO, MarcViews Networks, Toronto",
  },
  {
    date: "September 18, 2024",
    categories: "Education",
    title: "Protecting Education Sector in AI Age",
    author: "Kumar Shanu, CISO",
  },
  {
    date: "May 10, 2024",
    categories: "Cloud",
    title: "Enhancing Cybersecurity in Hybrid Cloud Environments",
    author: "MarcViews Networks",
  },
  {
    date: "May 3, 2024",
    categories: "AI, Critical Infrastructure",
    title: "How to Secure Critical Infrastructure from AI-Related Threats?",
    author: "Fig. 1. A picture of data center",
  },
  {
    date: "April 16, 2024",
    categories: "AI",
    title: "Deploying artificial intelligence (AI) systems securely",
    author:
      "This article focuses on guidelines to help organization make informed decisions about the design, development, deployment and operation of their AI systems.",
  },
];

export function Blogs() {
  return (
    <div className="min-h-screen pt-24 px-4 pb-16 bg-primary text-white max-w-5xl mx-auto">
      <h1 className="text-4xl font-bold mb-8">Blogs</h1>

      <div className="grid gap-8">
        {blogPosts.map((post, idx) => (
          <div
            key={idx}
            className="bg-secondary-dark p-6 rounded-lg border border-white/10 shadow hover:shadow-lg transition"
          >
            <div className="text-sm text-accent-teal mb-1">{post.date}</div>
            <div className="text-white/70 text-xs italic mb-2">
              {post.categories}
            </div>
            <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
            <p className="text-white/80 text-sm mb-3">{post.author}</p>
            <button className="text-accent-purple underline hover:text-white transition">
              Continue Reading
            </button>
          </div>
        ))}
      </div>

      <div className="mt-16 border-t border-white/10 pt-8">
        <h3 className="text-2xl font-semibold mb-4">
          Subscribe to our Newsletter
        </h3>
        <p className="text-white/80 mb-4">
          Stay ahead of the curve with MarcViews Networks and subscribe to our
          monthly newsletter to get exclusive updates on the latest
          cybersecurity trends, expert tips to fortify your defenses, and
          insights that keep you informed about emerging threats. Join our
          community of proactive individuals and businesses dedicated to staying
          secure in an ever-evolving digital landscape.
          <br />
          <br />
          Your safety is our priority, and together, we can outsmart the
          hackers.
        </p>
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
        <p className="text-xs text-white/60 mt-2">
          You can unsubscribe at any time with just a click.
        </p>
      </div>
    </div>
  );
}
