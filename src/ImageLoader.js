/**
 * SystemJS Image Loader that embeds images as data URIs inside the application bundle.
 *
 * Created by tom on 03/06/15.
 */

var fs = require('fs');
var path = require('path');

exports.build = true;

exports.fetch = function (load) {
    return new Promise(function (resolve, reject) {
        var absolutePath = load.address.substr('file:'.length);
        fs.readFile(absolutePath, function (error, data) {
            if (error) { reject(error); }

            var extension = path.extname(absolutePath).replace('.', '').toLowerCase();

            /* SVG images don't need to be base64 encoded */
            var isSvg = extension === 'svg';
            var imgdata = isSvg ? data : data.toString('base64');

            var dataType = 'image/' + extension;
            var charset = ';charset=utf-8';
            var encoding = isSvg ? '' : ';base64';

            if (isSvg) {

                data = data.toString().replace(/(\r\n|\n|\r)/gm, '');
                //console.log(data);
                resolve('module.exports = \'' + data + '\';');
            }
            else {
                var uri = 'data:' + dataType + charset + encoding + ',' + imgdata;
                resolve('module.exports = "' + uri + '";');
            }
        });
    });
};
