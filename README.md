# RepoVitals 🩺

Browser-based tool to check the health and maintenance of any public GitHub repository in seconds! 

## Why?
When looking for open-source libraries, I got tired of manually clicking around to check if a repo was abandoned, missing a license, or lacked basic CI/CD. I built RepoVitals to automate this. It gives any public repo a quick "health score" from 0 to 100 based on standard project hygiene, and tells you exactly what's missing. It also gives you a quick visual breakdown of the programming languages used in the project.

## Features
- **Instant Health Score:** Gives a 0-100 rating based on project documentation, licensing, recent pushed activity, default branch setups, and more.
- **Side-by-Side Comparison:** Paste two repo URLs to see their metrics, health scores, and tech stacks next to each other. It automatically highlights the leader for each stat! 🚀
- **Scan History:** Revisit your recent searches instantly from the dashboard. Your last 5 scans are saved automatically in your browser's local storage.
- **API Rate Limit Tracker:** A live indicator shows you how many GitHub API requests you have left in real time, so you never get unexpectedly rate-limited.
- **Personal Access Token Integration:** Easily plug in a GitHub Personal Access Token (PAT) under settings to increase your API rate limit from 60 to 5,000 requests per hour.
- **Export Markdown Reports:** Quickly copy a formatted Markdown report table of the checks to share with your team on Slack, Notion, or GitHub.
- **Copy AI Prompts:** Copy a custom-tailored prompt summarizing all repo stats to paste directly into Claude, ChatGPT, or Gemini for a deep architectural review.

## What it checks
The health score is calculated locally in your browser based on a 100-point checklist:
- **README File** (15 pts): Basic documentation check.
- **License** (15 pts): Crucial for open-source usability.
- **Recent Activity** (15 pts): Active commits pushed within the last 90 days.
- **Metadata** (10 pts): Description & topics filled out for discoverability.
- **Community Support** (10 pts): Issues enabled so users can report bugs or request features.
- **Languages** (10 pts): Tech stack details and language breakdown availability.
- **CI/CD Workflows** (10 pts): GitHub Actions configured for automated tests/linting.
- **Engagement & Metadata** (5 pts): Stars, forks, or a homepage link present.
- **Contribution Guidelines** (5 pts): `CONTRIBUTING.md` present to help new developers get started.
- **Security Policy** (5 pts): `SECURITY.md` present detailing how to report vulnerabilities safely.

## How it works (Privacy-first)
This is a 100% client-side React app. It makes requests directly to the public GitHub API from your browser. There is no backend, no database, and no user tracking. If you configure a Personal Access Token, it is saved strictly in your local browser storage and only used to authenticate your direct requests to GitHub.

## Local Setup

```bash
# Clone it
git clone https://github.com/tonnydevelop9001/repovitals.git
cd repovitals

# Install & run
npm install
npm run dev
```

To run tests:
```bash
npm run test:run
```

## Contributing
If you have ideas for new health metrics (like checking open PR age or release frequency), feel free to check out [CONTRIBUTING.md](CONTRIBUTING.md), open an issue, or submit a PR! 

Thank you for any support, 
Tony
