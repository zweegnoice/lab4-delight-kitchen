document.addEventListener('DOMContentLoaded', () => {
  const selected = { soup: null, main: null, drink: null };
  const form = document.getElementById('orderForm');

  function updateOrder() {
    const hasSelection = Object.values(selected).some(v => v !== null);
    document.getElementById('nothing-selected').style.display = hasSelection ? 'none' : 'block';
    document.querySelectorAll('.order-category').forEach(el => el.style.display = hasSelection ? 'block' : 'none');

    ['soup', 'main', 'drink'].forEach(cat => {
      const dish = selected[cat];
      const p = document.getElementById(`selected-${cat}`);
      const input = document.getElementById(`${cat}-input`);
      if (dish) {
        p.textContent = `${dish.name} - ${dish.price} ₽`;
        input.value = dish.keyword;
      } else {
        p.textContent = cat === 'drink' ? 'Напиток не выбран' : 'Блюдо не выбрано';
        input.value = '';
      }
    });

    const total = Object.values(selected).reduce((sum, d) => sum + (d?.price || 0), 0);
    const totalEl = document.getElementById('total-price');
    totalEl.textContent = `Итоговая стоимость: ${total} ₽`;
    totalEl.style.display = total > 0 ? 'block' : 'none';
  }

  document.addEventListener('click', e => {
    if (e.target.tagName === 'BUTTON' && e.target.closest('.dish-item')) {
      const item = e.target.closest('.dish-item');
      const keyword = item.dataset.dish;
      const dish = dishes.find(d => d.keyword === keyword);
      if (dish) {
        selected[dish.category] = dish;
        document.querySelectorAll('.dish-item.selected').forEach(el => el.classList.remove('selected'));
        item.classList.add('selected');
        updateOrder();
      }
    }
  });

  form.addEventListener('reset', () => {
    setTimeout(() => {
      Object.keys(selected).forEach(k => selected[k] = null);
      document.querySelectorAll('.dish-item').forEach(el => el.classList.remove('selected'));
      updateOrder();
    }, 0);
  });

  updateOrder();
});