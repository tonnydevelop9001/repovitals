export class AppError extends Error {
  code?: string;
  constructor(message: string, code?: string) {
    super(message);
    this.name = 'AppError';
    this.code = code;
  }
}

export class RateLimitError extends AppError {
  limit: string;
  remaining: string;
  reset: string;
  constructor(limit: string, remaining: string, reset: string) {
    const resetDate = new Date(parseInt(reset, 10) * 1000);
    super(`GitHub API rate limit exceeded. Try again after ${resetDate.toLocaleTimeString()}.`);
    this.name = 'RateLimitError';
    this.limit = limit;
    this.remaining = remaining;
    this.reset = reset;
  }
}

export class NotFoundError extends AppError {
  constructor() {
    super('Repository not found. It may be private or deleted.');
    this.name = 'NotFoundError';
  }
}
