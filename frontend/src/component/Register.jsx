import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    fullname: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.username ||
      !formData.fullname ||
      !formData.email ||
      !formData.password ||
      !formData.confirmPassword
    ) {
      setErrorMessage('All fields are required.');
      setSuccessMessage('');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setErrorMessage('Passwords do not match!');
      setSuccessMessage('');
      return;
    }

    const API_URL = import.meta.env.VITE_BACKEND_API_URL;
    try {
      const response = await axios.post(`${API_URL}/user/register`, {
        username: formData.username,
        fullname: formData.fullname,
        email: formData.email,
        password: formData.password,
      });

      if (response.status === 200 || response.status === 201) {
        setErrorMessage('');
        setSuccessMessage('Registration successful!');
        setFormData({
          username: '',
          fullname: '',
          email: '',
          password: '',
          confirmPassword: '',
        });
        navigate('/home');
      }
    } catch (error) {
      setErrorMessage(
        error.response?.data?.message ||
          'Registration failed. Please try again.'
      );
      setSuccessMessage('');
    }
  };

  return (
    <div className='container mx-auto max-w-md p-4 bg-gray-100 rounded-lg shadow-md'>
      <form onSubmit={handleSubmit}>
        <div className='mb-4'>
          <label
            htmlFor='username'
            className='block text-gray-700 font-semibold mb-2'
          >
            Username
          </label>
          <input
            id='username'
            type='text'
            name='username'
            value={formData.username}
            onChange={handleChange}
            placeholder='Enter Username'
            className='w-full p-2 border rounded'
          />
        </div>

        <div className='mb-4'>
          <label
            htmlFor='fullname'
            className='block text-gray-700 font-semibold mb-2'
          >
            Fullname
          </label>
          <input
            id='fullname'
            type='text'
            name='fullname'
            value={formData.fullname}
            onChange={handleChange}
            placeholder='Enter Your Full Name'
            className='w-full p-2 border rounded'
          />
        </div>

        <div className='mb-4'>
          <label
            htmlFor='email'
            className='block text-gray-700 font-semibold mb-2'
          >
            Email
          </label>
          <input
            id='email'
            type='email'
            name='email'
            value={formData.email}
            onChange={handleChange}
            placeholder='Enter Your Email'
            className='w-full p-2 border rounded'
          />
        </div>

        <div className='mb-4'>
          <label
            htmlFor='password'
            className='block text-gray-700 font-semibold mb-2'
          >
            Password
          </label>
          <input
            id='password'
            type='password'
            name='password'
            value={formData.password}
            onChange={handleChange}
            placeholder='Enter Your Password'
            className='w-full p-2 border rounded'
          />
        </div>

        <div className='mb-4'>
          <label
            htmlFor='confirmPassword'
            className='block text-gray-700 font-semibold mb-2'
          >
            Confirm Password
          </label>
          <input
            id='confirmPassword'
            type='password'
            name='confirmPassword'
            value={formData.confirmPassword}
            onChange={handleChange}
            placeholder='Confirm Your Password'
            className='w-full p-2 border rounded'
          />
        </div>

        <div className='mb-4'>
          {errorMessage && <p className='text-red-600'>{errorMessage}</p>}
          {successMessage && <p className='text-green-600'>{successMessage}</p>}
        </div>

        <div className='text-center'>
          <button
            type='submit'
            className='bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600'
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default Register;
