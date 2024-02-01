import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store/store.js';
import SignUp from './components/SignUp.jsx';
import Home from './Pages/Home.jsx';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import RegisterForm from './components/RegisterForm.jsx';
function App() {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={<SignUp />} />
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/home" element={<Home />} />

        </Routes>
      </Router>
      <ToastContainer position="top-center" />
    </Provider>
  );
}

export default App;
