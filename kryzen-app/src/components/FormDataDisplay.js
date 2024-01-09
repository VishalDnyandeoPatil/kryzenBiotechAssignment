import React, { useState, useEffect } from 'react';
import axios from 'axios';

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

                setFormData(response.data);
            } catch (error) {
                console.error('Error fetching form data:', error);
            }
        };

        fetchFormData();
    }, []);

    return (
        <div>
            <h2>Form Data Preview</h2>
            {formData ? (
                <div>
                    <p>Name: {formData.name}</p>
                    <p>Age: {formData.age}</p>
                    <p>Address: {formData.address}</p>
                    <img src={`data:image/jpeg;base64,${formData.photo}`} alt="User" />
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

export default FormDataDisplay;
