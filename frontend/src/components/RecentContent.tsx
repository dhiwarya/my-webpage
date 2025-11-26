import { FileText, Code2, Loader2 } from "lucide-react";
import { usePosts } from "@/hooks/usePosts";

export function RecentContent() {
  const { posts: articles, loading: articlesLoading, error: articlesError } = usePosts({ type: 'article', limit: 1 });
  const { posts: projects, loading: projectsLoading, error: projectsError } = usePosts({ type: 'project', limit: 1 });

  const recentArticle = articles[0];
  const recentProject = projects[0];

  const formatDate = (dateString: string | null) => {
    if (!dateString) return 'Recently';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long' });
  };

  const parseTags = (tagsCsv: string | null): string[] => {
    if (!tagsCsv) return [];
    return tagsCsv.split(',').map(tag => tag.trim()).filter(Boolean);
  };

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
            
            {articlesLoading ? (
              <div className="flex items-center justify-center py-8">
                <Loader2 className="w-6 h-6 animate-spin text-primary" />
              </div>
            ) : articlesError ? (
              <p className="text-destructive">{articlesError}</p>
            ) : recentArticle ? (
              <div className="space-y-3">
                <h4 className="text-lg font-semibold hover:text-primary transition-colors cursor-pointer">
                  {recentArticle.title}
                </h4>
                <p className="text-sm text-muted-foreground">{formatDate(recentArticle.published_at)}</p>
                <p className="text-foreground/80">{recentArticle.summary || 'No summary available'}</p>
                
                <div className="flex flex-wrap gap-2 pt-2">
                  {parseTags(recentArticle.tags_csv).map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 text-xs bg-primary/10 text-primary rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                
                <a
                  href={`/blog/${recentArticle.slug}`}
                  className="inline-block mt-4 text-primary hover:underline font-medium"
                >
                  Read more →
                </a>
              </div>
            ) : (
              <p className="text-muted-foreground">No articles yet</p>
            )}
          </div>

          {/* Recent Project */}
          <div className="bg-card rounded-lg border border-border p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center gap-2 mb-4">
              <Code2 className="w-5 h-5 text-primary" />
              <h3 className="text-xl font-bold">Latest Project</h3>
            </div>
            
            {projectsLoading ? (
              <div className="flex items-center justify-center py-8">
                <Loader2 className="w-6 h-6 animate-spin text-primary" />
              </div>
            ) : projectsError ? (
              <p className="text-destructive">{projectsError}</p>
            ) : recentProject ? (
              <div className="space-y-3">
                <h4 className="text-lg font-semibold hover:text-primary transition-colors cursor-pointer">
                  {recentProject.title}
                </h4>
                <p className="text-foreground/80">{recentProject.summary || 'No summary available'}</p>
                
                <div className="flex flex-wrap gap-2 pt-2">
                  {parseTags(recentProject.tags_csv).map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 text-xs bg-primary/10 text-primary rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                
                <a
                  href={`/projects/${recentProject.slug}`}
                  className="inline-block mt-4 text-primary hover:underline font-medium"
                >
                  View project →
                </a>
              </div>
            ) : (
              <p className="text-muted-foreground">No projects yet</p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
