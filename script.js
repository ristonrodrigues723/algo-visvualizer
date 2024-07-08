// Inside your script.js file
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});


// progress
// Add the class to elements when they come into view
function addFadeInClass() {
    var elements = document.querySelectorAll('.bar .level');
    elements.forEach(function (elem) {
      if (!elem.classList.contains('fade-in-element')) {
        var rect = elem.getBoundingClientRect();
        if (rect.top < window.innerHeight) {
          elem.classList.add('fade-in-element');
        }
      }
    });
  }
  
  // Capture scroll events
  window.addEventListener('scroll', addFadeInClass);
  