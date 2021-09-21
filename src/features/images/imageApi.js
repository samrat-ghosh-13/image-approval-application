// importing create api from unplash js package
import { createApi } from "unsplash-js";

// creating an instance object with the access key of Samrat Ghosh
const unsplash = createApi({
  accessKey: "j9uTA5oNJnt0M3l5gcX3w_SGwqXhFSvlBaJ3umqjguY",
});

// method to fetch random images and return the data
export const fetchImages = () => {
  return unsplash.photos.getRandom();
};
