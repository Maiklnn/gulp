@@include('files/sliders.js')


const sliderProjects = document.querySelector('.advantages-list-slider');

let mySwiper = new Swiper(sliderProjects, {
	spaceBetween: 30,  // растояние
//	slidesPerView: 4,// кол-во слайдов
	slideToClickedSlide: true,
	// loop: true,
	// centeredSlides: true, // ативный слайд по центру
	autoplay: {
		delay: 1000,
	},
	navigation: {
		nextEl: '.advantages-list-slider-button-next',
		prevEl: '.advantages-list-slider-button-prev',
	},
	pagination: {
		type: 'bullets',
		// type: 'fraction',
		el: '.advantages-list-slider-pagination',
		clickable: true,
	},
	breakpoints: {
		1200: {
			slidesPerView: 4,
		},
		800: {
			slidesPerView: 3,
		},
		450: {
			slidesPerView: 2,
		},
		200: {
			slidesPerView: 1,
		},
	}
})
