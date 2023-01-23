function $parcel$defineInteropFlag(a) {
  Object.defineProperty(a, '__esModule', {value: true, configurable: true});
}
function $parcel$export(e, n, v, s) {
  Object.defineProperty(e, n, {get: v, set: s, enumerable: true, configurable: true});
}

$parcel$defineInteropFlag(module.exports);

$parcel$export(module.exports, "intersector", () => $99faf78296dd76aa$export$2f3eb4d6eb4663c9);
$parcel$export(module.exports, "default", () => $99faf78296dd76aa$export$2f3eb4d6eb4663c9);
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
 */ const $99faf78296dd76aa$var$shortest = (args)=>{
    const len = args.length;
    let i = 0, j = 0, min = args[0].length;
    for(; i < len; i++)if (args[i].length < min) {
        min = args[i].length;
        j = i;
    }
    return j;
};
function $99faf78296dd76aa$export$2f3eb4d6eb4663c9(objectsMixedOrKey) {
    const key = typeof objectsMixedOrKey === "string" ? objectsMixedOrKey : false;
    function objectHandler(...args) {
        const shortestIndex = $99faf78296dd76aa$var$shortest(args), maxlen = args.length - 1;
        let memory = new Set();
        args.sort((a, b)=>a.length - b.length);
        for (const item of args[0])memory.add(item);
        for(let i = 1; i <= maxlen; i++){
            const found = new Set();
            for (const item of args[i])if (memory.has(item)) found.add(item);
            if (found.size === 0) return [];
            if (found.size < memory.size) memory = found;
        }
        return [
            ...memory
        ];
    }
    function keyedHandler(...args) {
        const memory = {}, maxlen = args.length - 1, result = new Set();
        let i, n, len, j, elem;
        args.sort((a, b)=>a.length - b.length);
        for(i = 0; i <= maxlen; i++){
            n = i === 0 ? 0 : i || 0;
            len = args[i].length;
            for(j = 0; j < len; j++){
                elem = args[i][j];
                if (i === 0) {
                    memory[elem[key]] = 0;
                    continue;
                }
                if (memory[elem[key]] !== i - 1) continue;
                if (i === maxlen) {
                    result.add(elem);
                    memory[elem[key]] = 0;
                    continue;
                }
                memory[elem[key]] = i;
            }
        }
        return [
            ...result
        ];
    }
    function primitiveHandler(...args) {
        const memory = new Set(), shortestIndex = $99faf78296dd76aa$var$shortest(args), maxlen = args.length - 1;
        args.sort((a, b)=>a.length - b.length);
        for (const item of args[0])memory.add(item);
        for(let i = 1; i <= maxlen; i++){
            let found;
            for (const item of args[i]){
                found = memory.has(item);
                if (found) break;
            }
            if (!found) return [];
        }
        return [
            ...memory
        ];
    }
    return key ? keyedHandler : objectsMixedOrKey ? objectHandler : primitiveHandler;
}


//# sourceMappingURL=index.js.map
