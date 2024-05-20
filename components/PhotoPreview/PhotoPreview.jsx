import './PhotoPreview.scss';

const PhotoPreview = (props) => {
  return (
    <div className="preview">
      <h3 className="preview__title">preview:</h3>
      <div className="preview__image-container">
        <img className="preview__image" src={props.preview} alt="text" />
      </div>
    </div>
  );
};

export default PhotoPreview;
