let addBookmark = document.getElementById("addBookmark");

addBookmark.addEventListener("click", async () => {
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: setPageUrl,
  });
});

