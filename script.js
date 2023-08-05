let selector = (el) => document.querySelector(el)

selector('.busca').addEventListener('submit', async (event) => {

  event.preventDefault()

  //pegar o valor digitado 
  let input = selector('#searchInput').value

  if (input != '') {

    clearInfo()

    showMessage('Carregando...')

    let url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(input)}
       &appid=9182dfc19826fbdfbea833d5a1bff3df&units=metric&lang=pt_br`

    let response = await fetch(url)

    let resultado = await response.json()
    
    if (resultado.cod === 200) {

      showInfo(
        {
          cidade: resultado.name,

          pais: resultado.sys.country,

          temperatura: resultado.main.temp,

          tempIcon: resultado.weather[0].icon,

          tempDescription: resultado.weather[0].description,

          ventVelocity: resultado.wind.speed,

          ventPosicion : resultado.wind.deg,

          tempHumidity : resultado.main.humidity ,//umidade do ar

          tempPressure : resultado.main.pressure



        }
      )
    }
    else {

      showMessage('Localização não encontrada..')

    }


  }
  else {
    clearInfo()

  }
})

//função exibir itens na tela 

const showInfo = (resultado) => {
   
  showMessage('')

  selector('.resultado').style.display = 'block'


  selector('.titulo').innerHTML = `${resultado.cidade} / ${resultado.pais}`

  //temp e cores
  let temperaturaExata = Math.floor(resultado.temperatura)
  selector('.tempInfo').innerHTML = `${temperaturaExata}<sup>ºC</sup>`

  let temperatura = `${resultado.temperatura}`

  if(temperatura >= 27){

    selector('.tempInfo').style.color = '#ffa500';
  }
  else{
    
    selector('.tempInfo').style.color = '#008000';
  }

  selector('.temp img').src = `http://openweathermap.org/img/wn/${resultado.tempIcon}@2x.png` //icone


  let body = document.querySelector('body') //selecionando o body para muda o fundo 

  //background dependendo do icone  
  switch (resultado.tempIcon) {
    //dia 
    case '01d':

      body.style.background = 'url(imagens/01d.jpg)'
      body.style.backgroundSize = 'cover'


      break;

    case '02d':

      body.style.background = 'url(imagens/02d.jpg)'
      body.style.backgroundSize = 'cover'
      document.querySelector('h1').style.color = '#1a1c1dc9'

      break;

    case '03d': //nuvens despersas

      body.style.background = 'url(imagens/03d.jpg)'
      body.style.backgroundSize = 'cover'
       document.querySelector('h1').style.color = '#1a1c1dc9'
      break;

    case '04d':

      body.style.background = 'url(imagens/04d.jpg)'
      body.style.backgroundSize = 'cover'
      break;

    case '09d':

      body.style.background = 'url(imagens/09d.jpg)'

      break;

    case '10d':

      body.style.background = 'url(imagens/10d.jpg)'
      body.style.backgroundSize = 'cover'
      break;

    case '11d':

      body.style.background = 'url(imagens/11d.jpg)'
      body.style.backgroundSize = 'cover'
      break;

    case '13d':

      body.style.background = 'url(imagens/13d.jpg)'
      body.style.backgroundSize = 'cover'
      break;

    case '50d':

      body.style.background = 'url(imagens/50d.jpg)'
      body.style.backgroundSize = 'cover'
      break;

    //noite 

    case '01n':

      body.style.background = 'url(imagens/01n.jpg)'
      body.style.backgroundSize = 'cover'
      break;

    case '02n':

      body.style.background = 'url(imagens/02n.jpg)'
      body.style.backgroundSize = 'cover'
      break;

    case '03n':

      body.style.background = 'url(imagens/03n.jpg)'
      body.style.backgroundSize = 'cover'
      break;

    case '04n':

      body.style.background = 'url(imagens/04n.jpg)'
      body.style.backgroundSize = 'cover'
      break;

    default:

      body.style.background = 'none'
      body.style.backgroundSize = 'cover'
      break;

  }

  selector('.tempDesc').innerHTML = `${resultado.tempDescription}`//descrição


  //velocidade do vento e cores 
  selector('.ventoInfo').innerHTML = `${resultado.ventVelocity} <span>km/h</span>`

  let velocidadeVento = `${resultado.ventVelocity}`

  if(velocidadeVento < 35){

    selector('.ventoInfo').style.color = '#008000'
  }
  else{

    selector('.ventoInfo').style.color = '#ffa500';
  }


  selector('.ventoPonto').style.transform = `rotate( ${resultado.ventPosicion - 90 }deg )` //posição do vento 

//umidade e cores
  selector('.umidadeInfo').innerHTML = `${resultado.tempHumidity} <span>%</span>`

   let umidade = `${resultado.tempHumidity}`
  
   if(umidade >= 50){

     selector('.umidadeInfo').style.color = '#008000'
   }
   else{
  
    selector('.umidadeInfo').style.color = '#ffa500';

   }


  

  selector('.pressaoAtmosferica').innerHTML = `${resultado.tempPressure} <span>hPa</span>`
}


//função mostrar mensagem de aviso

const showMessage = (message) => {

  selector('.aviso').innerHTML = message;
}

//limpar os avisos

const clearInfo = () => {

  showMessage('')

  selector('.resultado').style.display = 'none'
}