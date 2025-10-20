// Seleção de elementos
let nextButton = document.getElementById('next');
let prevButton = document.getElementById('prev');
let carousel = document.querySelector('.carousel');
let listHTML = document.querySelector('.carousel .list');
let seeMoreButtons = document.querySelectorAll('.seeMore');
let backButton = document.getElementById('back');

// Inicialmente esconde o botão "See All"
backButton.style.display = 'none';

// Controle de clique para evitar múltiplos cliques rápidos
let unAcceppClick;

// Função para mostrar o próximo ou anterior item do carrossel
const showSlider = (type) => {
  // Desativa os botões temporariamente
  nextButton.style.pointerEvents = 'none';
  prevButton.style.pointerEvents = 'none';

  // Remove classes de animação anteriores
  carousel.classList.remove('next', 'prev');

  // Seleciona os itens do carrossel
  let items = document.querySelectorAll('.carousel .list .item');

  // Move o item conforme o tipo
  if (type === 'next') {
    listHTML.appendChild(items[0]); // Move o primeiro para o final
    carousel.classList.add('next');
  } else {
    listHTML.prepend(items[items.length - 1]); // Move o último para o início
    carousel.classList.add('prev');
  }

  // Reativa os botões após 2 segundos
  clearTimeout(unAcceppClick);
  unAcceppClick = setTimeout(() => {
    nextButton.style.pointerEvents = 'auto';
    prevButton.style.pointerEvents = 'auto';
  }, 2000);
};

// Eventos de clique nos botões de navegação
nextButton.onclick = function () {
  showSlider('next');
};
prevButton.onclick = function () {
  showSlider('prev');
};

// Evento de clique nos botões "SAIBA MAIS"
seeMoreButtons.forEach((button) => {
  button.onclick = function () {
    carousel.classList.remove('next', 'prev');
    carousel.classList.add('showDetail');
    backButton.style.display = 'inline-block'; // Mostra o botão "See All"
  };
});

// Evento de clique no botão "See All"
backButton.onclick = function () {
  carousel.classList.remove('showDetail');
  backButton.style.display = 'none'; // Esconde o botão "See All"
};

function toggleMenu() {
    const sidebar = document.getElementById('sidebar');
    if (sidebar.style.right === '0px') {
        sidebar.style.right = '-250px'; // Esconde o menu
    } else {
        sidebar.style.right = '0px'; // Mostra o menu
    }
}