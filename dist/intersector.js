function $parcel$defineInteropFlag(a) {
  Object.defineProperty(a, '__esModule', {value: true, configurable: true});
}
function $parcel$export(e, n, v, s) {
  Object.defineProperty(e, n, {get: v, set: s, enumerable: true, configurable: true});
}

$parcel$defineInteropFlag(module.exports);

$parcel$export(module.exports, "intersector", () => $4fa36e821943b400$export$2f3eb4d6eb4663c9);
$parcel$export(module.exports, "default", () => $4fa36e821943b400$export$2f3eb4d6eb4663c9);
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
 */ function $4fa36e821943b400$export$2f3eb4d6eb4663c9(objectsMixedOrKey) {
    const key = typeof objectsMixedOrKey === "string" ? objectsMixedOrKey : false;
    function objectHandler(...args) {
        const memory = new Map(), maxlen = args.length - 1, result = new Set();
        let i, n, len, j, elem;
        args.sort((a, b)=>a.length - b.length);
        for(i = 0; i <= maxlen; i++){
            len = args[i].length;
            for(j = 0; j < len; j++){
                elem = args[i][j];
                if (i === 0) {
                    memory.set(elem, 0);
                    continue;
                }
                if (memory.get(elem) !== i - 1) continue;
                if (i === maxlen) {
                    result.add(elem);
                    memory.set(elem, 0);
                    continue;
                }
                memory.set(elem, i);
            }
        }
        return [
            ...result
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
        const memory = {}, maxlen = args.length - 1, result = new Set();
        let i, n, len, j, elem;
        args.sort((a, b)=>a.length - b.length);
        for(i = 0; i <= maxlen; i++){
            len = args[i].length;
            for(j = 0; j < len; j++){
                elem = args[i][j];
                if (i === 0) {
                    memory[elem] = 0;
                    continue;
                }
                if (memory[elem] !== i - 1) continue;
                if (i === maxlen) {
                    //result.push(elem);
                    //result[result.length] = elem;
                    result.add(elem);
                    memory[elem] = 0;
                    continue;
                }
                memory[elem] = i;
            }
        }
        return [
            ...result
        ];
    }
    return key ? keyedHandler : objectsMixedOrKey ? objectHandler : primitiveHandler;
}


//# sourceMappingURL=intersector.js.map
