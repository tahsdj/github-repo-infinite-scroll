import React from 'react'
import './index.sass'

function Repository({title, description, url}) {
    return (
        <div className="repo">
            <h2 className="title">{title}</h2>
            <p className="description">{description}</p>
            <a className="link" href={url} target="_blank">{url}</a>
        </div>
    )
}

export default Repository