
let user_signed_in = false;

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (request.message === 'is_user_signed_in') {
        sendResponse({
            message: 'success',
            payload: user_signed_in
        });
    } else if (request.message === 'sign_out') {//sign out mesajı gelirse
        user_signed_in = false;//kullanıcı durumu
        sendResponse({ message: 'success' });//çıkış yapıldıysa success cevapla
    } else if (request.message === 'sign_in') {//gelen mesaj sign in ise popup-script'ten
        user_signed_in = true;
        sendResponse({ message: 'success' });
    }

    return true;
});


