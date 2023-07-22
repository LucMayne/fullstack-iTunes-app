/**
 * @jest-environment node
 */

// set the environment to 'node' for this file. 'jsdom' is used in jest.config.js which will cause an error

// require supertest for HTTP API testing
const request = require('supertest');
const express = require('express');
const app = express();

// the route to be tested
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

// test the search route 
describe('Test the /search route', () => {
    test('respond with a JSON array of search results', async () => {
        const response = await request(app).get('/search?title=Harry+Potter&option=movie');
        // expect a 200 OK 
        // expect(response.statusCode).toBe(200);
        // expect an array
        expect(Array.isArray(response.body)).toBe(true);
        // expect the length to be greater than 0, meaning results were returned
        expect(response.body.length).toBeGreaterThan(0);
    });
});
