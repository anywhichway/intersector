# intersector

Superfast intersection supporting primitives and objects. Up to 2x to 3x faster than other libraries. In the age of big data, you need it.

Just 990 bytes of ES5 compatible minified code with no dependencies when compressed with [CloakedJS](https://cloakedjs.com/). 428 bytes gzipped.

15% faster than the next fastest (lovasoa) for primitve values.

15% faster than the next fastest (fast-array-intersect) for keyed objects.

TWICE the speed of the next fastest (fast-array-intersect) for keyed objects.


[![Generic badge](https://img.shields.io/badge/Downrunner-Runnable-green.svg)](https://anywhichway.github.io/intersector)
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/b4709e14023040cbb957b7c587be236b)](https://www.codacy.com/app/syblackwell/intersector?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=anywhichway/intersector&amp;utm_campaign=Badge_Grade)
[![Generic badge](https://img.shields.io/badge/GitHub-Repsitory-green.svg)](https://www.github.com/anywhichway/intersector)


## Raw Power Test

Below are node.js v12 benchmarks for v1.1.1 in a 4 core i7 2.86gz Debian 64bit environment intersecting a 100,000 element array with a 50,000 element array having a 50,000 element result.

To run the test in the test/benchmark directory:

```
node index.js
```

```
lodashPrimitive x 69.90 ops/sec ±1.64% (72 runs sampled)
benviePrimitive x 66.35 ops/sec ±1.90% (69 runs sampled)
lovasoaPrimitive x 137 ops/sec ±1.74% (77 runs sampled)
fastArrayIntersectPrimitive x 102 ops/sec ±1.44% (75 runs sampled)
intersectorPrimitive x 191 ops/sec ±1.31% (81 runs sampled)

```

```
lodashObject x 68.81 ops/sec ±1.53% (71 runs sampled)
benvieObject x 63.21 ops/sec ±2.67% (66 runs sampled)
fastArrayIntersectObject x 100 ops/sec ±1.37% (73 runs sampled)
intersectorObject x 101 ops/sec ±1.66% (74 runs sampled)
```

```
fastArrayIntersectKeyedObject x 87.19 ops/sec ±1.46% (74 runs sampled)
intersectorKeyedObject x 99.36 ops/sec ±2.67% (74 runs sampled)
```

## Real World Simulation

In a real world simulation 4 arrays of random length up to 100,000 primitive elements are intersected. The `intersector` function is consistently 50% to 100% the faster than other functions. To run this test in the test/benchmark directory:

```
node index2.js
```


# Installing

```
npm install intersector
```

or

Download and use the browser files from the browser directory.

If you plan to run `intersectors` unit tests, then install Parcel globaly:

```
npm install -g parcel-bundler
```

# Using

`intersector(objectsMixedOrKey)` is a function that returns another function configured to do array intersections. It takes one optional argument `objectsMixedOrKey`. If no 
value is provided the intersection is optimized for uniform primitive data types across all arrays and will run much faster. If `typeof(objectsMixedOrKey)==="string"` it is assumed 
to be a unique key on all objects in the arrays. This will run the second fastest. If `objectsMixedOrKey` is otherwise not equal to zero, then a Set will be used internally and the algorithm 
will be slower, although still faster than others. This is useful in the rare cases where there might be mixed primitve types in the target arrays, e.g. `[1,2,"2"]` and `["1",2,3]` which should
result in `[1,"1",2,"2",3]`.

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

## Primitive Intersection
```javascript
var primitiveIntersect = intersector();
console.log(primitiveIntersect([1,2,3],[3,2])); // [3,2]
```

## Object Intersection
```javascript
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

1. Determine the shortest array passed as an argument. It's members, as a Set, constitute the maximum intersection.
2. Iterate over each other array and collect the items that are also in the maximum intersection into an intermediate Set.
   1. If the intermediate Set is empty, return an empty array because there is no intersection of all arrays.
   2. If the intermediate Set is shorter than the maximum intersection Set, set the maximum intersection Set to the intermediate Set
3. Return the maximum intersection Set as an array.

# Updates (reverse chronological order)

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
