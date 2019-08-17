// nodemodule
const serialize = require('form-serialize');

// module app
const _conn = require('../core/connection');
const _user = require('../model/model_auth');

module.exports = { 
       getAll : function (role_user,cb) {
              _user.get_all_user_by_role_user(_conn, role_user , function (res) {
                     cb(res)
              })
       },

       getOne : function (id,role_user, cb) {
              _user.get_one_published_by_role_user(_conn, role_user, id , function (res) {
                     cb(res);
              })
       },

       getById : function (id, cb) {
              _user.get_one_published_by_login_id( _conn, id, function (res) {
                     cb(res);
              } )
       },

       delete : function (id, cb) {
              _user.delete_user(_conn, ud, function  (res) {
                     cb(res);
              })
       },

       save : function (cred, cb) {
              _user.simpan_data_login(_conn, cred, function (res) {
                     cb(res);
              })
       },

       update : function (cred, cb) {
              _user.update_upas(_conn, cred, function (res) {
                     cb(res);
              })
       }
}
