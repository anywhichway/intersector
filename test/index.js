var chai,
	expect,
	intersector;
if(typeof(window)==="undefined") {
	chai = require("chai");
	expect = chai.expect;
	intersector = require("../index.js");
}

var primitiveIntersect = intersector(),
	objectIntersect = intersector(true),
	keyedIntersect = intersector("id");

var o1 = {id:1},
	o2 = {id:2},
	o3 = {id:3};

describe("Test",function() {
	it("primitive",function() {
		var result = primitiveIntersect([1,2,3],[3,2]);
		expect(result.length).to.equal(2);
		expect(result.includes(3)).to.equal(true);
		expect(result.includes(2)).to.equal(true);
	});
	it("primitive none",function() {
		var result = primitiveIntersect([1, 4], [2, 3], [2, 4]);
		expect(result.length).to.equal(0);
	});
	it("object with primitives",function() {
		var result = objectIntersect([1,2,3],[3,2]);
		expect(result.length).to.equal(2);
		expect(result.includes(3)).to.equal(true);
		expect(result.includes(2)).to.equal(true);
	});
	it("object with primitives none",function() {
		var result = objectIntersect([1, 4], [2, 3], [2, 4]);
		expect(result.length).to.equal(0);
	});
	it("objects",function() {
		var result = objectIntersect([o1,o2,o3],[o3,o2]);
		expect(result.length).to.equal(2);
		expect(result.includes(o3)).to.equal(true);
		expect(result.includes(o2)).to.equal(true);
	});
	it("objects none",function() {
		var result = objectIntersect([o1,o2],[o2],[o3]);
		expect(result.length).to.equal(0);
	});
	it("keyed objects",function() {
		var result = keyedIntersect([o1,o2,o3],[o3,o2]);
		expect(result.includes(o3)).to.equal(true);
		expect(result.includes(o2)).to.equal(true);
	});
	it("keyed objects none",function() {
		var result = keyedIntersect([o1,o2],[o2],[o3]);
		expect(result.length).to.equal(0);
	});
});