'use strict'

const sleep = ms => {
	return new Promise(resolve => setTimeout(() => resolve(), ms))
}

const dataFromMars = [
	{
    	date: '1 июля 2020 г.',
    	temperature: '-70,7 ° F',
    	windspeed: '11,5 миль/ч',
    	pressure: '766,9  ПА',
	},
    {
    	date: '2 июля 2020 г.',
    	temperature: '-69,6 ° F',
    	windspeed: '10 миль/ч',
    	pressure: '765  ПА',
    },
]

async function postData(data) {
    try {
    	await sleep(1500)
    	dataFromMars.push(data)
    } catch(e) {
    	document.body.insertAdjacentHTML('beforeend', `<div class='error'>
			<div class='error-item'>${e}</div>
		</div>`)
		console.error(e);
		console.log('catched')
    }
}

async function getData() {
    try {
    	await sleep(1000)
    	dataFromMars.forEach((dataFromMars) => {
        console.log(`${dataFromMars.date}, ${dataFromMars.temperature}, ${dataFromMars.windspeed}, ${dataFromMars.pressure}`)
   		})
    } catch(e) {
    	document.body.insertAdjacentHTML('beforeend', `<div class='error'>
			<div class='error-item'>${e}</div>
		</div>`)
		console.error(e);
		console.log('catched')
    }
}

async function showCards() {
	try {
		container.insertAdjacentHTML('beforeend', `<div class='loader'><p>Ожидаем данные...</p></div>`)

		await postData({
    		date: '3 июля 2020 г.',
    		temperature: '-70,7 ° F',
    		windspeed: '11,5 миль/ч',
    		pressure: '766,9  ПА',
  		})
		.then(getData)

		dataFromMars.forEach((dataFromMars) => {
			cards.insertAdjacentHTML('beforeend', `<div class='card'>
				<p class='alert'>Загрузка данных...</p>
			</div>`)
		})
	
		let cardsItems = document.querySelectorAll('.card')
		for (let card of cardsItems) {
			card.remove()
		}

		container.querySelector('.loader').remove()
	
		dataFromMars.forEach((dataFromMars) => {
			let cardDate = dataFromMars.date,
			cardTemperature = dataFromMars.temperature,
			cardWindspeed = dataFromMars.windspeed,
			cardPressure = dataFromMars.pressure
			
			cards.insertAdjacentHTML('beforeend', `<div class=card>
				<p class='date'>Дата: ${cardDate}</p>
				<p class='temperature'>Температура: ${cardTemperature}</p>
				<p class='windspeed'>Скорость ветра: ${cardWindspeed}</p>
				<p class='pressure'>Давление: ${cardPressure}</p>
				<button type="button" class="btn" onclick='btnLog()'>Вывести лог</button>
			</div>`)
		})
	} catch(e) {
		document.body.insertAdjacentHTML('beforeend', `<div class='error'>
			<div class='error-item'>${e}</div>
		</div>`)
		console.error(e);
		console.log('catched')
	}
}

const btnLog = () => {
	const card = event.target.parentNode

	const cardValue = {
		date: card.querySelector('.date').textContent,
		temperature: card.querySelector('.temperature').textContent,
		windspeed: card.querySelector('.windspeed').textContent,
		pressure: card.querySelector('.pressure').textContent
	}

	const {date, ...otherCharacteristics} = cardValue

	console.log(date, {otherCharacteristics})
}

showCards()