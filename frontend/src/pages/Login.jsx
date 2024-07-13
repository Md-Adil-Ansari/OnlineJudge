import { useNavigate ,Link} from "react-router-dom";
import axiosInstance from "../Axios";
import { useState } from "react";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import mail from '../assets/mail.png';
import lock from '../assets/lock.png';
import logo from '../assets/logo.png';
function Login() {


    const [data, setData] = useState({
        email: "",
        password: ""
    });

    const navigate = useNavigate();

    const loginUser = async (e) => {
        e.preventDefault();
        console.log(data);

        try {
            const res = await axiosInstance.post("/users/login", data);
            console.log(res);
            localStorage.setItem('handle', res.data.data.user.handle);
            navigate("/home");
        } catch (error) {
            const extractedMessage = error.response.data.message;
            toast.error(extractedMessage, { autoClose: 2000 });
        }
    }

    return (
        <div className='h-screen flex items-center justify-center bg-[#fede85]'>
            <ToastContainer/>
            <div   className='flex flex-wrap justify-between  xl:mx-60 bg-gray-950 border-2 border-black rounded-lg shadow-2xl shadow-white m-3 xl:p-0'>
                <div className="p-8  w-full xl:w-[500px] flex justify-center"><img src={logo}  className="h-auto w-[300px] " alt="IITP logo" /></div>
                <div class="bg-gray-950 p-8 rounded-lg xl:w-[450px] shadow-md w-full mt-16 xl:mt-0 ">
                <h3 class="text-2xl font-semibold mb-4 text-center text-[#e6c15b]" ><u>LOGIN HERE</u></h3>
                <form onSubmit={loginUser} >
                    <div className="mb-4 flex items-center ">
                        <img src={mail} className=" w-12 h-[42px] mt-1 p-[1.5px]" alt="mail" />
                        <input type="email" value={data.email} onChange={(e)=>setData({...data,email:e.target.value})} required autoFocus placeholder='Your Email' id="email" name="email" className="mt-1 p-2 border w-full rounded-sm" />
                    </div>
                    <div className="mb-4 flex items-center">
                        <img src={lock} className=" w-12 h-[43px] mt-1"alt="lock" />
                        <input type="password" required value={data.password} onChange={(e)=>setData({...data,password:e.target.value})} id="password" placeholder='Enter your password' name="password" className="mt-1 p-2 w-full border rounded-sm" />
                    </div>
                    <div className='flex flex-row justify-between'>
                        <button type="submit" className="bg-[#cba640] text-white px-2 py-1 rounded-sm hover:bg-[#e6c771]">Log In</button>
                        <Link to='/forgot-password'><div className="bg-[#cba640] text-white px-2 py-1 rounded-sm cursor-pointer hover:bg-[#e6c771]">Reset Password</div></Link>
                    </div>
                </form>
                <div className="mt-10 text-center"><strong className="text-yellow-600">NOT REGISTERED? </strong><Link to='/register'> <button className="bg-[#cba640] text-white px-2 py-1 rounded-sm hover:bg-[#e6c771] hover:underline">SIGN UP</button></Link></div>
            </div>
            </div>
        </div>
    );
}

export default Login;