


    document.getElementById("btnHome").addEventListener("click", function () {
        window.location.replace('./main.html')
    });

    // document.getElementById("btnUser").addEventListener("click", function () {
    //     window.location.replace('./user.html')
    // });//kullanımdan kaldırıldı

    document.getElementById("userPage").addEventListener("click", function () {
        window.location.replace('./userPage.html')
    });

    //sil
    function getIcon() {

        var favicon = document.querySelector('link[rel="shortcut icon"]');
        if (!favicon) {
            favicon = document.querySelector('link[rel="icon"]');
        }
        if (!favicon) {
            return;
        }
        var iconURL = favicon.href;

        console.log(iconURL)
    }

    getIcon();