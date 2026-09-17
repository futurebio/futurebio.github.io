(() => {
  const prioritySuppliers = ['无锡金农', '青岛海大', '苏州奥氏', '联合宝莹'];
  const priorityKeywords = [
    '壳聚糖',
    '脱乙酰壳多糖',
    '愈创薁',
    '愈创木薁磺酸钠',
    '愈创蓝油汀',
    '薁磺酸钠'
  ];

  const isPriority = text => {
    const value = text || '';
    return prioritySuppliers.some(name => value.includes(name)) ||
      priorityKeywords.some(name => value.includes(name));
  };

  const appendBadge = (target, label = '★ 优势产品') => {
    if (!target || target.querySelector(':scope > .advantage-badge')) return;
    const badge = document.createElement('span');
    badge.className = 'advantage-badge';
    badge.textContent = label;
    target.appendChild(badge);
  };

  const markCard = (card, heading) => {
    if (!card || card.classList.contains('advantage-product')) return;
    card.classList.add('advantage-product');
    appendBadge(heading || card.querySelector('h2,h3,.pn,.sn'));
  };

  const markVisibleProducts = () => {
    document.querySelectorAll('.pcard').forEach(card => {
      if (isPriority(card.textContent)) markCard(card);
    });

    document.querySelectorAll('.sitem').forEach(card => {
      if (isPriority(card.textContent)) markCard(card, card.querySelector('.sn'));
    });

    const detailTitle = document.querySelector('#dTitle')?.textContent || '';
    document.querySelectorAll('.pitem').forEach(card => {
      if (isPriority(`${detailTitle} ${card.textContent}`)) {
        markCard(card, card.querySelector('.pn'));
      }
    });
  };

  const markChitosanTopic = () => {
    if (!location.pathname.includes('/chitosan/')) return;
    const hero = document.querySelector('.hero');
    const heading = hero?.querySelector('h1');
    if (!hero || !heading || hero.classList.contains('advantage-topic')) return;
    hero.classList.add('advantage-topic');
    const badge = document.createElement('span');
    badge.className = 'advantage-badge advantage-topic-badge';
    badge.textContent = '★ 优势产品专题';
    heading.before(badge);
  };

  const refresh = () => {
    markVisibleProducts();
    markChitosanTopic();
  };

  let scheduled = false;
  const scheduleRefresh = () => {
    if (scheduled) return;
    scheduled = true;
    requestAnimationFrame(() => {
      scheduled = false;
      refresh();
    });
  };

  refresh();
  new MutationObserver(scheduleRefresh).observe(document.body, {
    childList: true,
    subtree: true
  });
})();
