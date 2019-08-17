// nodemodule
const serialize = require('form-serialize');

// module app
const _conn = require('../core/connection');
const _bon_admin = require('../model/model_bon');

module.exports = { 
       getAll : function (thisuser,cb) {
              _bon_admin.get_all_data(_conn, thisuser , function (res) {
                     cb(res)
              })
       },

       save : function (cred, cb) {
              _bon_admin.save_bon_data(_conn, cred, function (res) {
                     cb(res)
              })
       },

       getByUser : function (thisuser, cb) {
              _bon_admin.get_all_data_by_user(_conn, thisuser, function (res) {
                     cb(res)
              })
       },

       getById : function (bonid , cb) {
              _bon_admin.get_by_id(_conn, bonid, function (res) {
                     cb(res);
              })
       },

       update : function (cred, bonid, cb) {
              _bon_admin.update_bon_data(_conn, cred, bonid, function (res) {
                     cb(res)
              })
       },

       updateStatus : function (cred, cb) {
              _bon_admin.update_bon_status(_conn, cred, function (res) {
                     cb(res);
              })
       }
}

// function getThisUser() {
//     var a= window.localStorage.getItem("this_user");
//     var data = JSON.parse(a).data;
//     return data;
// }