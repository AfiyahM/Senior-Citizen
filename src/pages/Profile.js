import React, { useEffect, useState } from 'react';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [userId, setUserId] = useState(localStorage.getItem('userId') || null);
  const [token, setToken] = useState(localStorage.getItem('token') || null);
  const [isSignup, setIsSignup] = useState(false); // Toggle between login and signup
  const [loading, setLoading] = useState(false); // Loading state for API calls
  const [error, setError] = useState(null); // Error handling state


  // Function to check if the token is expired (JWT specific)
  const isTokenExpired = (token) => {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.exp * 1000 < Date.now();
    } catch {
      return true;
    }
  };

  // Fetch user profile
  const fetchProfile = async () => {
    if (!userId || !token || isTokenExpired(token)) {
      handleLogout();
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`http://localhost:5000/api/auth/signup`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setProfile(data);
        setError(null); // Clear any previous errors
      } else if (response.status === 401) {
        console.error('Unauthorized. Token might be invalid or expired.');
        handleLogout();
      } else {
        setError('Failed to fetch profile.');
        setProfile(null);
      }
    } catch (error) {
      setError('Error fetching profile. Please try again later.');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, [userId, token]);

  // Handle login or signup success
  const handleAuthSuccess = (userId, token) => {
    setUserId(userId);
    setToken(token);
    localStorage.setItem('userId', userId);
    localStorage.setItem('token', token);
    fetchProfile();
  };

  // Handle logout
  const handleLogout = () => {
    setUserId(null);
    setToken(null);
    setProfile(null);
    localStorage.removeItem('userId');
    localStorage.removeItem('token');
  };

  // Toggle between login and signup forms
  const toggleForm = () => {
    setIsSignup(!isSignup);
  };

  // Show login/signup form if no token exists
  if (!token) {
    return (
      <div>
        {isSignup ? (
          <SignupForm onSignupSuccess={handleAuthSuccess} />
        ) : (
          <LoginForm onLoginSuccess={handleAuthSuccess} />
        )}
        <button onClick={toggleForm}>
          {isSignup ? 'Already have an account? Login' : 'Need an account? Signup'}
        </button>
      </div>
    );
  }

  // Show loading indicator while fetching the profile
  if (loading) return <div>Loading...</div>;

  // Handle errors in profile fetching
  if (error) return <div>{error}</div>;

  // Display user profile
  return (
    <div>
      <h2>Profile</h2>
      <p>Total Watch Time: {profile?.totalWatchTime || 0} seconds</p>
      <h3>Badges</h3>
      <ul>
        {profile?.badges?.length > 0 ? (
          profile.badges.map((badge, index) => <li key={index}>{badge}</li>)
        ) : (
          <li>No badges earned yet</li>
        )}
      </ul>
      <h3>Quiz Scores</h3>
      <ul>
        {profile?.quizScores?.length > 0 ? (
          profile.quizScores.map((quiz, index) => (
            <li key={index}>
              {quiz.videoId}: {quiz.score}
            </li>
          ))
        ) : (
          <li>No quiz scores available</li>
        )}
      </ul>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Profile;
