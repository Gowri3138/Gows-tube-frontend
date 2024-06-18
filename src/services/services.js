import axios from 'axios';
import Cookies from 'js-cookie';

const baseURL = import.meta.env.VITE_API_BASE_URL;

const request = axios.create({ baseURL, withCredentials: true });

// Function to get the access token from cookies
const getAccessToken = () => {
  const accessToken = Cookies.get('accessToken');
  console.log('Access Token:', accessToken); // Add this log to verify token retrieval
  return accessToken;
};

// Request interceptor to add the token to headers
request.interceptors.request.use(
  (config) => {
  const token = getAccessToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
      console.log('Authorization header set with token:', token); // Log to verify token setting
    } else {
      console.log('Token not found'); // Log to check if token is missing
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Auth services
export const loginAsync = (creds) => request.post("/auth/login", creds);
export const registerAsync = (creds) => request.post("/auth/register", creds);

// Channel services
export const getChannelAsync = (channelId) => request.get(`/channels/${channelId}`);
export const updateChannelAsync = (channelId, data) => request.put(`/channels/${channelId}`, data);
export const subscribeChannelAsync = (channelId) => request.put(`/channels/subscribe/${channelId}`, { channelId });
export const unsubscribeChannelAsync = (channelId) => request.put(`/channels/unsubscribe/${channelId}`, { channelId });

// Videos services
export const getVideosAsync = (search = "") => request.get(`/videos${search}`);
export const getVideosByChannelIdAsync = (channelId) => request.get(`/videos/channel/${channelId}`);
export const getVideoAsync = (videoId) => request.get(`/videos/${videoId}`);
export const createVideoAsync = (data) => request.post(`/videos`, data, {
  withCredentials: true,
  headers: {
    Authorization: `Bearer ${getAccessToken()}`,
  }
});
export const updateVideoAsync = (videoId, data) => request.put(`/videos/${videoId}`, data);
export const deleteVideoAsync = (videoId) => request.delete(`/videos/${videoId}`);
export const likeVideoAsync = (videoId) => request.put(`/videos/like/${videoId}`, { videoId });
export const dislikeVideoAsync = (videoId) => request.put(`/videos/dislike/${videoId}`, { videoId });

// Upload services
export const uploadCoverAsync = (cover) => request.post("/uploads/covers", cover, {
  withCredentials: true,
  headers: {
    Authorization: `Bearer ${getAccessToken()}`,
  }
});
export const uploadProfileAsync = (profile) => request.post("/uploads/profiles", profile, {
  withCredentials: true,
  headers: {
    Authorization: `Bearer ${getAccessToken()}`,
  }
});
export const uploadVideoAsync = (video) => request.post("/uploads/videos", video, {
  withCredentials: true,
  headers: {
    Authorization: `Bearer ${getAccessToken()}`,
  }
});
export const uploadBannerAsync = (banner) => request.post("/uploads/banners", banner, {
  withCredentials: true,
  headers: {
    Authorization: `Bearer ${getAccessToken()}`,
  }
});

// Helpers
export const getProfileUrl = (profile) => `https://res.cloudinary.com/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/image/upload/v1/profiles/${profile}`;
export const getBannerUrl = (banner) => `https://res.cloudinary.com/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/image/upload/v1/banners/${banner}`;
export const getCoverUrl = (cover) => `https://res.cloudinary.com/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/image/upload/v1/covers/${cover}`;
export const getVideoUrl = (video) => `https://res.cloudinary.com/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/video/upload/v1/videos/${video}`;
