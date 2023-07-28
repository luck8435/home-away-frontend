/* eslint-disable react/prop-types */
const Image = ({ src, ...rest }) => {
  return <img {...rest} src={src} alt="" />;
};

export default Image;
