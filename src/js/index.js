'use strict';

function $(el) {
	return document.querySelector(el);
}
function $$(el) {
	return document.querySelectorAll(el);
}



let Global = {};



getApi('./api/fc')
	.then(data => {
		window.weatherData = data;
		drawSvg(document.querySelector('svg'), window.weatherData);
		drawData($('#fore'), data);
	})








function drawData(el, data) {
	let tem = el.innerHTML,
		tString = '';
	data.forEach((a, b, c) => {
		tString += tem.replace(/{{(.*?)}}/gi, (_a, _b) => {
			try {
				console.log(_b);
				return eval(_b);
			} catch (err) {
				console.log(err);
			}
		});
	})
	console.log(tString);
	el.innerHTML = tString;
}






function drawSvg(el, arr, etc = {
	marginY: .1,
	stokeColor: 'black',
	stokeWidth: 3,
	fillLG: [{
		color: 'blue',
		opacity: 1,
	}, {
		color: 'red',
		opacity: 0,
	}],
	fillColor: 'transparent',
}) {
	if (!(el && arr)) throw new Error('没参数吧');
	let maxNum = arr[0].max_temp,
		minNum = arr[0].min_temp,
		heightTemp = 0,
		dString = '',
		fString = '',
		height = +el.getAttribute('height'),
		width = +el.getAttribute('width'),
		sDraw = height * etc.marginY,
		widthTemp = width / (arr.length),
		elString = '';

	// 找最大最小 计算差值
	arr.forEach(a => {
		maxNum = maxNum < a.max_temp ? a.max_temp : maxNum;
		minNum = minNum > a.min_temp ? a.min_temp : minNum;
	});
	heightTemp = height / (maxNum - minNum) * .8;

	console.log(heightTemp);
	// 计算绘图公式
	// dString += 'M0,' + sDraw + ' ';
	// arr.forEach((a, b, c) => {
	// 	if (!b) {
	// 		dString += 'Q0,' + heightTemp * (maxNum - a.max_temp) + ' ';
	// 		dString += widthTemp * 0.3 + ',' + heightTemp * 10 + ' ';
	// 	}
	// 	else {
	// 		dString += 'T' + widthTemp * b + ',' + (sDraw + heightTemp * (maxNum - a.max_temp)) + ' ';
	// 	}
	// })
	// dString += 'M' + (width) + ',' + heightTemp * (maxNum - arr[arr.length - 1].min_temp + 40) + ' ';
	// dString += 'T' + (width) + ',' + heightTemp * (sDraw + heightTemp * (maxNum - arr[arr.length - 1].min_temp) + 40) + ' ';
	// arr.reverse();
	// arr.forEach((a, b, c) => {
	// 	dString += 'T' + widthTemp * (arr.length - b - 1) + ',' + (40 + sDraw + heightTemp * (maxNum - a.min_temp)) + ' ';
	// })



	// 贝塞尔太恶心了....
	dString += 'M0' + ' ' + sDraw + ' ';
	arr.forEach((a, b, c) => {
		dString += 'L' + widthTemp * (b + 1) + ' ' + (sDraw + heightTemp * (maxNum - a.max_temp)) + ' ';
	})
	dString += 'M0' + ' ' + (sDraw + heightTemp * 30) + ' ';
	arr.forEach((a, b, c) => {
		dString += 'L' + widthTemp * (b + 1) + ' ' + (sDraw + heightTemp * (maxNum - a.min_temp)) + ' ';
	})
	elString += '<path d="' + dString + '" fill="' + etc.fillColor + '" stroke="' + etc.stokeColor + '" stroke-width="' + 'strokeWidth' + '"/>';
	el.innerHTML += elString;
}
















window.addEventListener('touchmove', function() {
	console.log(document.body.scrollTop);

})


setInterval(_=> {
	[$('section')].forEach(a => {
		if (document.body.scrollTop < 190) {
			a.style.background = 'rgba(255,255,255,' + document.body.scrollTop * .005 + ')';
		}
	});
	// if (document.body.scrollTop > 10) {
	// 	$('#wea').style.paddingTop = '10px';
	// 	$('#wea').style.zIndex = '10';
	// 	$('#wea').style.background = 'white';
	// 	$('#tem').style.position = 'fixed';
	// 	$('#wea').style.position = 'fixed';
	// 	$('#tem').style.background = 'white';
	// 	$('#tem').style.fontSize = '2.5rem';
	// 	$('#tem').style.paddingTop = '30px';
	// 	$('#tem').style.zIndex = '3';
	// 	$('#tem').style.paddingBottom = '0';
	// } else {
	// 	$('#wea').style.paddingTop = '20vh';
	// 	$('#wea').style.background = 'transparent';
	// 	$('#tem').style.background = 'transparent';
	// 	$('#tem').style.fontSize = '6rem';
	// 	$('#tem').style.paddingTop = '25vh';
	// }
}, 20);







function getApi(url) {
	return new Promise((resolve, reject) => {
		let a = new XMLHttpRequest();
		a.open('GET', url, true);
		a.send();
		a.addEventListener('load', e => {
			try {
				resolve(JSON.parse(e.target.responseText));
			} catch (err) {
				console.log(err);
			}
		})
	})
}
