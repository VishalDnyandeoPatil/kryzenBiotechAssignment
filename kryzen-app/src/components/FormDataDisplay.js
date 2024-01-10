import React, { useState, useEffect } from 'react';
import axios from 'axios';
// import images from '../image'

const FormDataDisplay = () => {
    const [formData, setFormData] = useState(null);

    useEffect(() => {
        const fetchFormData = async () => {
            try {
                const response = await axios.get('http://localhost:4500/api/form/preview', {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    },
                });
                // console.log(response)

                setFormData(response.data);
            } catch (error) {
                console.error('Error fetching form data:', error);
            }
        };

        fetchFormData();
    }, []);

    const handleDownloadPDF = async () => {
        try {
          // Make a GET request to the backend to generate and download the PDF
          await axios.get('http://localhost:4500/api/form/generate-pdf', {
            responseType: 'blob',
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('token')}`,
            },
          }).then(response => {
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'formData.pdf');
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
          });
        } catch (error) {
          console.error('Error downloading PDF:', error);
          // Handle PDF download error
        }
        // window.open('http://localhost:4500/api/form/generate-pdf')
      };

      return (
        <div style={{padding:'10%'}}>
          <h2>Form Data Preview</h2>
          {formData ? (
            <div >
              <p>Name: {formData.name}</p>
              <p>Age: {formData.age}</p>
              <p>Address: {formData.address}</p>
              <img width='80%' height='50%' src={`http://localhost:4500/${formData?.photoUrl}`} alt="User" />
            </div>
          ) : (
            <p>Loading...</p>
          )}
          <button onClick={handleDownloadPDF}>Download PDF</button>
        </div>
      );
};

export default FormDataDisplay;
