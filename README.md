# RepoLens

![CI](https://github.com/tony/repolens/actions/workflows/ci.yml/badge.svg)

RepoLens helps developers and maintainers quickly evaluate the health and maintainability of public GitHub repositories right from their browser.

## Features

- **Heuristic Health Score**: Get a score from 0 to 100 based on repository health indicators.
- **Actionable Suggestions**: Receive practical tips to improve discoverability and maintainability.
- **Repository Breakdown**: View statistics like stars, forks, languages, and activity at a glance.
- **Secure & Private**: Everything runs locally in your browser. No data is stored, and no backend is used.

## How It Works

RepoLens makes unauthenticated requests to the public GitHub REST API directly from your browser. It parses the URL, fetches repository metadata, checks for `README.md` and GitHub Actions workflows, and calculates a score based on a transparent heuristic model.

### Scoring Model

1. **README File** (20 pts): Essential for documentation.
2. **License** (15 pts): Crucial for open-source usability.
3. **Recent Activity** (15 pts): Max points if pushed within 90 days.
4. **Description & Topics** (10 pts): Important for discoverability.
5. **Issues Enabled** (10 pts): Allows the community to report bugs.
6. **Languages** (10 pts): Indicates the tech stack clearly.
7. **CI/CD Workflows** (10 pts): Shows automated testing or linting.
8. **Useful Metadata** (10 pts): Stars, forks, or a homepage.

*Note: The score is a simple heuristic and not a definitive quality judgment.*

## Local Development

### Prerequisites

- Node.js (LTS version)
- npm

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/tony/repolens.git
   cd repolens
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Run tests:
   ```bash
   npm run test:run
   ```

5. Build for production:
   ```bash
   npm run build
   ```

## Deployment

Since RepoLens has no backend, it can be deployed to any static hosting provider.

### Deploy to Vercel

1. Push your code to GitHub.
2. Import the project in Vercel.
3. Vercel will automatically detect Vite and configure the build settings (`npm run build`, `dist` folder).
4. Click Deploy.

### Deploy to GitHub Pages

1. In `vite.config.ts`, set the `base` property to your repository name:
   ```ts
   export default defineConfig({
     base: '/repolens/',
     plugins: [tailwindcss(), react()],
   })
   ```
2. Build the project:
   ```bash
   npm run build
   ```
3. Deploy the `dist` folder using the `gh-pages` package or GitHub Actions.

## Limitations

- **Rate Limits**: Unauthenticated GitHub API requests are rate-limited to 60 requests per hour per IP address.
- **Public Only**: Cannot analyze private repositories without authentication (which is not implemented to preserve security/simplicity).

## Contributing

Contributions are welcome! Feel free to open an issue or submit a pull request if you have ideas for new health checks or UI improvements.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Disclaimer

RepoLens is an independent open-source project and is not affiliated with, endorsed by, or connected to GitHub.
