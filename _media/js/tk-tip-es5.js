(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () {
  function a(a, b) {
    for (var c, d = 0; d < b.length; d++) {
      c = b[d], c.enumerable = c.enumerable || !1, c.configurable = !0, 'value' in c && (c.writable = !0), Object.defineProperty(a, c.key, c);
    }
  }return function (b, c, d) {
    return c && a(b.prototype, c), d && a(b, d), b;
  };
}();function _classCallCheck(a, b) {
  if (!(a instanceof b)) throw new TypeError('Cannot call a class as a function');
}function _possibleConstructorReturn(a, b) {
  if (!a) throw new ReferenceError('this hasn\'t been initialised - super() hasn\'t been called');return b && ('object' == (typeof b === 'undefined' ? 'undefined' : _typeof(b)) || 'function' == typeof b) ? b : a;
}function _inherits(a, b) {
  if ('function' != typeof b && null !== b) throw new TypeError('Super expression must either be null or a function, not ' + (typeof b === 'undefined' ? 'undefined' : _typeof(b)));a.prototype = Object.create(b && b.prototype, { constructor: { value: a, enumerable: !1, writable: !0, configurable: !0 } }), b && (Object.setPrototypeOf ? Object.setPrototypeOf(a, b) : a.__proto__ = b);
}(function () {
  var a = { ESC: 9 },
      b = function (b) {
    function c() {
      return _classCallCheck(this, c), _possibleConstructorReturn(this, (c.__proto__ || Object.getPrototypeOf(c)).apply(this, arguments));
    }return _inherits(c, b), _createClass(c, [{ key: 'connectedCallback', value: function connectedCallback() {
        (!this.position || this.position && -1 === ['top', 'bottom', 'left', 'right'].indexOf(this.position)) && (this.position = 'top'), this.btnElement = document.createElement('button'), this.spanElement = document.createElement('span'), this.btnElement.setAttribute('aria-label', this.label ? this.label : 'more info'), this.btnElement.innerHTML = this.text ? this.text : '', this.spanElement.setAttribute('role', 'status'), this.btnElement.addEventListener('click', this.showTip.bind(this)), this.append(this.btnElement), this.append(this.spanElement);
      } }, { key: 'disconnectedCallback', value: function disconnectedCallback() {
        this.querySelector('button').removeEventListener('click', this.showTip, !0);
      } }, { key: 'showTip', value: function showTip() {
        var b = this,
            c = this;document.addEventListener('click', function (a) {
          b.btnElement !== a.target && (b.spanElement.innerHTML = '', c.removeEventListener('keydown', b));
        }), document.addEventListener('keydown', function (d) {
          (d.keyCode || d.which) === a.ESC && (b.spanElement.innerHTML = '', c.removeEventListener('keydown', b));
        }), this.spanElement.innerHTML = '', this.spanElement.innerHTML = '<span class="toggletip-bubble ' + this.position + '">' + this.tip + '</span>';
      } }, { key: 'dispatchCustomEvent', value: function dispatchCustomEvent(a) {
        var b = new CustomEvent(a, { bubbles: !0, cancelable: !0 });b.relatedTarget = this, this.dispatchEvent(b), this.removeEventListener(a, this);
      } }, { key: 'type', get: function get() {
        return this.getAttribute('type');
      }, set: function set(a) {
        return this.setAttribute('type', a);
      } }, { key: 'label', get: function get() {
        return this.getAttribute('label');
      }, set: function set(a) {
        return this.setAttribute('label', a);
      } }, { key: 'tip', get: function get() {
        return this.getAttribute('tip');
      }, set: function set(a) {
        return this.setAttribute('tip', a);
      } }, { key: 'position', get: function get() {
        return this.getAttribute('position');
      }, set: function set(a) {
        return this.setAttribute('position', a);
      } }, { key: 'text', get: function get() {
        return this.getAttribute('text');
      }, set: function set(a) {
        return this.getAttribute('text', a);
      } }], [{ key: 'observedAttributes', get: function get() {
        return ['type', 'label', 'tip', 'text', 'position'];
      } }]), c;
  }(HTMLElement);customElements.define('tk-tip', b);
})();

},{}]},{},[1]);
