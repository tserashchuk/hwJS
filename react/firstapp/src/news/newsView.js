// import React from 'react'

export const NewsView = (news) => {
    return (
        news.news.map((article) => {
            console.log(article.source)
            return <>
                <h3>{article.title}</h3>
                <p>{article.description}</p>
                <a href={article.url}><span>{article.source.name}</span></a>
            </>
        })
    )




}