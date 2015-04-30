/**
 This Source Code is licensed under the MIT license. If a copy of the
 MIT-license was not distributed with this file, You can obtain one at:
 http://opensource.org/licenses/mit-license.html.

 @author: Hans van den Akker (mysim1)
 @license MIT
 @copyright Bizboard, 2015

 */

var contextContainer = {};

export const Context = {

    getContext: function(contextName = null) {
        if (contextName) return contextContainer[contextName];
        else return contextContainer['Default'];
    },

    setContext: function(contextName, context) {
        contextContainer[contextName] = context;
    }
}

