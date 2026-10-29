# Explore Giza

[Open the navigable snapshot](https://condigitalexpert.github.io/giza-velocity-viewer/).

A static progress review of a developing Khufu-era Giza production environment. The viewer and versioned scene assets are hosted by GitHub Pages. Opening the site requires no Velocity server, GPU reservation, Tailscale, Mac relay, sign-in or local server.

The viewing device draws the 3D scene with WebGL 2. Rendering runs only during interaction, loading, resizing or view changes and pauses when the tab is hidden. This reduces idle work; it does not make interactive 3D display free of device graphics or memory use.

## Explore

- Drag to orbit; scroll or pinch to zoom. Use saved viewpoints to reach the workyard and related areas.
- Select **Fly**, click the scene, then use WASD to move, Q/E to change height and arrow keys to look. Visible buttons support touch interaction. Flight has no collision detection.
- Select **Light** for lower display resolution. Extra detail may load separately.
- **About** shows the saved version, provenance, limitations and resource diagnostics. **Credits and data notices** records source obligations.

This is an optimized web review copy. It is not the complete historical area, an archaeological survey, final cinematic rendering, or an accepted living population. It contains illustrative reconstruction and material simplifications. Full-quality authoring and film renders remain separate from this site.

## Versioning and publishing

`scene.json` identifies the current snapshot with exact asset sizes and SHA-256 hashes. Scene files live under immutable `assets/<version>/` paths. New work is exported and optimized in bounded remote jobs, checked against source usage rights, reviewed in the browser and then published here. Merely saving the authoring scene does not automatically update this site. Prior released snapshots should remain available while storage limits permit; git history records source changes.

Only public viewer code, cleared derivatives and required notices belong in this repository. Do not add private research, credentials, server state or proprietary streaming clients. This repository is public.

Three.js is MIT-licensed; the pinned Draco decoder carries its accompanying Apache licence. Those software licences do not make the complete mixed scene CC0. Consult [credits](https://condigitalexpert.github.io/giza-velocity-viewer/credits.html) for terrain and asset conditions.

GitHub Pages currently limits published sites to 1 GB with a soft 100 GB/month bandwidth limit. This is a progress-review delivery channel, not unlimited full-resolution production storage. [GitHub Pages limits](https://docs.github.com/en/pages/getting-started-with-github-pages/github-pages-limits).
