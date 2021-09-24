// importing create api from unplash js package
import { createApi } from "unsplash-js";

// instantiating unsplash using createApi API with the access key of samrat ghosh
const unsplash = createApi({
  accessKey: "j9uTA5oNJnt0M3l5gcX3w_SGwqXhFSvlBaJ3umqjguY",
});

/**
 * @name fetchImages
 * @description method to fetch random images from unsplash using unsplash-js and return the data
 * @returns random photos
 */
export const fetchImages = () => {
  return unsplash.photos.getRandom();
};
