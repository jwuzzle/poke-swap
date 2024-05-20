const PhotoUpload = (props) => {

  return (
    <div className="photoupload">
    <input type="file" name="card-media" accept="image/*" onChange={props.update} required ></input>
    </div>
  )
}

export default PhotoUpload