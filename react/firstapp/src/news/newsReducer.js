// import React from 'react'

export function reducer(state, action) {
  switch (action.type) {
    case 'changeSearchQuery':
      return {...state, searchQuery: action.payload.searchQuery};
    case 'setNews':
      return {...state, news:action.payload.news}
    default:
      return state
  }
}

