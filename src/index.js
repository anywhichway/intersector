/* MIT License
Copyright (c) 2016-2023 Simon Y. Blackwell

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
const shortest = (args) => {
	const len = args.length;
	let i = 0,
		j = 0,
		min = args[0].length;
	for (; i < len; i++) {
		if (args[i].length < min) {
			min = args[i].length;
			j = i;
		}
	}
	return j;
};
function intersector(objectsMixedOrKey) {
	const key = (typeof (objectsMixedOrKey) === "string" ? objectsMixedOrKey : false);

	return  (...args) => {
		const shortestIndex = shortest(args),
			maxlen = args.length - 1;
		let memory = key ? new Map() : new Set();

		for(const item of args[shortestIndex]) {
			key ? memory.set(item[key],item) : memory.add(item);
		}

		for (let i=0; i<=maxlen; i++) {
			if(i===shortestIndex) continue;
			const found = key ? new Map() : new Set();
			for(const item of args[i]) {
				if(key ? memory.has(item[key]) : memory.has(item)) {
					key ? found.set(item[key],item) : found.add(item);
				}
			}
			if(found.size===0) return [];
			if(found.size < memory.size) memory = found;
		}
		return key ? [...memory.values()] : [...memory];
	}
}

export {intersector,intersector as default};

