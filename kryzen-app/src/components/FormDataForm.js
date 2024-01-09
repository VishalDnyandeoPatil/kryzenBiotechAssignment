import React, { useState } from 'react';
import axios from 'axios';

const FormDataForm = () => {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [address, setAddress] = useState('');
  const [photo, setPhoto] = useState(null);

  const handleFormSubmit = async () => {
    try {
      // const userId = 'user_id_placeholder';
      // Use FormData to handle file uploads
      const formData = new FormData();
      formData.append('name', name);
      formData.append('age', age);
      formData.append('address', address);
      formData.append('photo', photo);

      // Make a POST request to the backend
      await axios.post('http://localhost:4500/api/form/submit', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });

    //   if (!name || !age || !address || !photo) {
    //     // Handle missing form fields (show error message, etc.)
    //     console.error('Please fill in all required fields.');
    //     return;
    //   }

    //   const user={name:name,age:age,address:address,photo:photo}

    //   const token = localStorage.getItem('token');

    // const response = await fetch('http://localhost:4500/api/form/submit', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //     'Authorization': `Bearer ${token}`,
    //   },
    //   body: JSON.stringify(user),
    // });

    // if (!response.ok) {
    //   throw new Error(`HTTP error! Status: ${response.status}`);
    // }

      console.log('Form submitted successfully');

      // Handle success, e.g., show a success message or redirect
    } catch (error) {
      console.error('Form submission error:', error);
      // Handle form submission error (display error message, etc.)
    }
  };

  // const handelImageupload=(e)=>{
  //   e.preventDefault();
  //   setPhoto(e.target.files[0])
  // }
  // console.log(name,age,address,photo);

  return (
    <div>
      <h2>Data Collection Form</h2>
      <input type="text" placeholder="Name" onChange={(e) => setName(e.target.value)} />
      <input type="number" placeholder="Age" onChange={(e) => setAge(e.target.value)} />
      <input type="text" placeholder="Address" onChange={(e) => setAddress(e.target.value)} />
      <input type="file" accept="image/*" onChange={(e) => setPhoto(e.target.files[0])} />
      <button onClick={handleFormSubmit}>Submit Form</button>
    </div>
  );
};

export default FormDataForm;
