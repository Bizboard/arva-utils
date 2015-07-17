/**
 SystemJS Image Loader that embeds images as data URIs inside the application bundle.

 This Source Code is licensed under the MIT license. If a copy of the
 MIT-license was not distributed with this file, You can obtain one at:
 http://opensource.org/licenses/mit-license.html.

 @author: Tom Clement (tjclement)
 @license MIT
 @copyright Bizboard, 2015

 */

if (typeof window !== 'undefined') {
    /* Unbundled build, loaded dynamically through System.import() */
    exports.build = false;

    exports.fetch = function (load) {
        var absolutePath = load.address.replace('.js', '').substr('file:'.length);
        return new Promise(function (resolve) {
            resolve('module.exports = "' + absolutePath + '"');
        });
    };
} else {
    /* Bundled build, loaded from bundle.js */

    var fs = require('fs');
    var path = require('path');

    exports.build = true;

    exports.fetch = function (load) {
        return new Promise(function (resolve, reject) {
            var absolutePath = load.address.replace('.js', '').substr('file:'.length);
            fs.readFile(absolutePath, function (error, data) {
                if (error) {
                    reject(error);
                }

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
}
