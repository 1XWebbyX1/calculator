var _createClass = function () {function defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}return function (Constructor, protoProps, staticProps) {if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;};}();function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function _possibleConstructorReturn(self, call) {if (!self) {throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call && (typeof call === "object" || typeof call === "function") ? call : self;}function _inherits(subClass, superClass) {if (typeof superClass !== "function" && superClass !== null) {throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);}subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;} //REDUX_______________________________________________
var DIGIT = 'DIGIT';
var OPERATION = 'OPERATION';
var CAL = 'CAL';
var CLEAR = 'CLEAR';
var initialState = {
  prev: 0,
  next: 0,
  result: 0,
  exp: Number($('#display').text()),
  operation: '+' };



function addDigit(next, exp) {
  return {
    type: DIGIT,
    next: next,
    exp: exp };

}

function addOperation(prev, operation) {
  return {
    type: OPERATION,
    prev: prev,
    operation: operation };

}

function calculate(result) {
  return {
    type: CAL,
    result: result };

}

function allClear() {
  return {
    type: CLEAR,
    prev: 0,
    next: 0 };

}


function reducer() {var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;var action = arguments[1];
  switch (action.type) {
    case DIGIT:return { prev: state.prev, next: action.next, result: state.result, exp: action.exp, operation: state.operation };
    case OPERATION:return { prev: action.prev, next: state.next, result: state.result, exp: state.exp, operation: action.operation };
    case CAL:return { prev: state.prev, next: state.next, result: action.result, exp: state.exp, operation: state.operation };
    case CLEAR:return { prev: action.prev, next: action.next, result: state.result, exp: state.exp, operation: state.operation };
    default:return state;}

}


//Redux Store__________________________________________
var store = Redux.createStore(reducer);


// Array of Objects to hold keys-------------------------

var keys = [
{ key: 'AC', id: 'key-AC' },
{ key: '/', id: 'key-/' },
{ key: 'X', id: 'key-X' },
{ key: '1', id: 'key-1' },
{ key: '2', id: 'key-2' },
{ key: '3', id: 'key-3' },
{ key: '+', id: 'key-+' },
{ key: '4', id: 'key-4' },
{ key: '5', id: 'key-5' },
{ key: '6', id: 'key-6' },
{ key: '-', id: 'key--' },
{ key: '7', id: 'key-7' },
{ key: '8', id: 'key-8' },
{ key: '9', id: 'key-9' },
{ key: '=', id: 'key-eq' },
{ key: '0', id: 'key-0' },
{ key: '.', id: 'key-.' }];




//REACT_________________________________


//calculator component____________________________
var Calculator = function (_React$Component) {_inherits(Calculator, _React$Component);function Calculator() {_classCallCheck(this, Calculator);return _possibleConstructorReturn(this, (Calculator.__proto__ || Object.getPrototypeOf(Calculator)).apply(this, arguments));}_createClass(Calculator, [{ key: 'render', value: function render()
    {
      return (
        React.createElement('div', { id: 'calc' },
          React.createElement(Expression, null),
          React.createElement(Display, null),
          React.createElement(Container, null)));


    } }]);return Calculator;}(React.Component);



//keypad component _______________________________
var
KeyPad = function (_React$Component2) {_inherits(KeyPad, _React$Component2);

  function KeyPad(props) {_classCallCheck(this, KeyPad);var _this2 = _possibleConstructorReturn(this, (KeyPad.__proto__ || Object.getPrototypeOf(KeyPad)).call(this,
    props));
    _this2.handleClick = _this2.handleClick.bind(_this2);
    _this2.clear = _this2.clear.bind(_this2);
    _this2.setResult = _this2.setResult.bind(_this2);
    _this2.setOperation = _this2.setOperation.bind(_this2);
    _this2.accumulateExp = _this2.accumulateExp.bind(_this2);
    _this2.state = {
      prev: 0,
      next: 0,
      result: 0,
      exp: Number($('#display').text()),
      operation: '+' };

    clear = false;
    refresh = false;
    operOverride = false;return _this2;
  }



  //All Clear function--------
  _createClass(KeyPad, [{ key: 'clear', value: function (_clear) {function clear() {return _clear.apply(this, arguments);}clear.toString = function () {return _clear.toString();};return clear;}(function () {
      $('#exp').empty();
      $('#display #input').empty();
      this.props.mapChange();
      clear = true;
    })
    //------



    //calculate final result from expressin accumulator-----
  }, { key: 'setResult', value: function setResult() {
      $('#display #input').html(this.props.exp); //display and set result as accumulated exp
      result = this.props.exp;
      refresh = true;
      clear = true; //clear and reset after setting result
      $('#exp').empty();
      this.props.mapResult(result); //send result to store
    }
    //-------



    //set operation and update prev--------
  }, { key: 'setOperation', value: function setOperation(oper) {
      if (operOverride) {//multiple operations (last operation overrides rest)
        clear = false;
        operOverride = false;
      }
      if (clear) {
        prev = Number(this.props.next); //if exp is empty, next added input becomes prev
        clear = false;
      } else
      {
        prev = this.props.exp;
      }

      operation = oper;
      operOverride = true;
    }
    //--------



    //Upate exp accumulator----------
  }, { key: 'accumulateExp', value: function accumulateExp() {
      next = $('#display #input').text(); //current input
      switch (this.props.operation) {
        case '+':exp = this.props.prev + Number(next);
          break;
        case '-':exp = this.props.prev - Number(next);
          break;
        case 'X':exp = this.props.prev * Number(next);
          break;
        case '/':exp = this.props.prev / Number(next);
          break;
        default:return;}

      this.props.mapDigit(next, exp);
    }
    //-------------
  }, { key: 'handleClick', value: function handleClick(



    e) {

      //animation for keypad_____________________
      $(e.target).addClass('anim');
      setTimeout(function () {
        $('.anim').removeClass('anim');
      }, 500);
      //--------


      var input = $(e.target).text(); //current input key-----------

      //regex____________________________
      var digits = /[\d.]/; //regex to match digits
      var operationals = /[\/X+-]/; //regex to match operations
      //---------


      if (operationals.test($('#display #input').text())) {
        $('#display #input').empty(); //clear display of digits if input is operation
      }
      if (refresh) {
        $('#exp').html(Number(this.props.result));
        refresh = false;
        if (digits.test(input)) {
          $('#exp').empty();
          $('#input').empty();
        } else
        {clear = false;}
      }



      if (digits.test(input)) {//if input is a DIGIT---------
        $('#display #input').append(input);

        this.accumulateExp();

        $('#exp').append(input);
        operOverride = false;
      } else
      if (operationals.test(input)) {//if input is an OPERATION------------
        //checking if display intially contains digits (canbe stored as prev) prior to updating it with operation
        if (!operationals.test($('#display #input').text())) {
          this.setOperation(input);
        }

        this.props.mapOperation(prev, operation);
        $('#exp').append(input);
        $('#display #input').html(input);
      }
      //-------------------------------------------------------------------
      else if (input == '=') {
          this.setResult();
        } else

        if (input == 'AC') {
          this.clear();
        }
    } }, { key: 'render', value: function render()


    {var _this3 = this;
      var keyss = keys.map(function (a) {
        return (
          React.createElement('div', { id: a.id, key: a.key, 'class': 'key', onClick: _this3.handleClick }, a.key));

      });
      return (
        React.createElement('div', { id: 'keypad' },
          keyss));


    } }]);return KeyPad;}(React.Component);


//mapping state and props to Redux-------
var mapStateToProps = function mapStateToProps(state) {
  return {
    prev: state.prev,
    next: state.next,
    result: state.result,
    exp: state.exp,
    operation: state.operation };

};

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return {
    mapDigit: function mapDigit(next, exp) {
      dispatch(addDigit(next, exp));
    },
    mapOperation: function mapOperation(prev, operation) {
      dispatch(addOperation(prev, operation));
    },
    mapResult: function mapResult(result) {
      dispatch(calculate(result));
    },
    mapChange: function mapChange() {
      dispatch(allClear());
    } };

};



//display screen component ____________________________
var
Display = function (_React$Component3) {_inherits(Display, _React$Component3);function Display() {_classCallCheck(this, Display);return _possibleConstructorReturn(this, (Display.__proto__ || Object.getPrototypeOf(Display)).apply(this, arguments));}_createClass(Display, [{ key: 'render', value: function render()
    {
      return (
        React.createElement('div', { id: 'display' },
          React.createElement('div', { id: 'input' })));


    } }]);return Display;}(React.Component);var


Expression = function (_React$Component4) {_inherits(Expression, _React$Component4);function Expression() {_classCallCheck(this, Expression);return _possibleConstructorReturn(this, (Expression.__proto__ || Object.getPrototypeOf(Expression)).apply(this, arguments));}_createClass(Expression, [{ key: 'render', value: function render()
    {
      return (
        React.createElement('div', { id: 'exp' }));

    } }]);return Expression;}(React.Component);



var connect = ReactRedux.connect;

var Container = connect(mapStateToProps, mapDispatchToProps)(KeyPad);

//create a provider --------
var Provider = ReactRedux.Provider;var

AppWrapper = function (_React$Component5) {_inherits(AppWrapper, _React$Component5);function AppWrapper() {_classCallCheck(this, AppWrapper);return _possibleConstructorReturn(this, (AppWrapper.__proto__ || Object.getPrototypeOf(AppWrapper)).apply(this, arguments));}_createClass(AppWrapper, [{ key: 'render', value: function render()
    {
      return (
        React.createElement(Provider, { store: store },
          React.createElement(Calculator, null)));


    } }]);return AppWrapper;}(React.Component);





//render the calculator_______________________________
ReactDOM.render(React.createElement(AppWrapper, null), document.getElementById('app'));