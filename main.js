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
    	console.error(e);
    }
}

async function getData() {
    try {
    	await sleep(1000)
    	dataFromMars.forEach((dataFromMars) => {
        console.log(`${dataFromMars.date}, ${dataFromMars.temperature}, ${dataFromMars.windspeed}, ${dataFromMars.pressure}`)
   		})
    } catch(e) {
    	console.error(e);
    }
}

postData(
  {
    date: '3 июля 2020 г.',
    temperature: '-70,7 ° F',
    windspeed: '11,5 миль/ч',
    pressure: '766,9  ПА',
  }
).then(getData).then(showCards)

async function showCards() {
	try {
		dataFromMars.forEach((dataFromMars) => {
			cards.insertAdjacentHTML('beforeend', `<div class='card'>
				<p class='alert'>Загрузка данных...</p>
			</div>`)
		})
	
		await sleep(3000)
	
		let cardsItems = document.querySelectorAll('.card')
		for (let card of cardsItems) {
			card.remove()
		}
	
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
		console.error(e);
	}
}

const btnLog = () => {
	let {date, ...otherData} = dataFromMars
	console.log(date, {...otherData})
}
