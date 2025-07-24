function isMoviePage() {
    // Primary: Look for 'Watch movie' tag
    const watchMovieTag = Array.from(document.querySelectorAll("span")).find(
        (el) => el.textContent?.trim().toLowerCase() === "watch movie"
    );

    // Secondary: Look for runtime in subtitle
    const subtitleEl = document.querySelector(
        '[data-attrid="subtitle"] span:last-of-type'
    );
    const hasRuntime =
        subtitleEl && /\d+h\s*\d+m|\d+h/.test(subtitleEl.textContent)
            ? true
            : false;

    return !!(watchMovieTag || hasRuntime);
}

const titleElement = document.querySelector('div[data-attrid="title"]');
let imageModalCloseBtn;
let mediaImgElement;
let mediaImgImage;

const mediaMainImgElement =
    document.querySelector('[id^="dimg_"][alt="Game poster image"]') ||
    document.querySelector('[id^="dimg_"][class="YQ4gaf zr758c wA1Bge"]');

let mediaDescriptionText = "";
let mediaImgURL;

const allH3Elements = document.querySelectorAll("h3");
const mediaDescription = Array.from(allH3Elements).find(
    (el) => el.textContent?.trim().toLowerCase() === "description"
);

if (mediaDescription) {
    const mediaDescriptionAncestor = mediaDescription.parentElement;
    if (mediaDescriptionAncestor) {
        const mediaDescriptionParent = Array.from(
            mediaDescriptionAncestor.children
        ).filter((el) => el.tagName === "SPAN");
        if (mediaDescriptionParent && mediaDescriptionParent.length > 0) {
            const mediaDescriptionChildren =
                mediaDescriptionParent[0].childNodes;
            if (mediaDescriptionChildren.length > 0) {
                mediaDescriptionChildren.forEach((child, index) => {
                    if (child.textContent !== "… MORE") {
                        mediaDescriptionText += child.textContent;
                    }
                });
            } else {
                console.log(
                    "Single span element found in media description:",
                    mediaDescriptionParent.textContent?.trim()
                );
            }
            //const mediaDescriptionText = mediaDescriptionParent.textContent?.trim();
        } else {
            console.warn("Media description parent element not found.");
        }
    } else {
        console.warn("Media description parent element not found.");
    }
    console.log(mediaDescriptionText);
}

const mediaInfoPoints = document.querySelectorAll(
    'div[data-attrid^="kc:/film/film:"]'
);

const mediaInfoPoints2 = document.querySelectorAll(
    'div[data-attrid^="kc:/media_common/"]'
);

const mediaInfoPoints3 = document.querySelectorAll(
    'div[data-attrid^="ss:/webfacts:"]'
);

const allMediaInfoPoints = Array.from(mediaInfoPoints).concat(
    Array.from(mediaInfoPoints2).concat(Array.from(mediaInfoPoints3))
);

if (allMediaInfoPoints.length > 0) {
    allMediaInfoPoints.forEach((point) => {
        const pointText = point.textContent?.trim();
        if (pointText.includes("Release date:", 0)) {
            const releaseDate = pointText.replace("Release date:", "").trim();
            console.log("Release Date:", releaseDate);
        } else if (pointText.includes("Director:", 0)) {
            const director = pointText.replace("Director:", "").trim();
            console.log("Director:", director);
        } else if (pointText.includes("MPAA rating:", 0)) {
            const mpaaRating = pointText.replace("MPAA rating:", "").trim();
            console.log("MPAA Rating:", mpaaRating);
        } else if (pointText.includes("Budget:", 0)) {
            const budget = pointText.replace("Budget:", "").trim();
            console.log("Budget:", budget);
        } else if (pointText.includes("Running time:", 0)) {
            const runningTime = pointText.replace("Running time:", "").trim();
            console.log("Running Time:", runningTime);
        } else if (pointText.includes("Distributed by:", 0)) {
            const distributedBy = pointText
                .replace("Distributed by:", "")
                .trim();
            console.log("Distributed By:", distributedBy);
        } else if (pointText.includes("Adapted from:", 0)) {
            const adaptedFrom = pointText.replace("Adapted from:", "").trim();
            console.log("Adapted From:", adaptedFrom);
        } else if (pointText.includes("Music by:", 0)) {
            const musicBy = pointText.replace("Music by:", "").trim();
            console.log("Music By:", musicBy);
        } else if (pointText.includes("Prequel:", 0)) {
            const prequel = pointText.replace("Prequel:", "").trim();
            console.log("Prequel:", prequel);
        } else if (pointText.includes("Sequel:", 0)) {
            const sequel = pointText.replace("Sequel:", "").trim();
            console.log("Sequel:", sequel);
        } else if (pointText.includes("Starring:", 0)) {
            const starring = pointText.replace("Starring:", "").trim();
            console.log("Starring:", starring);
        } else if (pointText.includes("Producers:", 0)) {
            const producers = pointText.replace("Producers:", "").trim();
            console.log("Producers:", producers);
        }
    });
} else {
    console.warn("No media info points found.");
}

const toolPlacement = document.querySelector(
    "div.xfX4Ac.JI5uCe.qB9BY.KU0vqd.WY0eLb.NSQUyc"
);

const titleText = titleElement?.textContent?.trim();
function showToast(message) {
    const toast = document.createElement("div");
    toast.className = "mt-toast";
    toast.textContent = message;
    document.body.appendChild(toast);
    setTimeout(() => {
        toast.remove();
    }, 3000);
}

if (
    toolPlacement &&
    titleText &&
    isMoviePage() &&
    !document.getElementById("my-tracker-buttons")
) {
    const appTitle = "Media Tracker";
    const appSettingsText = "SETTINGS";

    const appSeperator = document.createElement("hr");
    const mediaImgContainer = document.createElement("div");
    const mediaImgImage = document.createElement("img");
    const titleContainer = document.createElement("div");
    const appTitleElement = document.createElement("h3");
    const settingsButton = document.createElement("button");
    const buttonsContainer = document.createElement("div");
    const mainContainerMT = document.createElement("div");

    const spinnerOverlay = document.createElement("div");
    spinnerOverlay.id = "mt-loading-overlay";
    spinnerOverlay.className = "mt-spinner-overlay";
    const spinner = document.createElement("img");
    spinner.id = "mt-loading-spinner";
    spinner.className = "mt-spinner";
    spinner.src = chrome.runtime.getURL("icons/loading.svg");
    spinner.alt = "Loading...";

    function hideSpinner() {
        const spinnerDiv = document.getElementById("mt-loading-overlay");
        const spinnerImg = document.getElementById("mt-loading-spinner");
        if (spinnerDiv) spinnerDiv.classList.add("hidden");
        if (spinnerImg) spinnerImg.classList.add("hidden");
    }

    appSeperator.id = "media-tracker-separator";
    mediaImgContainer.id = "media-image-container";
    mediaImgImage.id = "media-image-app";
    titleContainer.id = "media-tracker-title";
    appTitleElement.id = "media-tracker-title-text";
    settingsButton.id = "media-tracker-settings-button";
    buttonsContainer.id = "media-tracker-buttons";
    mainContainerMT.id = "media-tracker-app";

    appSeperator.className = "mt-app-separator";
    mediaImgContainer.className = "mt-app-image-container";
    mediaImgImage.className = "mt-app-image";
    titleContainer.className = "mt-title-container";
    appTitleElement.className = "mt-app-title";
    settingsButton.className = "mt-settings-button";
    buttonsContainer.className = "mt-buttons-container";
    mainContainerMT.className = "mt-main-container";

    appTitleElement.textContent = appTitle;
    settingsButton.textContent = appSettingsText;

    settingsButton.onmouseover = () => {
        settingsButton.style.backgroundColor = "#e0e0e0";
        settingsButton.style.fontWeight = "bold";
    };
    settingsButton.onmouseout = () => {
        settingsButton.style.backgroundColor = "#f9f9f9";
        settingsButton.style.fontWeight = "normal";
    };

    titleContainer.appendChild(appTitleElement);
    titleContainer.appendChild(settingsButton);

    mainContainerMT.appendChild(titleContainer);
    spinnerOverlay.appendChild(spinner);
    mainContainerMT.appendChild(spinnerOverlay);
    mainContainerMT.appendChild(mediaImgContainer);
    mainContainerMT.appendChild(buttonsContainer);

    const statuses = [
        {
            text: ["Not Yet Watched", "Watched"],
            icon: ["add", "check"],
            selector: ["lightBtn", "darkBtn"],
        },
        {
            text: ["Add to\nWatchlist", "On\nWatchlist"],
            icon: ["add", "check"],
            selector: ["lightBtn", "darkBtn"],
        },
    ];

    statuses.forEach((status, index) => {
        const btnIcon = document.createElement("img");
        const btnIconOutline = document.createElement("div");
        const btnText = document.createElement("span");
        const btnContainer = document.createElement("button");
        const btnIndex = index + 1; // Start index from 1 for button IDs

        let currentPair = 0; // Initialize currentPair to 0

        btnIcon.className = "mt-btn-icon";
        btnIconOutline.className = "mt-btn-outline";
        btnContainer.className = "mt-btn-container";
        btnIcon.id = `media-tracker-btn-icon-${btnIndex}`;
        btnIconOutline.id = `media-tracker-btn-outline-${btnIndex}`;
        btnContainer.id = `media-tracker-btn-container-${btnIndex}`;

        chrome.storage.sync.get([titleText]).then((result) => {
            const media = result[titleText];
            if (status === statuses[0] && media?.watched) {
                currentPair = 1;
            }
            if (status === statuses[1] && media?.watchlist) {
                currentPair = 1;
            }

            if (currentPair === 0) {
                btnIcon.src = `https://www.gstatic.com/images/icons/material/system/1x/${status.icon[currentPair]}_black_24dp.png`;
            } else {
                btnIcon.src = `https://www.gstatic.com/images/icons/material/system/1x/${status.icon[currentPair]}_white_24dp.png`;
            }

            btnText.textContent = status.text[currentPair];
            btnContainer.classList.add(status.selector[currentPair]);

            btnContainer.onclick = () => {
                currentPair = currentPair === 0 ? 1 : 0; // Toggle between 0 and 1
                if (currentPair === 0) {
                    btnIcon.src = `https://www.gstatic.com/images/icons/material/system/1x/${status.icon[currentPair]}_black_24dp.png`;
                } else {
                    btnIcon.src = `https://www.gstatic.com/images/icons/material/system/1x/${status.icon[currentPair]}_white_24dp.png`;
                }
                btnText.textContent = status.text[currentPair];
                btnContainer.classList.remove("darkBtn");
                btnContainer.classList.remove("lightBtn");
                btnContainer.classList.add(status.selector[currentPair]);

                // Store the status in Chrome storage
                if (!titleText) {
                    console.error("Title text is not available.");
                    return;
                }
                if (!status) {
                    console.error("Status is not defined.");
                    return;
                }
                if (!chrome || !chrome.storage || !chrome.storage.sync) {
                    console.error("Chrome storage is not available.");
                    return;
                }

                const newWatchedValue = btnIndex === 1 && currentPair === 1;
                const newWatchlistValue = btnIndex === 2 && currentPair === 1;

                chrome.storage.sync.get([titleText], (result) => {
                    const existing = result[titleText] || {};

                    const updatedData = {
                        ...existing,
                        timestamp: Date.now(),
                        imageURL: mediaImgURL || existing.imageURL,
                        watched:
                            btnIndex === 1
                                ? newWatchedValue
                                : existing.watched || false,
                        watchlist:
                            btnIndex === 2
                                ? newWatchlistValue
                                : existing.watchlist || false,
                    };

                    chrome.storage.sync.set(
                        { [titleText]: updatedData },
                        () => {
                            showToast(
                                `${titleText} ${
                                    btnIndex === 1 ? "Watched" : "Watchlist"
                                } updated to ${
                                    btnIndex === 1
                                        ? newWatchedValue
                                        : newWatchlistValue
                                }`
                            );
                        }
                    );
                });
            };
        });

        btnIconOutline.appendChild(btnIcon);
        btnContainer.appendChild(btnIconOutline);
        btnContainer.appendChild(btnText);
        buttonsContainer.appendChild(btnContainer);
    });

    toolPlacement.appendChild(appSeperator);
    toolPlacement.appendChild(mainContainerMT);

    settingsButton.onclick = () => {
        alert("Settings button clicked! (Functionality not implemented yet)");
    };

    const closeImageModal = () => {
        const imageModalCloseBtn = document.querySelector(
            'button[jsname="tqp7ud"]'
        );
        if (imageModalCloseBtn) {
            imageModalCloseBtn.click();
            console.log("Image modal close button clicked.");
        } else {
            console.warn("Image modal close button not found.");
        }
    };

    const waitAndClose = () => {
        imageModalCloseBtn = document.querySelector('button[jsname="tqp7ud"]');
        mediaImgElement =
            document.querySelector('img[jsname="kn3ccd"]') ||
            document.querySelector('img[jsname="JuXqh"]');

        console.log("checking...");

        if (imageModalCloseBtn && mediaImgElement) {
            if (mediaImgElement) {
                mediaImgURL = mediaImgElement.src;
            } else {
                console.warn("Media image element not found.");
                return;
            }
            mediaImgContainer.appendChild(mediaImgImage);
            mediaImgImage.src = mediaImgURL;
            setTimeout(closeImageModal, 500);
            hideSpinner();
        } else {
            setTimeout(waitAndClose, 500);
        }
    };

    mediaMainImgElement?.click();
    window.onload = waitAndClose();
}
