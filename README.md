# intersector

Superfast intersection supporting primitives and objects. Up to 2x to 3x faster than other libraries. In the age of big data, you need it.

Just 685 bytes of ES5 compatible minified code with no dependencies when compressed with [CloakedJS](https://cloakedjs.com/). 330 bytes gzipped.

TWICE the speed of the next fastest (lovasoa) for primitve values.

15% faster than the next fastest (fast-array-intersect) for keyed objects.

Over THREE times the speed of any other library for keyed objects.

[![Generic badge](https://img.shields.io/badge/Downrunner-Runnable-green.svg)](https://anywhichway.github.io/intersector/downrunner.html)
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/b4709e14023040cbb957b7c587be236b)](https://www.codacy.com/app/syblackwell/intersector?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=anywhichway/intersector&amp;utm_campaign=Badge_Grade)

Below are node.js v12 benchmarks for v1.0.13 in a 4 core i7 2.86gz Debian 64bit environment intersecting a 100,000 element array with a 50,000 element array having a 50,000 element result.

```
intersectorPrimitive x 269 ops/sec ±0.90% (84 runs sampled)
lovasoaPrimitive x 118 ops/sec ±2.08% (75 runs sampled)
fastArrayIntersect x 78.16 ops/sec ±1.52% (67 runs sampled)
lodashPrimitive x 61.80 ops/sec ±1.51% (64 runs sampled)
benviePrimitive x 47.92 ops/sec ±2.78% (63 runs sampled)
```

```
intersectorKeyedObject x 248 ops/sec ±1.16% (82 runs sampled)
intersectorObject x 85.81 ops/sec ±2.34% (73 runs sampled)
fastArrayIntersectObject x 75.59 ops/sec ±1.67% (65 runs sampled)
fastArrayIntersectKeyedObject x 65.99 ops/sec ±1.34% (68 runs sampled)
lodashObject x 41.69 ops/sec ±4.81% (55 runs sampled)
benvieObject x 41.35 ops/sec ±7.02% (56 runs sampled)
```

node.js v8 benchmarks with intersector v1.0.12 in a 4 core i7 2.86gz Windows 64bit environment:

```
intersectorPrimitive x 146 ops/sec ±1.81% (79 runs sampled)
lovasoaPrimitive x 86.73 ops/sec ±2.93% (73 runs sampled)
lodashPrimitive x 46.62 ops/sec ±3.29% (60 runs sampled)
benviePrimitive x 11.90 ops/sec ±5.29% (34 runs sampled)
```

```
intersectorObject x 31.08 ops/sec ±2.78% (54 runs sampled)
lodashObject x 14.15 ops/sec ±5.90% (40 runs sampled)
benvieObject x 14.43 ops/sec ±5.22% (40 runs sampled)
```

# Installing

npm install intersector

or

Download and use the browser files from the browser directory.

# Using

`intersector(objectsMixedOrKey)` is a function that returns another function configured to do array intersections. It takes one optional argument `objectsMixedOrKey`. If no 
value is provided the intersection is optimized for uniform primitive data types across all arrays and will run much faster. If `typeof(objectsMixedOrKey)==="string"` it is assumed 
to be a unique key on all objects in the arrays. This will run the second fastest. If `objectsMixedOrKey` is otherwise not equal to zero, then a Set will be used internally and the algorithm 
will be slower, although still faster than others. This is useful in the rare cases where there might be mixed primitve types in the target arrays, e.g. `[1,2,"2"]` and `["1",2,3]` which should
result in `[1,"1",2,"2",3]`.

The returned intersection function can take any number of arguments.

In NodeJS:

```
var intersector = require("intersector"),
	primitiveIntersect = intersector(),
	objectIntersect = intersector(true);
	primitiveIntersect([1,2,3],[3,2]); // will return [3,2]
	var o1 = {o:1},
		o2 = {o:2},
		o3 = {o:3};
	objectIntersect([o1,o2,o3],[o3,o2]); // will return [o3,o2];
```

In browser:

```
<script src="intersector.js"></script>
<script>
	var primitiveIntersect = intersector(),
		objectIntersect = intersector(true);
	primitiveIntersect([1,2,3],[3,2]); // will return [2,3]
	var o1 = {o:1},
		o2 = {o:2},
		o3 = {o:3};
	objectIntersect([o1,o2,o3],[o3,o2]); // will return [o2,o3];
</script>
```

# Updates (reverse chronological order)

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
