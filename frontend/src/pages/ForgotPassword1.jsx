import React, { useState } from 'react';
import { useNavigate,Link } from 'react-router-dom';
import axiosInstance from '../Axios';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import mail from '../assets/mail.png';
import lock from '../assets/lock.png';
import logo from '../assets/logo.png';


const ForgotPassword = () => {
    const [email, setEmail] = useState('');

    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();

        await axiosInstance.post('/users/forgot-password', { email })
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
            <div   className='flex flex-wrap justify-between  xl:mx-60 bg-gray-950 border-2 border-black rounded-lg shadow-xl shadow-white m-3 xl:p-0'>
                <div className="p-8  w-full xl:w-[500px] flex justify-center"><img src={logo}  className="h-auto w-[300px] " alt="IITP logo" /></div>
                <div class="bg-gray-950 p-8 rounded-lg xl:w-[450px] shadow-md w-full mt-16 xl:mt-0 ">
                <h3 class="text-2xl font-semibold mb-4 text-center text-yellow-300" ><strong>FORGOT PASSWORD</strong></h3>
                <form onSubmit={handleSubmit} >
                    <div className="mb-8 flex items-center ">
                        <img src={mail} className=" w-12 h-[42px] mt-1 p-[1.5px]" alt="mail" />
                        <input type="email" value={email}
                      onChange={(e) => setEmail(e.target.value)} required autoFocus placeholder='Your Email' id="email" name="email" className="mt-1 p-2 border w-full rounded-sm" />
                    </div>
                    <div className='flex flex-row justify-between'>
                        <button type="submit" className="bg-[#cba640] text-white px-2 py-1 rounded-sm hover:bg-[#e6c771] ">Submit</button>
                        <Link to='/'><div className="bg-[#cba640] text-white px-2 py-1 rounded-sm cursor-pointer hover:bg-[#e6c771] ">Login Area</div></Link>
                    </div>
                </form>
            </div>
            </div>
        </div>
    )
};

export default ForgotPassword;