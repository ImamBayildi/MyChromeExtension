const firebaseConfig = {
    apiKey: "AIzaSyAboF5cwQret9yuWCyXTjGjlJ9w5D96xZU",
    authDomain: "webparliament-58b81.firebaseapp.com",
    projectId: "webparliament-58b81",
    storageBucket: "webparliament-58b81.appspot.com",
    messagingSenderId: "313773690092",
    appId: "1:313773690092:web:d20609abcc6bf7535a29c9"
  };
firebase.initializeApp(firebaseConfig);

// FirebaseUI Widget'ını Firebase kullanarak başlat.
const ui = new firebaseui.auth.AuthUI(firebase.auth());

var userData = {UserName: null, UserEmail: null, Uid:null, UserProfile:null}
const uiConfig = {
    callbacks: {
        signInSuccessWithAuthResult: function (authResult, redirectUrl) {
            chrome.runtime.sendMessage({ message: 'sign_in' }, function (response) {// arka uca mesaj gönder
                if (response.message === 'success') {// mesajdan gelen cevap
                    window.location.replace('./main.html');//  kullanıcıyı yonlendir. like a welcome.html
                    userData.UserName = firebase.auth().currentUser.displayName;
                    userData.UserEmail= firebase.auth().currentUser.email;
                    userData.Uid= firebase.auth().currentUser.uid;
                    userData.UserProfile = firebase.auth().currentUser.photoURL;

                    console.log(userData)


                       // Save it using the Chrome extension storage API.
                       chrome.storage.local.set({'UserName': userData.UserName, 'UserEmail': userData.UserEmail, 'Uid': userData.Uid, 'UserPicture': userData.UserProfile}, function() {
                        console.log('UserData saved');
                    });
                
                     
                    //document.getElementById("show").innerHTML="Hoşgeldin" + userData.UserName;

                }
              
            });
            return false;
        },
        // uiShown: function () {
        //     //document.getElementById('my_sign_in').style.display = 'none';
        //     //document.getElementById('wrapper').style.pointerEvents = 'none';
        // }
    },
    signInFlow: 'popup',
    // signInSuccessUrl: '<url-to-redirect-to-on-success>',
    signInOptions: [
        // Sunulan Sağlayıcı
        //firebase.auth.GoogleAuthProvider.PROVIDER_ID,     //aşağıda özel parametreyle tanımlı.
        {
            provider: firebase.auth.GoogleAuthProvider.PROVIDER_ID,
            customParameters: {
                prompt: 'select_account'
            }
        }
    ],
    // Terms of service url.
    // tosUrl: '<your-tos-url>',
    // Privacy policy url.
    // privacyPolicyUrl: '<your-privacy-policy-url>'
};

ui.start('#sign_in_options', uiConfig);




//window.onload = function(){ui.start('#sign_in_options', uiConfig);};