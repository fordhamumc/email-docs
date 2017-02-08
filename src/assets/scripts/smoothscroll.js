// current scroll position
function scroller (){
  "use strict";

  function location () {
    return window.scrollY || window.pageYOffset
  }

  // element offset

  function top (element) {
    return element.getBoundingClientRect().top + start
  }

  // scroll generator
  var duration = 300;
  var start = 0;
  var distance = 1000;
  function *step(timeCurrent) {
    var timeStart = timeCurrent;
    while (timeCurrent < 300) {
      yield timeCurrent + 20;
    }
  }
}


function linearEasing(t, b, c, d) {
  return c*t/d + b;
}

function *step({
  duration = 300,
  start = 10,
  end = 1000,
  easing = linearEasing
} = {}) {
  var distance = end - start;
  var timeStart;
  function loop(timeCurrent){
    if (!timeStart) {
      timeStart = timeCurrent
    }
    var timeElapsed = timeCurrent - timeStart;
  }


  if (timeElapsed < duration) {

  }

  while(timeElapsed < duration) {
    yield easing(timeElapsed, start, distance, duration);
  }
}

var timeStart,
    position = step();

function loop (timeCurrent) {
  if (!timeStart) {
    timeStart = timeCurrent
  }
  var timeElapsed = timeCurrent - timeStart;
  var next = position.next(timeElapsed);
  console.log(next.value);

  if (!next.done) window.requestAnimationFrame(loop);
}


while(timeCurrent - timeStart < duration) {

next = easing(timeElapsed, start, distance, duration)






function jumper() {
  // private variable cache
  // no variables are created during a jump, preventing memory leaks

  let element         // element to scroll to                   (node)

  let start           // where scroll starts                    (px)
  let stop            // where scroll stops                     (px)

  let offset          // adjustment from the stop position      (px)
  let easing          // easing function                        (function)
  let a11y            // accessibility support flag             (boolean)

  let distance        // distance of scroll                     (px)
  let duration        // scroll duration                        (ms)

  let timeStart       // time scroll started                    (ms)
  let timeElapsed     // time spent scrolling thus far          (ms)

  let next            // next scroll position                   (px)

  let callback        // to call when done scrolling            (function)

  // scroll position helper

  function location () {
    return window.scrollY || window.pageYOffset
  }

  // element offset helper

  function top (element) {
    return element.getBoundingClientRect().top + start
  }

  // rAF loop helper

  function loop (timeCurrent) {
    // store time scroll started, if not started already
    if (!timeStart) {
      timeStart = timeCurrent
    }

    // determine time spent scrolling so far
    timeElapsed = timeCurrent - timeStart

    // calculate next scroll position
    next = easing(timeElapsed, start, distance, duration)

    // scroll to it
    window.scrollTo(0, next)

    // check progress
    timeElapsed < duration
      ? window.requestAnimationFrame(loop)       // continue scroll loop
      : done()                                   // scrolling is done
  }

  // scroll finished helper

  function done () {
    // account for rAF time rounding inaccuracies
    window.scrollTo(0, start + distance)

    // if scrolling to an element, and accessibility is enabled
    if (element && a11y) {
      // add tabindex indicating programmatic focus
      element.setAttribute('tabindex', '-1')

      // focus the element
      element.focus()
    }

    // if it exists, fire the callback
    if (typeof callback === 'function') {
      callback()
    }

    // reset time for next jump
    timeStart = false
  }

  // API

  function jump (target, {
    duration = 300,
    offset = 0,
    easing = function(){},
    a11y = false
  } = {}) {

    // cache starting position
    // resolve target
    switch (typeof target) {
      // scroll from current position
      case 'number':
        element = undefined           // no element to scroll to
        a11y = false                  // make sure accessibility is off
        stop = start + target
        break

      // scroll to element (node)
      // bounding rect is relative to the viewport
      case 'object':
        element = target
        stop = top(element)
        break

      // scroll to element (selector)
      // bounding rect is relative to the viewport
      case 'string':
        element = document.querySelector(target)
        stop = top(element)
        break
    }

    // resolve scroll distance, accounting for offset
    distance = stop - start + offset

    // resolve duration
    switch (typeof duration) {
      // number in ms
      case 'number':
        duration = duration
        break

      // function passed the distance of the scroll
      case 'function':
        duration = duration(distance)
        break
    }

    // start the loop
    window.requestAnimationFrame(loop)
  }

  // expose only the jump method
  return jump


  var inPageLinks = [ ...document.querySelectorAll('a') ].filter(isInPageLink);
  for (let a of inPageLinks) {
    a.addEventListener('click', onClick, false);
  }


  function onClick(e) {
    e.stopPropagation();
    e.preventDefault();

    jump(e.target.hash);
  }

  function isInPageLink(n) {
    return n.tagName.toLowerCase() === 'a'
      && n.hash.length > 0
      && stripHash(n.href) === stripHash(location.href);
  }

  function stripHash(url) {
    var hashPosition = url.lastIndexOf('#');
    if (hashPosition == -1) return url;
    return url.slice(0, hashPosition);
  }

}

