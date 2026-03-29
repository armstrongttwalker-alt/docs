document.addEventListener('DOMContentLoaded', function () {
  var sections = document.querySelectorAll('.flagos-section, .call-to-action');

  sections.forEach(function (section) {
    section.classList.add('scroll-hidden');
  });

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('scroll-visible');
        entry.target.classList.remove('scroll-hidden');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });

  sections.forEach(function (section) {
    observer.observe(section);
  });
});
