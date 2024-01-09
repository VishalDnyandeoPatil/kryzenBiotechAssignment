import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import FormDataForm from './components/FormDataForm';
import FormDataDisplay from './components/FormDataDisplay';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/form" element={<FormDataForm />} /> 
        <Route path="/preview" element={<FormDataDisplay />} /> 
        {/* Add other routes as needed */}
      </Routes>
    </Router>
  );
};

export default App;
