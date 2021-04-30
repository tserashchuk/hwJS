import axios from 'axios';
import React from 'react';


class Calendar extends React.Component {
    constructor(props) {
        super(props);

        let now = new Date();

        this.state = {

            month: now.getMonth(),
            year: now.getFullYear(),
            daysCount: new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate(),
            dayInWeek: new Date(now.getFullYear(), now.getMonth(), 1).getDay(),
            days: [],
            test:'',
            weatherData: '',
            daysName: ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс',],
            monthName: ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь",
                "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"]

        }
    }


    componentDidMount() {
        console.log(this.state)
        this.setState((prevState) => {
            return { days: Array.from({ length: prevState.daysCount }, (_, k) => k + 1) }
        })
        
    }

    nextDateHandler = () => {

        this.setState((prevState) => {
            return prevState.month === 11 ? { month: 0, year: prevState.year + 1 } : { month: prevState.month + 1 }
        })

        this.dateUpdate()

    }

    prevDateHandler = () => {

        this.setState((prevState) => {
            return prevState.month === 0 ? { month: 11, year: prevState.year - 1 } : { month: prevState.month - 1 }
        })
        this.dateUpdate()

    }


    dateUpdate = () => {
        this.setState((prevState) => {
            return {
                daysCount: new Date(prevState.year, prevState.month + 1, 0).getDate(),
                dayInWeek: new Date(prevState.year, prevState.month, 1).getDay(),
            }
        })
        this.setState((prevState) => {
            return {
                days: Array.from({ length: prevState.daysCount }, (_, k) => k + 1)
            }
        })

    }




    renderWeeks = () => {
        let skippedDays = []
        let countPrevMonth = new Date(this.state.year, this.state.month, 0).getDate()

        for (let j = 1; j < this.state.dayInWeek; j++) {
            skippedDays.unshift(countPrevMonth)
            countPrevMonth--
        }


        let content = []
        for (let i = 0; i < 6; i++) {
            if (i === 0) { this.state.days = [...skippedDays, ...this.state.days] }

            content.push(<tr>
                {this.renderWeek()}
            </tr>)
        }
        return content
    }

    focusTD = (event) => {
        axios.get(`http://api.weatherapi.com/v1/current.json?key=332e49a54abb470ab0c182855210604&q=Minsk&aqi=no`).then((request) => {
            console.log(request.data.current)
            this.setState({weatherData:{'Температура:':request.data.current.temp_c,"Ашчушчаецца как:": request.data.current.feelslike_c}})
            this.dateUpdate()
        })

    }


    renderWeek = () => {
        let week = []
        let shifted = []
        let days = this.state.days

        for (let j = 0; j <= 6; j++) {
            week.push(<td className="day"><div className="number" onClick={this.focusTD}>{days[0]}</div></td>)
            shifted = days.shift()
        }
        return week
    }




    render() {
        return (
            <>
                <Template
                    next={this.nextDateHandler}
                    prev={this.prevDateHandler}
                    monthName={this.state.monthName[this.state.month]}
                    year={this.state.year}
                    daysName={this.state.daysName}
                    rend={this.renderWeeks}
                />
                { this.state.weatherData ? <div>{Object.entries(this.state.weatherData).map((element)=> <p>{element}</p>)}</div> :''}
            </>

        )
    }

}


function Template({ next, prev, monthName, year, daysName, rend }) {
    return (
        <>
            <div class="container">
                <div class="row">
                    <div class="span12">
                        <table class="">
                            <thead>
                                <tr>
                                    <th colspan="7">
                                        <span class="btn-group">
                                            <a class="btn" onClick={prev}><i class="icon-chevron-left"></i></a>
                                            <a class="btn active">{monthName} {year}</a>
                                            <a class="btn" onClick={next}><i class="icon-chevron-right"></i></a>
                                        </span>
                                    </th>
                                </tr>
                                <tr>
                                    {daysName.map((element) => {
                                        return <th>{element}</th>
                                    })}
                                </tr>
                            </thead>
                            <tbody>

                                {rend()}

                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

        </>
    )
}

export default Calendar