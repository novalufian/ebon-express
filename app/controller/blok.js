// nodemodule
const serialize = require('form-serialize');
// module app
const _conn = require('../core/connection');
var _blok_model = require('../model/model_blok');

module.exports = { 
       getAllListBlok : function (cb) {
              _blok_model.get_all_blok(_conn, function (res) {
                     cb(res);
              });
       }
}