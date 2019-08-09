// nodemodule
const serialize = require('form-serialize');
// module app
const _conn = require('../core/connection');
var _napi_model = require('../model/model_napi');

module.exports = { 
       getAllListNapi : function (offset, cb) {
              _napi_model.get_all_napi_published(_conn, offset, function (res) {
                     cb(res);
              });
       },

       getAllListNapiByKamar : function (kamarid,offset, cb) {
              _napi_model.get_all_napi_by_kamarid(_conn, kamarid,offset, function (res) {
                     cb(res);
              });
       },

       getOneNapi : function (id, cb) {
              _napi_model.get_one_napi(_conn, id, function (res) {
                     cb(res);
              })
       },

       save : function (cred, cb) {
              _napi_model.save_napi(_conn, cred, function (res) {
                     cb(res);
              })
       },

       book_napi : function (cred, cb) {
              _napi_model.book_napi(_conn, cred, function (res) {
                     cb(res);
              })
       },

       update : function (cred,id, cb) {
              _napi_model.update_data_napi(_conn, cred , id, function (res) {
                     cb(res);
              })
       },

       unpublish : function (id, cb) {
              _napi_model.unpublish_data_napi(_conn, id, function (res) {
                     cb(res);
              })
       },

       countall : function (kamarid, cb) {
              _napi_model.count_all_napi(_conn, kamarid, function (res) {
                     cb(JSON.stringify(res));
              })
       },

       countbysubag : function (subag, kamarid, cb) {
              _napi_model.count_all_napi_by_subag(_conn, subag, kamarid, function (res) {
                     cb(JSON.stringify(res))
              })
       },

       coutnunbooked : function (kamarid, cb) {
              _napi_model.count_all_napi_unbooked(_conn, kamarid, function (res) {
                     cb(JSON.stringify(res))
              })
       }



}