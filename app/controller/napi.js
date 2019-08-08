// nodemodule
const serialize = require('form-serialize');
// module app
const _conn = require('../core/connection');
var _napi_model = require('../model/model_napi');

module.exports = { 
       getAllListNapi : function (cb) {
              _napi_model.get_all_napi_published(_conn, function (res) {
                     cb(res);
              });
       }

}