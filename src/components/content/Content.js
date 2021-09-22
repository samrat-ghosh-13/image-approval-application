// redux
import { useSelector, useDispatch } from "react-redux";

// redux actions and selectors
import {
  getImages,
  getApprovedImages,
  fetchImagesAsync,
  approved,
  rejected,
} from "../../features/images/imageSlice";

// components
import PlaceholderComponent from "../placeholder/Placeholder";
import ButtonComponent from "../button/Button";

// icons - impoting svgs as react component
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
  &.first {
    margin-left: 0;
  }
`;

const ContentComponent = () => {
  // creating select and dispatch instance from
  const images = useSelector(getImages);
  const approvedImages = useSelector(getApprovedImages);
  const dispatch = useDispatch();

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
        handleClick={() => dispatch(fetchImagesAsync())}
        type={type}
      />
    );
  };

  const showThumbnails = () => {
    return (
      <ThumbnailsContainer>
        {approvedImages.map((image, index) => {
          return (
            <Thumbnails
              key={image.id}
              className={index === 0 ? "first" : ""}
              src={image.urls.thumb}
              alt={image.alt}
            />
          );
        })}
      </ThumbnailsContainer>
    );
  };

  const handleCancel = () => {
    dispatch(rejected(images));
    dispatch(fetchImagesAsync());
  };

  const handleClick = () => {
    dispatch(approved(images));
    dispatch(fetchImagesAsync());
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
