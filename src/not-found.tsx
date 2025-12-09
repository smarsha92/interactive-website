export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="text-center">
        <h1 className="text-6xl font-bold mb-4">404</h1>
        <p className="text-xl text-muted-foreground mb-6">The page you are looking for does not exist.</p>
        <a href="/" className="text-primary hover:underline">Go back to Home</a>
      </div>
    </div>
  );
}
