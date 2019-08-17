// nodemodule
const serialize = require('form-serialize');
// module app
const _conn = require('../core/connection');
var _pegawai_model = require('../model/model_pegawai');

module.exports = { 
       getAll : function (cb) {
              _pegawai_model.get_all_pegawai(_conn, function (res) {
                     cb(res);
              });
       },

       getOne : function (id, cb) {
              _pegawai_model.get_one_pegwai(_conn, id, function (res) {
                     cb(res)
              })
       },

       save : function (cred, cb) {
              _pegawai_model.save_pegawai(_conn, cred, function (res) {
                     cb(res);
              })
       },

       update : function  (cred, id, cb) {
              _pegawai_model.update_data_pegawai(_conn, cred, id, function (res) {
                     cb(res);
              })
       },

       delete : function (id, cb) {
              _pegawai_model.unpublish_data_pegawai(_conn, id, function (res) {
                     cb(res)
              })
       }
}