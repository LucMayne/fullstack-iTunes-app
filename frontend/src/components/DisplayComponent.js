import React from 'react';
import { Form, Container, Dropdown, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import './DisplayComponent.css';

class DisplayComponent extends React.Component {
    constructor(props) {
      super(props);
      // store array of projects, get the current projectID when the user clicks edit
      this.state = {
        error: null,
        isLoaded: false,
        items: [],
        formData: {
            title: ""
        },
        searchClick: false,
        // use selected option in the body of the post request
        selectedOption: 'all',
        // display option is displayed as the dropdown toggle text
        displayOption: 'All'
      };

      // bind all the methods to this
      this.fetchData = this.fetchData.bind(this);
      this.handleStarClick = this.handleStarClick.bind(this);
      this.handleUserInput = this.handleUserInput.bind(this);
      this.handleSelect = this.handleSelect.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }
    
    componentDidMount() {
        this.fetchData();
    }

    // pass the items properties to handleClick which will add the item to favourites
    handleStarClick = (name, kind, viewURL, coverArt, description) => {

        const items = {name, kind, viewURL, coverArt, description};

        // pass items to a method from FavouritesState
        this.props.onToggleFavourite(items);
    }
    
    // takes an event key with 2 values which are split and set to the state
    handleSelect = (eventKey) => {
        const [selectOpt, displayOpt] = eventKey.split(',');
        this.setState({
            selectedOption: selectOpt,
            displayOption: displayOpt
        });     
    }
    
    // took this code from the previous task
    // update the formData state
    handleUserInput(event) {
        this.setState({
            formData: {...this.state.formData, [event.target.name]: event.target.value}
        });
    }
    
    // create a post that will be redirected in the server code to /search
    handleSubmit = async (event) => {
        event.preventDefault();
        const response = await fetch('/submit-form', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            // send 2 items in the body, the title for searching and the selected option for the media type
            body: JSON.stringify({
                searchData: this.state.formData.title,
                selectedOption: this.state.selectedOption
            })
        });
        
        // fetch the new data
        this.fetchData();
        // set searchClick to true
        this.setState({ searchClick: true }, () => {
        });
    };
    
    // fetch the data
    fetchData() {
        const title = this.state.formData.title;

        // only fetch the data if formData has a title
        if (title) {
            // clear the items state before adding new items to it
            this.setState({
                items: []
            });
            fetch(`/search?title=${encodeURIComponent(title)}&option=${this.state.selectedOption}`)
            .then(res => res.json())
            .then(results => {
                this.setState({
                    isLoaded: true,
                    // set projects to the result from the api
                    items: results
                });
            },
            // catch an error
            error => {
                this.setState({
                    isLoaded: true,
                    error,
                });
            }
            );
        } else {
            this.setState({
                isLoaded: true,
                items: []
            });
        }
    }       
        
    render() {
        const { error, isLoaded, items } = this.state;
        
        // dropdownArray is an array of the media types
        const dropdownArray = ['all', 'music', 'movie', 'podcast', 'audiobook', 'shortFilm', 'tvShow', 'software', 'ebook'];
        // displayArray is the media types that are displayed to the user
        const displayArray = ['All', 'Music', 'Movie', 'Podcast', 'AudioBook', 'Short Film', 'TV Show', 'Software', 'eBook']

        if (error) {
            return <div>Error: {error.message}</div>;
        } else if (!isLoaded) {
            return <div>Loading...</div>;
        } else {
            return (
                <div className='main-container'>
                    {/* create a form for searching titles, a dropdown with different media type options, a button to display a Modal with favourite items */}
                    <Form onSubmit={this.handleSubmit}>
                        <Container>
                            <Form.Group>
                                <Form.Label className='form-title'>Search iTunes Store</Form.Label>
                                <br/>
                                <div style={{ display: 'flex' }}>
                                    <Form.Control style={{width: '350px'}} type="text" id="title" name="title" value={this.state.formData.title} onChange={this.handleUserInput} />
                                    <Button type="submit" className="btn btn-primary my-button">Search</Button>
                                    <Dropdown style={{marginRight: '0.5vw'}} onSelect={this.handleSelect}>
                                        <Dropdown.Toggle variant="success" id="dropdown-basic">
                                        {this.state.displayOption}
                                        </Dropdown.Toggle>

                                        <Dropdown.Menu>
                                            {dropdownArray.map((media, index) => (
                                                <Dropdown.Item key={media} eventKey={`${media},${displayArray[index]}`}>{displayArray[index]}</Dropdown.Item>
                                            ))}
                                        </Dropdown.Menu>
                                    </Dropdown>
                                    <Button style={{backgroundColor: 'rgba(255, 199, 17, 0.822)'}} variant="" onClick={this.props.showFavourites}>Show Favourites</Button>
                                </div>
                            </Form.Group>
                        </Container>
                    </Form>
                    {/* display the items if the the search button was clicked */}
                    {this.state.searchClick && (
                        <div className='returned-item-container'>
                            {items.map((item, index) => (
                                <div className='returned-item' key={index}>
                                    <FontAwesomeIcon 
                                    icon={faStar} 
                                    // if the item URL matches a favourite URL give it the start-icon-clicked class to change its colour
                                    className={this.props.favourites.some(favourite => favourite.viewURL === item.viewURL) ? 'star-icon-clicked' : 'star-icon'} 
                                    // pass the item props to handStarClick
                                    onClick={() => this.handleStarClick(item.name, item.kind, item.viewURL, item.coverArt, item.description)} 
                                    />
                                    {/* display an image with the item type, name, and Link at the bottom */}
                                    <div className='image-type-container'>
                                        <img src={item.coverArt} alt={index}></img>
                                        {/* display 'movie' if .kind is feature-movie */}
                                        <p>{
                                            item.kind === 'feature-movie' ? "movie" : item.kind
                                        }</p>
                                    </div>
                                    <p className='name-item'>{item.name}</p>
                                    {/* .description contains HTML tags, use dangerouslySetInnerHTML to change the html directly */}
                                    {(item.description ? <p className='description-item'>Description: <span dangerouslySetInnerHTML={{__html: item.description}}></span></p> : "")}
                                    <a href={item.viewURL} target='_blank' rel="noopener noreferrer">Link</a>
                                </div>
                            ))}                       
                        </div>
                                         
                    )}
                </div>
            );                  
        }
    }
}

export default DisplayComponent;

// websites used:
// found .some here: https://www.w3schools.com/jsref/jsref_some.asp
// used this site for the dangerouslySetInnerHTML: https://blog.logrocket.com/using-dangerouslysetinnerhtml-in-a-react-application/
