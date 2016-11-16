/*
Hashtag.js v0.1 (https://github.com/jakubbilko/hashtag-js/)
Copyright (c) 2014 Jakub Bilko (http://jakubbilko.pl)
Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:
The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/

var Hashtag = (function() {

	if (!Array.prototype.forEach) {
	  Array.prototype.forEach = function(fun)
	  {
	    var len = this.length;
	    if (typeof fun != "function")
	      throw new TypeError();

	    var thisp = arguments[1];
	    for (var i = 0; i < len; i++)
	    {
	      if (i in this)
	        fun.call(thisp, this[i], i, this);
	    }
	  };
	}

	var template = '<span class="tag">{#}</span>';
	var templates = {};

	function repl(elem, t) {
		var elems = document.querySelectorAll(elem);
		[].forEach.call(elems, function(elem) {
			var html = elem.innerHTML;
			var matched = html.match(/(\S*#\[[^\]]+\])|(\S*#\S+)/gi);
			[].forEach.call(matched, function(m) {
				var templ;
				if(t) templ = templates[t];
				else templ = template;
				templ = templ.replace('{#}', m);
				templ = templ.replace('{#n}', m.slice(1));
				html = html.replace(m, templ);
			});
			elem.innerHTML = html;
		});
	}

	function setopts(opts) {
		if(opts.template) template = opts.template;
		if(opts.templates) templates = opts.templates;
	}

	return {
		replaceTags: repl,
		setOptions: setopts
	}

}());
