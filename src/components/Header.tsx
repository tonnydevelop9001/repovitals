import { Code, Activity } from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';

export function Header() {
  return (
    <header className="border-b border-border-color bg-card-bg/80 backdrop-blur-md sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="bg-primary-600 p-2 rounded-lg">
            <Activity className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary-600 to-primary-400">
            RepoVitals
          </span>
        </div>
        
        <div className="flex items-center space-x-4">
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-text-muted hover:text-text-main transition-colors flex items-center space-x-1"
          >
            <Code className="w-5 h-5" />
            <span className="hidden sm:inline text-sm font-medium">GitHub</span>
          </a>
          <div className="w-px h-6 bg-border-color"></div>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
