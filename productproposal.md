# Tiketas

## Serbian PoC Cinema Platform

This document describes the technical specifications to be taken in account for agents working on this project.

We are using TanStack Start as the base scaffolding of this project, with ESLint, Tailwind and Nitro added to the project.

The core objective is to develop a mock website of a Cinema selling tickets for movies, alongside beverages and snacks to go alongside purchases.

Mock means the following:
- No backend for communication
- No deep persistence necessary, localStorage in browser is enough for simple persistence to fake a backend

Movie data you will use is outlined in the assets/data JSON files, accompanied by their posters and backdrops in assets/img

All pages will keep a navigation bar at the top, logo on the left. 

Home page will have a section with a backdrop image of a random movie, on top of which there will be the name of the movie, when is it being screened at this fake cinema (You will need to generate additional json files that will store screening dates for the provided movies, we only need maybe 4-5 days in advance schedules, use the json files provided to cross reference IDs)

Underneath that backdrop, the next section will just be a row of movie posters, name of movie and their screening date. Clicking either those or the backdrop of the main movie section above will direct to a details page.

The details page will have the backdrop of the movie, an embedded youtube video of a trailer for that movie, since these JSONs dont contain a trailer video i think, please instead use a sample youtube embed if there is no trailer field in the json.

Also put in some details about the movie on the right side, underneath there should be an availability table with ticket prices and a for now non functional Buy Ticket button.



