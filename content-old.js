const titleElement = document.querySelector('[data-attrid="title"]');
const titleText = titleElement?.textContent?.trim();

if (
    titleElement &&
    titleText &&
    !document.getElementById("my-tracker-buttons")
) {
    const section = document.createElement("div");
    section.id = "my-tracker-buttons";
    section.style.marginTop = "10px";

    const statuses = ["Want to Watch", "Watched"];
    statuses.forEach((status) => {
        const btn = document.createElement("button");
        btn.textContent = status;
        btn.style.marginRight = "8px";
        btn.style.padding = "5px 10px";
        btn.style.border = "1px solid #888";
        btn.style.borderRadius = "4px";
        btn.style.cursor = "pointer";
        btn.onclick = () => {
            chrome.storage.sync.set({
                [titleText]: {
                    status: status.toLowerCase().replace(" ", "_"),
                    timestamp: Date.now(),
                },
            });
            alert(`${titleText} marked as ${status}`);
        };
        section.appendChild(btn);
    });

    titleElement.insertAdjacentElement("afterend", section);
}
