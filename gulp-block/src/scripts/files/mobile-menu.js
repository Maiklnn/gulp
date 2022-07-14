document.addEventListener('click', (e) => {
	let element = e.target
	let burger = element.closest('.burger')
	if(burger) {
		burger.classList.toggle('open')
		menu = document.querySelector('.nav')
		menu.classList.toggle('open');
	}
	let hasChildren = element.parentElement

	if(hasChildren.classList.contains('menu-item-has-children')) {
		e.preventDefault();

		let mobileBack = hasChildren.querySelector('.mobile-back')
		if (!mobileBack) {
			let ul = hasChildren.querySelector('ul')
			ul.insertAdjacentHTML('afterbegin', '<li class="mobile-back">Назад</li>')
		}

		hasChildren.classList.add('transformation');
	}

	if (e.target.closest('.mobile-back')) {
		e.preventDefault();
		e.target.closest('.menu-item-has-children').classList.remove('transformation');
	}

	const $detail = element.closest('.detail')
	if($detail) {
		e.preventDefault()
		if($detail.classList.contains('open')) {
			$detail.classList.remove('open')
		} else {
			const $accordions = document.querySelectorAll('.detail')
			for(item of $accordions) {
				item.classList.remove('open')
			}
			$detail.classList.add('open')
		}
	}


	if (element.classList.contains('select__item')) {
		const $select = element.closest('.select')
		$select.classList.remove('open')
		const $selectInput = $select.querySelector('.select__input')
		$selectInput.textContent = element.textContent
	}

})
