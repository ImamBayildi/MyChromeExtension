function init() {
    chrome.runtime.sendMessage({ message: 'is_user_signed_in' }, 
        function (response) {
            if (!(response.message === 'success' && response.payload)) {
                //window.location.replace('./login.html');//Kullanıcı girişi yapılmışsa main.html ye git
                

                document.getElementById("rating").style.display //none
            }
        }
    )};  
init();

// window.onload = function(){chrome.storage.local.get(['UserName', 'UserEmail'], function(items) {
//     document.getElementById("show").innerHTML= 'Hoşgeldin'+ items.UserName + " " + items.UserEmail;
//  });
// };
 


/*
// Read it using the storage API    --  locale storage'den veri alma ['d1', 'd2']   --items.d1
 chrome.storage.local.get(['UserName', 'UserEmail'], function(items) {
    console.log('Settings retrieved', items);
});*/
