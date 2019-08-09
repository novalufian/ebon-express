// nodemodule
const serialize = require('form-serialize');
// module app
const _conn = require('../core/connection');
var _master_subag_model = require('../model/model_master_subag');

module.exports = { 
       getAll : function (cb) {
              _master_subag_model.get_all_blok(_conn, function (res) {
                     cb(res);
              });
       },

       getOne : function (id, cb) {
              _master_subag_model.get_one_subagian(_conn, id, function (res) {
                     cb(res);
              })
       },

       update : function (cred, id, cb) {
              _master_subag_model.update_subagian(_conn, cred, id, function (res) {
                     cb(res)
              })
       },

       save : function (cred, cb) {
              _master_subag_model.save_subagian(_conn, cred, function (res) {
                     cb(res);
              })
       },

       delete : function (id, cb) {
              _master_subag_model.unpublished_subagian(_conn, id, function (res) {
                     cb(res);
              })
       }

}