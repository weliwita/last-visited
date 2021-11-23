let addBookmark = document.getElementById("addBookmark");

let itemList = document.getElementById("bookmarks");



chrome.storage.sync.get(null, function(items) {
  var allKeys = Object.keys(items);
  for (let key of allKeys){
    var url = key + items[key];
    var template = `<li>
                        <a href=${url}>${key}</a>
                    </li>`;
    itemList.insertAdjacentHTML('beforeend', template);
  }

  var elements = document.getElementsByTagName('a');
  for(var i = 0, len = elements.length; i < len; i++) {
      elements[i].onclick = async (event) => {
        chrome.tabs.update({url: event.target.getAttribute("href")});
        event.preventDefault();
        return false;
      }
  }
});

addBookmark.addEventListener("click", async () => {
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      function: setPageUrl,
    });

    location.reload();
});

