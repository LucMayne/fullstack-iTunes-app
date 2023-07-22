import React from "react";
import { createRoot } from "react-dom/client";
import DisplayComponent from "../components/DisplayComponent";

test("DisplayComponent renders without crashing", () => {
    // create a div container for DisplayComponent
    const div = document.createElement("div");

    // create test functions for onToggleFavourite and showFavourites
    const onToggleFavourite = jest.fn();
    const showFavourites = jest.fn();
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
    

    // test if the component renders with the props created
    createRoot(div).render(
        <DisplayComponent
        onToggleFavourite={onToggleFavourite}
        showFavourites={showFavourites}
        favourites={favourites}
        />
    );
});

