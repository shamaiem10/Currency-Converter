let userInput=document.querySelector(".user-input");
const fromCurrency=document.querySelector(".from-currency");
const toCurrency=document.querySelector(".to-currency");

const host = 'api.frankfurter.app';
fetch(`https://${host}/currencies`)
  .then(resp => resp.json())
  .then((data) => {
     console.log(data);
     let entries = Object.entries(data);
     console.log(entries);

     for(let i = 0; i < entries.length; i++) {
       document.querySelector(".from-currency").innerHTML += `<option value="${entries[i][0]}">${entries[i][0]}, ${entries[i][1]}</option>`;
       document.querySelector(".to-currency").innerHTML += `<option value="${entries[i][0]}">${entries[i][0]}, ${entries[i][1]}</option>`;
     }
  });

let userInputAmount = document.querySelector('.user-input');
const form = document.querySelector('.form-page');

form.addEventListener('submit', (event) => {
  event.preventDefault();

  const value = userInputAmount.value;
  if (isNaN(value) || value.trim() === '' || Number(value) <= 0) {
    // If not a number, display a message
    document.querySelector(".converted-rate").innerHTML='Enter a valid number.';
   return;
  }
 
  console.log('User Input Value:', value);
 const url=`https://v6.exchangerate-api.com/v6/0fc4d1e4ce9b76b168955dc1/latest/${fromCurrency.value}`
  fetch(url)
    .then(resp => resp.json())
    .then((data) => {
      console.log(data.conversion_rates);
      let ratesArray=Object.entries(data.conversion_rates);
      console.log(ratesArray);


      for(let i=0;i<ratesArray.length;i++){
       if(toCurrency.value==ratesArray[i][0]){
        let result=value*parseFloat(ratesArray[i][1]);
        console.log(result);

        document.querySelector(".converted-rate").innerHTML=`${value} ${fromCurrency.value} = ${result.toFixed(2)} ${toCurrency.value}`;
       }
      }
    
    });
});
