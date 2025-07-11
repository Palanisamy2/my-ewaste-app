// import React, { useState } from 'react';
// import axios from 'axios';
// import { toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import '../styles/Register.css';

// const Register = () => {
//     const [username, setUsername] = useState('');
//     const [password, setPassword] = useState('');
//     const [email, setEmail] = useState('');

//     const handleRegister = async () => {
//         try {
//             await axios.post('http://localhost:5000/api/auth/signup', { username, password, email });

//             // ✅ Success toast
//             toast.success('Registration successful!', {
//                 position: 'top-right',
//                 autoClose: 3000,
//                 hideProgressBar: false,
//                 closeOnClick: true,
//                 pauseOnHover: true,
//                 draggable: true,
//                 theme: 'colored',
//             });

//         } catch (error) {
//             // ❌ Error toast
//             toast.error('Registration failed! Please try again.', {
//                 position: 'top-right',
//                 autoClose: 3000,
//                 hideProgressBar: false,
//                 closeOnClick: true,
//                 pauseOnHover: true,
//                 draggable: true,
//                 theme: 'colored',
//             });
//         }
//     };

//     return (
//         <div className='register-background'>
//             <div className="container">
//                 <div className='register-container'>
//                     <h2>Let me know who you are?</h2>
//                     <input type="text" placeholder="Username" onChange={(e) => setUsername(e.target.value)} />
//                     <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
//                     <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
//                     <button className='register-btn' onClick={handleRegister}>Register</button>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default Register;

import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import '../styles/Register.css';

const Register = () => {
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        email: '',
        phone: '',
        location: '',
        profileImage: ''
    });

    const validateEmail = (email) => {
        const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return pattern.test(email);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleEmailBlur = () => {
        if (formData.email) {
            if (validateEmail(formData.email)) {
                toast.success('Valid email address!', { theme: 'colored' });
            } else {
                toast.error('Invalid email address!', { theme: 'colored' });
            }
        }
    };

    const handlePhoneChange = (value) => {
        setFormData(prev => ({ ...prev, phone: value }));
    };

    const handleRegister = async () => {
        if (!validateEmail(formData.email)) {
            toast.error('Invalid email address!', { theme: 'colored' });
            return;
        }
        if (formData.phone.length < 10) {
            toast.error('Invalid phone number!', { theme: 'colored' });
            return;
        }

        console.log("Form Data:", formData);
        try {
            await axios.post('http://localhost:5000/api/auth/signup', formData);
            toast.success('Registration successful!', { theme: 'colored' });
            setFormData({
                username: '',
                password: '',
                email: '',
                phone: '',
                location: '',
                profileImage: ''
            });
        } catch (error) {
            toast.error('Registration failed! Please try again.', { theme: 'colored' });
        }
    };

    return (
        <div className="register-background">
            <div className="register-card">
                <h2>Create Your Profile</h2>
                <div className="profile-img-preview">
                    <img
                        src={formData.profileImage || 'https://i.pravatar.cc/150'}
                        alt="Preview"
                    />
                </div>
                <input type="text" name="profileImage" placeholder="Profile Image URL (optional)" onChange={handleChange} />
                <input type="text" name="username" placeholder="Full Name" onChange={handleChange} />
                <input
                    type="email"
                    name="email"
                    placeholder="Email Address"
                    value={formData.email}
                    onChange={handleChange}
                    onBlur={handleEmailBlur} // 👈 validate after leaving the email field
                />
                
                <PhoneInput
                    country={'in'}
                    value={formData.phone}
                    onChange={handlePhoneChange}
                    inputStyle={{ width: '100%' }}
                />

                <input type="text" name="location" placeholder="City / Location" onChange={handleChange} />
                <input type="password" name="password" placeholder="Password" onChange={handleChange} />
                <button className="register-btn" onClick={handleRegister}>Register</button>
                <p style={{ marginTop: '1rem', color: '#666' }}>
                    Already have an account? <a href="/login" style={{ color: '#667eea', fontWeight: 'bold' }}>Login</a>
                </p>
            </div>
        </div>
    );
};

export default Register;