# ![tomato](source/img/tomato.png)  TomatoTime  

Link: https://helenphan0.github.io/tomatotime/

TomatoTime is a single-page React game in which players guess the Rotten Tomato Rating and the runtime of 10 different movies. 

# Usage

When the game begins, a random movie poster will show every 20 seconds. Players earn points when they guess the movie's rating or duration correctly. The countdown will reset for each correct guess.

Points are based on the time remaining in miliseconds, multiplied by a modifier determined by how close the guess is to the exact answer. When both the rating and time are guessed correctly, players can move on to the next poster with the 'Next' button.

At the end of the game, the player can reset the game to return to the start.

# Technology

- This site was built with React, Babel, and webpack.
- Movie data is retrieved at random through AJAX calls to The Movie Database (TMBd) API and The Open Movie Database (OMDb) API.