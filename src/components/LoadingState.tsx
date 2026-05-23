import { Loader2 } from 'lucide-react';

export function LoadingState() {
  return (
    <div className="w-full max-w-4xl mx-auto py-12 px-4 flex flex-col items-center justify-center animate-in fade-in duration-500">
      <div className="relative">
        <div className="absolute inset-0 bg-primary-500 rounded-full blur-xl opacity-20 animate-pulse"></div>
        <Loader2 className="w-12 h-12 text-primary-600 animate-spin relative z-10" />
      </div>
      <h3 className="mt-6 text-xl font-semibold text-text-main">Analyzing Repository...</h3>
      <p className="text-text-muted mt-2 text-center max-w-md">
        We're fetching data directly from the GitHub API and running our health checks. This will just take a second.
      </p>
      
      {/* Skeleton skeleton dashboard */}
      <div className="w-full mt-12 grid grid-cols-1 lg:grid-cols-3 gap-6 opacity-30 pointer-events-none">
        <div className="lg:col-span-1 bg-card-bg border border-border-color rounded-2xl h-64 animate-pulse"></div>
        <div className="lg:col-span-2 bg-card-bg border border-border-color rounded-2xl h-64 animate-pulse"></div>
      </div>
    </div>
  );
}
