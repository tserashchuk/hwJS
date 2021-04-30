import React, { useCallback, useReducer } from 'react'
import axios from 'axios'
import { NewsView } from './newsView'
import { reducer } from './newsReducer'

const initialState = { searchQuery: 'IT', news: [] };

const News = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const getNews = async () => {
    let url = `https://newsapi.org/v2/everything?q=${state.searchQuery}&apiKey=06d83908658846e19a9fede72c374b77`
    let news = await (await axios.get(url)).data
    dispatch({
      type: 'setNews', payload: {
        news: news.articles
      }
    })
  }

  const changeSearchQuery = useCallback( (event) => {
    dispatch({
      type: 'changeSearchQuery', payload: {
        searchQuery: event.target.value
      }
    })
  })

  return (
    <>
      <input value={state.searchQuery} onChange={changeSearchQuery} />
      <button onClick={getNews}>Найти новости по запросу</button>
      <NewsView news={state.news}></NewsView>
    </>
  );
}

export default News