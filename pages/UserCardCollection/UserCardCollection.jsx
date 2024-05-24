import React from 'react'

const UserCardCollection = () => {

    const token = sessionStorage.getItem("JWTtoken");
  let decoded = null;
  if (token) {
    decoded=jwtDecode(token);
    console.log(decoded);
  }


  return (
    <div>UserCardCollection</div>
  )
}

export default UserCardCollection