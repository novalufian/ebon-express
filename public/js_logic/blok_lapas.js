var curentKamarid = null;
var curentOffsetpage = null;
var intervalPoolingData = null;

$(window).ready(function () {
    get_blok();
})

function initPagination(kamarid) {
    var id = (kamarid == "all") ? "null" : kamarid;
    var settings = {
        "async": true,
        "crossDomain": true,
        "url": `http://localhost:3000/napi/count/all/${id}`,
        "method": "GET"
    }

    $.ajax(settings).done(function (count) {
        var page = parseInt(count) % 10;
        $('#pagination-demo').twbsPagination({
            totalPages: page,
            visiblePages: 7,
            onPageClick: function (event, page) {
                clearInterval(intervalPoolingData);
                console.log(page);
                curentOffsetpage = page - 1;
                poolingdata(curentOffsetpage,curentKamarid);

            }
        });
        
    })
}

function get_blok() {
    curentKamarid = "all";
    curentOffsetpage = 0;

    var settings = {
        "async": true,
        "crossDomain": true,
        "url": "http://localhost:3000/blok/",
        "method": "GET"
    }

    $.ajax(settings).done(function (bloks) {
        var dataBlokEl = document.getElementById('dataBlokEl').innerHTML;
        var html = ejs.render(dataBlokEl, { bloks: bloks.data });
        document.getElementById("select_blok").innerHTML = html;

        boot_blok_lapas(0, "all");
        addEventBlokOption();
        createDiagramTable("all");
        initPagination(curentKamarid);
    });
}

function poolingdata ( offset,curentKamarid) {
    console.log("set interval")
    intervalPoolingData = setInterval(function () {
        boot_blok_lapas(offset * 10 , curentKamarid);
    }, 500);
}

function get_kamar(blokid) {
    var url = (blokid == "all") ? `http://localhost:3000/kamar` : `http://localhost:3000/kamar/blok/${blokid}`;
    var settings = {
        "async": true,
        "crossDomain": true,
        "url": url,
        "method": "GET"
    }

    $.ajax(settings).done(function (kamars) {
        var dataKamarEl = document.getElementById('dataKamarEl').innerHTML;
        var html = ejs.render(dataKamarEl, { kamars: kamars.data });
        document.getElementById("napi_kamar_wrapper").innerHTML = html;

        addEventKamarOption();

    });
}

function boot_blok_lapas(offset, kamarid) {
    var url = (kamarid == "all") ? `http://localhost:3000/napi/${offset}` : `http://localhost:3000/napi/kamar/${kamarid}`

    var settings = {
        "async": true,
        "crossDomain": true,
        "url": url,
        "method": "GET",
        "headers": {
            "cache-control": "no-cache",
            "postman-token": "88a0360a-0123-1878-1700-989edee26a99"
        }
    }

    $.ajax(settings).done(function (napis) {
        var dataNapiContainerEl = document.getElementById('dataNapiContainerEl').innerHTML;
        var html = ejs.render(dataNapiContainerEl, { napis: napis.data });
        document.getElementById("oke-disini").innerHTML = html;
        addEventBook();
    });
}

function addEventBlokOption() {
    var opt = document.querySelectorAll("#select_blok option");
    opt.forEach(function (el, i) {
        el.addEventListener("click", function () {
            if (this.value == "all") {
                clearInterval(intervalPoolingData)
                poolingdata(curentOffsetpage ,this.value);
            } else{
                get_kamar(this.value);
            }
        })
    }) 
}

function addEventKamarOption() {
    var opt = document.querySelectorAll("#napi_kamar_wrapper option");
    opt.forEach(function (el, i) {
        el.addEventListener("click", function () {
            clearInterval(intervalPoolingData)
            document.getElementById("oke-disini").innerHTML = "";
            boot_blok_lapas(this.value);
            createDiagramTable(this.value);

            initPagination(this.value);
        })
    })
}

function addEventBook() {
    var btn = document.querySelectorAll(".btn-add-book");
    btn.forEach(function (el, i) {
        el.addEventListener("click", bookNapi)  
    })
}

function bookNapi(e) {
    var btn = this;
    var napiid = btn.getAttribute("data-id-napi");
    var user = thisUser();

    var settings = {
        "async": true,
        "crossDomain": true,
        "url": "http://localhost:3000/napi/book",
        "method": "POST",
        "headers": {
            "content-type": "application/x-www-form-urlencoded",
            "cache-control": "no-cache",
            "postman-token": "c35425e4-52c6-2a70-699b-f5fa874dde17"
        },
        "data": {
            "napi_booked": 1,
            "napi_booked_by": user.user_id,
            "napi_id": napiid
        }
    }

    btn.textContent = "Loading..";
    btn.setAttribute("disbled", true);

    $.ajax(settings)
    .done(function (res) {
        console.log(res)
        btn.textContent = "Booked";
        btn.setAttribute("class", "btn btn-dafault");

    })
    .fail(function (err) {
        btn.textContent = "book";
        btn.setAttribute("disbled", false);
        console.log(err)
    })

}

function createDiagramTable(kamarid) {
    document.querySelector(".table-update-diagram-napi").innerHTML = "";
    countAllnapi(kamarid);
    countUnbookd(kamarid);
    getSubagBlokLapas(kamarid);
}

function countAllnapi(kamarid) {
    var id = (kamarid == "all") ? "null" : kamarid;
    var settings = {
        "async": true,
        "crossDomain": true,
        "url": `http://localhost:3000/napi/count/all/${id}`,
        "method": "GET"
    }

    $.ajax(settings).done(function (napi) {
        var tr = document.createElement("tr");
        var td1 = document.createElement("td");
        td1.textContent = "total napi";
        tr.appendChild(td1)

        var td2 = document.createElement("td");
        td2.textContent = ":";
        tr.appendChild(td2)

        var td3 = document.createElement("td");
        td3.textContent = napi;
        tr.appendChild(td3)
        document.querySelector(".table-update-diagram-napi").appendChild(tr);
    });
}

function countUnbookd(kamarid) {
    var id = (kamarid == "all") ? "null" : kamarid;
    var settings = {
        "async": true,
        "crossDomain": true,
        "url": `http://localhost:3000/napi/count/unbook/${id}`,
        "method": "GET"
    }

    $.ajax(settings).done(function (napi) {
        var tr = document.createElement("tr");
        var td1 = document.createElement("td");
        td1.textContent = "jumlah napi unbooked";
        tr.appendChild(td1)

        var td2 = document.createElement("td");
        td2.textContent = ":";
        tr.appendChild(td2)

        var td3 = document.createElement("td");
        td3.textContent = napi;
        tr.appendChild(td3)
        document.querySelector(".table-update-diagram-napi").appendChild(tr);
    });
}

function getSubagBlokLapas(kamarid) {
    var id = (kamarid == "all") ? "null" : kamarid;

    var settings = {
        "async": true,
        "crossDomain": true,
        "url": `http://localhost:3000/subag`,
        "method": "GET"
    }

    $.ajax(settings).done(function (subag) {
        generate_diagram_napi_by_subag(id, subag.data);
    });
}

function generate_diagram_napi_by_subag(kamarid, subag) {
    var diagram = [];

    for(var j = 0; j < subag.length; j++){
    }

    subag.forEach(function (el, i) {

        var id = (kamarid == "all") ? "null" : kamarid;
        var settings = {
            "async": true,
            "crossDomain": true,
            "url": `http://localhost:3000/napi/count/subag/${el.subagian_id}/${id}`,
            "method": "GET"
        }

        $.ajax(settings).done(function (c) {
            var a = {
                "name" : el.nama,
                "count" : c
            }
            diagram.push(a);

            if (i == (subag.length - 1)) {
                var dataDiagram = document.getElementById('dataDiagramEl').innerHTML;
                var html = ejs.render(dataDiagram, { diagram: diagram });
                document.querySelector(".table-update-diagram-napi").innerHTML += html;    
            }
        });


        
    });  
}

function thisUser() {
    var a= window.localStorage.getItem("this_user");
    var data = JSON.parse(a).data;
    return data;
}