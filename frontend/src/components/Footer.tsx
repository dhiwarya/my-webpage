export function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="py-8 px-4 border-t border-border">
      <div className="max-w-4xl mx-auto text-center">
        <p className="text-muted-foreground">
          © {currentYear} Dhiwa Kusumah. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
