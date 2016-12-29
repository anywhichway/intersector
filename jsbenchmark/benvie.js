// https://gist.github.com/Benvie/4271466
(function() {
	function Hash(){}

	// ensure we're *really* in ES5 since most Object.create shims don't shim Object.create(null)
	if (!(!Object.getOwnPropertyNames || 'prototype' in Object.getOwnPropertyNames)) {
	  Hash.prototype = Object.create(null);
	} else {
	  void function(){
	    // create a new context in order to steal its Object.prototype and create an empty object
	    var iframe = document.createElement('iframe');
	    iframe.style.display = 'none';
	    document.body.appendChild(iframe);
	    iframe.src = 'javascript:';
	    Hash.prototype = iframe.contentWindow.Object.prototype;
	    document.body.removeChild(iframe);

	    // strip it bare
	    var hiddens = ['constructor', 'hasOwnProperty', 'propertyIsEnumerable',
	                   'isPrototypeOf', 'toLocaleString', 'toString', 'valueOf'];
	    while (hiddens.length) {
	      delete Hash.prototype[hiddens.pop()];
	    }
	  }();
	}

	var hasOwn = {}.hasOwnProperty,
	    idc = 0,
	    uid = Math.random().toString(36).slice(2);

	// all the non-string, non-number primitives
	var othersMap = {
	  'true': true,
	  'false': false,
	  'null': null,
	  'undefined': undefined,
	  '0': -0
	};
	function benvieES5(array) {
		  var arrays = arguments.length;
		  // fast path when we have nothing to intersect
		  if (arrays === 0) return [];
		  if (arrays === 1) return array.slice();

		  var arg           = 0,           // current arg index
		      bits          = 0,           // bits to compare at the end
		      id            = uid + idc++, // unique key to tag objects
		      objects       = [],          // tagged objects
		      objectCount   = 0,           // tagged object count
		      strings       = new Hash,    // tagged strings
		      numbers       = new Hash,    // tagged numbers
		      others        = new Hash,    // tagged other primitives
		      frozenCount   = 0,           // untaggable object count
		      frozenObjects,               // untaggable objects
		      frozenBits;                  // untaggable object bits

		  do {
		    var arr = arguments[arg],
		        len = arr.length,
		        bit = 1 << arg,
		        i   = 0; // each array is assigned a bit

		    if (!len) return []; // bail out if empty array

		    bits |= bit; // add the bit to the collected bits
		    do {
		      var value = arr[i];
		      switch (typeof value) {
		        case 'string':
		          strings[value] |= bit; // undefined will be forced to int32 for bitwise op
		          break;
		        case 'number':
		          // (value === 0 && 1 / value < 0 ? others : numbers)[value] |= bit; //  -0
		          numbers[value] |= bit;
		          break;
		        case 'undefined':
		        case 'boolean':
		          others[value] |= bit;
		          break;
		        case 'object':
		          if (value === null) {
		            others[value] |= bit;
		            break;
		          }
		        case 'function':
		          try { // guard against non-extensible objects in strict mode
		            if (hasOwn.call(value, id)) {
		              value[id] |= bit; // add the current arrays bit to the objects tag
		            } else {
		              value[id] = bit; // or initially set it and add it to the object list
		              objects[objectCount++] = value;
		            }
		          } catch (e) {
		            if (!frozenObjects) { // lazily initialize these arrays since they will rarely be needed
		              frozenObjects = [];
		              frozenBits = [];
		            }
		            var frozenIndex = frozenObjects.indexOf(value); // slow path lookup avoided if possible
		            if (frozenIndex > -1) {
		              frozenBits[frozenIndex] |= bit; // update existing bit
		            } else {
		              frozenObjects[frozenCount] = value; // add new frozen object and set its bit
		              frozenBits[frozenCount++] = bit;
		            }
		          }
		      }
		    } while (++i < len)
		  } while (++arg < arrays)

		  var result = [],
		      count = 0;

		  for (var k in strings) {
		    if (strings[k] === bits) { // compare recorded value against the complete bitfield for intersection
		      result[count++] = k; // the keys are the values, no uncoercion necessary for strings
		    }
		  }
		  for (var k in numbers) {
		    if (numbers[k] === bits) {
		      result[count++] = +k; // numbers need to be uncoerced back from strings
		    }
		  }
		  for (var k in others) {
		    if (others[k] === bits) {
		      result[count++] = othersMap[k]; // others need to be uncoerced, using the othersMap map from above
		    }
		  }

		  while (objectCount--) { // process the tagged objects now
		    var object = objects[objectCount];
		    if (object[id] === bits) {
		      result[count++] = object;
		    }
		    delete object[id]; // clean up
		  }

		  while (frozenCount--) { // process the frozen objects if any
		    if (frozenBits[frozenCount] === bits) {
		      result[count++] = frozenObjects[frozenCount];
		    }
		  }

		  return result;
		}
	
	function benvieES6(array) {
		  var arrays = arguments.length;
		  // fast path when we have nothing to intersect
		  if (arrays === 0) return [];
		  if (arrays === 1) return array.slice();

		  var arg   = 0, // current arg index
		      bits  = 0, // bits to compare at the end
		      count = 0, // unique item count
		      items = [], // unique items
		      match = [], // item bits
		      seen  = new Map; // item -> index map

		  do {
		    var arr = arguments[arg],
		        len = arr.length,
		        bit = 1 << arg, // each array is assigned a bit
		        i   = 0;

		    if (!len) return []; // bail out if empty array

		    bits |= bit; // add the bit to the collected bits
		    do {
		      var value = arr[i],
		          index = seen.get(value); // find existing item index

		      if (index === undefined) { // new item
		        count++;
		        index = match.length;
		        seen.set(value, index);
		        items[index] = value;
		        match[index] = bit;
		      } else { // update existing item
		        match[index] |= bit;
		      }
		    } while (++i < len)
		  } while (++arg < arrays)

		  var result = [],
		      i = 0;

		  do { // filter out items that don't have the full bitfield
		    if (match[i] === bits) {
		      result[result.length] = items[i];
		    }
		  } while (++i < count)

		  return result;
		}
	if(typeof(module)!=="undefined") {
		module.exports.benvieES5 = benvieES5;
		module.exports.benvieES6 = benvieES6;
	} else {
		this.benvieES5 = benvieES5;
		this.benvieES6 = benvieES6;
	}
}).call(this);
	