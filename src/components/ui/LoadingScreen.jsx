export function LoadingScreen() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center bg-light">
      <div className="surface flex items-center gap-3 rounded-lg px-5 py-4 text-sm font-semibold text-navy">
        <span className="h-3 w-3 animate-ping rounded-full bg-accent" />
        Loading
      </div>
    </div>
  );
}







