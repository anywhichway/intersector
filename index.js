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
 */ const $cf838c15c8b009ba$var$shortest = (args)=>{
    const len = args.length;
    let i = 0, j = 0, min = args[0].length;
    for(; i < len; i++)if (args[i].length < min) {
        min = args[i].length;
        j = i;
    }
    return j;
};
function $cf838c15c8b009ba$export$2f3eb4d6eb4663c9(objectsMixedOrKey) {
    const key = typeof objectsMixedOrKey === "string" ? objectsMixedOrKey : false;
    function intersect(...args) {
        const shortestIndex = $cf838c15c8b009ba$var$shortest(args), maxlen = args.length - 1;
        let memory = new Set(), found = new Set();
        for (const item of args[shortestIndex])memory.add(item);
        for(let i = 1; i <= maxlen; i++){
            if (i === shortestIndex) continue;
            const found = new Set();
            for (const item of args[i])if (memory.has(item)) found.add(item);
            if (found.size === 0) return [];
            if (found.size < memory.size) memory = found;
        }
        return [
            ...memory
        ];
    }
    function intersectKeyed(...args) {
        const shortestIndex = $cf838c15c8b009ba$var$shortest(args), maxlen = args.length - 1;
        let memory = new Map();
        for (const item of args[shortestIndex])memory.set(item[key], item);
        for(let i = 1; i <= maxlen; i++){
            if (i === shortestIndex) continue;
            const found = new Map();
            for (const item of args[i])if (memory.has(item[key])) found.set(item[key], item);
            if (found.size === 0) return [];
            if (found.size < memory.size) memory = found;
        }
        return [
            ...memory.values()
        ];
    }
    return key ? intersectKeyed : intersect;
}


export {$cf838c15c8b009ba$export$2f3eb4d6eb4663c9 as intersector, $cf838c15c8b009ba$export$2f3eb4d6eb4663c9 as default};
//# sourceMappingURL=index.js.map
