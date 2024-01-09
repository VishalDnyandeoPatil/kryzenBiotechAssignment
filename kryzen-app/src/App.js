import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import DataForm from './components/DataForm';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/data-form" element={<DataForm />} /> 
        {/* Add other routes as needed */}
      </Routes>
    </Router>
  );
};

export default App;
