class SplitUrl {
    constructor(href) {
      var url = new URL(href);
      this.key= url.protocol + "//" + url.host;
      this.value= url.pathname + url.search + url.hash;
      this.hostname = url.hostname;
    }
  }

function setPageUrl() {
    var splitUrl = new SplitUrl(window.location.href)
    // var urlKey = window.location.protocol + "//" + window.location.host 
    // var urlValue = window.location.pathname + window.location.search + window.location.hash;
    var urlKey = splitUrl.key
    var urlValue = splitUrl.value
    chrome.storage.sync.set({ [urlKey] : urlValue });
}