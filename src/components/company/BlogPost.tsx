import { useParams } from "react-router-dom";
import { blogPosts } from "./Blogs";

export function BlogPost() {
  const { slug } = useParams();
  const post = blogPosts.find(
    (p) => p.title.toLowerCase().replace(/[^a-z0-9]+/g, "-") === slug
  );

  if (!post) {
    return (
      <div className="min-h-screen pt-24 px-6 pb-16 bg-gradient-to-b from-primary to-secondary-dark text-white">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-3xl font-bold text-red-500 mb-4">
            Blog Post Not Found
          </h1>
          <p className="text-white/90">
            The requested blog post could not be found.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 px-6 pb-16 bg-gradient-to-b from-primary to-secondary-dark text-white">
      <div className="max-w-5xl mx-auto space-y-8">
        <div className="bg-primary-accent/10 rounded-xl p-8 backdrop-blur-sm">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
            <div className="text-sm text-red-500">{post.date}</div>
            <div className="flex flex-wrap gap-2">
              {post.categories.split(", ").map((category, i) => (
                <span
                  key={i}
                  className="px-3 py-1 text-xs rounded-full bg-accent-purple/10 text-red-500"
                >
                  {category}
                </span>
              ))}
            </div>
          </div>
          <h1 className="text-4xl font-bold mb-6">{post.title}</h1>
          <p className="text-xl text-white/90 mb-8">{post.author}</p>
          <div className="prose prose-invert max-w-none">
            {/* Blog content would go here */}
            <p className="text-white/90">
              This is a placeholder for the blog post content. In a real
              implementation, the content would be stored in a database and
              fetched based on the post ID.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
