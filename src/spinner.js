export function createInlineSpinner(options = {}) {
    const { message = "Loading...", size = "40", className = "" } = options;

    // Container div
    const wrapper = document.createElement("div");
    wrapper.className = "spinner";

    // Image element
    const img = document.createElement("img");
    img.src = chrome.runtime.getURL("icons/loading.svg"); // Use getURL in extensions!
    img.alt = "Loading...";
    img.width = size;
    img.height = size;
    img.className = `animate-spin ${className}`;

    // Span with message
    const span = document.createElement("span");
    span.textContent = message;

    // Append to wrapper
    wrapper.appendChild(img);
    wrapper.appendChild(span);

    return wrapper;
}
