import React from "react";
import DisplayComponent from "./DisplayComponent";
import FavouriteComponent from "./FavouriteComponent";
import Modal from 'react-bootstrap/Modal';

// use this class to keep track of the favourite items, which is used in DisplayComponent and FavouriteComponent
class FavouritesState extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            favourites: [],
            showFav: false
        }
        // bind all the class methods to this
        this.handleToggleFavourite = this.handleToggleFavourite.bind(this);
        this.handleRemoveFavourite = this.handleRemoveFavourite.bind(this);
        this.handleShowFav = this.handleShowFav.bind(this);
    }

    handleToggleFavourite = (item) => {
        this.setState(prevState => {
            
            // get the previous state favourties
            const favourites = [...prevState.favourites];
            // get the index of the item if it is already in favourites
            const index = favourites.findIndex(favourite => favourite.viewURL === item.viewURL);

            // item is not in favourites, add it
            if (index === -1) {
                favourites.push(item);
            // item is already in favourites, remove it
            } else {
                favourites.splice(index, 1);
            }
            return {favourites};
        });
    }
      
    handleRemoveFavourite = (item) => {
        // remove the item if it matches the viewURL
        this.setState(prevState => {
            const favourites = prevState.favourites.filter(favourite => favourite.viewURL !== item.viewURL);
            return { favourites };
        });
    }

    // hide the Modal
    handleShowFav = () => {
        // change to true or false depending on the current state
        this.setState(prevState => ({ showFav: !prevState.showFav }));
    }

    render() {
        return(
            <>
                {/* create a modal that displays all the items in the state */}
                <Modal show={this.state.showFav} onHide={this.handleShowFav}>
                    <Modal.Header closeButton>
                        <Modal.Title>My Favourites</Modal.Title>
                    </Modal.Header>
                    <Modal.Body className="d-flex justify-content-center">
                        {/* call FavouriteComponent and send favourites and handleRemoveFavourite as props */}
                        <FavouriteComponent 
                            favourites={this.state.favourites} 
                            onRemoveFavourite={this.handleRemoveFavourite}
                        />
                    </Modal.Body>
                </Modal>
                {/* call FavouriteComponent and send favourites, handleToggleFavourite and handShowFav as props */}
                <DisplayComponent 
                    favourites={this.state.favourites} 
                    onToggleFavourite={this.handleToggleFavourite}
                    showFavourites={this.handleShowFav}
                />
            </>
        )
    }
      
}

export default FavouritesState;
