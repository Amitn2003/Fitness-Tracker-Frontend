export const fetchClient = async (url, options = {}) => {
    try {
      const response = await fetch(url, options);
      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.message || 'Something went wrong');
      }
      return result;
    } catch (error) {
      console.error('Fetch Error:', error);
      throw error;
    }
  };
  