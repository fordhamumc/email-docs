var mxf = mxf || {};

// same functions as above
mxf.toggle = (function() {
  function setup() {
    let toggles = [...document.querySelectorAll('.toggle')];
    if (toggles.length) {
      for (let toggle of toggles) {
        let btn = document.createElement('BUTTON');
        btn.appendChild(document.createTextNode('Show Code'));
        btn.classList.add('toggle-btn','no-highlight');
        btn.addEventListener('click', toggleContent);
        toggle.parentElement.insertBefore(btn, toggle);
      }
    }
    function toggleContent(e) {
      e.preventDefault();
      e.target.classList.toggle('toggle-btn--active');
      e.target.nextElementSibling.classList.toggle('toggle--active');
    }
  }

  return {
    setup
  }
})();

mxf.toggle.setup();
