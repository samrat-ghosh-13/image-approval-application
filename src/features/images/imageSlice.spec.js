// importing the reducer and actions
import imageReducer, { approved, rejected, updateImage } from "./imageSlice";

// testing the store using the reducers and the actions
describe("image reducer", () => {
  const initialState = {
    fetchedImages: {},
    approvedImages: {},
    rejectedImages: {},
    loading: false,
  };

  const demoImage = {
    id: "fyJT9e0HEEI",
    width: 2377,
    height: 4226,
    color: "#0c2640",
    description: "JELLYFISH",
    alt_description: "white jellyfish in blue water",
    urls: {
      raw: "https://images.unsplash.com/photo-1631111687608-86d3095e16df?ixid=MnwyNjIxMzJ8MHwxfHJhbmRvbXx8fHx8fHx8fDE2MzIzNzcxMDM&ixlib=rb-1.2.1",
      full: "https://images.unsplash.com/photo-1631111687608-86d3095e16df?crop=entropy&cs=srgb&fm=jpg&ixid=MnwyNjIxMzJ8MHwxfHJhbmRvbXx8fHx8fHx8fDE2MzIzNzcxMDM&ixlib=rb-1.2.1&q=85",
      regular:
        "https://images.unsplash.com/photo-1631111687608-86d3095e16df?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyNjIxMzJ8MHwxfHJhbmRvbXx8fHx8fHx8fDE2MzIzNzcxMDM&ixlib=rb-1.2.1&q=80&w=1080",
      small:
        "https://images.unsplash.com/photo-1631111687608-86d3095e16df?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyNjIxMzJ8MHwxfHJhbmRvbXx8fHx8fHx8fDE2MzIzNzcxMDM&ixlib=rb-1.2.1&q=80&w=400",
      thumb:
        "https://images.unsplash.com/photo-1631111687608-86d3095e16df?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyNjIxMzJ8MHwxfHJhbmRvbXx8fHx8fHx8fDE2MzIzNzcxMDM&ixlib=rb-1.2.1&q=80&w=200",
    },
    links: {
      self: "https://api.unsplash.com/photos/fyJT9e0HEEI",
      html: "https://unsplash.com/photos/fyJT9e0HEEI",
      download: "https://unsplash.com/photos/fyJT9e0HEEI/download",
      download_location:
        "https://api.unsplash.com/photos/fyJT9e0HEEI/download?ixid=MnwyNjIxMzJ8MHwxfHJhbmRvbXx8fHx8fHx8fDE2MzIzNzcxMDM",
    },
  };

  it("should handle the initial state", () => {
    const actual = imageReducer(initialState, { type: "unknown" });
    expect(actual.fetchedImages).deep.equal({});
  });

  it("should handle new images", () => {
    const actual = imageReducer(initialState, updateImage(demoImage));
    expect(actual.fetchedImages).to.eq(demoImage);
  });

  it("should handle approved images", () => {
    const actual = imageReducer(initialState, approved(demoImage));
    expect(
      Object.values(actual.approvedImages).find(
        (item) => item.id === demoImage.id
      )
    ).to.eq(demoImage);
  });

  it("should handle rejected images", () => {
    const actual = imageReducer(initialState, rejected(demoImage));
    expect(
      Object.values(actual.rejectedImages).find(
        (item) => item.id === demoImage.id
      )
    ).to.eq(demoImage);
  });
});
