# Half Double Game

This is a game I created using Create React App

## About The Game

### In Game Variables:
- **Timer:** 60 second countdown for the players current game session.
- **Target Number:** A random multiple of 2 selected by my algorithm.
- **Current Number:** The players current number.
- **Score:** The number of times the user matched their current number with the Target number in the current game session.

### Game Play:
- When the game begins the algorithm assigns a target number as a multiple of 2. 
- Player uses their device arrows, or in game buttons to either double (right arrow) or half (left arrow) the current number until it matches the target number.
- When player matches the current number to the target number, a point is added to the score and the target number is reassigned.

### Players Goal:
Match your current number with the target number as many times as you can before the timer runs out.

## [Click Here to Launch The Game](https://zevsaloff.github.io/half-double/)


# Developer notes

To deploy to github: "yarn build, git commit -m "commit message", git push origin master"
To deploy to github pages: "yarn deploy"
