import React from 'react';
import renderer from 'react-test-renderer';
import FavouriteComponent from '../components/FavouriteComponent';

test('FavouriteComponent renders correctly', () => {

    // array that contains favourites
    const favourites = [
        {
            name: "Harry Potter and the Sorcerer's Stone",
            kind: "feature-movie",
            viewURL: "https://itunes.apple.com/us/movie/harry-potter-and-the-sorcerers-stone/id271469503?uo=4",
            coverArt: "https://is1-ssl.mzstatic.com/image/thumb/Video126/v4/68/0a/36/680a3626-b96c-4d04-0bd6-859ecf79299b/pr_source.jpg/100x100bb.jpg",
            description: "In this enchanting film adaptation of J.K. Rowling's delightful bestseller, Harry Potter learns on his 11th birthday that he is the orphaned first son of two powerful wizards and possesses magical powers of his own. At Hogwarts School of Witchcraft and Wizardry, Harry embarks on the adventure of a lifetime. He learns the high-flying sport Quidditch and plays a thrilling game with living chess pieces on his way to face a Dark Wizard bent on destroying him. For the most extraordinary adventure, see you on platform nine and three quarters!"
        }
    ];

    // check if the snapshots match
    const tree = renderer
        .create(<FavouriteComponent favourites={favourites} />)
        .toJSON();
    expect(tree).toMatchSnapshot();
});
