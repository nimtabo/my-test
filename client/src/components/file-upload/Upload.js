import React, { Component } from 'react';
import axios from 'axios';

export default class UploadComponent extends Component {

  constructor(props) {
    super(props);

    this.onImgChange = this.onImgChange.bind(this);
    this.onUpload = this.onUpload.bind(this);

    this.state = {
      imagesArray: ''
    }
  }

  onImgChange(event) {
    this.setState(
      {
        imagesArray: [...this.state.imagesArray, ...event.target.files]
      }
    )
  }

  onUpload(event) {
    event.preventDefault()
    let formData = new FormData();

    for (const key of Object.keys(this.state.imagesArray)) {
      formData.append('profileImages', this.state.imagesArray[key])
    }
    axios.post("/api/upload_images", formData, {
    }).then(response => {
      console.log((response.data))
    })
    console.log({ formData })
  }

  render() {
    return (
      <div>
        <form onSubmit={this.onUpload}>


          <div className="form-group">
            <input className="form-control form-control-lg mb-3" type="file" multiple name="imagesArray" onChange={this.onImgChange} />
          </div>

          <div className="d-grid">
            <button className="btn btn-danger" type="submit">Submit</button>
          </div>
        </form>
      </div>
    )
  }
}