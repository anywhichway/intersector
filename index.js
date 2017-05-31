/* MIT License
Copyright (c) 2016 Simon Y. Blackwell

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
 */
(function() {
	"use strict"
	function intersector(objects) {
		function sorter(a,b) { return a.length - b.length }
		var key = (typeof(objects)==="string" ? objects : false);
		return function intersection() {
			var args = [].slice.call(arguments),
				rslt = [],
				mxi = arguments.length-1,
				set;
			args.sort(sorter);
			set = (objects && !key ? set = new Set() : {});
			// loop through all array arguments
			for(var i=0;i<=mxi;i++) { 
				var array = arguments[i],
					mxj = array.length;
				// loop through all values
				for(var j=0;j<mxj;j++) {
					var item = array[j];
					// initialize the possible values
					if(i===0) {
						if(!objects) set[item] = 1;
						else if(key) item[key]===undefined || (set[item[key]] = 1);
						else set.add(item);
					}
					// save if value is possible and and all arrays have it
					if((!objects ? set[item] : (key ? item[key] && set[item[key]] :  set.has(item))) && i===mxi) rslt.push(item);
				}
			}
			return rslt;
		}
	}
	if(typeof(module)!=="undefined") {
		module.exports = intersector;
	} else {
		this.intersector = intersector;
	}
}).call(this);
