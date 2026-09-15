document.addEventListener('DOMContentLoaded', function () {
  var sections = document.querySelectorAll('.flagos-section, .call-to-action');

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('scroll-visible');
        entry.target.classList.remove('scroll-hidden');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.05,
    rootMargin: '0px 0px 0px 0px'
  });

  sections.forEach(function (section) {
    section.classList.add('scroll-hidden');
    observer.observe(section);
  });
});
