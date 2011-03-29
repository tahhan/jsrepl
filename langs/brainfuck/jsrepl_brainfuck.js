(function() {
  JSREPL.prototype.Engines.prototype.Brainfuck = (function() {
    function Brainfuck(input_func, output_func, result_func, error_func, ready) {
      this.input_func = input_func;
      this.output_func = output_func;
      this.result_func = result_func;
      this.error_func = error_func;
      BF.init(this.output_func, this.input_func);
      ready();
    }
    Brainfuck.prototype.Destroy = function() {
      return delete BF;
    };
    Brainfuck.prototype.Eval = function(command) {
      try {
        return BF.parse(command, this.result_func);
      } catch (e) {
        return this.error_func(e);
      }
    };
    Brainfuck.prototype.Higilight = function(element) {
      return console.log("DIY");
    };
    return Brainfuck;
  })();
}).call(this);
