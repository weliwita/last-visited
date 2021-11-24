class SplitUrl {
  constructor(href) {
    var url = new URL(href);
    this.key= url.hostname;
    this.href= href
  }
}

//duplicate this on popup
var setPageUrl = function() {
  class SplitUrl {
    constructor(href) {
      var url = new URL(href);
      this.key= url.hostname;
      this.href= href
    }
  }

  var splitUrl = new SplitUrl(window.location.href)
  var storageValue = {key: splitUrl.key, href: splitUrl.href , title: document.title}
  chrome.storage.sync.set({ [splitUrl.key] : storageValue });
}