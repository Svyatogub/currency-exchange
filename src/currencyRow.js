import React from 'react'
import './App.css';
  
export default function CurrencyRow(props) {
    const {
        fiat, 
        selectFiat,
        onCangeFiat,
        amount,
        onChangeAmount
    } = props;

  return (
    <div className='CRow'>
        <input type='number' value={amount} onChange={onChangeAmount}/>
        <select value={selectFiat} onChange={onCangeFiat}>
            {fiat.map(currency => (
                <option key={currency} value={currency}>{currency}</option>
            ))}
        </select>
    </div>
  )
}
