/*
 * Copyright (c) 2012 Adobe Systems Incorporated. All rights reserved.
 *  
 * Permission is hereby granted, free of charge, to any person obtaining a
 * copy of this software and associated documentation files (the "Software"), 
 * to deal in the Software without restriction, including without limitation 
 * the rights to use, copy, modify, merge, publish, distribute, sublicense, 
 * and/or sell copies of the Software, and to permit persons to whom the 
 * Software is furnished to do so, subject to the following conditions:
 *  
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *  
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, 
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER 
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING 
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER 
 * DEALINGS IN THE SOFTWARE.
 * 
 */


/*jslint vars: true, plusplus: true, devel: true, nomen: true, indent: 4, maxerr: 50 */
/*global $, define, document, window */

define(function (require, exports, module) {
    "use strict";
    
    var _appFrame = document.getElementById("app-frame");
    var _global = null;
    
    var $exports = $(exports);
    
    function listenForTitleChanges() {
        var titleElement = _appFrame.contentWindow.document.getElementsByTagName("title")[0];
        
        var observer = new window.MutationObserver(function (mutations) {
            mutations.forEach(function (mutation) {
                $exports.triggerHandler("titleChanged", mutation.target.textContent);
            });
        });
        
        observer.observe(titleElement, {
            subtree: true,
            characterData: true
        });
    }
    
    _appFrame.addEventListener("load", function () {
        _appFrame.contentWindow.brackets = _global;
        listenForTitleChanges();
    });
    
    function load(global) {
        _global = global;
        _appFrame.src = "/index.html";
    }
    
    exports.load = load;
    
});