// src/pages/ConnectingWithFamily.js
import React from 'react';
import VideoPlayer from '../components/VideoPlayer';
import "./ConnectingWithFamily.module.css"

const videos = [
  { title: 'Using WhatsApp', url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ' },
  { title: 'Video Calls with Zoom', url: 'https://www.youtube.com/watch?v=5qap5aO4i9A' },
];

const ConnectingWithFamily = () => (
  <div>
    <h2>Connecting with Family Videos</h2>
    {videos.map((video, index) => (
      <div key={index}>
        <h3>{video.title}</h3>
        <VideoPlayer url={video.url} />
      </div>
    ))}
  </div>
);

export default ConnectingWithFamily;
