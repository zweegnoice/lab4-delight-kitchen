document.addEventListener('DOMContentLoaded', () => {
  const containers = {
    soup: document.querySelector('#soups .dishes-grid'),
    main: document.querySelector('#mains .dishes-grid'),
    drink: document.querySelector('#drinks .dishes-grid')
  };

  const sorted = [...dishes].sort((a, b) => a.name.localeCompare(b.name, 'ru'));

  sorted.forEach(dish => {
    const div = document.createElement('div');
    div.className = 'dish-item';
    div.dataset.dish = dish.keyword;
    div.innerHTML = `
      <img src="${dish.image}" alt="${dish.name}">
      <p class="dish-name">${dish.name}</p>
      <p class="dish-weight">${dish.count}</p>
      <p class="dish-price">${dish.price} ₽</p>
      <button type="button">Добавить</button>
    `;
    containers[dish.category].appendChild(div);
  });
});