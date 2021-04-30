import React, { useEffect, useState } from "react";
import axios from 'axios'
import './style.css'


//6ebdcf5732483e0ea43f
const Converter = () => {
    const currencyTypes = ['USD', 'BYN', 'EUR']
    const [firstCurrencyType, setFirstCurrencyType] = useState('BYN')
    const [secondCurrencyType, setSecondCurrencyType] = useState('USD')
    const [value, setValue] = useState(1)
    const [exchangeRates, setExchangeRates] = useState(0)


    // const getData = () => {
    //    axios.get(`https://free.currconv.com/api/v7/convert?q=${firstCurrencyType}_${secondCurrencyType}&compact=ultra&apiKey=6ebdcf5732483e0ea43f`)
    //    .then((data)=>{
    //      setExchangeRates(data.data[`${firstCurrencyType}_${secondCurrencyType}`])
         
    //    })
       
       
    // }

    const getData = async () => {
       let a = await axios.get(`https://free.currconv.com/api/v7/convert?q=${firstCurrencyType}_${secondCurrencyType}&compact=ultra&apiKey=6ebdcf5732483e0ea43f`)
       console.log(a)
       setExchangeRates(a.data[`${firstCurrencyType}_${secondCurrencyType}`])
        
        
     }


    const firstCurrencyChanged = (event) => {
        setFirstCurrencyType(event.target.value)


    }

    const secondCurrencyChanged = (event) => {
        setSecondCurrencyType(event.target.value)
        

    }

    const changeDirection = () => {
       let buf = firstCurrencyType;
       setFirstCurrencyType(secondCurrencyType);
       setSecondCurrencyType(buf)

    }
    const valueHandler = (e) => {
        setValue(e.target.value)
    }
    
    useEffect(getData, [firstCurrencyType,secondCurrencyType,value])

    return (
        <>
            <div className='currencydiv'>
                <input onChange = {valueHandler} value={value}></input>
                <select className='myselect' value = {firstCurrencyType} onChange={firstCurrencyChanged}>
                    {currencyTypes.map((element,i) => {
                        return <option key={i}>{element}</option>
                    })}
                </select>
            </div>


            <div className='currencydiv'>
                <span>{value*exchangeRates}</span>
                <select className='myselect' value = {secondCurrencyType} onChange={secondCurrencyChanged}>
                    {currencyTypes.map((element,i) => {
                        return <option key={i}>{element}</option>
                    })}
                </select>
            </div>


            <button onClick={changeDirection}>Сменить валюту</button>
        </>
    )
}

export default Converter