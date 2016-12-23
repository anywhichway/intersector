# intersector
Superfast intersection supporting primitives and objects.

Below are node.js benchmarks in a 4 core i7 2.86gz Windows 10 64bit environment:

```
intersectorPrimitive x 145 ops/sec ±3.38% (72 runs sampled)
benviePrimitive x 13.54 ops/sec ±2.29% (37 runs sampled)
lovasoaPrimitive x 91.70 ops/sec ±2.70% (66 runs sampled)
intersectorObject x 27.69 ops/sec ±2.88% (49 runs sampled)
benvieObject x 11.18 ops/sec ±9.41% (33 runs sampled)
Fastest is intersectorPrimitive
```

Note: benvie is substantially faster in a Firefox browser.

See benchmarks at (JSBenchmarks)[http://www.jsbenchmarks.com/index.html?intersection].

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

2016-12-21 v1.0.0 - Initial public release.

# License

MIT - see LICENSE file
