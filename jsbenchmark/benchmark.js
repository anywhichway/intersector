(function() {
	var imports = ["setops.js","intersector.js","benvie.js","lovasoa.js"];
	
	var expected = 50000,
		args1 = [];
	for(var i=0;i<100000;i++) {
		args1.push(i);
	}
	var args2 = args1.slice(50000);
	var oargs1 = [];
	expected = 50000;
	for(var i=0;i<100000;i++) {
		oargs1.push({i:i});
	}
	var oargs2 = oargs1.slice(50000);
	
	
	JSBenchmark.import(imports).then(() => {
		var intersectorPrimitve = intersector(),
			intersectorObject = intersector(true);
		JSBenchmark.run({
			name: "Array Intersection",
			description: "Test various ways of intersecting arrays",
			keywords: ["intersection","lodash","benvie","intersector","setops"],
			suites: {
				primitive: {
					arguments: [args1,args2],
					expected: expected,
					pretest: true,
					showArguments: false,
					tests: {
						lodash: (a1,a2) => { return _.intersection(a1,a2).length; },
						benvie: (a1,a2) => { return benvie(a1,a2).length; },
						lovasoa: (a1,a2) => { return lovasoa(a1,a2).length; },
						intersector: (a1,a2) => { return intersectorPrimitve(a1,a2).length; },
						setops: (a1,a2) => { return setOps.intersection(a1,a2).length; }
					}
				},
				object: {
					arguments: [oargs1,oargs2],
					expected: expected,
					pretest: true,
					showArguments: false,
					tests: {
						lodash: (a1,a2) => { return _.intersection(a1,a2).length; },
						benvie: (a1,a2) => { return benvie(a1,a2).length; },
						intersector: (a1,a2) => { return intersectorObject(a1,a2).length; }
					}
				}
			}
		});
	});
}).call(this);