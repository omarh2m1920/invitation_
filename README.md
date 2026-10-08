# La Reine · a little invitation

A single-page, mobile-friendly invitation for a scent mission together on Saturday, 10 October 2026. The gym parking lot is suggested as a pickup spot before going to La Reine Parfumerie, Lac 2, Tunis. It includes all three supplied photos, a choice between the supplied Ramy Sabry and Fadel Chaker tracks, a playful 10:00 / 16:00 time picker, sharing, destination directions, and calendar downloads.

## Preview

Open `index.html` in a browser, or serve the folder locally with `python3 -m http.server 8000` and visit `http://localhost:8000`.

Music starts when the visitor chooses **Kelma** or **Ya Hayat El Roh** to open the invitation. Browsers generally block sound before a user gesture. The music button can pause and resume the chosen track.

## Publish on GitHub Pages

1. Create a repository on GitHub, ideally with a neutral name such as `la-reine-invitation`.
2. Upload the contents of this folder to the repository root, including `assets/` and `.nojekyll`, or push it with Git.
3. In the repository's **Settings → Pages**, select **Deploy from a branch**, branch **main**, folder **/(root)**, and save.
4. When deployment finishes, open `https://YOUR-USERNAME.github.io/la-reine-invitation/`.

You can keep the repository private if your GitHub plan permits Pages for private repositories, but the Pages website itself may still be publicly accessible. The `noindex` tag discourages search indexing; it is not access control. The audio file is included in this package for the requested invitation. Make sure you have permission before publishing that recording publicly.

## Files

- `index.html`: invitation content and layout
- `styles.css`: responsive styling and motion preferences
- `script.js`: opening interaction, music, time choice, sharing, calendar
- `assets/portrait.jpg` and `assets/portrait-2.jpg`: supplied illustrated portraits
- `assets/la-reine.webp`: optimized version of the supplied storefront photo
- `assets/kelma.mp3` and `assets/ya-hayat-el-roh.mp3`: supplied audio tracks

There are no build dependencies. Calendar times are expressed in UTC for Tunis local time (UTC+1). The pickup spot is a suggestion to confirm together.
