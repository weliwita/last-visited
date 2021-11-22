
chrome.runtime.onInstalled.addListener(() => {
  
});

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.method == "isTracked")
  {
    var hostname = request.url;
    var found = false;
    var foundKey = 
    chrome.storage.sync.get(null, function(items) {
        var allKeys = Object.keys(items);
        console.log(allKeys);
        for (let key of allKeys) {
          var keyUrl = new URL(key);
          if(keyUrl.hostname == hostname){
            found = true;
            foundKey = key;
            break;
          }
        }
        if(found){
          sendResponse({status: true, url : items[foundKey]});
        }else{
          sendResponse({status: false});
        }
        
    });
    return true;
  }
  else
    sendResponse({}); // snub them.
});


// chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
//   if (request.method == "getLocalStorage")
//     sendResponse({data: localStorage[request.key]});
//   else
//     sendResponse({}); // snub them.
// });
// chrome.webNavigation.onBeforeNavigate.addListener(function(data) {
//   if (typeof data)
//     console.log("url"+ data.url);
//   else
//     console.error('inHandlerError'+ e);
// });

// function injectedFunction() {
//   document.body.style.backgroundColor = 'orange';
// }

// chrome.action.onClicked.addListener((tab) => {
//   chrome.scripting.executeScript({
//     target: { tabId: tab.id },
//     function: injectedFunction
//   });
// });

