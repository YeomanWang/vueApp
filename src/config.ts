const apiUrl = import.meta.env.MODE === 'development' 
  ? import.meta.env.VITE_API_URL_DEVELOPMENT 
  : import.meta.env.VITE_API_URL_PRODUCTION;

export default apiUrl ;
