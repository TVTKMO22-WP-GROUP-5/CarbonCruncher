import axios from 'axios'

export const BASE_URL = "https://carbon-cruncher.azurewebsites.net/api/";

export const ENDPOINTS = {
  visu1: {
    monthly: 'visu1/monthly/',
    annual: 'visu1/annual/',
  },
  visu2: {
    monthly: 'visu2/monthly/',
    annual: 'visu2/annual/',
    icecore: 'visu2/icecore/',
  }
}

export const createAPIEndpoint = endpoint => {

  let url = BASE_URL + endpoint;
  return {
    fetch: () => axios.get( url ),
    //fetchById: id => axios.get( url + id ),
    //post: newRecord => axios.post( url, newRecord ),
    //put: ( id, updatedRecord ) => axios.put( url + id, updatedRecord ),
    //delete: id => axios.delete( url + id ),
  }
}