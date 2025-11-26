import { FileText, Code2 } from "lucide-react";

interface BlogPost {
  id: string;
  title: string;
  summary: string;
  date: string;
  tags: string[];
}

interface Project {
  id: string;
  title: string;
  summary: string;
  tags: string[];
  link?: string;
}

// Sample data - replace with API calls later
const recentBlog: BlogPost = {
  id: "1",
  title: "Building a Full-Stack Application with FastAPI and React",
  summary:
    "A comprehensive guide to building modern web applications using FastAPI for the backend and React with TypeScript for the frontend.",
  date: "November 2024",
  tags: ["FastAPI", "React", "TypeScript", "PostgreSQL"],
};

const recentProject: Project = {
  id: "1",
  title: "Personal Portfolio & Blog Platform",
  summary:
    "A full-stack web application featuring JWT authentication, blog management, and project showcase. Built with FastAPI, PostgreSQL, React, and TypeScript.",
  tags: ["Full-Stack", "FastAPI", "React", "Docker"],
  link: "#",
};

export function RecentContent() {
  return (
    <section className="py-16 px-4 bg-muted/30">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold mb-12">Recent Work</h2>
        
        <div className="grid md:grid-cols-2 gap-8">
          {/* Recent Blog Article */}
          <div className="bg-card rounded-lg border border-border p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center gap-2 mb-4">
              <FileText className="w-5 h-5 text-primary" />
              <h3 className="text-xl font-bold">Latest Article</h3>
            </div>
            
            <div className="space-y-3">
              <h4 className="text-lg font-semibold hover:text-primary transition-colors cursor-pointer">
                {recentBlog.title}
              </h4>
              <p className="text-sm text-muted-foreground">{recentBlog.date}</p>
              <p className="text-foreground/80">{recentBlog.summary}</p>
              
              <div className="flex flex-wrap gap-2 pt-2">
                {recentBlog.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 text-xs bg-primary/10 text-primary rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              
              <a
                href="/blog"
                className="inline-block mt-4 text-primary hover:underline font-medium"
              >
                Read more →
              </a>
            </div>
          </div>

          {/* Recent Project */}
          <div className="bg-card rounded-lg border border-border p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center gap-2 mb-4">
              <Code2 className="w-5 h-5 text-primary" />
              <h3 className="text-xl font-bold">Latest Project</h3>
            </div>
            
            <div className="space-y-3">
              <h4 className="text-lg font-semibold hover:text-primary transition-colors cursor-pointer">
                {recentProject.title}
              </h4>
              <p className="text-foreground/80">{recentProject.summary}</p>
              
              <div className="flex flex-wrap gap-2 pt-2">
                {recentProject.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 text-xs bg-primary/10 text-primary rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              
              <a
                href="/projects"
                className="inline-block mt-4 text-primary hover:underline font-medium"
              >
                View project →
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
