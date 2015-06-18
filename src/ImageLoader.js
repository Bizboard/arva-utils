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
        var absolutePath = load.address.replace('.js', '').substr('file:'.length);
        fs.readFile(absolutePath, function (error, data) {
            if (error) { reject(error); }

            var extension = path.extname(absolutePath).replace('.', '').toLowerCase();

            /* SVG images don't need to be base64 encoded */
            var isSvg = (extension === 'svg');
            var imgdata = isSvg ? data.toString().replace(/(\r\n|\r|\n)/gm, '') : data.toString('base64');

            var dataType = 'image/' + (isSvg ? 'svg+xml' : extension);
            var charset = ';charset=utf-8';
            var encoding = isSvg ? '' : ';base64';

            var uri = 'data:' + dataType + charset + encoding + ',' + imgdata;
            resolve('module.exports = \'' + uri + '\';');
        });
    });
};
