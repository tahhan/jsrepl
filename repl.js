(function() {
  var $, repl_logo;
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; }, __slice = Array.prototype.slice;
  $ = jQuery;
  repl_logo = '\t   _       .---.  .--. .---. .-.\n\t  :_;      : .; :: .--\': .; :: :\n\t  .-. .--. :   .\': `;  :  _.\': :\n\t  : :`._-.\': :.`.: :__ : :   : :__\n\t  : :`.__.\':_;:_;`.__.\':_;   :___.\'\n\t.-. :         jsREPL v0.1\n\t`._.\' Amjad Masad & Max Shawabkeh';
  this.JSREPL = (function() {
    function JSREPL() {
      this.lang = null;
      this.engine = null;
      this.examples = null;
      this.console = null;
      this.jqconsole = null;
      this.DefineTemplates();
      this.SetupConsole();
      this.LoadLanguageDropdown();
      this.jqconsole.Focus();
    }
    JSREPL.prototype.DefineTemplates = function() {
      $.template('optgroup', '{{each(cat, names_arr) data}}\n  <optgroup label="${cat}">\n    {{each names_arr}}\n      <option value="${$value.value}">\n        ${$value.display}\n      </option>\n    {{/each}}\n  </optgroup>\n{{/each}}');
      return $.template('option', '<option>${value}</option>');
    };
    JSREPL.prototype.SetupConsole = function() {
      this.console = $('#console');
      return this.jqconsole = this.console.jqconsole(repl_logo);
    };
    JSREPL.prototype.StartPrompt = function() {
      this.jqconsole.Write('>>> ', 'prompt');
      return this.jqconsole.Input(true, __bind(function(command) {
        return this.Evaluate(command);
      }, this));
    };
    JSREPL.prototype.LoadLanguageDropdown = function() {
      var $languages, categories, lang_def, system_name, _ref;
      categories = {};
      _ref = JSREPL.prototype.Languages.prototype;
      for (system_name in _ref) {
        lang_def = _ref[system_name];
        if (!(categories[lang_def.category] != null)) {
          categories[lang_def.category] = [];
        }
        categories[lang_def.category].push({
          display: lang_def.name,
          value: system_name
        });
      }
      $languages = $('#languages');
      $languages.empty().append($.tmpl('optgroup', {
        data: categories
      }));
      $languages.change(__bind(function() {
        $('body').toggleClass('loading');
        return this.LoadLanguage($languages.val(), __bind(function() {
          $('body').toggleClass('loading');
          return this.StartPrompt();
        }, this));
      }, this));
      return $languages.change();
    };
    JSREPL.prototype.LoadLanguage = function(lang_name, callback) {
      var loader, script, signalReady, signals_read, _i, _len, _ref;
      if (this.engine) {
        this.engine.Destroy();
        delete this.engine;
      }
      this.jqconsole.Reset();
      $('#examples').val('');
      signals_read = 0;
      signalReady = function() {
        if (++signals_read === 2) {
          return callback();
        }
      };
      this.lang = JSREPL.prototype.Languages.prototype[lang_name];
      loader = $LAB;
      _ref = this.lang.scripts;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        script = _ref[_i];
        loader = loader.script(script).wait();
      }
      loader.wait(__bind(function() {
        return this.engine = new JSREPL.prototype.Engines.prototype[lang_name]((__bind(function() {
          var a;
          a = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
          return this.ReceiveInputRequest.apply(this, a);
        }, this)), (__bind(function() {
          var a;
          a = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
          return this.ReceiveOutput.apply(this, a);
        }, this)), (__bind(function() {
          var a;
          a = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
          return this.ReceiveResult.apply(this, a);
        }, this)), (__bind(function() {
          var a;
          a = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
          return this.ReceiveError.apply(this, a);
        }, this)), signalReady);
      }, this));
      $('#lang_logo').attr('src', this.lang.logo);
      return $.get(this.lang.example_file, __bind(function(raw_examples) {
        var $examples, code, example_parts, part, title, _i, _len;
        this.examples = {};
        $examples = $('#examples');
        $(':not(:first)', $examples).remove();
        example_parts = raw_examples.split(/\*{80}/);
        title = null;
        for (_i = 0, _len = example_parts.length; _i < _len; _i++) {
          part = example_parts[_i];
          part = part.replace(/^\s+|\s*$/g, '');
          if (!part) {
            continue;
          }
          if (title) {
            code = part;
            this.examples[title] = code;
            title = null;
          } else {
            title = part;
            $examples.append($.tmpl('option', {
              value: title
            }));
          }
        }
        $examples.change(__bind(function() {
          code = this.examples[$examples.val()];
          this.jqconsole.SetPromptText(code);
          return this.jqconsole.Focus();
        }, this));
        return signalReady();
      }, this));
    };
    JSREPL.prototype.ReceiveResult = function(result) {
      if (result) {
        this.jqconsole.Write('==> ' + result, 'result');
      }
      return this.StartPrompt();
    };
    JSREPL.prototype.ReceiveError = function(error) {
      this.jqconsole.Write(String(error), 'error');
      return this.StartPrompt();
    };
    JSREPL.prototype.ReceiveOutput = function(output, cls) {
      this.jqconsole.Write(output, cls);
    };
    JSREPL.prototype.ReceiveInputRequest = function(callback) {
      this.jqconsole.Input(false, callback);
    };
    JSREPL.prototype.Evaluate = function(command) {
      $('#examples').val('');
      if (command) {
        return this.engine.Eval(command);
      } else {
        return this.StartPrompt();
      }
    };
    return JSREPL;
  })();
  JSREPL.prototype.Languages = (function() {
    function Languages() {}
    return Languages;
  })();
  JSREPL.prototype.Engines = (function() {
    function Engines() {}
    return Engines;
  })();
  $LAB.setGlobalDefaults({
    UsePreloading: false,
    UseLocalXHR: false
  });
  $(function() {
    return new JSREPL;
  });
}).call(this);
