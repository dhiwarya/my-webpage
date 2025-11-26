export function About() {
  return (
    <section className="py-16 px-4 bg-muted/30">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold mb-6">About Me</h2>
        <div className="prose prose-lg max-w-none">
          <p className="text-lg text-foreground/90 mb-4">
            I'm a junior software engineer with a passion in the field of applied Artificial Intelligence. 
            
          </p>
          
          <div className="mt-8 p-6 bg-card rounded-lg border border-border">
            <h3 className="text-xl font-semibold mb-3 text-primary">Currently Working On</h3>
            <p className="text-foreground/90">
              Research and Developing Cybersecurity solution at MarkAny GaneshaIT.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
