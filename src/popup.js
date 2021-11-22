let addBookmark = document.getElementById("addBookmark");

addBookmark.addEventListener("click", async () => {
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: setPageUrl,
  });
});


function setPageUrl() {
  var path = window.location.pathname;
  var str = path.split("/");
  var urlKey = window.location.protocol + "//" + window.location.host 
  var urlValue = window.location.pathname + window.location.search + window.location.hash;
  chrome.storage.sync.set({ [urlKey] : urlValue });
  // chrome.storage.sync.get("url", ({ url }) => 
  // {
  //   console.log('url background color :' + url);
  //   document.body.style.backgroundColor = color;
  // });
}