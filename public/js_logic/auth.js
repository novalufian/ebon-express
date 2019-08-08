$(window).ready(function () {
    document.querySelector("#btn-login").addEventListener("click", function () {
        var loginData = $("#form-login").serializeArray();
        var parseLoginData = [];
        loginData.forEach(function(el, i){
            parseLoginData[el.name] = el.value
        })

        console.log('on login')

        var settings = {
            "async": true,
            "crossDomain": true,
            "url": "http://localhost:3000/login",
            "method": "POST",
            "headers": {
                "content-type": "application/x-www-form-urlencoded",
                "cache-control": "no-cache",
                "postman-token": "c35425e4-52c6-2a70-699b-f5fa874dde17"
            },
            "data": {
                "username": parseLoginData.username,
                "password": parseLoginData.password,
                "user_role_id": parseLoginData.user_role_id
            }
        }


        $.ajax(settings)
        .done(function (response) {
            console.log(response);
            $('#template-login-section').css("top","-200vh");
            $('#template-preloading').css("top", "-200vh");
        })
        .fail(function (err) {
            console.log(err)
        });
    })

    document.querySelector("#btn-logout").addEventListener("click",function () {
        console.log('logout')
        $('#template-login-section').css("top","0px")
    })


    var settings = {
        "async": true,
        "crossDomain": true,
        "url": "http://localhost:3000/content/home",
        "method": "GET",
        "headers": {
        "cache-control": "no-cache",
        "postman-token": "88a0360a-0123-1878-1700-989edee26a99"
        }
    }

    $.ajax(settings).done(function (response) {
        $('#template-content-section').html(response)
    });
})