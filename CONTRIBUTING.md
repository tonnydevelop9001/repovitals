# Contributing to RepoVitals

Hey! Thanks for taking the time to contribute to RepoVitals. Any help is super appreciated, whether it's fixing bugs, proposing new features, or suggesting better ways to score repository health.

## Getting Started

First, make sure you have Node.js installed (v18+ is recommended).

1. **Fork and Clone the Repo**
   ```bash
   git clone https://github.com/tonnydevelop9001/repovitals.git
   cd repovitals
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Run the App Locally**
   ```bash
   npm run dev
   ```
   This will spin up a local Vite development server (usually at http://localhost:5173).

## Making Changes

Before diving in, here are a few quick tips to keep things running smoothly:

- **Formatting & Linting**: We use ESLint to keep the codebase clean. You can run the linter using:
  ```bash
  npm run lint
  ```
- **Testing**: We write tests using Vitest. Before submitting a pull request, please run the tests to make sure everything still works:
  ```bash
  npm run test:run
  ```
  If you've added new utility functions or heuristic rules, adding a quick test in the `test/` directory is awesome!

## Submitting a Pull Request

1. Create a new branch for your feature or bug fix:
   ```bash
   git checkout -b feature/my-cool-change
   ```
2. Commit your changes with clear, descriptive commit messages.
3. Push to your fork and submit a Pull Request back to the main repository.

If you have any questions or want to discuss a feature idea before writing the code, feel free to open a GitHub issue. 

Thanks again for your support!
Tony
