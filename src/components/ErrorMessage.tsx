import { AlertTriangle, RefreshCcw } from 'lucide-react';

interface ErrorMessageProps {
  message: string;
  onRetry?: () => void;
}

export function ErrorMessage({ message, onRetry }: ErrorMessageProps) {
  return (
    <div className="w-full max-w-2xl mx-auto mt-8 mb-16 px-4 animate-in fade-in slide-in-from-bottom-4 duration-300">
      <div className="bg-red-50 dark:bg-red-900/20 border-l-4 border-red-500 p-6 rounded-r-xl shadow-sm">
        <div className="flex items-start">
          <AlertTriangle className="w-6 h-6 text-red-500 shrink-0 mt-1" />
          <div className="ml-4 flex-1">
            <h3 className="text-lg font-medium text-red-800 dark:text-red-300">
              Analysis Failed
            </h3>
            <div className="mt-2 text-red-700 dark:text-red-400">
              <p>{message}</p>
            </div>
            {onRetry && (
              <div className="mt-4">
                <button
                  onClick={onRetry}
                  className="flex items-center space-x-2 text-sm font-medium text-red-700 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300 transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 rounded p-1"
                >
                  <RefreshCcw className="w-4 h-4" />
                  <span>Try Again</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
