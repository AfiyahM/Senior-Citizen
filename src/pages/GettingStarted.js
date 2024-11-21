import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const GettingStarted = () => {
  const navigate = useNavigate();

  // Define a state for videos
  const [videos, setVideos] = useState([
    {
      title: 'Smartphone Basics',
      description: 'Learn the basics of using a smartphone, including settings, apps, and essential features.',
      videoId: 'm2rTyhaFIOY?si=eSyVQtkc9PsU43Au' 
    },
    {
      title: 'Computer Basics',
      description: 'Understand the fundamentals of using a computer, including file management and system settings.',
      videoId: 'm2rTyhaFIOY?si=eSyVQtkc9PsU43Au' // replace with actual video ID
    },
    {
      title: 'Internet Safety for Beginners',
      description: 'An introduction to safe internet practices for new users.',
      videoId: 'm2rTyhaFIOY?si=eSyVQtkc9PsU43Au' // replace with actual video ID
    }
  ]);

  useEffect(() => {
    // Fetch videos from the backend
    fetch('http://localhost:5000/api/videos')
      .then(response => response.json())
      .then(data => setVideos(data))
      .catch(error => console.error("Error fetching videos:", error));
  }, []);

  const handleVideoClick = (video) => {
    navigate(`/video-player/${video.videoId}`, {
      state: {
        title: video.title,
        description: video.description
      }
    });
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Getting Started Videos</h2>
      <div style={styles.videoList}>
        {videos.map((video, index) => (
          <div key={index} style={styles.videoItem} onClick={() => handleVideoClick(video)}>
            <img
              src={`https://img.youtube.com/vi/${video.videoId}/hqdefault.jpg`}
              alt={video.title}
              style={styles.thumbnail}
            />
            <div style={styles.videoInfo}>
              <h3 style={styles.videoTitle}>{video.title}</h3>
              <p style={styles.videoDescription}>{video.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const styles = {
  container: {
    padding: '20px',
    maxWidth: '800px',
    margin: '0 auto',
    fontFamily: 'Arial, sans-serif'
  },
  heading: {
    fontSize: '24px',
    fontWeight: 'bold',
    marginBottom: '20px',
    textAlign: 'center',
    color: '#333'
  },
  videoList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px'
  },
  videoItem: {
    display: 'flex',
    alignItems: 'flex-start',
    padding: '15px',
    border: '1px solid #ddd',
    borderRadius: '8px',
    backgroundColor: '#f9f9f9',
    cursor: 'pointer'
  },
  thumbnail: {
    width: '120px',
    height: '90px',
    borderRadius: '8px',
    marginRight: '15px',
    flexShrink: 0
  },
  videoInfo: {
    display: 'flex',
    flexDirection: 'column'
  },
  videoTitle: {
    fontSize: '18px',
    fontWeight: 'bold',
    color: '#555'
  },
  videoDescription: {
    fontSize: '14px',
    color: '#777',
    marginBottom: '10px'
  }
};

export default GettingStarted;
