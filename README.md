# 🎬 Media Tracker Extension (Chrome)

Track movies right from Google Search results!  
This Chrome extension adds lightweight, visually integrated tracking tools directly to movie result pages on Google, letting you quickly mark titles as **Watched** or add them to your **Watchlist**—with persistent sync storage across sessions.

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

## 🛠️ Installation

1. Clone the repo or [download the ZIP](https://github.com/YOUR_USERNAME/media-tracker-extension).
2. Open **Chrome**, go to `chrome://extensions/`.
3. Enable **Developer Mode** (top-right).
4. Click **"Load Unpacked"** and select the extension folder.

---

## 📦 Current Features

-   ✅ Detects movie-specific pages via DOM analysis
-   🎯 Adds overlay UI directly to Google results pages
-   📌 Persistent tracking of:
    -   Watch status (Watched / Unwatched)
    -   Watchlist status (Added / Not Added)
-   🖼 Attempts to retrieve high-quality poster images (or gracefully degrades with fallbacks)
-   🔁 Syncs across devices using `chrome.storage.sync`
-   📋 Popup view showing all tracked entries with:
    -   Movie title
    -   Thumbnail
    -   Quick edit/remove buttons

---

## 🧭 Roadmap

Here’s what’s coming soon and what’s being worked on:

### In Progress / Next Steps

-   [ ] ✅ Split and persist `watched` vs `watchlist` states separately
-   [ ] 🔄 Display persistent button state on page load
-   [ ] 🌗 Auto-detect and adapt to light/dark themes
-   [ ] 🌐 Add a **landing page** hosted on `media.nickhanson.me` (or similar) to:
    -   View full library
    -   Backup/export/import data
    -   Sync manually across devices
-   [ ] 📺 Add support for **TV shows** (detection logic, display metadata, etc.)
-   [ ] 🎮 Plan future expansions: video games, music albums, books, celebrities
-   [ ] 🔍 Enable keyword filtering or tagging system in popup and landing page

### Stretch Goals

-   [ ] 📦 `chrome.storage.local` fallback when sync quota exceeded
-   [ ] 🌍 Cross-browser support (Firefox, Edge, Brave)
-   [ ] 📤 Optional cloud sync to user-specified backend (encrypted JSON?)
-   [ ] 📈 Usage analytics toggle for user stats (local only)

---

## 🐞 Known Issues

-   ❗ Some obscure or low-traffic movies may lack a full-size poster element
-   ❗ Pages that use dynamic JS navigation (e.g., carousel clicks) do not re-trigger `window.onload` → manual checks or MutationObserver might be needed
-   ❗ Dev Tools open during reload sometimes causes modal behavior to break (due to Google iframe security behavior)
-   ❗ Google returns extremely long image URLs (~16kb) that exceed `chrome.storage.sync` quota (workaround planned)

---

## 💬 Credits & Notes

-   Built and maintained by **[Your Name]**
-   A learning project turned passion tool
-   No external APIs or libraries required—just Chrome, code, and DOM scraping magic 😎
-   Feedback, PRs, and ⭐ stars welcome!

---

## 📜 Legal & Ethics

This is a personal-use tool that **does not display full copyrighted media**, and attempts to:

-   Use Google-served content responsibly
-   Avoid violating TOS or scraping large volumes of data
-   Respect copyright by only using public poster thumbnails

> ❗ Always verify content usage when deploying or distributing at scale.

---

## 📁 File Structure

media-tracker-extension/
├── manifest.json # Chrome extension config
├── content.js # Injected script for Google search pages
├── popup.html # Extension popup UI
├── popup.js # Logic for displaying tracked movies
├── styles.css # Styles shared between injected and popup UI
└── icons/ # Extension icons

---

## 🧠 Philosophy

This extension is about _control and memory_—making your media life more manageable without needing an account or app for everything. Built by a developer who finally realized:

> _"If the tools don't exist the way I want them… maybe it's time I build them myself."_
