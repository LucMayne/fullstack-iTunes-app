import React from "react";
import { createRoot } from "react-dom/client";
import FavouritesState from "../components/FavouritesState";

test("FavouritesState renders without crashing", () => {
  // create a container for the FavouritesState component
  const container = document.createElement("div");
  // append the container to the document body
  document.body.appendChild(container);

  // render the FavouritesState component into the container
  createRoot(container).render(<FavouritesState />);

  // remove the container because it was appended
  document.body.removeChild(container);
});
