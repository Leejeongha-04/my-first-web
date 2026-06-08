export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
      <div className="w-10 h-10 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
      <p className="text-muted-foreground font-medium animate-pulse">잠시만 기다려주세요...</p>
    </div>
  );
}
