# Giza Pages shell

This folder is a static, dependency-free shell for an HTTPS GitHub Pages site. It contains **no 3D scene, NVIDIA streaming client bundle, gateway URL, credentials, user data or research files**. It does not itself render or stream Giza. The viewer and all 3D rendering continue to run on Velocity through an independently configured HTTPS gateway.

The visitor explicitly enters an authorized HTTPS **origin** (no path, credentials, query or fragment). The shell stores only that origin in browser local storage, supports forgetting it, and loads the private viewer in a sandboxed cross-origin iframe. “Open in new tab” is a fallback if the gateway's authentication or browser third-party-cookie policy blocks embedding. Full-screen viewing is available when the browser allows it. The iframe's own viewer is responsible for login, session controls, navigation and playback status; this shell cannot verify cross-origin video playback.

## Required before publication can satisfy navigation

1. Establish and test a private, browser-reachable HTTPS gateway and media path. There is no such endpoint in this bundle; the existing loopback-only Mac gateway is not a remotely reachable backend. Keep the renderer on Velocity and do not expose private files or embed session credentials in the public site.
2. Authenticate the viewer independently. If embedding, configure the private viewer's response CSP `frame-ancestors` to include **the exact published Pages origin**, and test authentication, cookie behavior and iframe sandbox compatibility in the intended browsers. Existing `frame-ancestors 'none'` intentionally prevents embedding. A new-tab fallback alone does not establish successful embedded playback.
3. Preserve secure same-origin semantics between the private viewer and its own control, signaling and session endpoints. Confirm WebRTC media/ICE connectivity end to end; a reachable page or successful signaling does not demonstrate decoded video or camera control. Cross-origin access should not use wildcard authenticated CORS.
4. Publish only this folder's generic shell, after the repository destination and access policies are resolved. Avoid copying the private Giza scene, evidence, user-specific configuration, proprietary client bundles or credentials into the public repository.

The prior local client bundle carries the separate `NVIDIA_CLIENT_LICENSE.txt` in the private navigation directory and must not be redistributed based merely on its availability. This shell includes no NVIDIA code or packages.

Run `npm test` in this folder for URL-validation tests; it uses Node's built-in test runner and installs no dependencies. A live remote gateway, embed, browser playback and navigation are not yet verified for the Pages route.
