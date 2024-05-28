import './PhotoPreview.scss';

const PhotoPreview = (props) => {


  return (
    <div className="preview">
      <h3 className="preview__title">preview:</h3>
      <div className="preview__image-container">
    {props.preview.map((preview,index) => (
      <img key={index} className="preview__image" src={preview} alt="text" />
    ))}
      </div>
    </div>
  );
};

export default PhotoPreview;
