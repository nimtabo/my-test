import React, { useState, useEffect } from "react";
import { useSelector } from 'react-redux'
import axios from 'axios';
import FileUpload from "./file-upload";

function Upload() {
  const [newUserInfo, setNewUserInfo] = useState({
    profileImages: []
  });

  const token = useSelector(state => state.token)


  const updateUploadedFiles = (files) =>
    setNewUserInfo({ profileImages: [...files] });

  const handleSubmit = async (event) => {
    event.preventDefault();
    // let formData = new FormData();

    // for (const key of Object.keys(newUserInfo.profileImages)) {
    //   formData.append('profileImages', newUserInfo.profileImages[key])
    // }
    // axios.post("/api/upload_images", formData, {
    // }).then(response => {
    //   console.log((response.data))
    // })

    // let formData = new FormData()
    // formData.append('profileImages', newUserInfo.profileImages)
    try {
      let formData = new FormData();

      // for (const key of Object.keys(newUserInfo.profileImages)) {
      //   formData.append('profileImages', newUserInfo.profileImages[key])
      // }
      for (let img of newUserInfo.profileImages) {
        formData.append('profileImages', img)
        console.log({ img })
      }

      // axios.post("/api/upload_images", formData, {
      // }).then(res => {
      //   console.log(res.data)
      // }).catch(err => console.log(err.message))
      console.log({ formData })
      const response = await axios.post(`/api/upload_images`, formData, {
        // headers: { 'content-type': 'multipart/form-data', Authorization: token }
        headers: { 'content-type': 'multipart/form-data' }
      });
      console.log({ res: response.data })
    } catch (error) {
      console.log({ error })
    }
  };


  return (
    <div>
      <form onSubmit={handleSubmit}>
        <FileUpload
          accept=".jpg,.png,.jpeg"
          label="Upload Images"
          multiple
          updateFilesCb={updateUploadedFiles}
        />
        <button type="submit">Upload</button>
      </form>
    </div>
  );
}

export default Upload;