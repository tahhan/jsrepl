(function() {
  var $;
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
  $ = jQuery;
  JSREPL.prototype.Engines.prototype.CoffeeScript = (function() {
    function CoffeeScript(input_func, output_func, result_func, error_func, ready) {
      this.input_func = input_func;
      this.output_func = output_func;
      this.result_func = result_func;
      this.error_func = error_func;
      this.sandbox = $('<iframe/>', {
        src: 'langs/coffee-script/sandbox.html',
        style: 'display:none'
      }).appendTo('body');
      this.sandbox = this.sandbox[0].contentWindow;
      this.sandbox.console.log = __bind(function(a) {
        return this.output_func(a + '\n');
      }, this);
      this.sandbox.parent = null;
      ready();
    }
    CoffeeScript.prototype.Destroy = function() {
      return $('iframe').remove();
    };
    CoffeeScript.prototype.Eval = function(command) {
      try {
        return this.result_func(this.sandbox.CoffeeScript.eval(command, {
          globals: true,
          bare: true
        }));
      } catch (e) {
        return this.error_func(e);
      }
    };
    CoffeeScript.prototype.Highlight = function(element) {};
    return CoffeeScript;
  })();
}).call(this);
