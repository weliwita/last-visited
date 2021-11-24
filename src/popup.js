
let itemList = document.getElementById("bookmarks");

chrome.storage.sync.get(null, function(items) {
  var allKeys = Object.keys(items);
  for (let key of allKeys){
    var bookmark = items[key];
    var template = `<li>
                        <img height="16" width="16" src='http://www.google.com/s2/favicons?domain=${bookmark.key}' />
                        <a href=${bookmark.href}>
                          ${bookmark.title}
                        </a>
                        <div class="delete" data-item-key="${bookmark.key}"></div>
                    </li>`;
    itemList.insertAdjacentHTML('beforeend', template);
  }

  var linkElements = document.getElementsByTagName('a');
  for(var i = 0, len = linkElements.length; i < len; i++) {
    linkElements[i].onclick = async (event) => {
        await chrome.tabs.update({url: event.target.getAttribute("href")});
        event.preventDefault();
        window.close();
        return false;
      }
  }

  var deleteElems = document.querySelectorAll('.delete');
  for(var i = 0, len = deleteElems.length; i < len; i++) {
    deleteElems[i].onclick = async (event) => {
        var key = event.target.getAttribute("data-item-key");
        await chrome.storage.sync.remove(key);
        location.reload();
        return false;
      }
  }
});

let addBookmark = document.getElementById("addBookmark");
addBookmark.addEventListener("click", async () => {
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    await chrome.scripting.executeScript({
      target: { tabId: tab.id },
      func: setPageUrl
    });

    location.reload();

});

