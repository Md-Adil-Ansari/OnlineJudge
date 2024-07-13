import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../Axios';
import mail from '../assets/mail.png';
import lock from '../assets/lock.png';
import logo from '../assets/logo.png';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';

function SetNewPassword() {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();
  const { userId, token } = useParams();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert('Passwords do not match!');
      return;
    }
    // Handle the set new password logic here
    await axiosInstance.post(`/users/reset-password/${userId}/${token}`, { password })
      .then((res) => {
        console.log(res);

        toast.success(res.data.message, { autoClose: 1000 });
        setTimeout(() => {
          navigate('/');
        }, 1000);
      }
      )
      .catch((error) => {
        const extractedMessage = error.response.data.message;
        toast.error(extractedMessage, { autoClose: 2000 });
      });
  };

  return (
    <div className='h-screen flex items-center justify-center bg-[#fede85]'>
        <ToastContainer/>
        <div   className='flex flex-wrap justify-between  xl:mx-60 bg-[#1a1a1a] border-2 border-black rounded-lg shadow-xl shadow-white m-3 xl:p-0'>
            <div className="p-8  w-full xl:w-[500px] flex justify-center"><img src={logo}  className="h-auto w-[300px] " alt="AD logo" /></div>
            <div class="bg-[#1a1a1a] p-8 rounded-lg xl:w-[450px] shadow-md w-full mt-16 xl:mt-0 ">
            <h3 class="text-2xl font-semibold mb-4 text-center text-[#e6c15b]" ><strong>RESET PASSWORD</strong></h3>
            <form onSubmit={handleSubmit} >
                <div className="mb-8 flex items-center ">
                    <img src={lock} className=" w-12 h-[43px] mt-1"alt="lock" />
                    <input type="password" required value={password}
              onChange={(e) => setPassword(e.target.value)} id="password" placeholder='Enter new password' name="password" className="mt-1 p-2 w-full border rounded-sm" />
                </div>
                <div className="mb-8 flex items-center ">
                    <img src={lock} className=" w-12 h-[43px] mt-1"alt="lock" />
                    <input type="password" required value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)} id="password" placeholder='Renter new password' name="resetpassword" className="mt-1 p-2 w-full border rounded-sm" />
                </div>

                <div className='flex flex-row justify-between'>
                    <button type="submit" className="bg-[#cba640] text-white px-2 py-1 rounded-sm hover:bg-[#e6c771]">Update</button>
                    <Link to='/'><div  className="bg-[#cba640] text-white px-2 py-1 rounded-sm hover:bg-[#edd07d]">Login Area</div></Link>
                </div>
            </form>
        </div>
        </div>
    </div>
);
}

export default SetNewPassword;
