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
  var a = { TAB: 9, ESC: 27, ARROW_LEFT: 37, ARROW_UP: 38, ARROW_RIGHT: 39, ARROW_DOWN: 40 },
      b = function (b) {
    function c() {
      _classCallCheck(this, c);var a = _possibleConstructorReturn(this, (c.__proto__ || Object.getPrototypeOf(c)).call(this));return a.hasActive = !1, a.currentActive = '', a.hasNested = !1, a.isNested = !1, a.tabs = [], a.tabsLinks = [], a.panels = [], a.tabLinkHash = [], a;
    }return _inherits(c, b), _createClass(c, [{ key: 'type', get: function get() {
        return this.getAttribute('type');
      }, set: function set(a) {
        return this.setAttribute('type', a);
      } }, { key: 'recall', get: function get() {
        return this.getAttribute('recall');
      }, set: function set(a) {
        return this.setAttribute('recall', a);
      } }, { key: 'view', get: function get() {
        return this.getAttribute('view');
      }, set: function set(a) {
        this.setAttribute('view', a);
      } }, { key: 'orientation', get: function get() {
        return this.getAttribute('orientation') || 'horizontal';
      }, set: function set(a) {
        this.setAttribute('orientation', a);
      } }, { key: 'responsive', get: function get() {
        return this.getAttribute('responsive');
      }, set: function set(a) {
        this.setAttribute('responsive', a);
      } }, { key: 'collapseWidth', get: function get() {
        return this.getAttribute('collapse-width');
      }, set: function set(a) {
        this.setAttribute('collapse-width', a);
      } }], [{ key: 'observedAttributes', get: function get() {
        return ['type', 'recall', 'orientation', 'view', 'responsive', 'collapse-width'];
      } }]), _createClass(c, [{ key: 'connectedCallback', value: function connectedCallback() {
        var a = this;if ((!this.orientation || this.orientation && -1 === ['horizontal', 'vertical'].indexOf(this.orientation)) && this.setAttribute('orientation', 'horizontal'), this.type || this.setAttribute('type', 'primary'), this.view = this.getAttribute('view') || 'tabs', this.recall = this.recall || !1, this.responsive = this.getAttribute('responsive') || 'false', this.collapseWidth = this.getAttribute('collapseWidth') || 0, this.panels = [].slice.call(this.querySelectorAll('section')), !this.panels.length) throw new Error('`Tk-panels` require one or more panels!');if (this.findAncestorByTagNme(this, 'tk-tab') && (this.isNested = !0), this.querySelector('tk-tab') && (this.hasNested = !0), this.recall && window.sessionStorage) {
          var b = sessionStorage.getItem(this.getStorageKey());b && !/@\[/.test(b) && this.tabLinkHash.push(b), this.setTabState();
        }'ul' !== this.firstElementChild.tagName && this.createNavigation(), this.panels.forEach(function (b) {
          b.setAttribute('role', 'tabpanel'), a.tabs.push('#tab-' + b.id), b.hasAttribute('active') && (a.hasActive = !0, a.currentActive = b.id, a.querySelector('#tab-' + b.id).setAttribute('aria-selected', 'true'), a.querySelector('#tab-' + b.id).setAttribute('active', ''), a.querySelector('#tab-' + b.id).setAttribute('tabindex', '0'));
        }), this.hasActive || (this.tabsLinks[0].setAttribute('active', ''), this.hasActive = !0, this.currentActive = this.panels[0].id, this.tabsLinks[0].setAttribute('aria-selected', 'true'), this.tabsLinks[0].setAttribute('tabindex', '0'), this.tabsLinks[0].setAttribute('active', ''), this.panels[0].setAttribute('active', '')), window.location.href.match(/#tab-/), 'accordion' === this.view && this.toAccordion.bind(this)(), 'true' === this.responsive && (this.changeView.bind(this), window.addEventListener('resize', this.changeView.bind(this)));
      } }, { key: 'disconnectedCallback', value: function disconnectedCallback() {
        var a = this,
            b = this.querySelector('ul'),
            c = [].slice.call(b.querySelectorAll('a'));c.forEach(function (b) {
          b.removeEventListener('click', a.activateTabFromLink, !0);
        }), b.removeEventListener('keydown', a.keyBehaviour, !0);
      } }, { key: 'createNavigation', value: function createNavigation() {
        var a = this,
            b = this,
            c = '';'ul' !== this.firstElementChild.tagName.toLowerCase() && (c = document.createElement('ul')), c.setAttribute('role', 'tablist'), this.panels.forEach(function (d) {
          if (!d.id) throw new Error('`tk-panels` All panels require an ID');if (d.parentNode === a) {
            var e = d.getAttribute('active') || !1,
                f = document.createElement('li'),
                g = document.createElement('a');f.setAttribute('role', 'presentation'), g.setAttribute('role', 'tab'), g.setAttribute('aria-controls', d.id), g.setAttribute('aria-selected', e ? 'true' : 'false'), g.setAttribute('tabindex', e ? '0' : '-1'), g.setAttribute('href', '#' + d.id), g.setAttribute('id', 'tab-' + d.id), g.innerHTML = d.getAttribute('name'), e && g.setAttribute('active', ''), g.addEventListener('click', b.activateTabFromLink.bind(b)), a.tabsLinks.push(g), f.append(g), c.append(f), d.setAttribute('aria-labelledby', 'tab-' + d.id), e || d.setAttribute('aria-hidden', 'true');
          }
        }), this.insertAdjacentElement('afterbegin', c), this.querySelector('ul').addEventListener('keydown', this.keyBehaviour.bind(this));
      } }, { key: 'hideCurrent', value: function hideCurrent() {
        if (this.currentActive) {
          var a = this.querySelector('a[aria-controls="' + this.currentActive + '"]');this.dispatchCustomEvent('tk.tab.hide', a, this.querySelector('#tab-' + this.currentActive)), a.removeAttribute('active'), a.setAttribute('tabindex', '-1'), this.querySelector('#' + this.currentActive).removeAttribute('active'), this.querySelector('#' + this.currentActive).setAttribute('aria-hidden', 'true'), a.removeAttribute('aria-selected'), this.dispatchCustomEvent('tk.tab.hidden', a, this.querySelector('#tab-' + this.currentActive));
        }
      } }, { key: 'activateTabFromLink', value: function activateTabFromLink(a) {
        a.preventDefault();var b = this.currentActive;this.hasActive && this.hideCurrent(), this.dispatchCustomEvent('tk.tab.show', a.target, this.querySelector('#tab-' + b)), a.target.setAttribute('active', ''), a.target.setAttribute('aria-selected', 'true'), a.target.setAttribute('tabindex', '0'), this.querySelector(a.target.hash).setAttribute('active', ''), this.querySelector(a.target.hash).removeAttribute('aria-hidden'), this.currentActive = a.target.hash.substring(1), this.dispatchCustomEvent('tk.tab.shown', a.target, this.querySelector('#tab-' + b)), this.saveState('#tab-' + a.target.hash.substring(1));
      } }, { key: 'showTab', value: function showTab(a) {
        var b = document.querySelector('#tab-' + a.id);b.click();
      } }, { key: 'show', value: function show(a) {
        a.click();
      } }, { key: 'keyBehaviour', value: function keyBehaviour(b) {
        var c = this.querySelector('#tab-' + this.currentActive),
            d = c.parentNode.previousElementSibling || c.parentNode.parentNode.lastElementChild,
            e = c.parentNode.nextElementSibling || c.parentNode.parentNode.firstElementChild;if (!(b.metaKey || b.altKey) && -1 !== this.tabs.indexOf('#' + document.activeElement.id)) switch (b.keyCode) {case a.ARROW_LEFT:case a.ARROW_UP:
            b.preventDefault(), b.stopPropagation(), d.querySelector('a').click(), d.querySelector('a').focus();break;case a.ARROW_RIGHT:case a.ARROW_DOWN:
            b.preventDefault(), b.stopPropagation(), e.querySelector('a').click(), e.querySelector('a').focus();break;default:}
      } }, { key: 'getStorageKey', value: function getStorageKey() {
        return window.location.href.toString().split(window.location.host)[1].replace(/&return=[a-zA-Z0-9%]+/, '').split('#')[0];
      } }, { key: 'saveState', value: function saveState(a) {
        var b = this.getStorageKey();sessionStorage.setItem(b, a);
      } }, { key: 'setTabState', value: function setTabState() {
        var a = this,
            b = this,
            c = this.tabsLinks;if (this.hasNested) {
          if (this.tabLinkHash.length && '' !== this.tabLinkHash[0]) {
            var d = this.tabLinkHash[0].substring(5),
                e = this.querySelector('' + d);if (e) {
              var f = this.findAncestorByTagNme(e, 'tk-tab'),
                  g = this.findAncestorByTagNme(f, 'tk-tab');if (g) {
                var h = this.findAncestorByTagNme(f, 'section');h && this.tabLinkHash.push('#tab-' + h.id);
              }
            }
          }c.forEach(function (c) {
            if (a.tabLinkHash.length) {
              var d = '#tab-' + c.id;-1 === a.tabLinkHash.indexOf(d) ? c.removeAttribute('active') : c.setAttribute('active', '');
            }c.parentNode === b && a.tabsLinks.push(c);
          });
        } else c.forEach(function (b) {
          if (a.tabLinkHash.length) {
            var c = '#tab-' + b.hash;-1 < a.tabLinkHash.indexOf(c) ? b.removeAttribute('active') : b.setAttribute('active', '');
          }
        }), this.tabsLinks = c;
      } }, { key: 'toTabs', value: function toTabs() {
        for (var a = this, b = 0, c = this.panels.length; b < c; ++b) {
          this.panels[b].parentNode.parentNode.parentNode === this && this.tabsLinks.push(this.panels[b]);
        }this.tabsLinks.length && this.tabsLinks.forEach(function (a) {
          self.appendChild(a);
        });
      } }, { key: 'toAccordion', value: function toAccordion() {
        var a = this;this.panels.length && this.panels.forEach(function (b) {
          var c = a.querySelector('a[aria-controls="' + b.id + '"]');c.parentNode.appendChild(b);
        });
      } }, { key: 'changeView', value: function changeView() {
        if (920 < window.outerWidth) {
          if ('tabs' === this.view) return;this.toTabs.bind(this), this.view = 'tabs';
        } else {
          if ('accordion' === this.view) return;this.toAccordion.bind(this), this.view = 'accordion';
        }
      } }, { key: 'activateUriHash', value: function activateUriHash() {
        var a = window.location.href.match(/#\S[^&]*/),
            b = this.querySelector(a[0]);if (b) {
          var c = this.findAncestorByTagNme(b, 'tk-tab'),
              d = this.findAncestorByTagNme(c, 'tk-tab');if (d) {
            var e = this.findAncestorByTagNme(c, 'section');d.showTab(e), this.show(b);
          } else this.showTab(b);
        }
      } }, { key: 'findAncestorByTagNme', value: function findAncestorByTagNme(a, b) {
        for (; (a = a.parentElement) && a.nodeName.toLowerCase() !== b;) {}return a;
      } }, { key: 'dispatchCustomEvent', value: function dispatchCustomEvent(a, b, c) {
        var d = new CustomEvent(a, { bubbles: !0, cancelable: !0 });c && (d.relatedTarget = c), b.dispatchEvent(d), b.removeEventListener(a, b);
      } }]), c;
  }(HTMLElement);customElements.define('tk-panels', b);
})();

},{}]},{},[1]);
