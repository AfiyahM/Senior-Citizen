import React, { useEffect, useState } from 'react';

const VideoPlayer = () => {
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [feedback, setFeedback] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [watchTime, setWatchTime] = useState(0);
  const [quizScore, setQuizScore] = useState('');
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [badgeAwarded, setBadgeAwarded] = useState(false);
  const userId = "current_user_id"; // Replace with actual user ID from authentication

  // Fetch a single video from the backend
  useEffect(() => {
    fetch('http://localhost:5000/api/videos')
      .then((response) => response.json())
      .then((data) => {
        if (data.length > 0) {
          setSelectedVideo(data[0]);
        }
      })
      .catch((error) => console.error('Error fetching video:', error));
  }, []);

  // Track watch time in seconds
  useEffect(() => {
    let interval;
    if (selectedVideo) {
      interval = setInterval(() => {
        setWatchTime(prevWatchTime => prevWatchTime + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [selectedVideo]);

  // Save watch time to backend when component unmounts
  useEffect(() => {
    const saveWatchTime = () => {
      fetch(`http://localhost:5000/api/videos/watchTime`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId, watchTime }),
      }).catch((error) => console.error('Error updating watch time:', error));
    };

    window.addEventListener('beforeunload', saveWatchTime);
    return () => window.removeEventListener('beforeunload', saveWatchTime);
  }, [watchTime, selectedVideo, userId]);

  // Submit feedback
  const handleFeedbackSubmit = (e) => {
    e.preventDefault();
    if (selectedVideo) {
      setSubmitted(true);
      fetch('http://localhost:5000/api/feedback', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          videoId: selectedVideo._id,
          feedback,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log('Feedback submitted:', data);
          setFeedback('');
        })
        .catch((error) => console.error('Error submitting feedback:', error));
    }
  };

  // Handle quiz score submission
  const handleQuizSubmit = (e) => {
    e.preventDefault();
    if (quizScore && selectedVideo) {
      fetch(`http://localhost:5000/api/quiz/submit`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId,
          videoId: selectedVideo._id,
          score: quizScore,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log('Quiz submitted:', data);
          setQuizSubmitted(true);
          if (quizScore >= 80) {
            setBadgeAwarded(true);
          }
        })
        .catch((error) => console.error('Error submitting quiz score:', error));
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Video Tutorial</h2>

      {selectedVideo && (
        <div style={styles.videoSection}>
          <div style={styles.videoWrapper}>
            <iframe
              width="100%"
              height="400"
              src={`https://www.youtube.com/embed/${selectedVideo.videoId}`}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              style={styles.videoPlayer}
            ></iframe>
          </div>
          <div style={styles.videoDetails}>
            <h3 style={styles.videoTitle}>{selectedVideo.title}</h3>
            <p style={styles.videoDescription}>{selectedVideo.description}</p>
          </div>
        </div>
      )}

      {selectedVideo && (
        <div style={styles.feedbackSection}>
          <h3 style={styles.subHeading}>Feedback Form</h3>
          {submitted ? (
            <p style={styles.thankYouMessage}>Thank you for your feedback!</p>
          ) : (
            <form onSubmit={handleFeedbackSubmit} style={styles.feedbackForm}>
              <textarea
                placeholder="Enter your feedback here..."
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                style={styles.textArea}
                required
              />
              <button type="submit" style={styles.submitButton}>
                Submit Feedback
              </button>
            </form>
          )}
        </div>
      )}

      {selectedVideo && !quizSubmitted && (
        <div style={styles.quizSection}>
          <h3 style={styles.subHeading}>Quiz</h3>
          <form onSubmit={handleQuizSubmit} style={styles.quizForm}>
            <label>
              Enter Quiz Score (0 - 100):
              <input
                type="number"
                value={quizScore}
                onChange={(e) => setQuizScore(e.target.value)}
                style={styles.input}
                min="0"
                max="100"
                required
              />
            </label>
            <button type="submit" style={styles.submitButton}>
              Submit Quiz
            </button>
          </form>
        </div>
      )}

      {quizSubmitted && (
        <p style={styles.thankYouMessage}>
          Quiz submitted successfully!
          {badgeAwarded && <span> Congratulations! You've earned a badge.</span>}
        </p>
      )}
    </div>
  );
};

const styles = {
  container: {
    padding: '20px',
    maxWidth: '800px',
    margin: '0 auto',
    fontFamily: 'Arial, sans-serif',
  },
  heading: {
    fontSize: '24px',
    fontWeight: 'bold',
    marginBottom: '20px',
    textAlign: 'center',
    color: '#333',
  },
  videoSection: {
    marginBottom: '30px',
  },
  videoWrapper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  videoPlayer: {
    borderRadius: '8px',
  },
  videoDetails: {
    padding: '10px',
    backgroundColor: '#f9f9f9',
    borderRadius: '8px',
    border: '1px solid #ddd',
    marginTop: '20px',
  },
  videoTitle: {
    fontSize: '18px',
    fontWeight: 'bold',
    color: '#555',
    marginBottom: '10px',
  },
  videoDescription: {
    fontSize: '14px',
    color: '#777',
  },
  feedbackSection: {
    marginTop: '20px',
  },
  thankYouMessage: {
    color: '#28a745',
    fontSize: '16px',
  },
  feedbackForm: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
  },
  textArea: {
    width: '100%',
    height: '100px',
    padding: '10px',
    borderRadius: '8px',
    border: '1px solid #ddd',
    fontSize: '14px',
    fontFamily: 'Arial, sans-serif',
  },
  submitButton: {
    padding: '10px 20px',
    fontSize: '16px',
    fontWeight: 'bold',
    color: '#fff',
    backgroundColor: '#007bff',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
  },
  quizSection: {
    marginTop: '20px',
  },
  quizForm: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
  },
  input: {
    padding: '10px',
    fontSize: '14px',
    borderRadius: '8px',
    border: '1px solid #ddd',
  },
};

export default VideoPlayer;
