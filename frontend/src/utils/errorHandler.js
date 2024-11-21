export const handleApiError = (error) => {
    if (error.response) {
      // The request was made and the server responded with a status code
      console.error('Server Error:', error.response.data);
      return error.response.data.message || 'An error occurred';
    } else if (error.request) {
      // The request was made but no response was received
      console.error('Network Error:', error.request);
      return 'Network error. Please check your connection.';
    } else {
      // Something happened in setting up the request that triggered an Error
      console.error('Error:', error.message);
      return 'An unexpected error occurred';
    }
  };