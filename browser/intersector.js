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
	const intersector = objects => {
		const key = (typeof(objects)==="string" ? objects : false);
		return function intersection() {
			const args = [].slice.call(arguments),
				rslt = [];
			args.sort((a, b) => a.length - b.length);
			// create a set or key map for core comparison
			const set = (objects===true ? new Set(args[0]) : args[0].reduce((accu,curr) => { if(key) { accu[curr[key]]=1 } else { accu[curr]=1 } return accu; },{})), 
				mxi = args.length-1;
			// loop through all array arguments
			for(let i=0;i<=mxi;i++) { 
				const array = args[i];
				// loop through all values
				for(let item of array) {
					// save if value is possible and and all arrays have it
					if((objects ? (key ? set[item[key]] :  set.has(item)) : set[item]) && i===mxi) rslt.push(item);
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