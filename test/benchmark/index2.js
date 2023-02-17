import vm from "node:vm"
import v8 from "v8";

v8.setFlagsFromString('--expose_gc');
const gc = vm.runInNewContext('gc');


import assert from "assert";
import _ from "lodash";
import intersector from "../../index.js";
const fastArrayIntersect = (await import("fast_array_intersect")).default.default;

const Benchmark = (await import("benchmark")).default;

const primitiveIntersect = intersector();

/*
 * https://github.com/Benvie
 * improvements 2015 by AnyWhichWay
 */
function benvie(h){var a=arguments.length;if(0===a)return[];if(1===a)return intersection(h,h);var e=0,k=0,l=0,m=[],d=[],n=new Map,b;do{var p=arguments[e],q=p.length,f=1<<e;b=0;if(!q)return[];k|=f;do{var g=p[b],c=n.get(g);"undefined"===typeof c?(l++,c=d.length,n.set(g,c),m[c]=g,d[c]=f):d[c]|=f}while(++b<q)}while(++e<a);a=[];b=0;do d[b]===k&&(a[a.length]=m[b]);while(++b<l);return a}


//https://gist.github.com/lovasoa/3361645
function lovasoa() {
	  var i, all, shortest, nShortest, n, len, ret = [], obj={}, nOthers;
	  nOthers = arguments.length-1;
	  nShortest = arguments[0].length;
	  shortest = 0;
	  for (i=0; i<=nOthers; i++){
	    n = arguments[i].length;
	    if (n<nShortest) {
	      shortest = i;
	      nShortest = n;
	    }
	  }

	  for (i=0; i<=nOthers; i++) {
	    n = (i===shortest)?0:(i||shortest); //Read the shortest array first. Read the first array instead of the shortest
	    len = arguments[n].length;
	    for (var j=0; j<len; j++) {
	        var elem = arguments[n][j];
	        if(obj[elem] === i-1) {
	          if(i === nOthers) {
	            ret.push(elem);
	            obj[elem]=0;
	          } else {
	            obj[elem]=i;
	          }
	        } else if (i===0) {
	          obj[elem]=0;
	        }
	    }
	  }
	  return ret;
	}

const args = [];
for(let i=0;i<100000;i++) {
	args.push(Math.round(i*Math.random()*10));
}
var l1 = args.length*Math.random(),
	l2 = args.length*Math.random(),
	l3 = args.length*Math.random(),
	l4 = args.length*Math.random(),
	l5 = args.length*Math.random(),
	args1 = args.slice(l1),
	args2 = args.slice(l2),
	args3 = args.slice(l3),
	args4 = args.slice(l4),
	args5 = args.slice(l5),
	expected = lovasoa(args1,args2,args3,args4).length;
	
for(var i=0;i<10;i++) {
	//add tests
	var suite = new Benchmark.Suite;
	suite.add('lodashPrimitive', function() {
		assert(_.intersection(args1,args2,args3,args4,args5).length===expected);
	}).add('benviePrimitive', function() {
		assert(benvie(args1,args2,args3,args4,args5).length===expected);
	}).add('lovasoaPrimitive', function() {
		assert(lovasoa(args1,args2,args3,args4,args5).length===expected);
	}).add('fastArrayIntersect', function() {
		assert(fastArrayIntersect([args1,args2,args3,args4,args5]).length===expected);
	}).add('intersectorPrimitive', function() {
		assert(primitiveIntersect(args1, args2, args3, args4,args5).length === expected);
	}).add('intersector iterable time to first', function() {
			const result = primitiveIntersect.iterable(args1, args2, args3, args4,args5);
			for(const item of result) {
				break;
			}
		})
	.add('intersector iterable', function() {
		const result = [...primitiveIntersect.iterable(args1, args2, args3, args4,args5)];
		assert(result.length===expected);
	}).on('cycle', function(event) {
		console.log(String(event.target),expected);
		gc();
	})
	.on('complete', function() {
		console.log('Fastest is ' + this.filter('fastest').map('name'));
		l1 = args.length*Math.random(),
		l2 = args.length*Math.random(),
		l3 = args.length*Math.random(),
		l4 = args.length*Math.random(),
		l5 = args.length*Math.random(),
		args1 = args.slice(l1),
		args2 = args.slice(l2),
		args3 = args.slice(l3),
		args4 = args.slice(l4),
		args5 = args.slice(l5),
		expected = lovasoa(args1,args2,args3,args4,args5).length;
		gc();
	})
	// run async
	.run();
}
