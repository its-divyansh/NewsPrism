import React, { Component } from 'react'
import PropTypes from 'prop-types'

export class NewsItem extends Component {
  // constructor(){
  //   super();

  // }


  // strict mode in react called the constructor twice to detect potential problems

  render() {
    let { title, description, imageUrl, newsUrl, date, author, name } = this.props;
    return (
      <div className='container my-4'>

        <div className="card" style={{ width: "18rem" }}>
          {/* <span className="badge badge-pill badge-warning">Warning</span> */}
          <div style={{
            display:'flex', 
           position: 'absolute',
          //  justifyContent:'flex-end',
           right: '0'}}>
            <span className=" badge rounded-pill bg-danger">
              {name}
            </span>
            </div>
          <img src={imageUrl?imageUrl:"https://static.vecteezy.com/system/resources/thumbnails/004/216/831/original/3d-world-news-background-loop-free-video.jpg"} className="card-img-top" alt="..."  height={"170"}/>
          <div className="card-body">
            
            <h5 className="card-title">{title} </h5>
            <p className="card-text">{description}</p>
            <p className="card-text">By {author ? author : 'Unknown'} at {new Date(date).toISOString()}</p>
            <a href={newsUrl} target="_blank" className="btn btn-sm btn-primary bg-dark">Read More</a>
          </div>
        </div>
      </div>
    )
  }
}

export default NewsItem
