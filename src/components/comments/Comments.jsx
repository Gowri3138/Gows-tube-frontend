import "./comments.css";
import Avatar from "../custom/Avatar";
import Comment from "./Comment";
import { useContext } from "react";
import { AppContext } from "../../context/AppContext";
import default_avatar from "../../assets/default.png"
import PropTypes from "prop-types";

Avatar.propTypes = {
  size: PropTypes.number.isRequired,
  src: PropTypes.string, // src prop is optional
};

export default function Comments() {
  const { state } = useContext(AppContext);

  return (
    <div className={`comments ${state?.theme}`}>
      <div className="comments-wrapper">
        <h4>23 Comments</h4>
        <form onSubmit={() => {}} className="comment-form">
          <div className="inputs-wrapper">
            <Avatar size={35} src={default_avatar} />
            <textarea required placeholder="Enter your comment" />
          </div>
          <div className="inputs-actions">
            <button onClick={() => {}}>Clear</button>
            <button onClick={() => {}} type="submit">
              Comment
            </button>
          </div>
        </form>

        <div className="comment-list">
          {[...Array(4)].map((item, index) => (
            <Comment key={index} />
          ))}
        </div>
      </div>
    </div>
  );
}