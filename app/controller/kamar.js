// nodemodule
const serialize = require('form-serialize');
// module app
const _conn = require('../core/connection');
var _kamar_model = require('../model/model_kamar');

module.exports = { 
       getAllListKamar : function (cb) {
              _kamar_model.get_all_kamar(_conn, function (res) {
                     cb(res);
              });
       },

       getKamarByBlok : function (blokid, cb) {
              _kamar_model.get_kamar_by_blok(_conn, blokid, function (res) {
                     cb(res);
              })
       },

       getKamarOne : function (kamarid, cb) {
              _kamar_model.get_one_kamar(_conn, kamarid, function (res) {
                     cb(res);
              })
       },

       save : function (cred, cb) {
              _kamar_model.save_kamar(_conn, cred, function (res) {
                     cb(res);
              })
       },

       update : function (cred, cb) {
              _kamar_model.update_kamar(_conn, cred, function (res) {
                     cb(res);
              })
       }
}