interface Experience {
  date: string;
  title: string;
  company?: string;
  description: string;
}

const experiences: Experience[] = [
  {
    date: "2020",
    title: "Started Programming Journey",
    description: "Began learning web development fundamentals - HTML, CSS, and JavaScript",
  },
  {
    date: "2021",
    title: "Backend Development",
    company: "Personal Projects",
    description: "Explored backend technologies including Python, FastAPI, and PostgreSQL",
  },
  {
    date: "2022",
    title: "Full-Stack Developer",
    company: "Freelance",
    description: "Built complete web applications for clients using modern tech stacks",
  },
  {
    date: "2023",
    title: "Advanced Cloud & DevOps",
    description: "Learned Docker, CI/CD pipelines, and cloud deployment strategies",
  },
  {
    date: "2024 - Present",
    title: "Software Engineer",
    description: "Focusing on scalable architectures and modern web technologies",
  },
];

export function Timeline() {
  return (
    <section className="py-16 px-4">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold mb-12">Experience Journey</h2>
        
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-0.5 bg-border transform md:-translate-x-1/2"></div>
          
          <div className="space-y-12">
            {experiences.map((exp, index) => (
              <div
                key={index}
                className={`relative flex flex-col md:flex-row gap-4 ${
                  index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
              >
                {/* Timeline dot */}
                <div className="absolute left-0 md:left-1/2 w-4 h-4 bg-primary rounded-full transform -translate-x-1/2 md:translate-x-0 ring-4 ring-background"></div>
                
                {/* Content */}
                <div className={`flex-1 pl-8 md:pl-0 ${index % 2 === 0 ? 'md:pr-12 md:text-right' : 'md:pl-12'}`}>
                  <div className="bg-card p-6 rounded-lg border border-border hover:shadow-lg transition-shadow">
                    <span className="text-sm font-semibold text-primary">{exp.date}</span>
                    <h3 className="text-xl font-bold mt-2">{exp.title}</h3>
                    {exp.company && (
                      <p className="text-sm text-muted-foreground mt-1">{exp.company}</p>
                    )}
                    <p className="mt-3 text-foreground/80">{exp.description}</p>
                  </div>
                </div>
                
                {/* Spacer for alternating layout */}
                <div className="hidden md:block flex-1"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
