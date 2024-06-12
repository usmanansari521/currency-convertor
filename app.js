const BASE_URL = "https://v6.exchangerate-api.com/v6/718e09f6f0c1ced8cdd9cad6/pair";

const dropdownSelect = document.querySelectorAll(".dropdown select");
const button = document.querySelector("form button");
const fromCurrency = document.querySelector(".from select");
const toCurrency = document.querySelector(".to select");
const message = document.querySelector(".message");

for(let select of dropdownSelect){
    for(currencyCode in countryList){
        let newOption = document.createElement("option");
        newOption.innerText = currencyCode;
        newOption.value = currencyCode;

        if(select.name === "from" && currencyCode === "USD"){
            newOption.selected = "selected";
        } else  if(select.name === "to" && currencyCode === "INR"){
            newOption.selected = "selected";
        }
        select.append(newOption);
    }

    select.addEventListener("change", (evt)=>{
        updateFlag(evt.target);
    })
}

const updateFlag = (element)=>{
    let currCode = element.value;
    let countryCode = countryList[currCode];
    let newSource = `https://flagsapi.com/${countryCode}/shiny/64.png`;
    let flagImage = element.parentElement.querySelector("img");
    flagImage.src = newSource;
}

const updateExchangeRate = async() =>{
    let amount = document.querySelector(".amount input");
    let amountValue = amount.value;
    if(amountValue === "" || amountValue < 1){
        amountValue = 1;
        amount.value = "1";
    }

    console.log(fromCurrency.value, toCurrency.value);
    const URL = `${BASE_URL}/${fromCurrency.value.toLowerCase()}/${toCurrency.value.toLowerCase()}`;

    let response = await fetch(URL);
    // console.log(response);
    let data = await response.json();
    // console.log(data);
    let rate = data.conversion_rate;
    console.log(rate);
    
    let finalAmount = amountValue * rate;
    message.innerText = `${amountValue} ${fromCurrency.value} = ${finalAmount} ${toCurrency.value}`;
}

button.addEventListener("click", async (evt) =>{
    evt.preventDefault();
    updateExchangeRate();
});

window.addEventListener("load", ()=>{
    updateExchangeRate();
});