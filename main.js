const input = document.querySelector('input');
const button = document.querySelector('button');
const cityName = document.querySelector('.city-name');
const warning = document.querySelector('.warning');
const photo = document.querySelector('.photo');
const weather = document.querySelector('.weather');
const temperature = document.querySelector('.temperature')
const humidity = document.querySelector('.humidity')

const apiLink ='https://api.openweathermap.org/data/2.5/weather?q=';
const apiKey='&APPID=8dc37cdd9557c5558622fa17158b5ffa';
const units = '&units=metric';

let $city;
let $url;
const getWeather = () =>{
    $city = (!input.value)? 'Brzeg' : input.value;
    $url = apiLink + $city + apiKey + units

    axios.get($url)
    .then( res => {
        const temp = res.data.main.temp;
        const hum = res.data.main.humidity;
        const weth = Object.assign({}, ...res.data.weather)

        cityName.textContent = res.data.name;
        temperature.textContent = Math.floor(temp) + '℃';
        humidity.textContent = hum + '%';
        weather.textContent = weth.main;
        console.log(res);
        warning.textContent = '';
        input.value = '';
        
        if(weth.id >= 200  && weth.id<300){
            photo.setAttribute('src', "../projekt7/thunderstorm.png");
        }else if(weth.id >= 300  && weth.id<400){
            photo.setAttribute('src', "../projekt7/drizzle.png");
        }else if(weth.id >= 500  && weth.id<600){
            photo.setAttribute('src', "../projekt7/rain.png");
        }else if(weth.id >= 600  && weth.id<700){
            photo.setAttribute('src', "../projekt7/ice.png");
        }else if(weth.id >= 700  && weth.id<800){
            photo.setAttribute('src', "../projekt7/fog.png");
        }else if(weth.id === 800){
            photo.setAttribute('src', "../projekt7/sun.png");
        }else if(weth.id >= 800  && weth.id<900){
            photo.setAttribute('src', "../projekt7/cloud.png");
        }else{
            photo.setAttribute('src', "../projekt7/unknown.png");
        }
        }
    )
    .catch( () => {warning.textContent ='Wpisz poprawna nazwe miasta!'})
}

const enterCheck = (event) =>{
    if(event.keyCode === 13){
        getWeather();
    }
}
button.addEventListener('click', getWeather);
getWeather();
input.addEventListener('keyup',enterCheck);