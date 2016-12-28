//https://gist.github.com/lovasoa/3361645
(function() { 
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
		        }else if (i===0) {
		          obj[elem]=0;
		        }
		    }
		  }
		  return ret;
		}
	if(typeof(module)!=="undefined") {
		module.exports = lovasoa;
	} else {
		this.lovasoa = lovasoa;
	}
}).call(this);
	