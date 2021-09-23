// redux
import { useSelector, useDispatch } from "react-redux";

// redux actions and selectors
import {
  getImages,
  getApprovedImages,
  getRejectedImages,
  fetchImagesAsync,
  approved,
  rejected,
  updateImage,
  getLoadingState,
} from "../../features/images/imageSlice";

// components
import PlaceholderComponent from "../placeholder/Placeholder";
import ButtonComponent from "../button/Button";
import LoaderComponent from "../loader/Loader";

// icons
// impoting svgs as react component
// importing pngs
import { ReactComponent as ApproveIcon } from "../../assets/approve.svg";
import { ReactComponent as CancelIcon } from "../../assets/cancel.svg";
import plusIcon from "../../assets/add.png";

// utils
import { debounce } from "../../utils/utils";

// styles with styled components
import styled from "styled-components";

const Content = styled.div`
  max-width: 1240px;
  margin: 0 auto;
  margin-top: 60px;
  padding: 24px;
  overflow: hidden;
`;

const ApprovedImagesText = styled.p`
  color: #0000ff;
  font-weight: 700;
`;

const ImageContainer = styled.div`
  margin: 24px 0;
`;

const Image = styled.img`
  width: calc(100vw - 48px);
  max-width: 1240px;
  height: auto;
  border-radius: 4px;
`;

const PlusImage = styled.img`
  height: 16px;
  width: 16px;
  margin: 0 4px;
`;

const Hr = styled.hr`
  margin: 24px 0;
  color: #ededed;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 24px;
  margin-bottom: 40px;
`;

const DefaultMessage = styled.p`
  text-align: center;
`;

const ThumbnailsContainer = styled.div`
  display: flex;
  width: calc(100vw - 48px);
  max-width: 1240px;
  overflow-x: scroll;
`;

const Thumbnails = styled.img`
  width: 60px;
  height: 60px;
  margin-left: 16px;
  border-radius: 4px;
  cursor: pointer;
  &.first {
    margin-left: 0;
  }
`;

/**
 * @name ContentComponent
 * @description method to create the content component
 * @returns content component
 */
const ContentComponent = () => {
  // created the below to get the states from the store
  const images = useSelector(getImages);
  const approvedImages = useSelector(getApprovedImages);
  const rejectedImages = useSelector(getRejectedImages);
  const isLoading = useSelector(getLoadingState);

  // creating an instance of dispatch
  const dispatch = useDispatch();

  // fetchImages is used to trigger the fetchImagesAsync dispatch
  // that fetches the images from unsplash, if the images are part of
  // rejected images then it will go to handleRejectedImages method
  const fetchImages = async () => {
    await dispatch(fetchImagesAsync());
    if (images.id in rejectedImages) {
      handleRejectedImages();
    }
  };

  // retryCount is used to track the number of retries, max 5 is allowed for the scenario where
  // 5 random images are already part of the rejected state
  let retryCount = 0;

  // handleRejectedImages gets triggered from fetchImages, it will check the rejected state and call
  // fetchImages again to make the API call to fetch the images. In a scenario where 5 random images are already part of the rejected state
  // it will update the retry count to 0 and update the current image state to empty or {}
  const handleRejectedImages = () => {
    if (retryCount < 5) {
      retryCount += 1;
      fetchImages();
    } else if (retryCount >= 5) {
      retryCount = 0;
      dispatch(updateImage());
    }
  };

  // handleCancel gets triggered from the cancel button
  // it dispatch the rejected image method and then calls the fetch images method
  const handleCancel = () => {
    dispatch(rejected(images));
    fetchImages();
  };

  // debounceApprovedClick debounces the approved button click for the 0.5 secs
  // aggregates the method call as this triggers an API call
  // continuos clicks can create unnecessary overhead
  const debounceRejectedClick = debounce(() => handleCancel(), 500);

  // handleClick gets triggered from the debounceApprovedClick aggregating the calls made in 2 secs
  // it dispatch the approved image method and then calls the fetch images method
  const handleClick = () => {
    dispatch(approved(images));
    fetchImages();
  };

  // debounceApprovedClick debounces the approved button click for the 0.5 secs
  // aggregates the method call as this triggers an API call
  // continuos clicks can create unnecessary overhead
  const debounceApprovedClick = debounce(() => handleClick(), 500);

  // JSX methods begins here
  // JSX for images
  const showImages = () => {
    return (
      <ImageContainer>
        <Image key={images.id} src={images.urls.regular} alt={images.alt} />
      </ImageContainer>
    );
  };

  // JSX for placeholder
  const showPlaceholder = (type) => {
    return (
      <PlaceholderComponent
        handleClick={() => handleRejectedImages()}
        type={type}
      />
    );
  };

  // JSX for thumbnails
  const showThumbnails = () => {
    return (
      <ThumbnailsContainer>
        {approvedImages.map((image, index) => {
          return (
            <a
              key={image.id}
              target="_blank"
              rel="noopener noreferrer"
              href={image.urls.full}
              download={image.description}
            >
              <Thumbnails
                key={image.id}
                className={index === 0 ? "first" : ""}
                src={image.urls.thumb}
                alt="thumbnails"
              />
            </a>
          );
        })}
      </ThumbnailsContainer>
    );
  };

  // JSX for buttons
  const showButtonContainer = () => {
    return (
      <ButtonContainer>
        <ButtonComponent
          type="cancel"
          handleClick={() => debounceRejectedClick()}
        >
          <CancelIcon />
        </ButtonComponent>
        <ButtonComponent
          type="check"
          handleClick={() => debounceApprovedClick()}
        >
          <ApproveIcon />
        </ButtonComponent>
      </ButtonContainer>
    );
  };

  // JSX for default message
  const showDefaultMessage = () => {
    return (
      <DefaultMessage>
        Click on the <PlusImage src={plusIcon} alt="plus icon" /> in order to
        get image recommendations from Unsplash
      </DefaultMessage>
    );
  };

  // JSX that gets returned by the content component
  return (
    <Content>
      {isLoading ? <LoaderComponent /> : ""}
      <ApprovedImagesText>
        Approved Images ({approvedImages.length})
      </ApprovedImagesText>
      {approvedImages.length ? showThumbnails() : showPlaceholder("normal")}
      <Hr />
      {Object.keys(images).length ? showImages() : showPlaceholder("default")}
      <Hr />
      {Object.keys(images).length
        ? showButtonContainer()
        : showDefaultMessage()}
    </Content>
  );
};

export default ContentComponent;
