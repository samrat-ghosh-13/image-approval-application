// import { randomPhotosUrl } from "../../configs/apiEndPoint";

//       "Access-key": "j9uTA5oNJnt0M3l5gcX3w_SGwqXhFSvlBaJ3umqjguY",
//       "Secret-Key": "jGFunw2jDxXNTuuOiA8NLVLjOwnff3R1xxcwkNZxkYk",

import { createApi } from "unsplash-js";

const unsplash = createApi({
  accessKey: "j9uTA5oNJnt0M3l5gcX3w_SGwqXhFSvlBaJ3umqjguY",
  // `fetch` options to be sent with every request
  headers: { "X-Custom-Header": "foo" },
});

export const fetchImages = () => {
  const data = unsplash.photos.getRandom(
    // { photoId: "123" },
    // `fetch` options to be sent only with _this_ request
    { headers: { "X-Custom-Header-2": "bar" } }
  );
  return data;
};
