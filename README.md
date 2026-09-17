# Roozbeh Khodambashi - Engineering Portfolio

A responsive static portfolio for mechanical engineering, mechatronics, and robotics. The website lives in `site/` and requires no build step.

## Local preview

From the repository root:

```powershell
python -m http.server 8000 --bind 127.0.0.1 --directory site
```

Open http://localhost:8000/. YouTube needs an HTTP/HTTPS referring page; opening the HTML directly produces Error 153. Video pages opened directly from disk redirect to this local server.

## Publish on GitHub Pages

1. Push this repository to GitHub, using a public repository for the free Pages plan.
2. In **Settings > Pages > Build and deployment**, choose **GitHub Actions** as the source.
3. Run **Deploy portfolio to GitHub Pages** from the Actions tab if the initial push happened before Pages was enabled.
4. Find the published URL in Settings > Pages or the successful deployment.

The included `.github/workflows/pages.yml` deploys only `site/` on every push to `main`. No separate manual upload is needed after setup. A repository named `USERNAME.github.io` uses `https://USERNAME.github.io/`; other repository names normally use `https://USERNAME.github.io/REPOSITORY/`. Internal links work with either address.

## Files

- `site/index.html`: featured projects, background, experience, contact.
- `site/automation.html`: manufacturing automation video collection.
- `site/soft-robotics.html`: hydrogel robot video collection.
- `site/third-arm.html`: third-arm development and musical applications.
- `site/resume.html`: printable public resume.
- `site/styles.css`: responsive and print styling.
- `site/videos.js`: local thumbnails replaced by inline YouTube players on click.
- `site/assets/`: selected photos, thumbnails, publication PDF, and optimized satellite video.
- `docs/content-review.md`: content provenance and editorial notes.

YouTube embeds use privacy-enhanced mode and send the page origin/referrer. The satellite clip uses a local MP4 because its YouTube embed reported unavailable. Original videos, old website archives, local tooling, and preview files are ignored by Git. The Pages workflow uploads only the tracked website files from its clean checkout.

Keep original media backed up separately. To edit a video collection, update its HTML thumbnail button and corresponding YouTube link; use an 11-character YouTube ID in `data-youtube-id`.
