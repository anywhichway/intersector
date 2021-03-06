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
	/* optimize for speed not size */
	function intersector(objectsMixedOrKey) {
		var key = (typeof(objectsMixedOrKey)==="string" ? objectsMixedOrKey : false);
		function objectHandler(...args) {
			const memory=new Map(),
				maxlen = args.length-1,
				result = [];
			let i, n, len, j, elem;
			args.sort((a,b) => a.length - b.length);
		
		  for (i=0; i<=maxlen; i++) {
			len = args[i].length;
			 for (j=0; j<len; j++) {
				elem = args[i][j];
				if (i===0) {
					memory.set(elem,0);
					continue;
				}
				if(memory.get(elem) !== i-1) {
					continue;
				}
				if(i === maxlen) {
					result.push(elem);
					memory.set(elem,0);
					continue;
				}
				memory.set(elem,i)
			}
		  }
		  return result;
		}
		function keyedHandler(...args) {
			const memory={},
				maxlen = args.length-1,
				result = [];
			let i, n, len, j, elem;
			args.sort((a,b) => a.length - b.length);
		
		  for (i=0; i<=maxlen; i++) {
			 n = (i===0)?0:(i||0);
			len = args[i].length;
			for (j=0; j<len; j++) {
				elem = args[i][j];
				if(i===0) {
					 memory[elem[key]]=0;
					continue;
				}
				if(memory[elem[key]] !== i-1) {
					continue;
				}
				if(i === maxlen) {
					result.push(elem);
					memory[elem[key]]=0;
					continue;
				}
				memory[elem[key]]=i;
			}
		  }
		  return result;
		}
		
		function primitiveHandler(...args) {
			const memory={},
				maxlen = args.length-1,
				result = [];
			let i, n, len, j, elem;
			args.sort((a,b) => a.length - b.length);
		
		  for (i=0; i<=maxlen; i++) {
			len = args[i].length;
			for (j=0; j<len; j++) {
				elem = args[i][j];
				if(i===0) {
					 memory[elem]=0;
					continue;
				}
				if(memory[elem] !== i-1) {
					continue;
				}
				if(i === maxlen) {
					//result.push(elem);
					result[result.length] = elem;
					memory[elem]=0;
					continue;
				  }
				memory[elem]=i;
			}
		  }
		  return result;
		}
		return key ? keyedHandler : objectsMixedOrKey ? objectHandler : primitiveHandler;
	}
	if(typeof(module)!=="undefined") {
		module.exports = intersector;
	} 
	if(typeof(window)!=="undefined") {
		window.intersector = intersector;
	}
	this.intersector = intersector;
}).call(this);
