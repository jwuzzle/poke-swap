import './PhotoPreview.scss';

const PhotoPreview = (props) => {


  return (
    <div className="preview">
      <h3 className="preview__title">preview:</h3>
      <div className="preview__image-container">
    {props.preview.map((previews,index) => (
      <img key={index} className="preview__image" src={previews} alt="text" />
    ))}
      </div>
    </div>
  );
};

export default PhotoPreview;
