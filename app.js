const state = { groups: [], category: '全部', query: '' };

const els = {
  categories: document.querySelector('#categories'),
  categorySelect: document.querySelector('#categorySelect'),
  cards: document.querySelector('#cards'),
  heading: document.querySelector('#heading'),
  count: document.querySelector('#count'),
  mobileHint: document.querySelector('#mobileHint'),
  empty: document.querySelector('#empty'),
  search: document.querySelector('#search'),
  clear: document.querySelector('#clear'),
  gestureMenu: document.querySelector('#gestureMenu'),
};

function totalSites() {
  return state.groups.reduce((n, group) => n + group.sites.length, 0);
}

function renderCategories() {
  const all = [{ category: '全部', sites: Array(totalSites()) }, ...state.groups];
  els.categories.innerHTML = all.map(group => `<button class="category-button ${state.category === group.category ? 'active' : ''}" data-category="${escapeAttr(group.category)}" aria-current="${state.category === group.category ? 'true' : 'false'}"><span>${escapeHtml(group.category)}</span><span>${group.sites.length}</span></button>`).join('');
  els.categorySelect.innerHTML = all.map(group => `<option value="${escapeAttr(group.category)}">${escapeHtml(group.category)} · ${group.sites.length}</option>`).join('');
  els.categorySelect.value = state.category;
}

function currentSites() {
  let groups = state.groups.filter(group => state.category === '全部' || group.category === state.category);
  let sites = groups.flatMap(group => group.sites.map(site => ({ ...site, category: group.category })));
  const q = state.query.trim().toLowerCase();
  if (q) sites = sites.filter(site => `${site.name} ${site.desc} ${site.category}`.toLowerCase().includes(q));
  return sites;
}

function render() {
  const sites = currentSites();
  els.heading.textContent = state.query ? `搜索：${state.query}` : state.category === '全部' ? '收藏列表' : state.category;
  els.count.textContent = `${sites.length} 个入口`;
  els.mobileHint.textContent = sites.length > 24 ? '当前分类内容较多，建议用搜索框继续缩小范围。' : '';
  els.mobileHint.classList.toggle('show', sites.length > 24);
  const showCategory = state.category === '全部' || Boolean(state.query);
  els.cards.innerHTML = sites.map(site => `<a class="site-card" href="${escapeAttr(site.href)}" target="_blank" rel="noopener noreferrer"><span><span class="site-name">${escapeHtml(site.name)}</span><span class="site-desc">${escapeHtml(site.desc || '实用有趣的网站')}</span></span>${showCategory ? `<span class="site-category">${escapeHtml(site.category)}</span>` : ''}</a>`).join('');
  els.empty.classList.toggle('show', sites.length === 0);
  els.cards.style.display = sites.length ? 'grid' : 'none';
  renderCategories();
}

function chooseCategory(category) {
  state.category = category;
  state.query = '';
  els.search.value = '';
  els.clear.classList.remove('visible');
  render();
  window.scrollTo({ top: document.querySelector('.main-grid').offsetTop - 12, behavior: 'smooth' });
}

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[char]));
}

function escapeAttr(value) {
  return escapeHtml(value);
}

els.categories.addEventListener('click', event => {
  const button = event.target.closest('[data-category]');
  if (button) chooseCategory(button.dataset.category);
});

els.categorySelect.addEventListener('change', event => chooseCategory(event.target.value));

els.search.addEventListener('input', event => {
  state.query = event.target.value;
  state.category = '全部';
  els.clear.classList.toggle('visible', Boolean(state.query));
  render();
});

els.clear.addEventListener('click', () => {
  state.query = '';
  els.search.value = '';
  els.clear.classList.remove('visible');
  render();
  els.search.focus();
});

const gesture = {
  tracking: false,
  open: false,
  side: 'left',
  startX: 0,
  startY: 0,
  active: null,
  scrollY: 0,
};

function gestureCategories() {
  return ['全部', ...state.groups.map(group => group.category)];
}

// Edge gestures are intentionally captured early, because mobile browsers cancel
// pointer streams once the page begins scrolling. The menu then stays fixed until release.
function startGesture(event) {
  if (!matchMedia('(max-width:900px)').matches || state.groups.length === 0) return;
  const edge = 64;
  if (event.clientX > edge && event.clientX < window.innerWidth - edge) return;
  event.preventDefault();
  event.target?.setPointerCapture?.(event.pointerId);
  gesture.tracking = true;
  gesture.side = event.clientX < edge ? 'left' : 'right';
  gesture.startX = event.clientX;
  gesture.startY = event.clientY;
  gesture.active = null;
}

function openGestureMenu(x, y, side) {
  els.gestureMenu.innerHTML = gestureCategories().map(category => `<button class="gesture-item" type="button" data-category="${escapeAttr(category)}">${escapeHtml(category)}</button>`).join('');
  els.gestureMenu.classList.add('open');
  els.gestureMenu.setAttribute('aria-hidden', 'false');
  document.body.classList.add('gesture-lock');
  gesture.scrollY = window.scrollY;
  gesture.open = true;
  layoutGestureMenu(x, y, side);
  updateGestureTarget(x, y);
}

function layoutGestureMenu(x, y, side) {
  const items = [...els.gestureMenu.querySelectorAll('.gesture-item')];
  const centerX = Math.min(Math.max(x, 126), window.innerWidth - 126);
  const centerY = Math.min(Math.max(y, 132), window.innerHeight - 132);
  items.forEach((item, index) => {
    const ring = Math.floor(index / 8);
    const slot = index % 8;
    const angle = (-125 + slot * 32 + ring * 14) * Math.PI / 180;
    const radius = 82 + ring * 54;
    const itemX = centerX + (side === 'left' ? Math.cos(angle) * radius : -Math.cos(angle) * radius);
    const itemY = centerY + Math.sin(angle) * radius;
    item.style.left = `${Math.min(Math.max(itemX, 44), window.innerWidth - 44)}px`;
    item.style.top = `${Math.min(Math.max(itemY, 44), window.innerHeight - 44)}px`;
    item.classList.toggle('current', item.dataset.category === state.category);
  });
}

function closeGestureMenu(choose) {
  if (choose && gesture.active) chooseCategory(gesture.active.dataset.category);
  els.gestureMenu.classList.remove('open');
  els.gestureMenu.setAttribute('aria-hidden', 'true');
  els.gestureMenu.innerHTML = '';
  document.body.classList.remove('gesture-lock');
  gesture.tracking = false;
  gesture.open = false;
  gesture.active = null;
}

function updateGestureTarget(x, y) {
  const items = [...els.gestureMenu.querySelectorAll('.gesture-item')];
  let best = null;
  let bestDistance = Infinity;
  items.forEach(item => {
    const rect = item.getBoundingClientRect();
    const hit = x >= rect.left - 22 && x <= rect.right + 22 && y >= rect.top - 22 && y <= rect.bottom + 22;
    const distance = Math.hypot(x - (rect.left + rect.width / 2), y - (rect.top + rect.height / 2));
    if (hit && distance < bestDistance) {
      best = item;
      bestDistance = distance;
    }
  });
  if (best !== gesture.active) {
    gesture.active?.classList.remove('active');
    gesture.active = best;
    gesture.active?.classList.add('active');
  }
}

window.addEventListener('pointerdown', startGesture, { passive: false });
window.addEventListener('pointermove', event => {
  if (!gesture.tracking) return;
  event.preventDefault();
  if (gesture.open) window.scrollTo(0, gesture.scrollY);
  const dx = event.clientX - gesture.startX;
  const dy = event.clientY - gesture.startY;
  const inward = gesture.side === 'left' ? dx : -dx;
  if (!gesture.open && inward > 14 && dy > -18) openGestureMenu(event.clientX, event.clientY, gesture.side);
  if (gesture.open) updateGestureTarget(event.clientX, event.clientY);
}, { passive: false });
window.addEventListener('touchmove', event => {
  if (!gesture.tracking) return;
  event.preventDefault();
  const touch = event.touches[0];
  if (touch && gesture.open) updateGestureTarget(touch.clientX, touch.clientY);
}, { passive: false });
window.addEventListener('pointerup', () => gesture.open ? closeGestureMenu(true) : gesture.tracking = false);
window.addEventListener('pointercancel', () => {
  if (gesture.open) return;
  gesture.tracking = false;
});
window.addEventListener('touchend', () => {
  if (gesture.open) closeGestureMenu(true);
}, { passive: true });

fetch('./bookmarks.json')
  .then(response => {
    if (!response.ok) throw new Error('load failed');
    return response.json();
  })
  .then(data => {
    state.groups = data;
    render();
  })
  .catch(() => {
    els.heading.textContent = '暂时无法加载收藏';
    els.count.textContent = '请刷新页面重试';
    els.empty.classList.add('show');
    els.empty.querySelector('span').textContent = '收藏数据加载失败，请稍后刷新。';
  });
