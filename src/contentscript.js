var txt = "";


console.log(txt)

chrome.runtime.sendMessage({method: "isTracked", url: window.location.hostname}, function(response) {
    debugger;
    console.log(response.status);
    if(response.status == true && response.url != (window.location.pathname + window.location.search + window.location.hash)){
        var r = confirm("Do you want to go to previous bookmark?");
        if (r == true) {
            window.location.href = response.url;
        } else {
            txt = "You pressed Cancel!";
        }
    }
   
});

// chrome.runtime.sendMessage({method: "isTracked", key: "status"}, function(response) {
//     console.log(response.data);
// });