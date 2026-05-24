# RepoVitals 🩺

Browser-based tool to check the health and maintenance of any public GitHub repository in seconds! 

## Why?
When looking for open-source libraries, I got tired of manually clicking around to check if a repo was abandoned, missing a license, or lacked basic CI/CD. I built RepoVitals to automate this. It gives any public repo a quick "health score" from 0 to 100 based on standard project hygiene, and tells you exactly what's missing. It also tells you the program languages used in %. 

## Features
- **Instant Health Score:** Gives a 0-100 rating based on project documentation, licensing, recent pushed activity, default branch setups, and more.
- **Side-by-Side Comparison:** Paste two repo URLs to see their metrics, health scores, and tech stacks next to each other. It automatically highlights the leader for each stat! 🚀
- **Export Markdown Reports:** Quickly copy a formatted Markdown report table of the checks to share with your team on Slack, Notion, or GitHub.
- **Copy AI Prompts:** Copy a custom-tailored prompt summarizing all repo stats to paste directly into Claude, ChatGPT, or Gemini for a deep architectural review.

## What it checks
The health score is calculated locally in your browser based on:
- **README File** (20 pts): Basic documentation check.
- **License** (15 pts): Crucial for open-source usability.
- **Recent Activity** (15 pts): Pushed within the last 90 days.
- **Metadata** (10 pts): Description & topics filled out.
- **Community Support** (10 pts): Issues enabled.
- **Languages** (10 pts): Tech stack clearly defined.
- **CI/CD Workflows** (10 pts): GitHub Actions configured.
- **Engagement** (10 pts): Stars, forks, or a homepage link.

## How it works (Privacy-first)
This is a 100% client-side React app. It makes unauthenticated requests directly to the public GitHub API from your browser. There is no backend, no databases, and no tracking. Only analytics tracking is when you open repovitals on vercel.

*Note: Because it runs without an API key, GitHub rate-limits the app to 60 requests per hour per IP.*

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
If you have ideas for new health metrics (like checking open PR age, release frequency, or security policies), feel free to open an issue or submit a PR! 

Thank you for any support, 
Tony
