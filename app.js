const express = require('express');
const path = require('path');
const helmet = require('helmet');
const app = express();

// use helmet
app.use(
    helmet({
      contentSecurityPolicy: false,
      xDownloadOptions: false,
    })
);

const port = process.env.PORT || 3001

// get data from the body
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

// build
if (process.env.NODE_ENV === 'production'){
    app.use(express.static(path.join(__dirname, 'frontend/build')));
}

app.use(express.static(path.join(__dirname,'frontend/build')));


// search the itunes store with a title and media option passed in
app.get('/search/', async (req, res) => {
    try {
        const title = req.query.title;
        const option = req.query.option;
        let url = `https://itunes.apple.com/search?term=${encodeURIComponent(title)}`;
        if (option !== 'all') {
            url += `&media=${encodeURIComponent(option)}`;

            // assign an entity value to the url depending on the media type
            switch (option) {
                case 'music':
                    url += '&entity=musicTrack';
                    break;
                case 'tvShow':
                    url += '&entity=tvSeason';
                    break;
                case 'audiobook':
                    url += '&entity=audiobook';
                    break;
                case 'shortFilm':
                    url += '&entity=movie';
                    break;
                default: 
                    url += `&entity=${encodeURIComponent(option)}`;
                    break;
            }

        }
        const response = await fetch(url);
        
        const data = await response.json();
        // get the json data and assign a value depending on what json was fetched, if a fetched item does not have a name, don't add it
        const results = data.results.filter(result => (result.trackName || result.collectionName)).map(result => ({
            name: result.trackName || result.collectionName,
            kind: result.kind || result.collectionType || result.wrapperType,
            viewURL: result.trackViewUrl || result.collectionViewUrl,
            coverArt: result.artworkUrl100,
            description: result.description || result.longDescription || null
        }));      
        
        res.json(results);
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})

// get a data from the body and redirect it to /search/
app.post('/submit-form', (req, res) => {
    const title = req.body.searchData;
    const option = req.body.selectedOption;
    // redirect to the search route
    res.redirect(`/search/?title=${encodeURIComponent(title)}&option=${encodeURIComponent(option)}`);
});



app.listen(port, () => console.log(`Listening engaged at port ${port}`))

