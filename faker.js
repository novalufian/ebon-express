var faker = require('faker');
const _conn = require('./app/core/connection');
const napi = require('./app/model/model_napi');

function save() {
    var cred = {
        'napi_id' : 'NPI-'+ Date.now() + Math.floor(Math.random(100000, 1000000) * 1000000000),
        'napi_foto' : "lorem",
        'napi_no_reg' :  Math.floor(Math.random(100000, 1000000) * 1000000000),
        'napi_nama' :  faker.name.findName(),
        'napi_kamar' :  "KMR-164365261-20190123023044",
        'napi_sex' : 0,
    }

    napi.save_napi(_conn, cred, function (res) {
        console.log(res)
    })
}

for(var j = 0; j < 20; j++){
    save();
    console.log('saved')
}