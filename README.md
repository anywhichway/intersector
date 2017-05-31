# intersector
Superfast intersection supporting primitives and objects. In the age of big data, you need it.

Just 465 bytes of ES5 compatible minified code with no dependencies. 331 bytes gzipped.

60% faster that the next fastest module (lovasoa) for primitve values.

Twice as fast that the next fastest module (lodash) for objects.

[![Codacy Badge](https://api.codacy.com/project/badge/Grade/b4709e14023040cbb957b7c587be236b)](https://www.codacy.com/app/syblackwell/intersector?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=anywhichway/intersector&amp;utm_campaign=Badge_Grade)
[![Codacy Badge](https://api.codacy.com/project/badge/Coverage/b4709e14023040cbb957b7c587be236b)](https://www.codacy.com/app/syblackwell/intersector?utm_source=github.com&utm_medium=referral&utm_content=anywhichway/intersector&utm_campaign=Badge_Coverage)


Below are node.js benchmarks in a 4 core i7 2.86gz Windows 10 64bit environment:

```
intersectorPrimitive x 146 ops/sec ±1.81% (79 runs sampled)
lovasoaPrimitive x 86.73 ops/sec ±2.93% (73 runs sampled)
lodashPrimitive x 46.62 ops/sec ±3.29% (60 runs sampled)
benviePrimitive x 11.90 ops/sec ±5.29% (34 runs sampled)
intersectorObject x 31.08 ops/sec ±2.78% (54 runs sampled)
lodashObject x 14.15 ops/sec ±5.90% (40 runs sampled)
benvieObject x 14.43 ops/sec ±5.22% (40 runs sampled)
lovasoaObject NOT SUPPORTED
Fastest is intersectorPrimitive
```

Note: benvie is substantially faster in a Firefox browser.

See benchmarks at [JSBenchmarks](http://www.jsbenchmarks.com/index.html?anywhichway/intersection/master/benchmark.js).

# Installing

npm install intersector

or

Download and use the browser files from the browser directory.

# Using

`intersector(booleanOrUniqueKeyProperty)` is a function that returns another function configured to do array intersections. It takes one optional argument `booleanOrUniqueKeyProperty`. If no value is provided the intersection is optimized for primitive data types and will run much faster. If `typeof(booleanOrUniqueKeyProperty)==="string"` it is assumed to be a unique
key on all objects in the arrays. This will run the second fastest. If `booleanOrUniqueKeyProperty` is otherwise not
equal to zero, then a Set will be used internally and the algorithm will be slower, although still faster than others.

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

2017-05-29 v1.0.12 - Fixed bug with keyed objects. If a key way undefined on an object, the code would include it.

2017-05-21 v1.0.10 - Minor optimization, moved sort function to be predifined instead of within lexical scope of sort call.

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
