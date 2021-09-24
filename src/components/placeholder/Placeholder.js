// prop-types
import { func, string } from "prop-types";

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
 * @param {*} handleClick callback function
 * @param {*} type type of placeholder, default or normal
 * @param {*} rest of the props in case of any
 * @returns placeholder component
 */
const PlaceholderComponent = ({ handleClick, type, ...props }) => {
  return (
    <Placeholder
      className="placeholder"
      onClick={() => handleClick()}
      type={type}
      {...props}
    >
      <Image className="placeholder__image" src={plusIcon} alt="plus icon" />
    </Placeholder>
  );
};

PlaceholderComponent.propTypes = {
  handleClick: func.isRequired,
  type: string.isRequired,
};

export default PlaceholderComponent;
