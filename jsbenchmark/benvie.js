/*
	 * https://github.com/Benvie
	 * improvements 2015 by AnyWhichWay
	 */
(function() {
	function benvie(h){var a=arguments.length;if(0===a)return[];if(1===a)return intersection(h,h);var e=0,k=0,l=0,m=[],d=[],n=new Map,b;do{var p=arguments[e],q=p.length,f=1<<e;b=0;if(!q)return[];k|=f;do{var g=p[b],c=n.get(g);"undefined"===typeof c?(l++,c=d.length,n.set(g,c),m[c]=g,d[c]=f):d[c]|=f}while(++b<q)}while(++e<a);a=[];b=0;do d[b]===k&&(a[a.length]=m[b]);while(++b<l);return a}
	if(typeof(module)!=="undefined") {
		module.exports = benvie;
	} else {
		this.benvie = benvie;
	}
}).call(this);
	