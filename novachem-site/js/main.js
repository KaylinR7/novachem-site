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
  var searchInput = document.querySelector('.catalogue-search');
  var resultCount = document.querySelector('.result-count');
  if (chips.length && cards.length) {
    var updateResultCount = function () {
      if (!resultCount) return;
      var svg = resultCount.querySelector('svg');
      var svgHtml = svg ? svg.outerHTML : '';
      var visible = Array.prototype.slice.call(cards).filter(function (c) { return c.style.display !== 'none'; }).length;
      resultCount.innerHTML = svgHtml + ' ' + visible + ' Products';
    };

    var updateVisibleCards = function () {
      var activeChip = document.querySelector('.filter-chip.active');
      var activeFilter = activeChip ? activeChip.getAttribute('data-filter') : 'all';
      var query = searchInput ? searchInput.value.trim().toLowerCase() : '';
      cards.forEach(function (card) {
        var category = card.getAttribute('data-category');
        var name = card.querySelector('.product-name').textContent.toLowerCase();
        var sku = card.querySelector('.product-sku').textContent.toLowerCase();
        var desc = card.querySelector('.product-desc').textContent.toLowerCase();
        var matchesCategory = (activeFilter === 'all' || category === activeFilter);
        var matchesSearch = (query === '' || name.indexOf(query) !== -1 || sku.indexOf(query) !== -1 || desc.indexOf(query) !== -1);
        card.style.display = (matchesCategory && matchesSearch) ? '' : 'none';
      });
      updateResultCount();
    };

    var params = new URLSearchParams(window.location.search);
    var requestedFilter = params.get('cat');
    if (requestedFilter) {
      var matchingChip = Array.prototype.slice.call(chips).find(function (chip) {
        return chip.getAttribute('data-filter') === requestedFilter;
      });
      if (matchingChip) {
        chips.forEach(function (chip) { chip.classList.remove('active'); });
        matchingChip.classList.add('active');
      }
    }

    chips.forEach(function (chip) {
      chip.addEventListener('click', function () {
        chips.forEach(function (c) { c.classList.remove('active'); });
        chip.classList.add('active');
        updateVisibleCards();
      });
    });

    if (searchInput) {
      searchInput.addEventListener('input', function () {
        updateVisibleCards();
      });
    }
    // Initialize visibility/count on load
    updateVisibleCards();
  }

  // Catalogue sort
  var sortSelect = document.querySelector('.sort-select');
  var grid = document.querySelector('.product-grid');
  if (sortSelect && grid) {
    var sortProducts = function (direction) {
      var items = Array.prototype.slice.call(grid.children).filter(function (item) {
        return item.classList && item.classList.contains('product-card');
      });
      items.sort(function (a, b) {
        var nameA = a.querySelector('.product-name').textContent.trim();
        var nameB = b.querySelector('.product-name').textContent.trim();
        return nameA.localeCompare(nameB) * direction;
      });
      items.forEach(function (item) { grid.appendChild(item); });
    };

    sortSelect.addEventListener('change', function () {
      var direction = sortSelect.value === 'desc' ? -1 : 1;
      sortProducts(direction);
    });

    sortSelect.value = 'asc';
    sortProducts(1);
  }

  // Modal image gallery for products with multiple images
  var modalImage = document.getElementById('modalImage');
  var modalPrevBtn = document.getElementById('modalPrevBtn');
  var modalNextBtn = document.getElementById('modalNextBtn');
  var modalImageNav = document.getElementById('modalImageNav');
  var modalImageIndicator = document.getElementById('modalImageIndicator');
  var modalGalleryItems = [];
  var modalGalleryIndex = 0;

  function parseGalleryItems(card) {
    var items = [];
    var sources = card.getAttribute('data-gallery-images');
    var alts = card.getAttribute('data-gallery-alts');

    if (sources) {
      var sourceList = sources.split(',').map(function (value) { return value.trim(); }).filter(Boolean);
      var altList = alts ? alts.split(',').map(function (value) { return value.trim(); }).filter(Boolean) : [];
      sourceList.forEach(function (src, index) {
        items.push({
          src: src,
          alt: altList[index] || ''
        });
      });
    }

    if (!items.length) {
      var previewImg = card.querySelector('.media-block img');
      if (previewImg) {
        items.push({
          src: previewImg.getAttribute('src') || '',
          alt: previewImg.getAttribute('alt') || ''
        });
      }
    }

    return items;
  }

  function updateModalImage(index) {
    if (!modalImage) return;
    if (!modalGalleryItems.length) {
      modalGalleryItems = [{ src: '', alt: '' }];
    }

    modalGalleryIndex = (index + modalGalleryItems.length) % modalGalleryItems.length;
    var currentItem = modalGalleryItems[modalGalleryIndex];
    modalImage.src = currentItem.src;
    modalImage.alt = currentItem.alt;

    if (modalImageIndicator) {
      modalImageIndicator.textContent = (modalGalleryIndex + 1) + ' / ' + modalGalleryItems.length;
    }

    if (modalImageNav) {
      modalImageNav.hidden = modalGalleryItems.length < 2;
    }
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

  // Product detail modal
  var overlay    = document.getElementById('productModalOverlay');
  var closeBtn   = document.getElementById('modalCloseBtn');
  var productCards = document.querySelectorAll('.product-card');

  if (overlay && productCards.length) {
    var tagColorMap = {
      cleaners:  'var(--primary-strong)',
      industrial:'var(--tertiary-steel)',
      hygiene:   '#3d4d63',
      automotive:'#0f766e',
      laundry:   '#7c3aed',
      equipment: '#475569',
      specialty: 'var(--charcoal-ink)'
    };

    function openModal(card) {
      var img       = card.querySelector('img');
      var name      = card.querySelector('.product-name').textContent;
      var sku       = card.querySelector('.product-sku').textContent;
      var shortDesc = card.querySelector('.product-desc').textContent;
      var sizes     = card.querySelector('.product-sizes').textContent.trim();
      var fullDesc  = card.getAttribute('data-full-desc') || '';
      var uses      = card.getAttribute('data-uses') || '';
      var category  = card.getAttribute('data-category') || '';
      var catTag    = card.querySelector('.product-category-tag');

      modalGalleryItems = parseGalleryItems(card);
      updateModalImage(0);
      document.getElementById('modalProductName').textContent = name;
      document.getElementById('modalSku').textContent = sku;
      document.getElementById('modalSizes').textContent = sizes;
      var modalFullDesc = document.getElementById('modalFullDesc');
      var modalShowMoreBtn = document.getElementById('modalShowMoreBtn');
      modalFullDesc.innerHTML = fullDesc;
      modalFullDesc.classList.remove('is-expanded');
      if (modalShowMoreBtn) {
        modalShowMoreBtn.textContent = 'Show more';
      }
      document.getElementById('modalShortDesc').textContent = shortDesc;

      var modalCatTag = document.getElementById('modalCategoryTag');
      modalCatTag.textContent = catTag ? catTag.textContent : category;
      modalCatTag.style.background = tagColorMap[category] || '#444';

      var usesTags = document.getElementById('modalUsesTags');
      usesTags.innerHTML = '';
      if (uses) {
        uses.split('|').forEach(function(u) {
          var span = document.createElement('span');
          span.className = 'modal-use-tag';
          span.textContent = u.trim();
          usesTags.appendChild(span);
        });
      }

      overlay.classList.add('open');
      document.body.style.overflow = 'hidden';
    }

    function closeModal() {
      overlay.classList.remove('open');
      document.body.style.overflow = '';
      modalGalleryItems = [];
      modalGalleryIndex = 0;
      if (modalImage) {
        modalImage.src = '';
        modalImage.alt = '';
      }
      var modalFullDesc = document.getElementById('modalFullDesc');
      var modalShowMoreBtn = document.getElementById('modalShowMoreBtn');
      if (modalFullDesc) {
        modalFullDesc.classList.remove('is-expanded');
      }
      if (modalShowMoreBtn) {
        modalShowMoreBtn.textContent = 'Show more';
      }
    }

    var modalShowMoreBtn = document.getElementById('modalShowMoreBtn');
    if (modalShowMoreBtn) {
      modalShowMoreBtn.addEventListener('click', function () {
        var modalFullDesc = document.getElementById('modalFullDesc');
        if (!modalFullDesc) return;
        var isExpanded = modalFullDesc.classList.toggle('is-expanded');
        modalShowMoreBtn.textContent = isExpanded ? 'Show less' : 'Show more';
      });
    }

    if (modalPrevBtn) {
      modalPrevBtn.addEventListener('click', function () {
        updateModalImage(modalGalleryIndex - 1);
      });
    }

    if (modalNextBtn) {
      modalNextBtn.addEventListener('click', function () {
        updateModalImage(modalGalleryIndex + 1);
      });
    }

    productCards.forEach(function(card) {
      card.addEventListener('click', function() { openModal(card); });
    });

    closeBtn.addEventListener('click', closeModal);

    overlay.addEventListener('click', function(e) {
      if (e.target === overlay) closeModal();
    });

    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape') closeModal();
    });
  }
});
