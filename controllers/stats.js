'use strict';

import logger from '../utils/logger.js';
import playlistStore from '../models/playlist-store.js';

const stats = {
  createView(request, response) {
    logger.info('Stats page loading!');
    
    const playlists = playlistStore.getAllPlaylists() || [];
    const numPlaylists = playlists.length;
    
    const numSongs = playlists.reduce((total, playlist) => {
      return total + (playlist.songs ? playlist.songs.length : 0);
    }, 0);
    
    const average = numPlaylists > 0 ? (numSongs / numPlaylists).toFixed(2) : '0.00';
    
    let totalRating = 0;
    let maxRating = 0;
    
    if (numPlaylists > 0) {
      totalRating = playlists.reduce((total, playlist) => {
        const rating = parseInt(playlist.rating, 10);
        return total + (isNaN(rating) ? 0 : rating);
      }, 0);
      
      const validRatings = playlists
        .map(playlist => parseInt(playlist.rating, 10))
        .filter(rating => !isNaN(rating));
        
      if (validRatings.length > 0) {
        maxRating = Math.max(...validRatings);
      }
    }
    
    const avgRating = numPlaylists > 0 ? (totalRating / numPlaylists).toFixed(2) : '0.00';
    
    const maxRatedPlaylists = playlists.filter(playlist => parseInt(playlist.rating, 10) === maxRating);
    const favTitles = maxRatedPlaylists.map(playlist => playlist.title);

    const statistics = {
      displayNumPlaylists: numPlaylists,
      displayNumSongs: numSongs,
      displayAverage: average,
      displayAvgRating: avgRating,
      highest: maxRating,
      displayFav: favTitles
    };

    const viewData = {
      title: 'Playlist App Statistics',
      stats: statistics
    };

    response.render('stats', viewData);
  },
};

export default stats;
