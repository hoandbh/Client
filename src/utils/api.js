import axios from 'axios';

const sendAuthenticatedRequest = async (url, method = 'GET', data = null) => {
  try {
    const token = localStorage.getItem("token");
    //if !token?
    const response = await axios({
      method,
      url,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data,
    });
    return response;
  } catch (error) {
    throw error;
  }
};

export default sendAuthenticatedRequest;
