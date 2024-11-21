// src/pages/CategoryVideos.js
import React, { useState } from 'react';
import VideoPlayer from './VideoPlayer';

const CategoryVideos = ({ categoryName }) => {
  const [searchText, setSearchText] = useState('');

  const videos = {
    gettingStarted: [
      { title: 'Smartphone Basics', url: 'https://www.youtube.com/watch?v=ysz5S6PUM-U' },
      { title: 'Computer Basics', url: 'https://www.youtube.com/watch?v=lX6JcybgDFo' },
    ],
    connectingWithFamily: [
      { title: 'Using WhatsApp', url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ' },
      { title: 'Video Calls with Zoom', url: 'https://www.youtube.com/watch?v=5qap5aO4i9A' },
    ],
    healthWellness: [
      { title: 'Fitness Apps Overview', url: 'https://www.youtube.com/watch?v=3Z2J5RNXUuM' },
      { title: 'Managing Health Apps', url: 'https://www.youtube.com/watch?v=Ks-_Mh1QhMc' },
    ],
  };

  const categoryVideos = videos[categoryName] || [];
  const filteredVideos = categoryVideos.filter(video => 
    video.title.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <div>
      <h2>{categoryName.replace(/([A-Z])/g, ' $1').trim()} Videos</h2>
      <input
        type="text"
        placeholder="Search videos..."
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
      />
      <div className="video-list">
        {filteredVideos.length > 0 ? (
          filteredVideos.map((video, index) => (
            <div key={index} className="video-item">
              <h3>{video.title}</h3>
              <VideoPlayer url={video.url} />
            </div>
          ))
        ) : (
          <p>No videos available for this search term.</p>
        )}
      </div>
    </div>
  );
};

export default CategoryVideos;
