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
 */ /* Portions of algorithm taken from https://github.com/lovasoa/fast_array_intersect under MIT license */ function $cf838c15c8b009ba$export$2f3eb4d6eb4663c9(key) {
    const getKey = typeof key === "string" ? (value)=>value && typeof value === "object" && value[key] !== undefined ? value[key] : value : null;
    const create = (iterating)=>{
        let i = 0, j, len, nOthers, args, result, memory;
        return function() {
            if (!args) {
                args = [].sort.call(arguments, (a, b)=>a.length - b.length);
                nOthers = args.length - 1;
                result = [];
                memory = new Map();
                i = 0;
                j = 0;
            }
            for(; i <= nOthers; i++){
                //j = j===-1 ? arguments[i].length : j;
                const len = args[i].length;
                while(j < len){
                    const elem = args[i][j], key = getKey ? getKey(elem) : elem;
                    if (memory.get(key) === i - 1) {
                        if (i === nOthers) {
                            result[result.length] = elem;
                            memory.set(key, 0);
                            if (iterating) {
                                j++;
                                return {
                                    value: elem
                                };
                            }
                        } else memory.set(key, i);
                    } else if (i === 0) memory.set(key, 0);
                    j++;
                }
                j = 0;
            }
            args = null;
            return iterating ? {
                done: true
            } : result;
        };
    };
    const intersect = create();
    intersect.iterable = function(...args) {
        const intersect = create(true);
        let started;
        return {
            next () {
                if (started) return intersect();
                started = true;
                return intersect(...args);
            },
            [Symbol.iterator] () {
                return this;
            }
        };
    };
    return intersect;
}


export {$cf838c15c8b009ba$export$2f3eb4d6eb4663c9 as intersector, $cf838c15c8b009ba$export$2f3eb4d6eb4663c9 as default};
//# sourceMappingURL=index.js.map
