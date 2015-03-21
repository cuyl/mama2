var flashBlocker  = require('./flashBlocker')
var createElement = require('./createElement')
var MAMAPlayer    = require('./player')
var log           = require('./log')
var mamaKey       = require('./mamaKey')
var seekers       = require('./seekers')
var matched

if (window[mamaKey] != true) {

function seeked (source, comments) {
	if (!source) {
		log('解析内容地址失败', 2)
		delete window[mamaKey]
		return
	}
	log('解析内容地址完成'+source.map(function (i) {return '<a href='+i[1]+'>'+i[0]+'</a>'}).join(' '), 2)
	var mask = createElement('div', {
		appendTo: document.body,
		style: {
			position: 'fixed',
			background: 'rgba(0,0,0,0.8)',
			top: '0',
			left: '0',
			width: '100%',
			height: '100%',
			zIndex: '999999'
		}
	})
	createElement('div', {
		appendTo: mask,
		style: {
			width: '800px',
			height: '400px',
			position: 'absolute',
			top: '50%',
			left: '50%',
			marginTop: '-200px',
			marginLeft: '-400px',
			borderRadius: '2px',
			boxShadow: '0 0 2px #000000, 0 0 200px #000000',
		}
	})
	var container = createElement('div', {
		appendTo: mask,
		innerHTML: '<div id="MAMA2_video_placeHolder"></div>',
		style: {
			width: '800px',
			height: '400px',
			position: 'absolute',
			backgroundColor: '#000000',
			top: '50%',
			left: '50%',
			marginTop: '-200px',
			marginLeft: '-400px',
			borderRadius: '2px',
			overflow: 'hidden'
		}
	})
	createElement('div', {
		appendTo: container,
		innerHTML: '&times;',
		style: {
			width: '20px',
			height: '20px',
			lineHeight: '20px',
			textAlign: 'center',
			position: 'absolute',
			color: '#ffffff',
			fontSize: '20px',
			top: '5px',
			right: '5px',
			textShadow: '0 0 2px #000000',
			fontWeight: 'bold',
			fontFamily: 'Garamond, "Apple Garamond"',
			cursor: 'pointer'
		}
	}).onclick = function () {
		document.body.removeChild(mask)
		player.video.src = "about:blank"
		delete window[mamaKey]
	}
	var player = new MAMAPlayer('MAMA2_video_placeHolder', '800x400', source, comments)
	player.iframe.contentWindow.focus();
	flashBlocker()
	player.iframe.style.display = 'block'
}

seekers.forEach(function (seeker) {
	if (matched === true) return
	if (!!seeker.match() === true) {
		log('开始解析内容地址')
		matched = true
		seeker.getVideos(seeked)		
	}
})

if (matched === undefined) {
	delete window[mamaKey]
	log('对不起，没有找到可以解析的内容', 2)
}


}