import { Heart } from 'lucide-react';

export function Footer() {
  return (
    <footer className="border-t border-border-color bg-card-bg mt-auto">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col items-center justify-center text-center">
        <p className="text-text-muted text-sm flex items-center space-x-1">
          <span>Built with</span>
          <Heart className="w-4 h-4 text-red-500 mx-1" />
          <span>for the open source community.</span>
        </p>
        <p className="text-text-muted text-xs mt-2">
          RepoVitals is an open-source tool and is not affiliated with GitHub.
        </p>
      </div>
    </footer>
  );
}
