// assets
import plusIcon from "../../assets/add.png";

// styles with styled components
import styled from "styled-components";

const Placeholder = styled.div`
  background-color: #f7f7f7;
  border-radius: 4px;
  border: 0.5px solid #dbdbdb;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  max-width: 1240px;
  width: ${(props) =>
    props.type === "default" ? "calc(100vw - 48px)" : "104px"};
  height: ${(props) => (props.type === "default" ? "400px" : "64px")};
`;

const Image = styled.img`
  height: 24px;
  width: 24px;
`;

/**
 * @name PlaceholderComponent
 * @description method to create the placeholder component
 * @returns placeholder component
 */
const PlaceholderComponent = ({ handleClick, ...props }) => {
  return (
    <Placeholder onClick={() => handleClick()} {...props}>
      <Image src={plusIcon} alt="plus icon" />
    </Placeholder>
  );
};

export default PlaceholderComponent;
