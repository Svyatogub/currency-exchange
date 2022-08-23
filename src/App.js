import './App.css';
import React, {useEffect, useState} from 'react';
import CurrencyRow from './currencyRow';

const URL = 'https://api.apilayer.com/exchangerates_data/latest'

function App() {
  const [fiat, setFiat] = useState([]);
  const [fromFiat, setFromFiat] = useState();
  const [toFiat, setToFiat] = useState();
  const [exchangeRate, setExchangeRate] = useState();
  const [amount, setAmount] = useState(1);
  const [changeAmount, setChangeAmount] = useState(true);
  const [eurRate, setEruoRate] = useState();

  let toAmount, fromAmount;
  if(changeAmount) {
    fromAmount = amount;
    toAmount = amount * exchangeRate;
  } else {
    toAmount = amount;
    fromAmount = amount / exchangeRate;
  }

    useEffect(() => {
        fetch(URL, {
            method: "GET",
            headers: {
                "apikey": 'bf9NGftpACTu1OuJkFOd3kcOqp4cYxNR'
            }
        })
        .then(res => res.json())
        .then(data => {
            const USD = Object.keys(data.rates).find(obj => obj === 'USD')
            const UAH = Object.keys(data.rates).find(obj => obj === 'UAH')
            setFiat([...Object.keys(data.rates)])
            setFromFiat(USD)
            setToFiat(UAH)
            setExchangeRate(data.rates[USD])
            setEruoRate(data.rates[UAH])
            console.log(data)
        })
    }, [])

    useEffect(() => {
      const UURL = `${URL}?base=${fromFiat}&symbols=${toFiat}`
      if(fromFiat != null && toFiat != null) {
        fetch(UURL, {
          method: "GET",
              headers: {
                  "apikey": 'bf9NGftpACTu1OuJkFOd3kcOqp4cYxNR'
              }
        })
        .then(res => res.json())
        .then(data => setExchangeRate(data.rates[toFiat]))
      }
    }, [fromFiat, toFiat])

    function handleFromAmountChange(e) {
      setAmount(e.target.value)
      setChangeAmount(true)
    }
    function handleToAmountChange(e) {
      setAmount(e.target.value)
      setChangeAmount(false)
    }

  return (
    <div className="App">
     <div className='Header'>
      <p>1 EURO = {exchangeRate} UAH</p>
      <p>1 USD = {eurRate} UAH</p>
     </div>
     <h1>Currency Exchange</h1>
     <CurrencyRow 
      fiat={fiat} 
      selectFiat={fromFiat}
      onCangeFiat = {e => setFromFiat(e.target.value)}
      onChangeAmount = {handleFromAmountChange}
      amount = {fromAmount}
      />
     <h2>=</h2>
     <CurrencyRow 
      fiat={fiat} 
      selectFiat={toFiat}
      onCangeFiat = {e => setToFiat(e.target.value)}
      onChangeAmount = {handleToAmountChange}
      amount = {toAmount}
      />
    </div>
  );
}

export default App;
