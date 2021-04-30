import React from 'react';
import axios from 'axios';
// import './style.css'



//http://api.weatherapi.com/v1/current.json?key=332e49a54abb470ab0c182855210604&q=London&aqi=no

class Pogodu extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: {},
            searchQuery: 'London'



        }
    }

    componentDidMount() {
        this.getWeather()
    }


    getWeather = () => {
        axios.get(`http://api.weatherapi.com/v1/current.json?key=332e49a54abb470ab0c182855210604&q=${this.state.searchQuery}&aqi=no`).then((responce) => {
            this.setState((prevState) =>
            ({
                data: {
                    'feelslike_c': responce.data.current.feelslike_c,
                    'temp_c': responce.data.current.temp_c,
                    'conditionText': responce.data.current.condition.text,
                    'icon': responce.data.current.condition.icon
                }
            }))
        })
    }

    handlerSearch = () => {
        this.getWeather()
    }


    handlerChange = (event) => {
        this.setState({ searchQuery: event.target.value})

    }

    render() {
        return <div>
            <input value={this.state.searchQuery} onChange={this.handlerChange}></input> <button onClick={this.handlerSearch}>Поиск</button>
            <br />
            <img src={this.state.data.icon} />
            <div><span>Температура: </span>{this.state.data.temp_c}</div>
            <div><span>Ашчушчаецца: </span>{this.state.data.feelslike_c}</div>
            <div><span>Краткое описание: </span>{this.state.data.conditionText}</div>
        </div>
    }

}


export default Pogodu


