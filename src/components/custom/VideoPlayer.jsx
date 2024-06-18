import "./videoplayer.css";
import { getVideoUrl } from "../../services/services";
import PropTypes from 'prop-types'; 

VideoPlayer.propTypes = {
  video: PropTypes.shape({
    videoUrl: PropTypes.string.isRequired,
    // Define other properties of the 'video' object if needed
  }).isRequired,
};

export default function VideoPlayer({ video }) {

  const videoUrl = getVideoUrl(video.videoUrl);
  return (
    <div className="video-player">
      <video src={videoUrl} controls />
    </div>
  );
}