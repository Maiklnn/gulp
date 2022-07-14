// отключение scroll
function disabledScroll() {
	document.body.classList.toggle('disabled-scroll')
}


// ставим атрибут data-scroll=".company" элементу от которого скоролим в значении указываем id или класс элемнта до которого скролить
// вызываем функцию при клике scrollElement(e);
const scrollElement = (e) => {
	element = e.target;
	if(element.dataset.scroll) {
		e.preventDefault()
		let scrollBlock = document.querySelector(`${element.dataset.scroll}`); // получаем блок до которого скролим
		let mobileMenu = document.querySelector(`.header__nav.active`); // получаем мобильное меню
		if(mobileMenu) {
			let mobileMenuBtn = document.querySelector(`.header__menu-btn.active`); // получаем мобильное меню
			mobileMenuBtn.classList.remove('active')
			mobileMenu.classList.remove('active') // если активное удаляем
		}
		scrollBlock.scrollIntoView({
			behavior: 'smooth',
			block: 'start'
		})

	}
}


// появление при scroll
const scroll = () => {
	// нижняя кнопка scroll
	document.body.insertAdjacentHTML('beforeend', '<div class="scroll-btn" data-scroll = "body"></div>')
	let scrollBtn = document.querySelector('.scroll-btn');
	// header
	let scrollHeader = document.querySelector('*[data-header]');


	window.onscroll = function() {
		let scrollTop = document.documentElement.scrollTop || document.body.scrollTop;

		if (scrollTop > 10) scrollHeader.classList.add("header-scroll"); // скрываем изначальный header

		if (scrollTop > 300) {
			scrollHeader.classList.add("header-scroll--show");
			scrollBtn.classList.add("scroll-btn--show");
		} else {
			scrollHeader.classList.remove("header-scroll--show");
			scrollBtn.classList.remove("scroll-btn--show");
		}
	}
}

scroll()

