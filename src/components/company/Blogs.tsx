// src/components/Blogs.tsx

import { Link } from "react-router-dom";

export const blogPosts = [
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
    <div className="min-h-screen pt-24 px-6 pb-16 bg-gradient-to-b from-primary to-secondary-dark text-white">
      <div className="max-w-5xl mx-auto space-y-12">
        {/* Hero Section */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-primary-accent/20 to-accent-purple/20 p-8 backdrop-blur-sm">
          <div className="absolute inset-0 bg-[url('/pattern.png')] opacity-10" />
          <h1 className="text-5xl font-bold bg-gradient-to-r from-accent-teal to-accent-purple bg-clip-text text-transparent mb-4">
            Blogs
          </h1>
          <p className="text-xl text-white/90">
            Insights, analysis, and expert perspectives on cybersecurity
          </p>
        </div>

        {/* Blog Posts Grid */}
        <div className="grid gap-8">
          {blogPosts.map((post, idx) => (
            <div
              key={idx}
              className="bg-primary-accent/10 rounded-xl p-8 backdrop-blur-sm hover:bg-primary-accent/20 transition-colors duration-300"
            >
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
                <div className="text-sm text-accent-teal">{post.date}</div>
                <div className="flex flex-wrap gap-2">
                  {post.categories.split(", ").map((category, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 text-xs rounded-full bg-accent-purple/10 text-accent-purple"
                    >
                      {category}
                    </span>
                  ))}
                </div>
              </div>
              <h2 className="text-2xl font-bold mb-3">{post.title}</h2>
              <p className="text-white/90 mb-6">{post.author}</p>
              <Link
                to={`/company/blogs/${post.title
                  .toLowerCase()
                  .replace(/[^a-z0-9]+/g, "-")}`}
                className="inline-flex items-center px-6 py-3 bg-accent-teal/10 text-accent-teal rounded-lg hover:bg-accent-teal/20 transition-colors duration-300"
              >
                Continue Reading
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
