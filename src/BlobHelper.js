/**
 * Created by mysim1 on 16/06/15.
 */

export class BlobHelper {

    /**
     * Convert base64 string data to a HTML5 Blob object.
     * @param b64Data
     * @param contentType
     * @param sliceSize
     * @returns {*}
     */
    static base64toBlob(b64Data, contentType, sliceSize) {
        contentType = contentType || '';
        sliceSize = sliceSize || 512;

        let byteCharacters = atob(b64Data);
        let byteCharLength = byteCharacters.length;
        let byteArrays = [];

        for (var offset = 0; offset < byteCharLength; offset += sliceSize) {
            let slice = byteCharacters.slice(offset, offset + sliceSize);
            let sliceLength = slice.length;
            let byteNumbers = new Array(sliceLength);
            for (var i = 0; i < sliceLength; i++) {
                byteNumbers[i] = slice.charCodeAt(i);
            }

            var byteArray = new Uint8Array(byteNumbers);

            byteArrays.push(byteArray);
        }

        var blob = new Blob(byteArrays, {type: contentType});
        return blob;
    }
}