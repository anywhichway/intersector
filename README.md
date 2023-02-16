# intersector

Superfast intersection supporting primitives and objects. Up to 2x to 3x faster than other libraries. In the age of big data, you need it.

For a static test `intersector` is 5-10% slower than fasted implementation for primitive values. 10-20% faster that the next fastest for objects or mixed values.

However, in a [real world simulation](#real-world-simulation) using multiple random sized results the sole time `lovasoa` won was for a very large intersection. The sole time that `fast-array-intersect` won was for a small intersection. Typically, `intersector` is fastest by 10-20%.

Just 431 bytes of ES5 module minified code with no dependencies. 276 bytes gzipped, which is 10% smaller than `fast-array-intersect`.


[![Maintainability](https://api.codeclimate.com/v1/badges/a172ba1b0778d1f458cc/maintainability)](https://codeclimate.com/github/anywhichway/intersector/maintainability)
[![Generic badge](https://img.shields.io/badge/GitHub-Repsitory-green.svg)](https://www.github.com/anywhichway/intersector)


## Static Test

Below are node.js v19.6.0 benchmarks for v2.4.0 on a 4 core i5 2.86gz Windows 64bit environment intersecting a 100,000 element array with a 50,000 element array having a 50,000 element result. (Note, this is a lighter weight test environment than for v1.x.x, so speeds look slower but they are actually faster.)

To run the test in the test/benchmark directory:

```
npm run benchmark
```

```
lodashPrimitive x 37.07 ops/sec ±5.94% (51 runs sampled)
benviePrimitive x 26.79 ops/sec ±13.24% (34 runs sampled)
lovasoaPrimitive x 70.01 ops/sec ±5.46% (58 runs sampled)
fastArrayIntersect x 59.39 ops/sec ±2.30% (61 runs sampled)
intersectorPrimitive x 65.12 ops/sec ±2.75% (65 runs sampled)

lodashObject x 34.28 ops/sec ±2.24% (58 runs sampled)
benvieObject x 32.27 ops/sec ±3.62% (55 runs sampled)
fastArrayIntersectObject x 55.56 ops/sec ±2.16% (56 runs sampled)
intersectorObject x 61.07 ops/sec ±2.43% (61 runs sampled)

fastArrayIntersectKeyedObject x 44.81 ops/sec ±2.24% (58 runs sampled)
intersectorKeyedObject x 61.49 ops/sec ±1.85% (61 runs sampled)
```

## Real World Simulation

To run this test in the test/benchmark directory:

```
npm run simulation
```

The program will run in a loop until you abort it with `ctrl-c`. A GC is forced between each test. The results are printed to the console.

Below is a sample run. 

```
lodashPrimitive x 20.13 ops/sec ±16.37% (35 runs sampled) 18068
benviePrimitive x 40.47 ops/sec ±5.93% (53 runs sampled) 18068
lovasoaPrimitive x 62.58 ops/sec ±6.20% (52 runs sampled) 18068
fastArrayIntersect x 84.70 ops/sec ±6.40% (70 runs sampled) 18068
intersectorPrimitive x 84.86 ops/sec ±6.20% (62 runs sampled) 18068
Fastest is intersectorPrimitive,fastArrayIntersect
lodashPrimitive x 36.72 ops/sec ±5.85% (47 runs sampled) 4502
benviePrimitive x 32.89 ops/sec ±5.58% (57 runs sampled) 4502
lovasoaPrimitive x 55.08 ops/sec ±13.56% (56 runs sampled) 4502
fastArrayIntersect x 135 ops/sec ±1.97% (73 runs sampled) 4502
intersectorPrimitive x 118 ops/sec ±5.16% (64 runs sampled) 4502
Fastest is fastArrayIntersect
lodashPrimitive x 36.89 ops/sec ±7.26% (49 runs sampled) 1490
benviePrimitive x 25.01 ops/sec ±9.13% (43 runs sampled) 1490
lovasoaPrimitive x 85.45 ops/sec ±1.92% (71 runs sampled) 1490
fastArrayIntersect x 121 ops/sec ±7.51% (69 runs sampled) 1490
intersectorPrimitive x 138 ops/sec ±2.19% (75 runs sampled) 1490
Fastest is intersectorPrimitive
lodashPrimitive x 38.51 ops/sec ±1.29% (50 runs sampled) 6508
benviePrimitive x 70.45 ops/sec ±1.58% (69 runs sampled) 6508
lovasoaPrimitive x 85.99 ops/sec ±0.97% (71 runs sampled) 6508
fastArrayIntersect x 196 ops/sec ±1.40% (79 runs sampled) 6508
intersectorPrimitive x 204 ops/sec ±0.78% (82 runs sampled) 6508
Fastest is intersectorPrimitive
lodashPrimitive x 29.08 ops/sec ±1.48% (51 runs sampled) 13179
benviePrimitive x 35.36 ops/sec ±7.87% (47 runs sampled) 13179
lovasoaPrimitive x 86.91 ops/sec ±1.18% (72 runs sampled) 13179
fastArrayIntersect x 122 ops/sec ±0.90% (75 runs sampled) 13179
intersectorPrimitive x 130 ops/sec ±1.96% (76 runs sampled) 13179
Fastest is intersectorPrimitive
lodashPrimitive x 23.81 ops/sec ±1.72% (42 runs sampled) 48639
benviePrimitive x 32.28 ops/sec ±2.81% (55 runs sampled) 48639
lovasoaPrimitive x 66.18 ops/sec ±0.82% (66 runs sampled) 48639
fastArrayIntersect x 42.00 ops/sec ±1.41% (54 runs sampled) 48639
intersectorPrimitive x 48.35 ops/sec ±2.93% (63 runs sampled) 48639
Fastest is lovasoaPrimitive
lodashPrimitive x 29.44 ops/sec ±1.67% (51 runs sampled) 16139
benviePrimitive x 45.00 ops/sec ±2.92% (57 runs sampled) 16139
lovasoaPrimitive x 81.21 ops/sec ±14.26% (69 runs sampled) 16139
fastArrayIntersect x 83.69 ops/sec ±5.23% (55 runs sampled) 16139
intersectorPrimitive x 117 ops/sec ±2.99% (72 runs sampled) 16139
Fastest is intersectorPrimitive
```

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

In browser:

```
<script src="./dist/intersector.js"></script>
```

## Primitive and Object Intersection
```javascript
var primitiveIntersect = intersector();
console.log(primitiveIntersect([1,2,3],[3,2])); // [3,2]

var objectIntersect = intersector(true);
var o1 = {o:1},
	o2 = {o:2},
	o3 = {o:3};
console.log(objectIntersect([o1,o2,o3],[o3,o2])); // [o2,o3];
```

## Keyed Object Intersection
```javascript
var objectIntersect = intersector("uniqueId");
var o1 = {uniqueId:1},
	o2 = {uniqueId:2},
	o3 = {uniqueId:3};
console.log(objectIntersect([o1,o2,o3],[o3,o2])); // [o2,o3];
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
All files |     100 |    86.66 |     100 |     100 |                  
index.js |     100 |    86.66 |     100 |     100 | 26,38            
----------|---------|----------|---------|---------|-------------------

# Credits

Portions of code are taken from https://github.com/lovasoa/fast_array_intersect and modified to support objects through the use of optimized modern Javascript constructs.

# Updates (reverse chronological order)

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
