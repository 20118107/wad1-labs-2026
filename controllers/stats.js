"use strict";
import logger from "../utils/logger.js";
import playlistStore from "../models/playlist-store.js";

const stats = {
  createView(request, response) {
    logger.info("Stats page loading!");

    const playlists = playlistStore.getAllPlaylists();

    let numPlaylists = playlists.length;
    
    let numSongs = playlists.reduce((total, playlist) => total + playlist.songs.length, 0);
	
	  let average = numPlaylists > 0 ? (numSongs / numPlaylists).toFixed(2) : 0;


    const statistics = {
      displayNumPlaylists: numPlaylists,
      displayNumSongs: numSongs,
	    displayAverage: average
    }

    const viewData = {
      title: "Playlist App Statistics",
      stats: statistics
    };
  
    response.render("stats", viewData);
  },
};

export default stats;
