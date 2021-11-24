
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.method == "isTracked")
  {
    var requestedKey = request.key;
    var found = false;
    var foundKey = 
    chrome.storage.sync.get(null, function(items) {
        var allKeys = Object.keys(items);
        console.log(allKeys);
        for (let key of allKeys) {
          
          if(key == requestedKey){
            found = true;
            foundKey = key;
            break;
          }
        }
        if(found){
          sendResponse({status: true, data : items[foundKey]});
        }else{
          sendResponse({status: false});
        }
        
    });
    return true;
  }
});
