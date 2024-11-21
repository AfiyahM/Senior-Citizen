// src/services/videoService.js

export async function fetchVideos() {
    const response = await fetch('/api/videos');
    if (!response.ok) {
      throw new Error('Failed to fetch videos');
    }
    return await response.json();
  }
  
  export async function submitFeedback(videoId, rating, comment) {
    const response = await fetch('/api/feedback', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ videoId, rating, comment }),
    });
    if (!response.ok) {
      throw new Error('Failed to submit feedback');
    }
    return await response.json();
  }
  