# Fullstack iTunes App

This app allows you to search for media on iTunes and save your favorite items.

## Webpage Link

https://fullstack-itunes-app-4ed292a11bf3.herokuapp.com/

## Usage

1. Enter the name of what you want to search for.
2. Choose the type of media you want to search for (e.g. movie, podcast, music, audiobook, short film, TV show, software, ebook, or all), the default is all.
3. Click the 'Search' button to get a list of items matching your search.
4. Click the link for an item to view it on iTunes or click the star icon to add it to your favorites.
5. Click the 'Favourites' button to view a list of your favorite items. From here, you can click the link for an item to view it on iTunes or click the remove button to remove it from your favorites.

## Installation

1. Clone the repository to your local machine.
2. Navigate to the `root` directory and run the command `npm install`.
3. Navigate to the `frontend` directory and run the command `npm install`.
4. In the `root` directory, open `app.js` and update this build code:
```javascript
// build
if (process.env.NODE_ENV === 'production'){
    app.use(express.static(path.join(__dirname, 'frontend/build')));
}
app.use(express.static(path.join(__dirname,'frontend/build')));
```
To this:
```javascript
// build
if (process.env.NODE_ENV === 'production') {
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, 'frontend/build', 'index.html'));
    });
    app.use(express.static(path.join(__dirname, 'frontend/build')));
}
app.use(express.static(path.join(__dirname, 'frontend/build')));
```
5. In the `frontend` directory, open the `package.json` file and add the following line to the file: `“proxy”: “http://localhost:3001”`

## API Keys

This app uses the iTunes API to search for different types of media. An API key is not required to use the iTunes API. 
The app sends a GET request to the iTunes API with the search term and media type as query parameters. 
The response is then filtered to only include relevant information.

## Helmet

This app uses Helmet to help secure the Express app.
Helmet is configured with the contentSecurityPolicy and xDownloadOptions options set to false.

## Running the app

1. Open two terminal windows, one for the backend and one for the frontend.
2. In the first terminal, navigate to the `backend` directory and run the command `npm start` to start the backend server.
3. In the second terminal, navigate to the `frontend` directory and run the command `npm start` to start the frontend server.
4. Open a browser and go to `http://localhost:3000` to view the app.

## Testing

If you switch directories after running the tests in another, you will need to run `npm test -- -u` to update the snapshot test in that directory. 
If you do not use `npm test -- -u`, you will get an error because Jest is looking for snapshot files that are in a differnt location.

