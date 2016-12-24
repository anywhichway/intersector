# intersector
Superfast intersection supporting primitives and objects. In the age of big data, you need it.

Below are node.js benchmarks in a 4 core i7 2.86gz Windows 10 64bit environment:

```
intersectorPrimitive x 145 ops/sec ±3.69% (72 runs sampled)
lodashPrimitive x 47.06 ops/sec ±3.99% (62 runs sampled)
benviePrimitive x 13.49 ops/sec ±2.45% (37 runs sampled)
lovasoaPrimitive x 91.53 ops/sec ±4.89% (66 runs sampled)
intersectorObject x 29.28 ops/sec ±3.71% (52 runs sampled)
lodashObject x 15.72 ops/sec ±4.80% (44 runs sampled)
benvieObject x 15.39 ops/sec ±6.09% (40 runs sampled)
lovasoaObject NOT SUPPORTED
Fastest is intersectorPrimitive
```

Note: benvie is substantially faster in a Firefox browser.

See benchmarks at [JSBenchmarks](http://www.jsbenchmarks.com/index.html?intersection).

# Installing

npm install intersector

or

Download and use the browser files from the browser directory.

# Using

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

2016-12-24 v1.0.2 - Corrected git repository reference in package.json.

2016-12-23 v1.0.1 - Added lodash intersection to benchmark.

2016-12-21 v1.0.0 - Initial public release.

# License

MIT - see LICENSE file
