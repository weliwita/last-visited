let firstVisitString =  `
<div class="last-visited">

<p class="message">Last-Visit tracks a previously visited url for this site. 
</p>
<button id="btn-ignore" class="btn">Ignore For this session</button>
<button id="btn-visit" class="btn">Go to last-visited</button>
<button id="btn-update" class="btn">Update last-visited</button>
<button id="btn-remove" class="btn">Remove from last-visit</button>
</div>
`;

let trackString =  `
<div class="last-visited">

<p class="message">Last-Visit auto saved this page as last visited. 
</p>
<button id="btn-ignore" class="btn">Ignore tracking for this session</button>
<button id="btn-remove" class="btn">Remove site from last-visit</button>
</div>
`;

let ignoredString =  `
<div class="last-visited">

<p class="message">Last-Visit ignored for this session. 
</p>
<button id="btn-update" class="btn">Update last-visited(cancel ignore)</button>
<button id="btn-remove" class="btn">Remove site from last-visit</button>
</div>
`;

let last_visit_session = window.sessionStorage;

chrome.runtime.sendMessage({method: "isTracked", url: window.location.hostname}, function(response) {
    debugger;
    if(response.status == true){

        let splitUrl = new SplitUrl(window.location.href);
        let ignoreSession = JSON.parse(sessionStorage.getItem('last-visit::ignoreSession'));
        let firstVisit = !JSON.parse(sessionStorage.getItem('last-visit::visited'));
        let trackedUrl = response.value == splitUrl.value;
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
            });

        let btnVisit = document.querySelector('#btn-visit');
        if(btnVisit)
            btnVisit.addEventListener('click', function (event){
                console.log('Visit Button Clicked');
                window.location.href = response.value;
            });
        
        let btnUpdate = document.querySelector('#btn-update');
        if(btnUpdate)
            btnUpdate.addEventListener('click', function (event){
                console.log('Update Button Clicked');
                last_visit_session.setItem("last-visit::ignoreSession", false );
                setPageUrl();
            });
        
        let btnRemove = document.querySelector('#btn-remove');
        if(btnRemove)
            btnRemove.addEventListener('click', function (event){
                console.log('Remove Button Clicked');
                //remove from list.
        });

    }
});








