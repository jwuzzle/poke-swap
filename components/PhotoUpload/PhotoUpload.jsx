const PhotoUpload = (props) => {

  return (
    <div className="photoupload">
    <input type="file" multiple name="card-media" accept="image/*" onChange={props.update}></input>
    </div>
  )
}

export default PhotoUpload