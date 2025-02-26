import React, { useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../../Redux/Actions/auth.actions';
import Btn from '../../Components/Utilities/btn';
import logo from '../../assets/small-logo.png'

function Login() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { loading, error } = useSelector(state => state.auth)
    const [isLogin, setLogin] = useState({
        username: '',
        password: ''
    })
    console.log(error)

    const handleChange = (e) => {
        const { name, value } = e.target;
        setLogin((prev) => ({
            ...prev,
            [name]: value,
        })) 
    };
    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            await dispatch(loginUser(isLogin));
            navigate('/dashboard')
        }
        catch (e) {
            console.log('Login failed: ', e)
        }
    }


  return (
    <div className='login relative flex justify-center items-center bg-building bg-no-repeat bg-cover w-screen h-screen min-h-screen'>
        <div className="blur-xl absolute top-0 left-0  bg-blue opacity-25 w-full h-full -z-0"></div>
        <img src={logo} alt=""  className='absolute top-10 left-10 w-12 h-12 max-md:absolute max-md:top-4 max-md:left-4 z-50'/>
        <form onSubmit={handleLogin} className="login-box font-poppins p-11 max-w-[768px] bg-white flex flex-col items-stretch justify-center gap-[24px] rounded-[10px] z-40 max-md:w-screen max-md:h-screen max-md:rounded-none">
            {/* <h1 className='text-black font-semibold text-[96px]'>Bonjour</h1> */}
            <div className='flex flex-col'>
                <label htmlFor="" className={`${error ? '!text-[#DC2626]' : ''}`}>Nom d&apos;utilisateur</label>
                <input 
                    id="username"
                    name="username"
                    value={isLogin.username}
                    onChange={handleChange}
                    className={`w-[533px] h-[46px] border-1 border-border rounded-[10px] px-2 outline-none focus:border-blue ${error ? '!border-[#DC2626]' : ''} max-md:w-full`} 
                    type="text" 
                    placeholder='Entre votre nom d&#39;utilisateur...' />
            </div>
            <div className='flex flex-col'>
                <label htmlFor="" className={`${error ? '!text-[#DC2626]' : ''}`}>Mot de pass</label>
                <input 
                    id='password'
                    name='password'
                    value={isLogin.password}
                    onChange={handleChange}
                    type="password"
                    className={`w-[533px] h-[46px] border-1 border-border rounded-[10px] px-2 outline-none focus:border-blue ${error ? '!border-[#DC2626]' : ''} max-md:w-full`} 
                    placeholder='Entrer votre mot de passe...' />
            </div>
                {error && <p className='px-2 text-[#DC2626]'>{error}</p>}
            <div>
                <Btn content={loading ? 'Connexion ...' : 'Connexion'} type={'submit'}/>
            </div>
        </form>
    </div>
  )
}

export default Login