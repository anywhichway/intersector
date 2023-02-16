/* MIT License
Copyright (c) 2016-2023 Simon Y. Blackwell & 2019 Ophir LOJKINE

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

/* Portions of algorithm taken from https://github.com/lovasoa/fast_array_intersect under MIT license */

function intersector(key) {
	const getKey = typeof (key) === "string" ? ((value) => value && typeof (value) === "object" && value[key] !== undefined ? value[key] : value) : null;
	return function()  {
		const result = [],
			memory = new Map(),
			nOthers = arguments.length - 1;
		[].sort.call(arguments,(a,b) => a.length - b.length);
		for(let i=0;i<=nOthers;i++) {
			let j = arguments[i].length;
			while(j--) {
				const elem = arguments[i][j],
					key = getKey ? getKey(elem) : elem;
				if (memory.get(key) === i - 1) {
					i === nOthers ? (result[result.length] = elem,memory.set(key,0)) : memory.set(key,i)
				} else if (i === 0) {
					memory.set(key,0);
				}
			}
		}
		return result;
	}

}

export {intersector,intersector as default};

