var StickyNav = (function () {

  "use strict";

  var id = "headerbar",
    originalObj = document.getElementById(id),
    lastScrollTop = -1,
    height,
    cloneObj,
    minDistance;

  var _cloneObj = function (obj) {
    var cloneObj = obj.cloneNode(true);
    cloneObj.id = obj.id + "_clone";
    cloneObj.classList.add(cloneObj.id);
    obj.parentNode.insertBefore(cloneObj, obj);
    return cloneObj;
  };

  var _setVars = function () {
    height = cloneObj.offsetHeight;
    minDistance = cloneObj.offsetTop + height;
  };

  var _redrawLoop = function () {
    var pageY = window.pageYOffset;

    if (lastScrollTop !== pageY) {

      var offset = window.scrollY,
        travelledMin = (minDistance - offset) <= 0,
        isDirectionUp = offset < lastScrollTop;

      if (travelledMin) {
        if (isDirectionUp) {
          originalObj.style.transform = "translateY(0)";
        } else {
          originalObj.style.transform = `translateY(${-height}px)`;
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

}());
