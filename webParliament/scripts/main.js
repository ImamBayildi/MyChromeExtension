
    // chrome.runtime.sendMessage({ message: 'is_user_signed_in' }, 
    //     function (response) {
    //         if (!(response.message === 'success' && response.payload)) {
    //           //  window.location.replace('./login.html');//Kullanıcı girişi yapılmışsa main.html ye git
    //         }else{
    //             //myCodes();
    //         }
    //     }
    // )

    //is_usersigned_in fonksiyonu asenkron çalıştığından tüm kodlar fonksiyon içerisine alındı, alternatif: Callbak

  

    //var userData = {UserName: "", UserEmail: "", Uid:""}

    function getUser(callback) {
        var userData = {UserName: "", UserEmail: "@gmail.com", Uid:"", Profile:''}

        chrome.storage.local.get(['UserName', 'UserEmail','Uid','UserPicture'], function(items) {
            console.log('Chrome local get: ', items);
            userData.UserName = items.UserName;
            userData.UserEmail = items.UserEmail;
            userData.Uid = items.Uid;
            userData.Profile = items.UserPicture;
            callback(userData)
        });
    }
    
    
      
    var siteUrl
    var uri
    var favIconUrl

    function getActiveTabUrl(callback) {
        chrome.tabs.query({ active: true, lastFocusedWindow: true }, async function (tabs) {
            const url = tabs[0].url;//sayfa adresi
            const fav = tabs[0].favIconUrl//geçerli sayfanın favIcon'u
            callback(url,fav);
        });
    }

    getActiveTabUrl(function (urlP,favUrl) {//CALLBACK1
        
        favIconUrl=favUrl

        let url1 = new URL(urlP);
        uri = url1.hostname
        siteUrl = urlP

        document.getElementById("website-name").innerText = url1.host
        document.getElementById("website-logo").setAttribute("src",favIconUrl)

        console.log("favIcon: "+favIconUrl)
        console.log("Sayfa url: "+siteUrl); // burada url değişkenine erişebilirsiniz
        
        getUser(function(userData) {//CALLBACK2
                let rateInfo = {
                URL: siteUrl,
                URI: uri,
                UserName: userData.UserName,
                UserEmail: userData.UserEmail,
                uId: userData.Uid
                };

                let url = 'http://10.31.101.128:1881/queryAvg'//ortalama puanı sorgula
                fetch(url, {
                    method: "POST",
                    body: JSON.stringify(rateInfo),
                    headers: { "Content-type": "application/json; charset=UTF-8" }
                })
                    .then(response => response.json())
                    .then(response => response.recordset)
                    .then(function (response) {
                        let stars = document.getElementById("starsWebSite")
                        for (let i = 0; i < stars.length; i++) {
                            if (stars[i].value == response[0].avgScore) {
                                stars[i].checked = true
                            }
                        }
                    })


                    let urlQuery = 'http://10.31.101.128:1881/query'//kullanıcı puanı sorgula
                fetch(urlQuery, {
                    method: "POST",
                    body: JSON.stringify(rateInfo),
                    headers: { "Content-type": "application/json; charset=UTF-8" }
                })
                    .then(response => response.json())
                    .then(response => response.recordset)
                    .then(function (response) {
                        console.log("queryResponse: ")
                        console.log(response)
                        let stars = document.getElementById("starsUser")
                        for (let i = 0; i < stars.length; i++) {
                            if (stars[i].value == response[0].point) {
                                stars[i].checked = true
                            }
                        }
                        document.getElementById("rateDate").innerHTML = response[0].rateTime+"'de bu siteye puan verdiniz"
                    })

                    let chatMessage = ""
                    let chatQuery = 'http://10.31.101.128:1881/chateSor'
                fetch(chatQuery, {
                    method: "POST",
                    body: JSON.stringify(rateInfo),
                    headers: { "Content-type": "application/json; charset=UTF-8" }
                })
                    .then(response => response.json())
                    .then(function (response) {
                        chatMessage= response
                        console.log(chatMessage)
                        document.getElementById("chat").innerHTML = response
                        document.querySelector('.rotate').classList.remove('rotate');   //class'ı silerek animasyonu durdur
                    })

                // Senkronize çalışmasıv gereken noktalarda kullanıcı verilerini ve rateInfo'yu kullanabilirsiniz.
            });//C2
        

        
    });//C1
    


    //local.Storage'den cekilecek veriler aşağıda tanımlanmıştır.

    //yıldızlardan seçileni al (tıklama eventi ekle)

    document.getElementById("btnStars").addEventListener("click", function () {


        chrome.runtime.sendMessage({ message: 'is_user_signed_in' }, 
        function (response) {
            if ((response.message === 'success' && response.payload)) {//kullanıcı girişi yapılmışsa

                var stars = document.getElementById("starsUser")
                var check
                for (let i = 0; i < stars.length; i++) {
                    if (stars[i].checked) {
                        check = stars[i].value;
                        console.log(check)
                    }
                }
        
                
                getUser(function(userData) {//CALLBACK2
                    let rateInfo = {
                    URL: siteUrl,
                    URI: uri,
                    UserName: userData.UserName,
                    UserEmail: userData.UserEmail,
                    uId: userData.Uid,
                    rate: check
                    };
                
        
                //fetch
                let url = 'http://10.31.101.128:1881/vote'//puanla
              fetch(url, {
                method: "POST",
                body: JSON.stringify(rateInfo),
                headers: { "Content-type": "application/json; charset=UTF-8" }
              })
                .then(response => response.json())
                .then(json => console.log(JSON.stringify(json)))
                .then(function (err) {
                    if (!err) {
                        document.getElementById("rateDate").innerHTML = "Bu siteye puan verdiniz"
                    }
                })
                .catch(err => alert("Bir hata meydana geldi! "+err))

            });//C2


            }else{
                alert("Lütfen önce giriş yapın")
            }
        }
    )

        
        


    });
    

   


    
        
    //MyCodes end scope--
      
    //Veriyi gönder
