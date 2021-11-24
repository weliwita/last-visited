let firstVisitString =  `
<div class="last-visit">

<span class="message">Last-Visit 
</span>
<div class="actions">
    <span id="btn-visit" class="btn">Go to Last Visited Page</span>
    <span id="btn-update" class="btn">Track This Page </span>
    <span id="btn-ignore" class="btn">Pause Tracking</span>
    <span id="btn-remove" class="btn">Remove</span>
</div>
<div id="btn-close" class="close">
    <div class="icon"></div>
</div>
</div>
`;

let trackString =  `
<div class="last-visit">

<span class="message">Last-Visit - Tracking 
</span>
<div class="actions">
    <span id="btn-ignore" class="btn">Pause</span>
    <span id="btn-remove" class="btn">Remove</span>
</div>
<div id="btn-close" class="close">
    <div class="icon"></div>
</div>
</div>
`;

let ignoredString =  `
<div class="last-visit">

<span class="message">Last-Visit - Paused 
</span>
<div class="actions">
    <span id="btn-update" class="btn"> Track </span>
    <span id="btn-remove" class="btn"> Remove </span>
</div>
<div id="btn-close" class="close">
    <div class="icon"></div>
</div>
</div>
`;



let last_visit_session = window.sessionStorage;
let splitUrl = new SplitUrl(window.location.href);

chrome.runtime.sendMessage({method: "isTracked", key: splitUrl.key}, function(response) {
    debugger;
    if(response.status == true){
        let ignoreSession = JSON.parse(sessionStorage.getItem('last-visit::ignoreSession'));
        let firstVisit = !JSON.parse(sessionStorage.getItem('last-visit::visited'));
        let trackedUrl = response.data.href == splitUrl.href;
        if(firstVisit){
            last_visit_session.setItem("last-visit::visited", true );
        }
        
        if(firstVisit && !trackedUrl){
            document.body.insertAdjacentHTML('afterbegin', firstVisitString);
        }

        if(!firstVisit && ignoreSession){
            document.body.insertAdjacentHTML('afterbegin', ignoredString);
        }

        if((!firstVisit && !ignoreSession) || (firstVisit && trackedUrl)){
            document.body.insertAdjacentHTML('afterbegin', trackString);
            setPageUrl();
        }
        
        let btnIgnore = document.querySelector('#btn-ignore');
        if(btnIgnore)
            btnIgnore.addEventListener('click', function (event){
                console.log('Ignore Button Clicked');
                last_visit_session.setItem("last-visit::ignoreSession", true );
                location.reload();
            });

        let btnVisit = document.querySelector('#btn-visit');
        if(btnVisit)
            btnVisit.addEventListener('click', function (event){
                console.log('Visit Button Clicked');
                window.location.href = response.data.href;
            });
        
        let btnUpdate = document.querySelector('#btn-update');
        if(btnUpdate)
            btnUpdate.addEventListener('click', function (event){
                console.log('Update Button Clicked');
                last_visit_session.setItem("last-visit::ignoreSession", false );
                setPageUrl();
                location.reload();
            });
        
        let btnRemove = document.querySelector('#btn-remove');
        if(btnRemove)
            btnRemove.addEventListener('click', function (event){
                console.log('Remove Button Clicked');
                //remove from list.
        });

        let btnClose = document.querySelector('#btn-close');
        btnClose.addEventListener('click', function (event){
            console.log('close Button Clicked');
            var x = document.querySelector(".last-visit");
            x.style.display = "none";
        });
    }
});
