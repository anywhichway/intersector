# intersector

Superfast intersection supporting primitives and objects. Up to 2x to 3x faster than other libraries. In the age of big data, you need it.

Just 528 bytes of ES5 module minified code with no dependencies. 322 bytes gzipped.

2.5 to 3x faster than the next fastest (fast-array-intersect) for primitive values.

1.25 to 1.5x faster than the next fastest (fast-array-intersect) for objects.

2.5 to 3x faster than the next fastest (fast-array-intersect) for keyed objects.

`fast-array-intersect` and `intersector` are within 2 bytes of the same size, with `intersector` being smaller.

[![Maintainability](https://api.codeclimate.com/v1/badges/a172ba1b0778d1f458cc/maintainability)](https://codeclimate.com/github/anywhichway/intersector/maintainability)
[![Generic badge](https://img.shields.io/badge/GitHub-Repsitory-green.svg)](https://www.github.com/anywhichway/intersector)


## Raw Power Test

Below are node.js v19.6.0 benchmarks for v2.2.1 on a 4 core i5 2.86gz Windows 64bit environment intersecting a 100,000 element array with a 50,000 element array having a 50,000 element result. (Note, this is a lighter weight test environment than for v1.x.x, so speeds look slower but they are actually faster.)

To run the test in the test/benchmark directory:

```
npm run benchmark
```

```
lodashPrimitive x 39.84 ops/sec ±2.29% (51 runs sampled)
benviePrimitive x 27.65 ops/sec ±12.57% (38 runs sampled)
lovasoaPrimitive x 31.79 ops/sec ±64.01% (31 runs sampled)
fastArrayIntersect x 42.04 ops/sec ±19.51% (54 runs sampled)
intersectorPrimitive x 148 ops/sec ±4.42% (67 runs sampled)
```

```
lodashObject x 30.15 ops/sec ±6.54% (53 runs sampled)
benvieObject x 24.41 ops/sec ±14.11% (48 runs sampled)
fastArrayIntersectObject x 43.35 ops/sec ±7.82% (45 runs sampled)
intersectorObject x 61.22 ops/sec ±46.55% (34 runs sampled)
```

```
fastArrayIntersectKeyedObject x 15.58 ops/sec ±61.47% (21 runs sampled)
intersectorKeyedObject x 47.02 ops/sec ±46.64% (39 runs sampled)
```

## Real World Simulation

In a real world simulation 4 arrays of random length up to 100,000 primitive elements are intersected. The `intersector` function is generally 50% to 100% the faster than other functions, `although fast_array_intersect` occasionally has a burst of speed. To run this test in the test/benchmark directory:

```
node index2.js
```

The program will run in a loop until you abort it with `ctrl-c`. The results are printed to the console.

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

# Algorithm

1. Determine the shortest array passed as an argument. It's members, as a set, constitute the maximum intersection.
2. Iterate over each other array and collect the items that are also in the maximum intersection into an intermediate set.
   1. If the intermediate set is empty, return an empty array because there is no intersection of all arrays.
   2. If the intermediate set is shorter than the maximum intersection Set, set the maximum intersection Set to the intermediate set
3. Return the maximum intersection set as an array.

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
All files |   98.38 |     92.3 |     100 |   98.38 |                  
index.js |   98.38 |     92.3 |     100 |   98.38 | 56               
----------|---------|----------|---------|---------|-------------------


# Updates (reverse chronological order)

2023-02-13 v2.2.1 - Updated docs.

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
