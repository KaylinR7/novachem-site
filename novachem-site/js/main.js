// NovaChem — shared site behavior

document.addEventListener('DOMContentLoaded', function () {
  // Mobile nav toggle
  var toggle = document.querySelector('.nav-toggle');
  var mobileNav = document.querySelector('.mobile-nav');
  if (toggle && mobileNav) {
    toggle.addEventListener('click', function () {
      mobileNav.classList.toggle('open');
    });
  }

  // Catalogue filter chips
  var chips = document.querySelectorAll('.filter-chip');
  var cards = document.querySelectorAll('.product-card');
  if (chips.length && cards.length) {
    chips.forEach(function (chip) {
      chip.addEventListener('click', function () {
        chips.forEach(function (c) { c.classList.remove('active'); });
        chip.classList.add('active');
        var filter = chip.getAttribute('data-filter');
        cards.forEach(function (card) {
          var category = card.getAttribute('data-category');
          card.style.display = (filter === 'all' || category === filter) ? '' : 'none';
        });
      });
    });
  }

  // Catalogue sort
  var sortSelect = document.querySelector('.sort-select');
  var grid = document.querySelector('.product-grid');
  if (sortSelect && grid) {
    sortSelect.addEventListener('change', function () {
      var items = Array.prototype.slice.call(grid.children);
      var direction = sortSelect.value === 'desc' ? -1 : 1;
      items.sort(function (a, b) {
        var nameA = a.querySelector('.product-name').textContent.trim();
        var nameB = b.querySelector('.product-name').textContent.trim();
        return nameA.localeCompare(nameB) * direction;
      });
      items.forEach(function (item) { grid.appendChild(item); });
    });
  }

  // Star input on the review form
  var starButtons = document.querySelectorAll('.star-input button');
  if (starButtons.length) {
    starButtons.forEach(function (btn, index) {
      btn.addEventListener('click', function () {
        starButtons.forEach(function (b, i) {
          b.classList.toggle('active', i <= index);
        });
      });
    });
  }

  // Review form submit (no backend — static demo)
  var reviewForm = document.querySelector('.review-form');
  if (reviewForm) {
    reviewForm.addEventListener('submit', function (e) {
      e.preventDefault();
      var btn = reviewForm.querySelector('button[type="submit"]');
      var original = btn.textContent;
      btn.textContent = 'Thank you — review submitted';
      setTimeout(function () { btn.textContent = original; }, 2500);
      reviewForm.reset();
      starButtons.forEach(function (b) { b.classList.remove('active'); });
    });
  }
});
