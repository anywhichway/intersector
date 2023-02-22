# intersector

Superfast intersection supporting primitives and objects. In the age of big data, you need it.

Breakthrough iterable performance for array intersections. The time to first available element is 20-40% faster than other approaches.

Remove bottlenecks from your data processing pipeline by using `intersector.iterable`.

For a [static test](#static-test), full intersection using `intersector` is typically 10% slower than the fastest implementation for primitive values (the original `lovasoa` algorithm) and 10-20% faster than the current `lovasoa` algorithm in `fast_array_intersect`. It is 5-10% faster that the next fastest, `fast_array_intersect` for objects or mixed values.

And, in a [real world simulation](#real-world-simulation) using multiple random sized results, full intersection using `intersector` and `fast-array-intersect` are always fastest and  typically within each other's margin or error.

However, by computing intersection elements on demand, `intersector.iterable` is always the fastest for static or dynamic tests by 20-40%.

Just 630 bytes of ES5 module minified code with no dependencies. 399 bytes gzipped. 150 bytes larger than `fast_array_intersect`.

[![Maintainability](https://api.codeclimate.com/v1/badges/a172ba1b0778d1f458cc/maintainability)](https://codeclimate.com/github/anywhichway/intersector/maintainability)
[![Generic badge](https://img.shields.io/badge/GitHub-Repsitory-green.svg)](https://www.github.com/anywhichway/intersector)


If you want similar performance for union, Cartesian product, or memoizing also see:

- https://github.com/anywhichway/unionizor
- https://github.com/anywhichway/cxproduct
- https://github.com/anywhichway/nano-memoize

  For a complete high performance solution to Cartesian product and set operations for Arrays and Sets with a standardized API, plus the addition of the standard map/reduce/find operations to Set see:

- https://github.com/anywhichway/array-set-ops

# Installing

```
npm install intersector
```

If you plan to run `intersectors` unit tests, then install Parcel globaly:

```
npm install -g parcel-bundler
```

# Using

`intersector(objectsMixedOrKey)` is a function that returns another function configured to do array intersections. It takes one optional argument `objectsMixedOrKey`. If no
value is provided the intersection handles all types across all arrays and will run much faster. If `typeof(objectsMixedOrKey)==="string"` it is assumed to be a unique key name and all arrays should contain objects with this key name.

The returned intersection function can take any number of arguments.

In NodeJS:

```javascript
const intersector = require("intersector").default;
```
or

```javascript
import intersector from "intersector"; 
```

## Primitive and Object Intersection
```javascript
var primitiveIntersect = intersector();
console.log(primitiveIntersect([1,2,3],[3,2])); /// immediately resolves full intersection  [3,2]
for(const item of primitiveIntersect.iterable([1,2,3],[3,2])) {
    console.log(item); // logs 2 and then 3, 20%+ faster for firts element access
}

var objectIntersect = intersector(true);
var o1 = {o:1},
	o2 = {o:2},
	o3 = {o:3};
console.log(objectIntersect([o1,o2,o3],[o3,o2])); // immediately resolves full intersection [o2,o3];
for(const item of objectIntersect.iterable([o1,o2,o3],[o3,o2])) {
    console.log(item); // logs {o:2} and then {o:3}, 20%+ faster for firts element access
}
```

## Keyed Object Intersection
```javascript
var objectIntersect = intersector("uniqueId");
var o1 = {uniqueId:1},
	o2 = {uniqueId:2},
	o3 = {uniqueId:3};
console.log(objectIntersect([o1,o2,o3],[o3,o2])); // // immediately resolves full intersection [o2,o3];
for(const item of objectIntersect.iterable([o1,o2,o3],[o3,o2])) {
    console.log(item); // logs {o:2} and then {o:3}, 20%+ faster for firts element access
}
```


## Static Test

Below are node.js v19.6.0 benchmarks for v2.5.0 on a 4 core i5 2.86gz Windows 64bit environment intersecting a 100,000 element array with a 50,000 element array having a 50,000 element result. (Note, this is a lighter weight test environment than for v1.x.x, so speeds look slower, but they are actually faster.)

To run the test in the test/benchmark directory:

```
npm run benchmark
```

```
lodashPrimitive x 38.39 ops/sec ±4.92% (49 runs sampled) 50000
benviePrimitive x 21.04 ops/sec ±31.17% (40 runs sampled) 50000
lovasoaPrimitive x 51.89 ops/sec ±23.77% (45 runs sampled) 50000
fastArrayIntersect x 51.94 ops/sec ±9.45% (54 runs sampled) 50000
intersectorPrimitive x 67.76 ops/sec ±2.02% (68 runs sampled) 50000
intersector iterable time to first x 130 ops/sec ±2.15% (72 runs sampled) 50000
intersector iterable x 50.15 ops/sec ±2.67% (64 runs sampled) 50000

lodashObject x 36.48 ops/sec ±2.55% (51 runs sampled) 50000
benvieObject x 26.69 ops/sec ±16.85% (47 runs sampled) 50000
fastArrayIntersectObject x 43.25 ops/sec ±11.46% (46 runs sampled) 50000
intersectorObject x 54.46 ops/sec ±5.77% (57 runs sampled) 50000

fastArrayIntersectKeyedObject x 44.81 ops/sec ±2.24% (58 runs sampled)
intersectorKeyedObject x 61.49 ops/sec ±1.85% (61 runs sampled)
```

## Real World Simulation

This test intersects 5 arrays of random length between 0 and 100,000 containing random numbers between 0 and 100,000.

To run this test in the test/benchmark directory:

```
npm run simulation
```

The program will run in a loop until you abort it with `ctrl-c`. A GC is forced between each test. The results are printed to the console.

Below is a sample run. 

```
lodashPrimitive x 1.54 ops/sec ±3.73% (8 runs sampled) 15916
benviePrimitive x 32.69 ops/sec ±2.25% (56 runs sampled) 15916
lovasoaPrimitive x 29.90 ops/sec ±1.69% (52 runs sampled) 15916
fastArrayIntersect x 62.15 ops/sec ±0.76% (63 runs sampled) 15916
intersectorPrimitive x 61.83 ops/sec ±1.12% (63 runs sampled) 15916
intersector iterable time to first x 86.49 ops/sec ±0.92% (71 runs sampled) 15916
intersector iterable x 52.13 ops/sec ±3.36% (63 runs sampled) 15916
Fastest is intersector iterable time to first
lodashPrimitive x 0.92 ops/sec ±19.65% (7 runs sampled) 1488
benviePrimitive x 23.10 ops/sec ±26.45% (42 runs sampled) 1488
lovasoaPrimitive x 49.60 ops/sec ±5.61% (51 runs sampled) 1488
fastArrayIntersect x 90.32 ops/sec ±2.40% (72 runs sampled) 1488
intersectorPrimitive x 90.47 ops/sec ±0.73% (74 runs sampled) 1488
intersector iterable time to first x 132 ops/sec ±0.59% (80 runs sampled) 1488
intersector iterable x 87.21 ops/sec ±0.79% (72 runs sampled) 1488
Fastest is intersector iterable time to first
lodashPrimitive x 1.65 ops/sec ±18.26% (9 runs sampled) 13948
benviePrimitive x 33.99 ops/sec ±2.86% (58 runs sampled) 13948
lovasoaPrimitive x 36.96 ops/sec ±1.69% (62 runs sampled) 13948
fastArrayIntersect x 82.80 ops/sec ±0.94% (69 runs sampled) 13948
intersectorPrimitive x 81.37 ops/sec ±4.42% (68 runs sampled) 13948
intersector iterable time to first x 114 ops/sec ±3.10% (71 runs sampled) 13948
intersector iterable x 71.56 ops/sec ±1.39% (71 runs sampled) 13948
Fastest is intersector iterable time to first
lodashPrimitive x 0.89 ops/sec ±1.59% (7 runs sampled) 25175
benviePrimitive x 27.81 ops/sec ±1.83% (48 runs sampled) 25175
lovasoaPrimitive x 22.27 ops/sec ±1.94% (40 runs sampled) 25175
fastArrayIntersect x 50.26 ops/sec ±1.26% (64 runs sampled) 25175
intersectorPrimitive x 52.86 ops/sec ±1.18% (66 runs sampled) 25175
intersector iterable time to first x 76.63 ops/sec ±1.26% (64 runs sampled) 25175
intersector iterable x 46.70 ops/sec ±1.05% (59 runs sampled) 25175
Fastest is intersector iterable time to first
```


# Unit Tests

    √ primitive
    √ object with primitives
    √ object with primitives none
    √ objects
    √ objects none
    √ keyed objects
    √ keyed objects none

8 passing (28ms)

----------|---------|----------|---------|---------|-------------------
File      | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s
----------|---------|----------|---------|---------|-------------------
All files |   98.83 |    92.59 |     100 |   98.83 |                  
index.js |   98.83 |    92.59 |     100 |   98.83 | 53               
----------|---------|----------|---------|---------|-------------------

# FAQs

Why not a generator function instead of a custom iterator?

- I have found them to be slower.

# Credits

Portions of code are taken from an old version of https://github.com/lovasoa/fast_array_intersect and modified to support objects through the use of optimized modern Javascript constructs.

# Updates (reverse chronological order)

2023-02-22 v2.5.1 - Updated documentation.

2023-02-17 v2.5.0 - Just over 100 bytes larger, but slightly faster for full intersection. Plus, intersection as an iterable was introduced with a blazing 20% plus performance benefit over full intersection.

2023-02-16 v2.4.1 - Document formatting.

2023-02-16 v2.4.0 - Reworked internals to be faster, partially based on lovasoa algorithm.

2023-02-15 v2.3.1 - Updated docs.

2023-02-15 v2.3.0 - Fixed index issue that could result in occasional extra items in intersection.

2023-02-15 v2.2.1 - Updated docs.

2023-02-13 v2.2.0 - Optimized further for size and speed. Reduced size by 50%. Less than 10% speed improvement.

2023-01-24 v2.1.2 - Updated copyright years

2023-01-24 v2.1.1 - Removed redundant code. Adjusted build to create module as main entry. Optimized keyedObject intersection. Converted tests and benchmarks to use module format.

2023-01-23 v2.1.0 - Reworked internals for more speed.

2023-01-23 v2.0.1 - Added doc for keyed object intersection. Added doc for module usage.

2023-01-23 v2.0.0 - Ensure no duplicates in returned value by using `Set` internally. Moved to module format. Updated dev dependencies to remove some security risks.

2020-11-06 v1.1.0 - Addressed a major bug where intersector was returning incorrect results when provided 3 or more arguments. As a result, inetersector is slightly slower but still
the fastest across primitives, keyed objects, and full objects. Added more unit tests and a more realistic benchmark test to avoid this kind of thing in the future!

2020-09-24 v1.0.17 - Added Downrunner documentation support. Improved browser export.

2020-07-15 v1.0.16	- The cat stepped on the keyboard right before a commit and inserted some random stuff (really! ;-) ;-(). Fixed.

2020-07-15 v1.0.15 - Split into three internal functions. Slight speed and size improvement. Speed more consistent across test runs. Easier to maintain. Thanks @titoBouzout!

2020-07-14 v1.0.14 - Documentation updates.

2020-07-13 v1.0.13 - Optimized further for size and speed.

2017-05-29 v1.0.12 - Fixed bug with keyed objects. If a key was undefined on an object, the code would include it.

2017-05-21 v1.0.10 - Minor optimization, moved sort function to be predefined instead of within lexical scope of sort call.

2017-05-21 v1.0.9 - Reverted to `var`, it is slightly faster. Reduced code size by 50%. Improved performance for objects.

2017-01-15 v1.0.8 - Replaced `var` with `let`. Added Codacy quality assessment.

2016-12-29 v1.0.7 - Added option to use unique key which makes object performance better.

2016-12-27 v1.0.6 - Reverted .hasOwnProperty which slowed things down.

2016-12-27 v1.0.5 - Updated benchmark.

2016-12-27 v1.0.4 - Corrected dev package dependencies. Modified code to use .hasOwnProperty.

2016-12-24 v1.0.3 - Exposed a jsbenchmarks.com benchmark specification. Updated documentation.

2016-12-24 v1.0.2 - Corrected git repository reference in package.json.

2016-12-23 v1.0.1 - Added lodash intersection to benchmark.

2016-12-21 v1.0.0 - Initial public release.

# License

MIT - see LICENSE file
