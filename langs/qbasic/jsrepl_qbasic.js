(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
  JSREPL.prototype.Engines.prototype.QBasic = (function() {
    function QBasic(input_func, output_func, result_func, error_func, ready) {
      this.virtual_machine = new VirtualMachine({
        print: __bind(function(str) {
          if (this.output_history_index < this.output_history.length) {
            console.assert(this.output_history[this.output_history_index] === str);
          } else {
            this.output_history.push(str);
            output_func(str);
          }
          return this.output_history_index++;
        }, this),
        input: __bind(function(callback) {
          if (this.input_history_index < this.input_history.length) {
            this.input_history_index++;
            return callback(this.input_history[this.input_history_index - 1]);
          } else {
            this.input_history_index++;
            return input_func(__bind(function(data) {
              this.input_history.push(data);
              return callback(data);
            }, this));
          }
        }, this)
      });
      this.virtual_machine.INTERVAL_MS = 0;
      this.virtual_machine.instructionsPerInterval = 8192;
      this.result_callback = result_func;
      this.error_callback = error_func;
      this.command_history = [];
      this.input_history = [];
      this.input_history_index = 0;
      this.output_history = [];
      this.output_history_index = 0;
      ready();
    }
    QBasic.prototype.Destroy = function() {
      return delete this.virtual_machine;
    };
    QBasic.prototype.Eval = function(command) {
      var program;
      this.input_history_index = this.output_history_index = 0;
      this.command_history.push(command);
      try {
        program = new QBasicProgram(this.command_history.join('\n'));
        return this.virtual_machine.run(program, false, __bind(function() {
          return this.result_callback('');
        }, this));
      } catch (e) {
        this.command_history.pop();
        return this.error_callback(e.message);
      }
    };
    QBasic.prototype.Highlight = function(element) {
      return console.log('Highlighting of QBasic code not yet implemented.');
    };
    return QBasic;
  })();
}).call(this);
