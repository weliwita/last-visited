
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
          sendResponse({status: true, value : items[foundKey]});
        }else{
          sendResponse({status: false});
        }
        
    });
    return true;
  }
});
