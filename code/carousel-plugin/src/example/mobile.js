import Carousel from '../carousel';
import css from './mobile.css';

window.onload = function(){
	new Carousel({
		leftArrow: document.querySelector('.d1 .left'),
		rightArrow: document.querySelector('.d1 .right'),
		container: document.querySelector('.d1 .carousel'),
		wrap: document.querySelector('.d1 .wrap'),
		dotsWrap: document.querySelector('.d1 .dots'),
		dotClassName: 'dot',
		activeClassName: 'active'
	});
}