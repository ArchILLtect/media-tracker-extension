# 🎬 Media Tracker Extension (Chrome)

Track movies right from Google Search results!  
This Chrome extension adds lightweight, visually integrated tracking tools directly to movie result pages on Google, letting you quickly mark titles as **Watched** or add them to your **Watchlist**—with persistent sync storage across sessions.

> 🔍 Currently supports **Google movie search pages only**.

---

## ⚙️ How It Works

Once installed, when you Google a movie, the extension:

-   Detects if it's a movie-specific page.
-   Adds a small overlay in the bottom right of the result page.
-   Allows you to mark the movie as:
    -   ✅ Watched / Unwatched
    -   ➕ Added to / Removed from Watchlist
-   Stores this info using `chrome.storage.sync` for persistence.
-   Displays all saved movies in the popup with title, status, and a thumbnail (when available).

---

## 🌐 Browser Support

| Browser | Supported Now | Planned |
| ------- | ------------- | ------- |
| Chrome  | ✅ Yes        | ✅ Yes  |
| Firefox | ❌ Not yet    | ✅ Yes  |
| Edge    | ❌ Not yet    | ✅ Yes  |

Multi-browser support will use a shared `src/` folder + per-browser `manifest.*.json` files, bundled via `scripts/build.js`.

---

## 🛠️ Installation

1. Clone the repo or [download the ZIP](https://github.com/YOUR_USERNAME/media-tracker-extension).
2. Open **Chrome**, go to `chrome://extensions/`.
3. Enable **Developer Mode** (top-right).
4. Click **"Load Unpacked"** and select the extension folder.

---

## 📦 Current Features

-   ✅ Detects movie-specific pages via DOM analysis
-   🎯 Adds overlay UI directly to Google results pages
-   ✅ Provides **Watched** and **Watchlist** buttons with toggling states
-   📌 Persistent tracking of:
    -   Watch status (Watched / Unwatched)
    -   Watchlist status (Added / Not Added)
-   🖼 Attempts to retrieve high-quality poster images (or gracefully degrades with fallbacks)
-   🔁 Syncs movie status and poster image URI via `chrome.storage.sync`
-   ✅ Injects thumbnail, status, and toast notifications dynamically
-   📋 Popup view showing all tracked entries with:
    -   Movie title
    -   Thumbnail
    -   Quick edit/remove buttons

---

## 📈 Planned Features / Roadmap

These are goals for the **MVP milestone** and beyond:

### MVP (Chrome Only)

-   [x] ✅ Split and persist `watched` vs `watchlist` states separately
-   [x] 🔄 Display persistent button state on page load
-   [x] Chrome popup UI with persistent list
-   [ ] 🌗 Auto-detect and adapt to light/dark themes
-   [ ] Improve fallback logic for missing images
-   [ ] 🌐 Add a **landing page** hosted on `media.nickhanson.me` (or similar) to:
    -   View full library
    -   Backup/export/import data
    -   Sync manually across devices
-   [ ] 🎮 Plan future expansions: video games, music albums, books, celebrities
-   [ ] 🔍 Enable keyword filtering or tagging system in popup and landing page

### Stretch Goals

-   [ ] 📦 `chrome.storage.local` fallback when sync quota exceeded
-   [ ] 🌍 Cross-browser support, builds via `manifest.*.json`:
    -   [ ] Firefox
    -   [ ] Edge
    -   [ ] Brave
    -   [ ] Safari
-   [ ] 📤 Optional cloud sync to user-specified backend (encrypted JSON?)
-   [ ] 📺 Add support for **TV shows** (detection logic, display metadata, etc.)
-   [ ] 🎮 Add optional support for **games, albums, books, celebrities and maybe more 😲**
-   [ ] ⭐ Add support for user rating, reviews, or tags
-   [ ] 📈 Usage analytics toggle for user stats (local only)

---

## 🐞 Known Issues

Unfixable? due to Chrome logic/process:

-   ❗ Dev Tools open during reload sometimes causes modal behavior to break (due to Google iframe security behavior)
-   ⚠ Base64 poster URIs may exceed storage sync limits (being worked around)

Plan to fix:

-   ❗ Some obscure or low-traffic movies may lack a full-size poster element
-   ⚠ Image scraping fails for lesser-known or missing posters
-   ❗ Pages that use dynamic JS navigation (e.g., carousel clicks) do not re-trigger `window.onload` → manual checks or MutationObserver might be needed

---

## 💬 Acknowledgments

-   Built and maintained with help from `Candide Gaspard-Proux Thénault`
-   A learning project turned passion tool
-   No external APIs or libraries required—just Chrome, code, and DOM scraping magic 😎
-   Feedback, PRs, and ⭐ stars welcome!

---

## 💬 Author

Built by [ArchILLtect](https://github.com/ArchILLtect)  
❤️ Fueled by caffeine, movie fandom, and sweet DOM hijinks.

---

## 📜 Legal & Ethics

This is a personal-use tool that **does not display full copyrighted media**, and attempts to:

-   Use Google-served content responsibly
-   Avoid violating TOS or scraping large volumes of data
-   Respect copyright by only using public poster thumbnails

> ❗ Always verify content usage when deploying or distributing at scale.

---

## 📁 File Structure

```text
media-tracker-extension/
├── build/
├── icons/                      # Extension icons
├── manifests/
│   └── manifest.chrome.json    # Chrome extension config
├── scripts/
│   └── build.js                # For building extension zips
├── src/
│   ├── content.js              # Injected script for Google search pages
│   ├── popup.html              # Extension popup UI
│   ├── popup.js                # Logic for displaying tracked movies
│   └── styles.css              # Styles shared between injected and popup UI
├── .gitignore
└── README.md
```

---

## 🧠 Philosophy

This extension is about _control and memory_—making your media life more manageable without needing an account or app for everything. Built by a developer who finally realized:

> _"If the tools don't exist the way I want them… maybe it's time I build them myself."_

---

## 📌 License

MIT (unless updated later)
