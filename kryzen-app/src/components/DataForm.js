import React, { useState } from 'react';
import axios from 'axios';

const DataForm = () => {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [address, setAddress] = useState('');
  const [photo, setPhoto] = useState(null); 

  const handleFormSubmit = async () => {
    try {
      
      const userId = 'user_id_placeholder';

      const formData = new FormData();
      formData.append('userId', userId);
      formData.append('name', name);
      formData.append('age', age);
      formData.append('address', address);
      formData.append('photo', photo);

      await axios.post('http://localhost:4500/api/users/submit-form', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log('Form submitted successfully');
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <div>
      <h2>Data Collection Form</h2>
      <label>Name:</label>
      <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
      <label>Age:</label>
      <input type="number" value={age} onChange={(e) => setAge(e.target.value)} />
      <label>Address:</label>
      <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} />
      <label>Photo:</label>
      <input type="file" accept="image/*" onChange={(e) => setPhoto(e.target.files[0])} />
      <button onClick={handleFormSubmit}>Submit Form</button>
    </div>
  );
};

export default DataForm;
