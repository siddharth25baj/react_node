import './App.css';
import React, { useState, useEffect } from 'react';
import TextField from '@material-ui/core/TextField';
import Alert from '@material-ui/lab/Alert';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import { constants } from "./constants/constants";

function App() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobileNo] = useState('');
  const [address, setAddress] = useState('');
  const [tab, setTab] = useState(1)
  const [nameError, setNameError] = useState(false)
  const [emailError, setEmailError] = useState(false)
  const [mobileError, setMobileError] = useState(false)
  const [addressError, setAddressError] = useState(false)
  const [invalidEmail, setInvalidEmail] = useState(false)
  const [update, setUpdate] = useState(false)
  const [allData, setAllData] = useState([]);
  const [message, setMessage] = useState(false);

  useEffect(() => {
    getData()
  }, [])

  const getData = async () => {
    await axios.get(`${constants.hostURL}/user`)
      .then(response => setAllData(response.data.response));
  }

  const onSubmit = async (event) => {
    // event.preventDefault();
    if (mobile === '') return setMobileError(true)
    if (address === '') return setAddressError(true)

    const data = {
      name: name,
      email: email,
      mobileNo: mobile,
      address: address
    }
    if (update) {
      edit()
    }
    else {
      await axios.post(`${constants.hostURL}/user`, data)
        .then(response => {
          if (response.status === 200) {
            setMessage('Added successfully')
          }
        })
    }
    setTab(1)
    setName('');
    setMobileNo('');
    setAddress('');
    setEmail('');
  }

  const handleEdit = (rowData) => {
    setName(rowData.name);
    setMobileNo(rowData.mobileNo);
    setEmail(rowData.email);
    setAddress(rowData.address);
    setUpdate(rowData.id)
  }

  const edit = async () => {
    const data = {
      name: name,
      mobileNo: mobile,
      emailId: email,
      address: address
    }
    axios.put(`${constants.hostURL}/user/${update}`, data)
      .then(res => setMessage('Updated successfully'))
    getData()
    setTab(1)
    setName('');
    setMobileNo('');
    setAddress('');
    setEmail('');
  }

  const onDelete = async (id) => {
    await axios.delete(`${constants.hostURL}/user/${id}`)
      .then(res => setMessage('Deleted successfully'))
    getData()
  }

  const changeName = (value) => {
    setName(value)
    if (value !== '') setNameError(false)
  }

  const changeEmail = (value) => {
    setEmail(value)
    let valid = validateEmail(value)
    if (!valid) setInvalidEmail(true)
    if (valid) setInvalidEmail(false)
    if (value !== '') setEmailError(false)
  }

  const changMobile = (value) => {
    setMobileNo(value)
    if (value !== '') setMobileError(false)
  }

  const changeAddress = (value) => {
    setAddress(value)
    if (value !== '') setAddressError(false)
  }

  const handlePriTabs = () => {
    setTab(1)
  }

  const handleTabs = () => {
    if (name === '') return setNameError(true)
    if (email === '') return setEmailError(true)
    setTab(2)
  }

  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  return (
    <div className="App">
      <form onSubmit={onSubmit}>
        {message && <Alert severity="success">{message}</Alert>}
        <div style={{ display: tab === 1 ? 'block' : 'none' }}>

          <TextField
            id="standard-basic"
            label="Name"
            onChange={(e) => changeName(e.target.value)}
            value={name}
          /><br />
          {nameError && <><labe className="error">Please enter name</labe><br /></>}

          <TextField
            id="standard-basic"
            label="Email ID"
            onChange={(e) => changeEmail(e.target.value)}
            value={email}
            required={true}
          /><br /><br />
          {(emailError || invalidEmail) && <><labe className="error">Please enter valid email</labe><br /><br /></>}

         
          <Button
            variant="contained"
            color="primary"
            disabled={invalidEmail}
            onClick={handleTabs}
          >Next
          </Button>
        </div>

        <div style={{ display: tab === 2 ? 'block' : 'none' }}>
          <TextField id="standard-basic"
            label="Mobile No"
            onChange={(e) => changMobile(e.target.value)}
            value={mobile}
            type="number"
            onInput={(e) => {
              e.target.value = Math.max(0, parseInt(e.target.value)).toString().slice(0, 10)
            }}
          /><br />
          {mobileError && <><labe className="error">Please enter mobile no.</labe><br /></>}

          <TextField
            id="standard-basic"
            label="Address"
            onChange={(e) => changeAddress(e.target.value)}
            value={address}
          /><br />
          {addressError && <labe className="error">Please enter name</labe>}

          <div style={{ marginTop: 30 }}>
          <Button
            variant="contained"
            color="primary"
            disabled={tab===1}
            onClick={handlePriTabs}
          >Previous
          </Button>
          &nbsp;
            <Button
              variant="contained"
              color="primary"
              type='submit'
            >{update ? 'Update' : 'Save'}
            </Button>
          </div>
        </div>
      </form>

      <table style={{ marginLeft: "auto", marginRight: "auto", marginTop: 50, width: "90%", border: "1px solid black", borderCollapse: "collapse" }}>
        {
          allData.length > 0 &&
          <thead>
            <td style={{ border: "1px solid black" }}>S.No.</td>
            <td style={{ border: "1px solid black" }}>Name</td>
            <td style={{ border: "1px solid black" }}>Email ID</td>
            <td style={{ border: "1px solid black" }}>Mobile Number</td>
            <td style={{ border: "1px solid black" }}>Address</td>
            <td style={{ border: "1px solid black" }}>Action</td>
          </thead>
        }

        {
          allData.length > 0 ? (
            allData.map((data, index) => (
              <tbody>
                <td style={{ border: "1px solid black" }}>{index + 1}</td>
                <td style={{ border: "1px solid black" }}>{data.name}</td>
                <td style={{ border: "1px solid black" }}>{data.email}</td>
                <td style={{ border: "1px solid black" }}>{data.mobileNo}</td>
                <td style={{ border: "1px solid black" }}>{data.address}</td>
                <td style={{ border: "1px solid black" }}><Button onClick={() => handleEdit(data)}>edit</Button><Button onClick={() => onDelete(data.id)}>delete</Button></td>
              </tbody>
            ))) :
            <td>No data available</td>
        }

      </table>
    </div>
  );
}

export default App;