"use strict";
import i18Obj from './translate.js';

let language = 'en';
let theme = 'dark';
const burger = document.querySelector('.header__burger');
const menu = document.querySelector('.header__menu');
const bodyHidden = document.body;

burger.addEventListener("click", function () {
	burger.classList.toggle("is-active");
	menu.classList.toggle("open");
	bodyHidden.classList.toggle("menu-opened");
});


menu.addEventListener("click", function (event) {
	if (!event.target.closest('.menu__link')) {
		burger.classList.remove("is-active");
		menu.classList.remove("open");
		bodyHidden.classList.remove("menu-opened");
	}
});

document.addEventListener("click", function (event) {
	if (!event.target.closest('.header__burger')) {
		burger.classList.remove("is-active");
		menu.classList.remove("open");
		bodyHidden.classList.remove("menu-opened");
	}
});




const portfolioImages = document.querySelectorAll('.portfolio-image');
const portfolioBtns = document.querySelector('.portfolio__buttons');
const portfolioAllBtns = document.querySelectorAll('.portfolio__button');

portfolioBtns.addEventListener('click', changeImage);

function preloadImages() {
	const seasons = ['winter', 'spring', 'summer', 'autumn'];
	seasons.forEach((path) => {
		for (let i = 1; i <= 6; i++) {
			const img = new Image();
			img.src = `./img/${path}/${i}.jpg`;
		}
	});
}
preloadImages();

function changeImage(event) {
	if (event.target.classList.contains('portfolio__button')) {
		portfolioImages.forEach((img, index) => {
			img.src = `./img/${event.target.dataset.season}/${index + 1}.jpg`
			img.classList.add("animation");
			img.addEventListener('animationend', () => {
				portfolioImages.forEach((img) => img.classList.remove("animation"));;
			});

		});
		portfolioAllBtns.forEach((btn) => btn.classList.remove('_btn'));
		event.target.classList.add("_btn");
	}
}

const languageBlock = document.querySelector('.lang')

languageBlock.addEventListener('click', changelanguage);

function changelanguage(event) {
	if (event.target.dataset.lang) {
		language = event.target.dataset.lang;
		translate(event.target.dataset.lang);
		document.querySelector('.lang__item_active').classList.remove("lang__item_active")
		event.target.classList.add("lang__item_active");
		document.getElementsByTagName("html")[0].setAttribute('lang', 'ru')
	}
}

function translate(lang) {
	const textPage = document.querySelectorAll('[data-i18]');
	textPage.forEach((item) => {
		item.textContent = i18Obj[lang][item.dataset.i18];

	})
	language = lang;
	document.querySelector(`[data-lang='ru']`).classList.remove("lang__item_active");
	document.querySelector(`[data-lang='en']`).classList.remove("lang__item_active");
	const activeLang = document.querySelector(`[data-lang=${lang}]`);
	activeLang.classList.add("lang__item_active");

}


const switchTheme = document.querySelector('.hero__light-theme');
const arrListLightTheme = [
	'body',
	'page',
	'footer',
];
switchTheme.addEventListener('click', changeTheme);
function changeTheme() {
	arrListLightTheme.forEach((item) => {
		document.querySelector(`.${item}`).classList.toggle('light-theme');
	});
	const lightImg = document.querySelectorAll('[data-light]');
	lightImg.forEach((img) => {
		if (theme == 'dark') {
			img.src = `./img/${img.dataset.light}.jpg`;
		} else {
			img.src = `./img/${img.dataset.dark}.jpg`;
		}
	})
	theme == 'light' ? theme = 'dark' : theme = 'light';
}


function setLocalStorage() {
	localStorage.setItem('language', language);
	localStorage.setItem('theme', theme);
}
window.addEventListener('beforeunload', setLocalStorage)

function getLocalStorage() {
	if (localStorage.getItem('language')) {
		let language = localStorage.getItem('language');
		translate(language);
	}
	if (localStorage.getItem('theme')) {
		if (theme == localStorage.getItem('theme')) {

		} else {
			changeTheme();
		}
	}
}
window.addEventListener('load', getLocalStorage)


const button = document.querySelectorAll('.ripple')
button.forEach((button) => {
	button.addEventListener('click', function (e) {
		const x = e.pageX;
		const y = e.pageY;

		const buttonTop = e.target.offsetTop//позиция  кнопки относ wrapper
		const buttonLeft = e.target.offsetLeft

		let xInside = x - buttonLeft
		const yInside = y - buttonTop

		const heroBlock = document.querySelector('.page__hero.hero').offsetWidth;
		const heroImg = document.querySelector('.hero__image').offsetWidth;

		let widthLeft = (heroBlock - heroImg) / 2;
		if (e.target.closest('.hero__button')) {
			if (widthLeft > 0) {
				xInside = xInside - widthLeft - 20;
			}
		}

		const circle = document.createElement('span')

		circle.classList.add('circle')
		circle.style.top = yInside + 'px'
		circle.style.left = xInside + 'px'

		this.appendChild(circle)

		setTimeout(() => circle.remove(), 500)
	})
})


console.log(`
Самооценка (85/85)
(25/25) Смена изображений в секции portfolio +25
(25/25)Перевод страницы на два языка +25
(25/25)Переключение светлой и тёмной темы +25
(5/5)Дополнительный функционал: выбранный пользователем язык отображения страницы и светлая или тёмная тема сохраняются при перезагрузке страницы +5
(5/5)Дополнительный функционал: (Волна при нажатии на кнопки) сложные эффекты для кнопок при наведении и/или клике +5
`);