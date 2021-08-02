import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import axios from "axios";
import { showErrMsg } from '../../../utils/notification/Notification'
import ReactMultiSelectCheckboxes from 'react-multiselect-checkboxes';


const options = [
  { label: 'DHL', value: 1 },
  { label: 'Mail', value: 2 },
  { label: 'method2', value: 3 },
  { label: 'method3', value: 4 },
  { label: 'method4', value: 5 },
];

const paymentOptions = [
  { label: 'Cash', value: 1 },
  { label: 'Paypal', value: 2 },
  { label: 'Visa', value: 3 },
  { label: 'Bank', value: 4 },
];

const initialState = {
  name: '',
  address: '',
  phone: '',
  email: '',
  city: '',
  stateProvince: '',
  description: ''
}
function ShopForm() {
  const [data, setData] = useState(initialState)
  const [shipmentMethods, setShipmentMethods] = useState([])
  const [paymentMethods, setPaymentMethods] = useState([])
  const [err, setErr] = useState("")


  const token = useSelector(state => state.token)

  useEffect(() => {
    setShipmentMethods([...options])
  }, [])

  function onChange(value, event) {
    if (event.action === "select-option" && event.option.value === "*") {
      this.setState(this.options);
    } else if (
      event.action === "deselect-option" &&
      event.option.value === "*"
    ) {
      this.setState([]);
    } else if (event.action === "deselect-option") {
      this.setState(value.filter((o) => o.value !== "*"));
    } else if (value.length === this.options.length - 1) {
      this.setState(this.options);
    } else {
      this.setState(value);
    }
  }

  function onPaymentChange(value, event) {
    if (event.action === "select-option" && event.option.value === "*") {
      this.setState(this.options);
    } else if (
      event.action === "deselect-option" &&
      event.option.value === "*"
    ) {
      this.setState([]);
    } else if (event.action === "deselect-option") {
      this.setState(value.filter((o) => o.value !== "*"));
    } else if (value.length === this.options.length - 1) {
      this.setState(this.options);
    } else {
      this.setState(value);
    }
  }

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value })
  }


  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log(paymentMethods)

    if ((data.name === "") || (data.address === "") || (data.phone === "") || (data.email === "") || (data.city === "") || (data.stateProvince === "") || data.description === "") {
      console.log("Err", data)
      return setErr("All marked fields are required");
    }

    try {
      const payload = {
        name: data.name,
        description: data.description,
        address: data.address,
        phone: [data.phone],
        email: data.email,
        city: data.city,
        stateProvince: data.stateProvince,
        shipmentMethod: shipmentMethods,
        paymentMethod: paymentMethods
      }
      const part = await axios.post(`/api/shop/create`, payload, {
        headers: { Authorization: token }
      });
      console.log("Shop Created")
    } catch (error) {
      // console.log("something went wrong")
      setErr("something went wrong")
    }
  }
  return (
    <form className="shop_form_items" onSubmit={handleSubmit}>
      <div>
        {err ? showErrMsg(err) : <h2>FIND YOUR PARTS NOW</h2>}
      </div>
      <div className="shop_form_item">
        <label htmlFor="name">Business Name: </label>
        <input type="text"
          name="name"
          placeholder="example car yard"
          value={data.name}
          onChange={handleChange} />
      </div>

      <div className="shop_form_item">
        <label htmlFor="address">Address: </label>
        <input type="text" name="address" placeholder="address"
          value={data.address}
          onChange={handleChange} />
      </div>

      <div className="shop_form_item">
        <label htmlFor="phone">Phone: </label>
        <input type="text" name="phone" placeholder="phone"
          value={data.phone}
          onChange={handleChange} />
      </div>


      <div className="shop_form_item">
        <label htmlFor="email">Email: </label>
        <input type="email" name="email" placeholder="email"
          value={data.email}
          onChange={handleChange} />
      </div>

      <div className="shop_form_item">
        <label htmlFor="city">City: </label>
        <select name="city" value={data.city}
          onChange={handleChange}>
          <option value="new_york">new york</option>
          <option value="new_york">DC</option>
          <option value="new_york">city</option>
        </select>
      </div>

      <div className="shop_form_item">
        <label htmlFor="stateProvince">State / Province: </label>
        <select name="stateProvince" value={data.stateProvince}
          onChange={handleChange}>
          <option value="new_york">new york</option>
          <option value="new_york">new york</option>
          <option value="new_york">new york</option>
        </select>
      </div>

      <div className="shop_form_item">
        <label htmlFor="stateProvince">Shipment Methods: </label>
        <ReactMultiSelectCheckboxes
          options={[{ label: "All", value: "*" }, ...options]}
          placeholderButtonLabel="Shipment Methods:"
          value={shipmentMethods}
          onChange={onChange}
          setState={setShipmentMethods}
        />
      </div>

      <div className="shop_form_item">
        <label htmlFor="stateProvince">Payment Methods: </label>
        <ReactMultiSelectCheckboxes
          options={[{ label: "All", value: "*" }, ...paymentOptions]}
          placeholderButtonLabel="Payment Methods:"
          value={paymentMethods}
          onChange={onPaymentChange}
          setState={setPaymentMethods}
        />
      </div>

      <div className="shop_form_item">
        <label htmlFor="description">Description: </label>
        <textarea id="description" name="description" rows="2" cols="20"
          value={data.description}
          onChange={handleChange}
        >
          Business Description
        </textarea>
      </div>

      <div className="shop_form_item btn">
        <button type="submit">Create</button>
      </div>

    </form>
  )
}

export default ShopForm
