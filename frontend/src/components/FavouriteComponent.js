import React from "react";
import './FavouriteComponent.css';

class FavouriteComponent extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      // display each favourite item with an image, type, name, url, and remove button
      <div className='saved-item-container'>
        {this.props.favourites.map((item, index) => (
          <div className='saved-item' key={index}>
              <div className='save-image-type-container'>
                <img src={item.coverArt} alt={index}></img>
                <p>{
                    item.kind === 'feature-movie' ? "movie" : item.kind
                }</p>
              </div>
              <p className='save-name-item'>{item.name}</p>
              {/* .description contains HTML tags... use dangerouslySetInnerHTML to change the html directly */}
              {(item.description ? <p className='description-item'>Description: <span dangerouslySetInnerHTML={{__html: item.description}}></span></p> : "")}

              <div className="save-bottom-items">
                <a href={item.viewURL} target='_blank' rel="noopener noreferrer">Link</a>
                {/* call a function that is passed in as a prop, to remove a favourite item */}
                <button onClick={() => this.props.onRemoveFavourite(item)}>Remove</button>
              </div>
          </div>
        ))}
      </div>
    );
  }
}

export default FavouriteComponent;

// websites used
// used this site for the dangerouslySetInnerHTML: https://blog.logrocket.com/using-dangerouslysetinnerhtml-in-a-react-application/
  