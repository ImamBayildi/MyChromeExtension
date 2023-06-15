



 //local.Storage'den cekilecek veriler aşağıda tanımlanmıştır.
 document.querySelector('#sign_out').addEventListener('click', () => {
    chrome.runtime.sendMessage({ message: 'sign_out' },//çıkış yap mesajı gönder
        function (response) {
            if (response.message === 'success') {//cevap başarılı ise
                window.location.replace('./main.html');

                chrome.storage.local.set({'UserName': '', 'UserEmail': '', 'Uid': '', 'UserPicture': ''}, function() {
                    console.log('UserData saved');
                });

                document.getElementById("sign_in_options").style.display //display: none
                document.getElementById("sign_out").style.display   //not none
            }
        }
    )});
    
var userData = {UserName: "Ahmet", UserEmail: "ahmetAkbulut@gmail.com", Uid:"9999", Profile:'null'}

 function init() {
    chrome.runtime.sendMessage({ message: 'is_user_signed_in' }, 
        function (response) {
            if ((response.message === 'success' && response.payload)) {//Kullanıcı girişi yapılmışsa

                console.log("İNİT SUCCESS")
                chrome.storage.local.get(['UserName', 'UserEmail','Uid','UserPicture'], function(items) {
                    console.log('Chrome local get: ', items);
                    userData.UserName = items.UserName;
                    userData.UserEmail = items.UserEmail;
                    userData.Uid = items.Uid;
                    userData.Profile = items.UserPicture;
                        
                    document.getElementById("userProfile").style.display = "flex"
                    document.getElementById("sign_out").style.display = "inline-block"
                    document.getElementById("sign_in_options").style.display = "none"
                    document.getElementById("UserPicture").setAttribute("src",userData.Profile)
                    document.getElementById("UserName").innerHTML= userData.UserName
                    document.getElementById("UserEmail").innerHTML= userData.UserEmail
                });


            }else{
                document.getElementById("userProfile").style.display = "none"
            }
        }
    )};  

    
window.onload = function(){

    let rateInfo = {
        URI: ''
    }
    // var favIconUrl
    //     chrome.tabs.query({ active: true, lastFocusedWindow: true }, async function (tabs) {
    //         let siteUrl = tabs[0].url;//sayfa adresi
    //         favIconUrl = tabs[0].favIconUrl//geçerli sayfanın favIcon'u
            
    //     let url1 = new URL(siteUrl);

    //     rateInfo.URI = url1.host

    //     document.getElementById("website-name").innerText = url1.host
    //     document.getElementById("website-logo").setAttribute("src",favIconUrl)

    //     let url = 'http://10.76.145.235:1881/queryAvg'
    //     fetch(url, {
    //       method: "POST",
    //       body: JSON.stringify(rateInfo),
    //       headers: { "Content-type": "application/json; charset=UTF-8" }
    //     })
    //       .then(response => response.json())
    //       .then(response => response.recordset)
    //       .then(function (response) {
    //           let stars = document.getElementById("starsWebSite")
    //           for (let i = 0; i < stars.length; i++) {
    //               if (stars[i].value == response[0].avgScore) {
    //                   stars[i].checked = true
    //               }
    //           }
    //       })

    //     });
    

        

   

    init();

};



    //Sayfanın ortalama puanını getir.
    


