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

const ContentComponent = () => {
  // creating select and dispatch instance from
  const images = useSelector(getImages);
  const approvedImages = useSelector(getApprovedImages);
  const rejectedImages = useSelector(getRejectedImages);
  const isLoading = useSelector(getLoadingState);
  const dispatch = useDispatch();

  const fetchImages = async () => {
    await dispatch(fetchImagesAsync());
    if (images.id in rejectedImages) {
      handleRejectedImages();
    }
  };

  let retryCount = 0;
  const handleRejectedImages = () => {
    if (retryCount < 5) {
      retryCount += 1;
      fetchImages();
    } else if (retryCount >= 5) {
      retryCount = 0;
      dispatch(updateImage());
    }
  };

  const handleCancel = () => {
    dispatch(rejected(images));
    fetchImages();
  };

  const handleClick = () => {
    dispatch(approved(images));
    fetchImages();
  };

  const showImages = () => {
    return (
      <ImageContainer>
        <Image key={images.id} src={images.urls.regular} alt={images.alt} />
      </ImageContainer>
    );
  };

  const showPlaceholder = (type) => {
    return (
      <PlaceholderComponent
        handleClick={() => handleRejectedImages()}
        type={type}
      />
    );
  };

  const showThumbnails = () => {
    return (
      <ThumbnailsContainer>
        {approvedImages.map((image, index) => {
          return (
            <>
              <a
                target="_blank"
                rel="noopener noreferrer"
                href={image.urls.full}
                download={image.description}
              >
                <Thumbnails
                  key={image.id}
                  className={index === 0 ? "first" : ""}
                  src={image.urls.thumb}
                  alt={image.alt}
                />
              </a>
            </>
          );
        })}
      </ThumbnailsContainer>
    );
  };

  const showButtonContainer = () => {
    return (
      <ButtonContainer>
        <ButtonComponent type="cancel" handleClick={() => handleCancel()}>
          <CancelIcon />
        </ButtonComponent>
        <ButtonComponent type="check" handleClick={() => handleClick()}>
          <ApproveIcon />
        </ButtonComponent>
      </ButtonContainer>
    );
  };

  const showDefaultMessage = () => {
    return (
      <DefaultMessage>
        Click on the <PlusImage src={plusIcon} alt="plus icon" /> in order to
        get image recommendations
      </DefaultMessage>
    );
  };

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
