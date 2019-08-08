// nodemodule
const serialize = require('form-serialize');

// module app
const _conn = require('../core/connection');
const _auth_admin = require('../model/model_auth_admin');

module.exports = { 
       login : function (data, cb) {
              var credentials = {
                     "username" : data.username,
                     "password" : data.password,
                     "user_login_role" :data.user_role_id
              }

              console.log(credentials);

              _auth_admin.login(_conn, credentials, function (res) {
                     if (res.success == true) {
                            if (res.status == 200) {
                                   var thisUser = {
                                          "username" : res.data[0].username,
                                          "user_login_role" : res.data[0].user_login_role,
                                          "user_id" : res.data[0].user_id,
                                          "nama" : res.data[0].nama_pegawai,
                                          "nip" : res.data[0].nip_pegawai,
                                          "subagian" : res.data[0].nama,
                                          "subagian_id" : res.data[0].subag_pegawai
                                   }

                                   var rs = {
                                          "success"     : true,
                                          "status"      : 200,
                                          "message"     : "user found",
                                          "data"        : thisUser
                                   }
                                   cb(rs)
                            }else{
                                   var rs = {
                                          "success"     : true,
                                          "status"      : 404,
                                          "message"     : "user not found",
                                          "data"        : null
                                   }
                                   cb(rs)
                            }

                     }else{
                            console.log('error login')
                     }
              })
       }
}