(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
  JSREPL.prototype.Engines.prototype.Scheme = (function() {
    function Scheme(input_func, output_func, result_func, error_func, ready) {
      BiwaScheme.Port.current_input = new BiwaScheme.Port.CustomInput(input_func);
      BiwaScheme.Port.current_output = new BiwaScheme.Port.CustomOutput(output_func);
      BiwaScheme.Port.current_error = BiwaScheme.Port.current_output;
      this.interpreter = new BiwaScheme.Interpreter(error_func);
      this.result_callback = result_func;
      ready();
    }
    Scheme.prototype.Destroy = function() {
      delete this.interpreter;
      return delete BiwaScheme;
    };
    Scheme.prototype.Eval = function(command) {
      try {
        return this.interpreter.evaluate(command, __bind(function(new_state) {
          var result;
          result = '';
          if (new_state && new_state !== BiwaScheme.undef) {
            result = BiwaScheme.to_write(new_state);
          }
          return this.result_callback(result);
        }, this));
      } catch (e) {
        return this.interpreter.on_error(e.message);
      }
    };
    Scheme.prototype.Highlight = function(element) {
      return console.log('Highlighting of Scheme code not yet implemented.');
    };
    return Scheme;
  })();
}).call(this);
