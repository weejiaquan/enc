// ==UserScript==
// @name         enc
// @namespace    arisu.ml
// @version      0.1
// @description  basic text encryptor (please actually dont use this for sensitive information)
// @author       Lychwee
// @include      *
// @grant        none
//@require http://code.jquery.com/jquery-latest.js
//@require https://raw.githubusercontent.com/garyharan/jquery-replace-utilities/master/jquery.replace.js
// @run-at document-start
// ==/UserScript==
(function() {
    var i = 0;
    const key = 3; //key here

    function decrypt() {
        if (/!!-TRI-!!/i.test(document.body.innerHTML)) {
            //get text
            var pageData = document.body.innerHTML.toString();
            //WHOLE STRING
            var ogString = pageData;
            ogString = ogString.split(/(?=\!!-TRI-!!)/)[1];
            ogString = ogString.split(/(?<=\!!-GER-!!)/)[0];
            //PARSED TO TEXT ONLY
            var pText = pageData;
            pText = pText.split('!!-TRI-!!')[1];
            pText = pText.split('!!-GER-!!')[0];
            pText = pText.trim();

            //decryption (charCode ver)
            var storage = atob(pText);
            storage = storage.split(" ");
            var returnString = "";
            //alert(storage);
            //converting charCode > TEXT
            for (i = 0; i < storage.length; i++) {
                storage[i] = Math.round(Math.pow(storage[i], 1 / key)); //power by key
                returnString += String.fromCharCode(parseInt(storage[i]));
            }
            //TEXT REPLACEMENT
            $('body').replace(ogString, "=" + returnString + "=");
        } else {
            return;
        }
    }

    function encrypt() {
        if (/--!/i.test(document.body.innerHTML)) {
            //get text

            var pageData = document.body.innerHTML.toString();
            //WHOLE STRING
            var ogString = pageData;
            ogString = ogString.split(/(?=\--!)/)[1];
            ogString = ogString.split(/(?<=\!--)/)[0];

            //PARSED TO TEXT ONLY
            var pText = pageData;
            pText = pText.split('--!')[1];
            pText = pText.split('!--')[0];
            pText = pText.trim();

            //decryption (charCode ver)
            var storage = pText
            var returnString = "";

            //converting charCode > TEXT
            for (i = 0; i < storage.length; i++) {
                returnString += Math.pow(storage.charCodeAt(i), key) + " "; //power by key
            }
            returnString = btoa(returnString);

            //TEXT REPLACEMENT
            var cbText = "!!-TRI-!!\n" + returnString + "\n!!-GER-!!";
            var dummy = $('<input>').val(cbText).appendTo('body').select()
            document.execCommand('copy')
            $('html').replace(ogString, cbText);
        } else {
            return;
        }
    }

    document.addEventListener('keydown', function(e) {
        // pressed ctrl+g
        if (e.keyCode == 71 && !e.shiftKey && e.ctrlKey && !e.altKey && !e.metaKey) {
            //code
            for (i = 0; i < 1; i++) {
                decrypt();
            }
        }
        // pressed ctrl+alt+g
        if (e.keyCode == 71 && !e.shiftKey && e.ctrlKey && e.altKey && !e.metaKey) {
            for (i = 0; i < 1; i++) {
                encrypt();
            }
        }
    }, false);
})();