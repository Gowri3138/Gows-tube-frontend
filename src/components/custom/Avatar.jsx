import noprofile from "../../assets/default.png";
import PropTypes from 'prop-types';

// Define propTypes outside of the component function
Avatar.propTypes = {
  src: PropTypes.string.isRequired,
  size: PropTypes.number,
  radius: PropTypes.string,
};

export default function Avatar({ src = noprofile, size, radius }) {
  const style = {
    height: size ? `${size}px` : "40px",
    width: size ? `${size}px` : "40px",
    borderRadius: radius || "50%",
    overflow: "hidden",
  };
  
  return (
    <div className="avatar" style={style}>
      <img
        src={src}
        alt="avatar"
        style={{ height: "100%", width: "100%", objectFit: "cover" }}
      />
    </div>
  );
}