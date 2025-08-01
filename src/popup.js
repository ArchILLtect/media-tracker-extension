document.addEventListener("DOMContentLoaded", () => {
    const list = document.getElementById("movie-list");
    chrome.storage.sync.get(null, (items) => {
        Object.entries(items).forEach(([name, data]) => {
            const entry = document.createElement("div");
            const image = document.createElement("img");
            const title = document.createElement("p");
            const main = document.createElement("div");
            main.className = "main";
            image.className = "PUPimage";
            image.src =
                data.imageURL || "../images/Default_Movie_Cover_Art.png"; // Fallback image
            title.className = "title";
            title.textContent = `${name} - ${
                data.watched ? "Watched" : "Unwatched"
            } - ${data.watchlist ? "On Watchlist" : "Not on Watchlist"}`;
            entry.className = "entry";
            const del = document.createElement("button");
            del.textContent = "Delete";
            del.onclick = () => {
                chrome.storage.sync.remove(name, () => {
                    entry.remove();
                });
            };
            main.appendChild(image);
            main.appendChild(title);
            entry.appendChild(main);
            entry.appendChild(del);
            list.appendChild(entry);
        });
    });
});
