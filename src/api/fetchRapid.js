import axios from "axios";

const BASE_URL = 'https://youtube-v31.p.rapidapi.com';
const options = {
  params: {
    maxResults: '50'
  },
  headers: {
    'X-RapidAPI-Key':'07611baa4cmsh15ebb59b25072ffp179c96jsn169d0fbc99c5',
    'X-RapidAPI-Host': 'youtube-v31.p.rapidapi.com'
  }
};

export async function fetchFromApi(url){
    const res = await axios.get(`${BASE_URL}/${url}`,options)
    return res.data;
} 