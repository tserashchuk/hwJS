import React from 'react';
import axios from 'axios'

// http://www.omdbapi.com/?i=tt3896198&apikey=3fc524d1


class Film extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            allFims: [],
            searchQuery: 'Time',
            totalResults: '',
            currentPage: 1,
            detailedFilm: {},
            filmType:'Movie'
        }
    }

    componentDidMount() {
        let url = this.getAxios({ 's': this.state.searchQuery, 'page': this.state.currentPage, 'type':this.state.filmType })
        axios.get(url).then((data) => {
            this.setState({ allFims: data.data.Search, totalResults: data.data.totalResults, currentPage: 1 })
        })
    }

    searchFilms = () => {
        let url = this.getAxios({ 's': this.state.searchQuery, 'page': this.state.currentPage,'type':this.state.filmType })
        axios.get(url).then((data) => {
            this.setState({ allFims: data.data.Search, totalResults: data.data.totalResults, currentPage: 1 })
        })
    }

    searchQueryUpdate = (event) => {
        this.setState({ searchQuery: event.target.value })

    }


    nextPageHandler = () => {

        this.setState((prevState) => ({ currentPage: prevState.currentPage + 1 }))
        axios.get(`http://www.omdbapi.com/?s=${this.state.searchQuery}&page=${this.state.currentPage}&apikey=3fc524d1`).then((data) => {
            this.setState({ allFims: data.data.Search, totalResults: data.data.totalResults })
        })

    }

    getAxios = (params) => {
        return Object.entries(params).reduce((accum, element) => {
            accum += `&${element[0]}=${element[1]}`
            return accum
        }, 'http://www.omdbapi.com/?apikey=3fc524d1')

    }

    filmDetails = (searchQuery) => {
        let url = this.getAxios({ 'i': searchQuery,'type':this.state.filmType })
        axios.get(url).then((data) => {
            this.setState({ detailedFilm: data })
        })
    }

    selectFilmType = (event) => {
        this.setState({filmType:event.target.value})
    }


    render() {
        return (
            <>
                <input onChange={this.searchQueryUpdate} value={this.state.searchQuery}/>
                <select onChange={this.selectFilmType}>
                    <option selected>Movie</option>
                    <option>Series</option>
                    <option>Episode</option>
                </select>
                <button onClick={this.searchFilms}>Поиск</button>

                {this.state.allFims?.length > 0 ?
                    this.state.allFims.map((filmElement) => {
                        return <div onClick={() => this.filmDetails(filmElement.imdbID)}>{filmElement.Title}</div>
                    })
                    : <div>List is empty</div>}

                <span>{this.state.currentPage}</span>
                <button onClick={this.nextPageHandler} disabled={this.state.currentPage <= (this.state.totalResults / 10) ? false : true}>Next Page</button>
                {Object.keys(this.state.detailedFilm).length > 0 ? <ExtendedResults data={this.state.detailedFilm} /> : ''}


            </>)
    }



}


const ExtendedResults = (props) => {
    return (
        <div>
            <div>{props.data.data['Title']}</div>
            <div>{props.data.data['Actors']}</div>
            <div>{props.data.data['Awards']}</div>
            <div>{props.data.data['Genre']}</div>
            <div>{props.data.data['Released']}</div>
            <div>{props.data.data['Type']}</div>
        </div>)
}


export default Film