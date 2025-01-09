describe("About Functions (about_functions.js)", function() {

  it("should declare functions", function() {

    function add(a, b) {
      return a + b;
    }

    expect(add(1, 2)).toBe(3);
  });

  it("should know internal variables override outer variables", function () {
    let message = "Outer";

    function getMessage() {
      return message;
    }

    function overrideMessage() {
      let message = "Inner";
      return message;
    }

    expect(getMessage()).toBe("Outer");
    expect(overrideMessage()).toBe("Inner");
    expect(message).toBe("Outer");
  });

  it("should have lexical scoping", function () {
    let variable = "top-level";
    function parentfunction() {
      let variable = "local";
      function childfunction() {
        return variable;
      }
      return childfunction();
    }
    expect(parentfunction()).toBe("local");
  });

  it("should use lexical scoping to synthesise functions", function () {

    function makeMysteryFunction(makerValue){
      let newFunction = function doMysteriousThing(param){
        return makerValue + param;
      };
      return newFunction;
    }

    let mysteryFunction3 = makeMysteryFunction(3);
    let mysteryFunction5 = makeMysteryFunction(5);

    expect(mysteryFunction3(10) + mysteryFunction5(5)).toBe(23);
  });

  it("should allow extra function arguments", function () {

    function returnFirstArg(firstArg) {
      return firstArg;
    }

    expect(returnFirstArg("first", "second", "third")).toBe("first");

    function returnSecondArg(firstArg, secondArg) {
      return secondArg;
    }

    expect(returnSecondArg("only give first arg")).toBe(undefined);

    function returnAllArgs() {
      let argsArray = [];
      for (let i = 0; i < arguments.length; i += 1) {
        argsArray.push(arguments[i]);
      }
      return argsArray.join(",");
    }

    expect(returnAllArgs("first", "second", "third")).toBe("first,second,third");
  });

  it("should pass functions as values", function () {

    let appendRules = function (name) {
      return name + " rules!";
    };

    let appendDoubleRules = function (name) {
      return name + " totally rules!";
    };

    let praiseSinger = { givePraise: appendRules };
    expect(praiseSinger.givePraise("John")).toBe("John rules!");

    praiseSinger.givePraise = appendDoubleRules;
    expect(praiseSinger.givePraise("Mary")).toBe("Mary totally rules!");

  });
});

describe("About Functions And Closure (about_functions_and_closure.js)", function() {
  it("defining functions directly", function() {
    let result = "a";
    function changeResult() {
      // the ability to access variables defined in the same scope as the function is known as 'closure'
      result = "b";
    };
    changeResult();
    // what is the value of result?
    expect("b").toBe(result);
  });

  it("assigning functions to variables", function() {
    let triple = function(input) {
      return input * 3;
    };
    // what is triple 4?
    expect(12).toBe(triple(4));
  });

  it("self invoking functions", function() {
    let publicValue = "shared";

    // self invoking functions are used to provide scoping and to alias variables
    (function(pv) {
      let secretValue = "password";
      // what is the value of pv?
      expect("shared").toBe(pv);
      // is secretValue available in this context?
      expect("string").toBe(typeof(secretValue));
      // is publicValue available in this context?
      expect("string").toBe(typeof(publicValue));
    })(publicValue);

    // is secretValue available in this context?
    expect("undefined").toBe(typeof(secretValue));
    // is publicValue available in this context?
    expect("string").toBe(typeof(publicValue));
  });

  it("arguments array", function() {
    let add = function() {
      let total = 0;
      for(let i = 0; i < arguments.length; i++) {
        // complete the implementation of this method so that it returns the sum of its arguments
        total += arguments[i];
      }
        return total;
    };

    // add 1,2,3,4,5
    expect(15).toBe(add(1,2,3,4,5));
    // add 4,7,-2
    expect(9).toBe(add(4,7,-2));
  });

  it("using call to invoke function",function(){
    let invokee = function( message ){
      return this + message;  
    };
    
    //another way to invoke a function is to use the call function which allows 
    //you to set the caller's "this" context.  Call can take any number of arguments: 
    //the first one is always the context that this should be set to in the called
    //function, and the arguments to be sent to the function, multiple arguments are separated by commas.
    let result = invokee.call("I am this!", "Where did it come from?");

    // what will the value of invokee's this be?
    expect("I am this!Where did it come from?").toBe(result);
  });

  it("using apply to invoke function",function(){
    let invokee = function( message1, message2 ){
      return this + message1 + message2;  
    };

    //similar to the call function is the apply function.  Apply only has two
    //arguments:  the first is the context that this should be set to in the called
    //function and the second is the array of arguments to be passed into the called function.
    let result = invokee.apply("I am this!", ["I am arg1","I am arg2"]);

    // what will the value of invokee's this be?
    expect("I am this!I am arg1I am arg2").toBe(result);
  });
});
describe("About Scope (about_scope.js)", function() {
  thisIsAGlobalVariable = 77;

  it("global variables", function() {
    // is thisIsAGlobalVariable defined in this scope?
    expect(77).toBe(thisIsAGlobalVariable);
  });

  it("variables declared inside of a function", function() {
    let outerVariable = "outer";

    // this is a self-invoking function. Notice that it calls itself at the end ().
    (function() {
      let innerVariable = "inner";
      // is outerVariable defined in this scope?
      expect("outer").toBe(outerVariable);
      // is innerVariable defined in this scope?
      expect("inner").toBe(innerVariable);
    })();

    // is outerVariable defined in this scope?
    expect("outer").toBe(outerVariable);
    // is innerVariable defined in this scope?
    expect("undefined").toBe(typeof(innerVariable));
  });
});