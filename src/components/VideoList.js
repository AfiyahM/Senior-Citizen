import React, { useEffect, useState } from 'react';

function VideoList() {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    fetch('/api/videos')
      .then(response => response.json())
      .then(data => setVideos(data))
      .catch(error => console.error('Error fetching videos:', error));
  }, []);

  return (
    <div>
      <h1>Video Tutorials</h1>
      <ul>
        {videos.map(video => (
          <li key={video._id}>
            <h2>{video.title}</h2>
            <p>{video.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default VideoList;
