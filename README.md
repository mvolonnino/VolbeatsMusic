# VOLBEATS MUSIC

## ABOUT

This project utilizes the Spotify Web API to create a Spotify Clone with updated themes and UI features.

Uses Spotify's authentication to be able to gain access to the user's Spotify profile and playlists they have created. Once authenticated, you will be granted access to Volbeats Music, which will allow the user to see user's top playlists, look through the user's liked songs, and pick any song to have playback through a connected Spotify Device.

## Live Demo

![Demo of Volbeats Music](src/img/Volbeats%20Music.gif)

**Link** - [Watch with volume](https://drive.google.com/file/d/1o6-waenxrvnvMfdrwBpVC0lHfhGnwBNa/view)

**Link** - [Volbeats Music](https://volbeats-music.web.app/)

**TO PLAY MUSIC**

`User must either open the Spotify Application on their computer or open Spotify on the Web Browser so that they have an active device. Device icon by volume slider will show if you have any active devices. If after clicking the link to activate a device, and the device shows "Web Player", play a song of the Spotify Web Player to activate the device. You can pause the song after it starts playing in Spotify. Once you have an active device that shows in the device icon, you should be able to play any song of Volbeats Music. There is a quirk that comes with the Spotify Web Player where music might not start unless you are on that tab, so you might have to click back into the Spotify tab to have the music play. That step should only have to be done once and only if your not using the actual Spotify App for computer.`

**Best Way**

`Open the Spotify App on your computer and then sign in to Volbeats Music`

**Authentication Tokens last for 1 hour**

## Functionality

As of now functionality is at 95%. Every Playlist can be played that is in your Playlists section with every song being selected (with a limit off first 100 songs for right now), your entire liked library of songs, and Discover Weekly playlist located in Home section.

**FUNCTIONALITY THAT WORKS**

- Big Play button works as 'shuffle'
- Play, Skip, Previous in footer fully functional
- Device Icon functional to show connected devices
- Volume Controls fully functional - both slider and volume up and down buttons
- Avatar button that links to user Spotify Profile and Logout
- Progress Bar for Song - Seeking
- Repeat Button - one click turns on to continue playing next song, two clicks and repeats same song
- Play Pause icon now functional next to selected or playing song
- Shuffle Button in footer now shuffles next song to be played
- Heart Icons work as for adding or removing from user liked tracks.
- Toast for some 404 error handling. More to come

## Future Updates

- ~~Seek - able to utilize the slider and seek to the current time in the song~~
- Ability to get access to whole playlist if over the allowed limit of 100 - already have this issue solved for Your Library
- ~~Play Pause icon next to Song when song is selected~~
- ~~Shuffle Button in footer~~
- ~~Repeat Button in footer~~
- ~~Ability to ADD or REMOVE songs from Liked Library / Playlists~~
- Search Feature to either search from your current playlist OR hopefully Spotify library of songs
- Error Handling - have all errors in a catch, will then display them to user

### Technologies Utilized

- React
- Context API
- HTML5
- CSS
- Material UI
- Animations
- Spotify Web API
- Firebase Hosting

### Contributing Author(s)

- Matt Volonnino :
  - {
    - [GitHub Repository](https://github.com/mvolonnino)
    - [Email](mailto:mvolonnino12@gmail.com)
  - }
