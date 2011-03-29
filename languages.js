(function() {
  JSREPL.prototype.Languages.prototype.QBasic = {
    name: 'Quick Basic',
    category: 'Imperative',
    scripts: ['extern/qb.js/RuleSet.js', 'extern/qb.js/RuleParser.js', 'extern/qb.js/Types.js', 'extern/qb.js/VirtualMachine.js', 'extern/qb.js/TypeChecker.js', 'extern/qb.js/EarleyParser.js', 'extern/qb.js/GlrParser.js', 'extern/qb.js/Tokenizer.js', 'extern/qb.js/CodeGenerator.js', 'extern/qb.js/QBasic.js', 'langs/qbasic/jsrepl_qbasic.js'],
    example_file: 'langs/qbasic/examples.txt',
    help_link: 'http://westcompsci.pima.edu/cis100/',
    extension: 'bas',
    logo: 'langs/qbasic/logo.png'
  };
  JSREPL.prototype.Languages.prototype.Lisp = {
    name: 'Lisp',
    category: 'Functional',
    scripts: ['extern/javathcript/source/Base.js', 'extern/javathcript/source/BPWJs.js', 'extern/javathcript/source/JavathcriptTokenizer.js', 'extern/javathcript/source/JavathcriptParser.js', 'extern/javathcript/source/Environment.js', 'extern/javathcript/source/Javathcript.js', 'langs/lisp/jsrepl_lisp.js', 'langs/lisp/jsrepl_lisp_lib.js'],
    example_file: 'langs/lisp/examples.txt',
    help_link: 'http://en.wikipedia.org/wiki/Lisp_(programming_language)',
    extension: 'lisp',
    logo: 'langs/lisp/logo.jpg'
  };
  JSREPL.prototype.Languages.prototype.Scheme = {
    name: 'Scheme',
    category: 'Functional',
    scripts: ['lib/prototype-1.6.0.3.js', 'extern/biwascheme/src/version.js.in', 'extern/biwascheme/src/stackbase.js', 'extern/biwascheme/src/system/set.js', 'extern/biwascheme/src/system/write.js', 'extern/biwascheme/src/system/pair.js', 'extern/biwascheme/src/system/value.js', 'extern/biwascheme/src/system/symbol.js', 'extern/biwascheme/src/system/char.js', 'extern/biwascheme/src/system/number.js', 'extern/biwascheme/src/system/port.js', 'extern/biwascheme/src/system/record.js', 'extern/biwascheme/src/system/hashtable.js', 'extern/biwascheme/src/system/syntax.js', 'extern/biwascheme/src/system/types.js', 'extern/biwascheme/src/system/parser.js', 'extern/biwascheme/src/system/compiler.js', 'extern/biwascheme/src/system/pause.js', 'extern/biwascheme/src/system/call.js', 'extern/biwascheme/src/system/interpreter.js', 'extern/biwascheme/src/library/infra.js', 'extern/biwascheme/src/library/r6rs_lib.js', 'extern/biwascheme/src/library/webscheme_lib.js', 'extern/biwascheme/src/library/extra_lib.js', 'extern/biwascheme/src/library/srfi.js', 'langs/scheme/jsrepl_scheme.js'],
    example_file: 'langs/scheme/examples.txt',
    help_link: 'http://en.wikipedia.org/wiki/Scheme_(programming_language)',
    extension: 'scm',
    logo: 'extern/biwascheme/website/images/biwascheme_logo.png'
  };
  JSREPL.prototype.Languages.prototype.CoffeeScript = {
    name: 'CoffeeScript',
    category: 'Dynamic',
    scripts: ['langs/coffee-script/jsrepl_coffee.js'],
    example_file: 'langs/coffee-script/examples.txt',
    extension: 'coffee',
    logo: 'langs/coffee-script/logo.png'
  };
  JSREPL.prototype.Languages.prototype.Brainfuck = {
    name: 'Brainfuck',
    category: 'esoteric',
    scripts: ['extern/brainfuck/js/brainfuck.js', 'langs/brainfuck/jsrepl_brainfuck.js'],
    example_file: 'langs/brainfuck/examples.txt',
    extension: 'bf',
    logo: 'langs/brainfuck/brainfuck.jpg'
  };
}).call(this);
