(function() {
  var isNil;
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
  isNil = function(x) {
    return (!(x != null)) || (x instanceof Array && x.length === 0);
  };
  JSREPL.prototype.Engines.prototype.Lisp = (function() {
    function Lisp(input_func, output_func, result_func, error_func, ready) {
      var f, _i, _len, _ref;
      Javathcript.Environment.prototype.princ = function(obj, callback) {
        return this._value(obj, function(val) {
          output_func(Javathcript.environment._stringify(val));
          return callback(val);
        });
      };
      Javathcript.Environment.prototype.print = function(obj, callback) {
        return this._value(obj, function(val) {
          output_func(Javathcript.environment._stringify(val));
          output_func('\n');
          return callback(val);
        });
      };
      Javathcript.Environment.prototype.input = function(callback) {
        return input_func(function(str) {
          return callback(new Javathcript.Atom(str));
        });
      };
      Javathcript.Environment.prototype._error = error_func;
      _ref = ['princ', 'print', 'input', '_error'];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        f = _ref[_i];
        Javathcript.Environment.prototype[f].toString = function() {
          return '{library macro}';
        };
      }
      this.result_handler = function(r) {
        return result_func(isNil(r) ? '' : r.toString());
      };
      this.output_handler = output_func;
      this.error_handler = error_func;
      Javathcript.evalMulti(JSREPL.prototype.Engines.prototype.Lisp.prototype.Library, (function() {}), function() {
        return ready();
      });
    }
    Lisp.prototype.Destroy = function() {
      return delete Javathcript;
    };
    Lisp.prototype.Eval = function(command) {
      var handleMultiResult, last_result;
      try {
        return Javathcript.eval(command, this.result_handler);
      } catch (e) {
        try {
          last_result = null;
          handleMultiResult = __bind(function(r) {
            return last_result = r;
          }, this);
          return Javathcript.evalMulti(command, handleMultiResult, __bind(function() {
            return this.result_handler(last_result);
          }, this));
        } catch (e) {
          return this.error_handler(e.message);
        }
      }
    };
    Lisp.prototype.Highlight = function(element) {
      return console.log('Higlighting of Lisp code not yet implemented.');
    };
    return Lisp;
  })();
}).call(this);
