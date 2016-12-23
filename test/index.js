var chai,
	expect,
	intersector;
if(typeof(window)==="undefined") {
	chai = require("chai");
	expect = chai.expect;
	intersector = require("../index.js");
}

var primitiveIntersect = intersector(),
	objectIntersect = intersector(true);

var o1 = {o:1},
	o2 = {o:2},
	o3 = {o:3};

describe("Test",function() {
	it("primitive",function() {
		var result = primitiveIntersect([1,2,3],[3,2]);
		expect(result.length).to.equal(2);
		expect(result[0]).to.equal(3);
		expect(result[1]).to.equal(2);
	});
	it("object with primitives",function() {
		var result = objectIntersect([1,2,3],[3,2]);
		expect(result.length).to.equal(2);
	});
	it("objects",function() {
		var result = objectIntersect([o1,o2,o3],[o3,o2]);
		expect(result.length).to.equal(2);
	});
});