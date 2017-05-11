'use strict';

// http://paulirish.com/2011/requestanimationframe-for-smart-animating/
// http://my.opera.com/emoller/blog/2011/12/20/requestanimationframe-for-smart-er-animating

// requestAnimationFrame polyfill by Erik Möller. fixes from Paul Irish and Tino Zijdel

// MIT license

(function () {
    var lastTime = 0;
    var vendors = ['ms', 'moz', 'webkit', 'o'];
    for (var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
        window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame'];
        window.cancelAnimationFrame = window[vendors[x] + 'CancelAnimationFrame'] || window[vendors[x] + 'CancelRequestAnimationFrame'];
    }

    if (!window.requestAnimationFrame) window.requestAnimationFrame = function (callback, element) {
        var currTime = new Date().getTime();
        var timeToCall = Math.max(0, 16 - (currTime - lastTime));
        var id = window.setTimeout(function () {
            callback(currTime + timeToCall);
        }, timeToCall);
        lastTime = currTime + timeToCall;
        return id;
    };

    if (!window.cancelAnimationFrame) window.cancelAnimationFrame = function (id) {
        clearTimeout(id);
    };
})();
'use strict';

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

initSmoothScrolling();

function initSmoothScrolling() {
  if ('scrollBehavior' in document.documentElement.style) return;

  var duration = 300,
      pageUrl = location.hash ? stripHash(location.href) : location.href;

  addClickHandler();

  function addClickHandler() {
    var links = [].concat(_toConsumableArray(document.querySelectorAll('a'))).filter(isInPageLink);
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = links[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var a = _step.value;

        a.addEventListener('click', onClick, false);
      }
    } catch (err) {
      _didIteratorError = true;
      _iteratorError = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion && _iterator.return) {
          _iterator.return();
        }
      } finally {
        if (_didIteratorError) {
          throw _iteratorError;
        }
      }
    }

    function onClick(e) {
      e.stopPropagation();
      e.preventDefault();
      var hash = e.target.hash;

      jump(hash, {
        duration: duration,
        offset: -10,
        callback: function callback() {
          setFocus(hash);
          history.pushState(null, null, hash);
        }
      });
    }
  }

  function isInPageLink(n) {
    return n.tagName.toLowerCase() === 'a' && n.hash.length > 0 && stripHash(n.href) === pageUrl;
  }

  function stripHash(url) {
    return url.slice(0, url.lastIndexOf('#'));
  }

  function setFocus(hash) {
    var element = document.getElementById(hash.substring(1));

    if (element) {
      if (!/^(?:a|select|input|button|textarea)$/i.test(element.tagName)) {
        element.tabIndex = -1;
      }

      element.focus();
    }
  }
}

function jump(target, options) {
  var start = window.pageYOffset,
      opt = {
    duration: options.duration,
    offset: options.offset || 0,
    callback: options.callback,
    easing: options.easing || easeInOutQuad
  },
      distance = typeof target === 'string' ? opt.offset + document.querySelector(target).getBoundingClientRect().top : target,
      duration = typeof opt.duration === 'function' ? opt.duration(distance) : opt.duration,
      timeStart,
      timeElapsed;

  if (distance < 0) {
    distance -= 70;
  }

  requestAnimationFrame(function (time) {
    timeStart = time;
    loop(time);
  });

  function loop(time) {
    timeElapsed = time - timeStart;

    window.scrollTo(0, opt.easing(timeElapsed, start, distance, duration));

    if (timeElapsed < duration) requestAnimationFrame(loop);else end();
  }

  function end() {
    window.scrollTo(0, start + distance);

    if (typeof opt.callback === 'function') opt.callback();
  }

  // Robert Penner's easeInOutQuad - http://robertpenner.com/easing/
  function easeInOutQuad(t, b, c, d) {
    t /= d / 2;
    if (t < 1) return c / 2 * t * t + b;
    t--;
    return -c / 2 * (t * (t - 2) - 1) + b;
  }
}
"use strict";

(function () {

  "use strict";

  var id = "headerbar",
      originalObj = document.getElementById(id),
      lastScrollTop = -1,
      height,
      cloneObj,
      minDistance;

  var _cloneObj = function _cloneObj(obj) {
    var cloneObj = obj.cloneNode(true);
    cloneObj.id = obj.id + "_clone";
    cloneObj.classList.add(cloneObj.id);
    obj.parentNode.insertBefore(cloneObj, obj);
    return cloneObj;
  };

  var _setVars = function _setVars() {
    height = cloneObj.offsetHeight;
    minDistance = cloneObj.offsetTop + height;
  };

  var _redrawLoop = function _redrawLoop() {
    var pageY = window.pageYOffset;

    if (lastScrollTop !== pageY) {

      var offset = window.scrollY,
          travelledMin = minDistance - offset <= 0,
          isDirectionUp = offset < lastScrollTop;

      if (travelledMin) {
        if (isDirectionUp) {
          originalObj.style.transform = "translateY(0)";
        } else {
          originalObj.style.transform = "translateY(" + -height + "px)";
        }
      }

      lastScrollTop = pageY;
    }

    requestAnimationFrame(_redrawLoop);
  };

  if (originalObj) {

    cloneObj = _cloneObj(originalObj);
    cloneObj.style.visibility = "hidden";
    originalObj.classList.add("nav_fixed");

    _setVars();
    _redrawLoop();
    window.addEventListener("resize", _setVars, false);
  }
})();
//# sourceMappingURL=index.js.map
