import React, { useState } from 'react';

// Icons and Images
import assets from '../../lib/images';
import icons from '../../lib/icons';
import antd from '../../lib/antd';

import { useUserContext } from '../../context/userContext';
import { handleKeyPress } from '../../util/util'


const Signin = ({ handleFlip }) => {

    const { loading, loginEmail, setLogin, login, googleLogin, forgotPassword } = useUserContext()

    const [emailReset, setEmailReset] = useState("")

    // Terms and Condition Modal
    const [open, setOpen] = useState(false);

    const showModal = () => {
        setOpen(true);
    };

    const cancelModal = () => {
        setOpen(false);
    };

    return (
        <>
            <div className="card front">
                <div className='bg-white rounded-md
                             small:w-[300px] small:p-2
                             mobile:w-[320px]
                             tablets:w-[350px] tablets:p-0
                             laptop:w-[300px]
                             computer:w-[400px]'>
                    <div className='flex flex-col items-center justify-center text-center pt-4'>
                        <img src={assets.Logo} alt='skywatcher-logo'
                            className='hover:brightness-105 hover:cursor-pointer
                                    small:w-[200px]
                                    mobile:w-[250px]
                                    tablets:w-[200px] tablets:mt-0
                                    laptop:w-[175px] laptop:pt-2
                                    computer:w-[250px] computer:pt-0
                                    large:pt-5'/>

                        <div className='flex items-start flex-col w-10/12 '>
                            <span className='text-textColor font-medium justify-start mb-1
                                        small:text-[12px] small:mt-4
                                        mobile:text-[10px]
                                        tablets:mt-3
                                        laptop:text-[9px] laptop:mt-2
                                        computer:text-xs computer:mt-4'>
                                Email Address
                            </span>
                            <antd.Input
                                onChange={e => {
                                    setLogin({ ...login, email: e.target.value })
                                }}
                                disabled={loading}
                                placeholder="johnbdoe@gmail.com" className='
                                small:py-[3px] small:text-[12px]
                                mobile:py-[4px]
                                tablets:py-[2px]
                                laptop:py-[4px] laptop:text-[10px]
                                computer:py-1.5 computer:text-[14px]'/>
                        </div>

                        <div className='flex items-start flex-col w-10/12'>
                            <div className='flex justify-between items-center w-full'>
                                <label className='text-textColor font-medium my-1
                                   small:text-[12px] small:mt-2
                                   mobile:text-[10px]
                                   tablets:mt-3
                                   laptop:text-[9px] laptop:mt-2
                                   computer:text-xs computer:mt-4'>
                                    Password
                                </label>
                                <label onClick={showModal}
                                    className='text-blue-500 font-medium my-1 hover:cursor-pointer hover:opacity-70 duration-150
                                   small:text-[12px] small:mt-2
                                   mobile:text-[10px]
                                   tablets:mt-3
                                   laptop:text-[9px] laptop:mt-2
                                   computer:text-xs computer:mt-4'>
                                    Forgot Password
                                </label>
                            </div>

                            <antd.Input.Password
                                onChange={e => {
                                    setLogin({ ...login, password: e.target.value })
                                }}
                                placeholder="Input password"
                                disabled={loading}
                                className='
                                small:py-[3px] small:text-[12px]
                                mobile:py-[4px]
                                tablets:py-[2px]
                                laptop:py-[4px] laptop:text-[10px]
                                computer:py-1.5 computer:text-[14px]'
                                iconRender={(visible) => (visible ? <icons.EyeTwoTone /> : <icons.EyeInvisibleOutlined />)}
                            />
                        </div>

                        <div className='w-full flex flex-col justify-center items-center text-center'>
                            <div className='flex justify-around w-10/12
                                        mobile:mt-4
                                        computer:mt-6
                                        large:mt-8'>
                                <button onClick={loginEmail}
                                    disabled={loading}
                                    className='bg-blue-500 text-white text-xs rounded-sm hover:opacity-80 duration-150 w-full
                                        small:py-1.5 small:mt-4
                                        mobile:py-1.5 mobile:mt-2
                                        laptop:px-8 laptop:py-2
                                        computer:py-3
                                        disabled:opacity-50 disabled:cursor-wait
                                        '> Login with Email/Password
                                </button>
                            </div>

                            <div className='flex flex-col w-10/12'>
                                <button onClick={googleLogin}
                                    disabled={loading}
                                    className='bg-[#db4437] text-white rounded-sm hover:opacity-80 duration-150
                                        small:py-1.5 small:mt-2
                                        laptop:px-8 laptop:mt-3
                                        computer:py-3
                                        disabled:opacity-50 disabled:cursor-wait'>
                                    <div className='flex justify-center items-center text-center'>
                                        <icons.BsGoogle className='text-white items-start mr-2' />
                                        <p className='text-xs'>Login with Google </p>
                                    </div>
                                </button>
                            </div>

                            <div className='flex flex-col w-10/12'>
                                <button disabled={loading}
                                    className='bg-[#3277bc] text-white text-xs rounded-sm hover:opacity-80 duration-150
                                        small:py-1.5 small:mt-2
                                        laptop:px-8 laptop:mt-3
                                        computer:py-3
                                        disabled:opacity-50 disabled:cursor-wait'>
                                    <div className='flex justify-center items-center text-center'>
                                        <icons.BsMicrosoft className='text-white items-start mr-2' />
                                        <p className='text-xs'> Login with Microsoft </p>
                                    </div>
                                </button>
                            </div>
                        </div>

                        <span className='flex justify-center 
                                    laptop:my-3
                                    large:my-5'>
                            <button onClick={handleFlip} disabled={loading}
                                className='text-blue-500 rounded-sm hover:opacity-80 duration-150 w-full
                                        small:mt-4 small:text-[12px] small:mb-4
                                        mobile:mt-4 mobile:text-[10px]
                                        laptop:mx-8 laptop:mt-0 laptop:mb-0
                                        computer:text-xs
                                        disabled:cursor-wait'> Don't have an account? Signup now </button>
                        </span>

                    </div>
                </div>
            </div>
            <antd.Modal
                title={<p className='text-lg font-semibold text-blue-500'> Forgot Password </p>}
                open={open}
                width={400}
                onCancel={cancelModal}
                closeIcon={false}
                footer={
                    <div className='flex flex-col'>
                        <p className='text-justify text-sm'> You can check your Mail/Spam for <b> forgot password link </b> </p>
                        <div className='mt-6 flex flex-col justify-around items-center text-center w-full'>
                            <div className='flex items-start flex-col w-full'>
                                <div className='flex justify-between w-full'>
                                    <label className='text-textColor font-semibold my-1'>
                                        Username
                                    </label>
                                </div>
                                    <antd.Input
                                    disabled={loading}
                                    onKeyPress={e => handleKeyPress(e)}
                                    onChange={(e) => {
                                        setEmailReset(e.target.value)
                                    }}
                                    placeholder="johndoe@gmail.com" size='large'
                                />
                            </div>
                            <div className='flex justify-center w-full mt-5'>
                                <button
                                    onClick={
                                        (e) => forgotPassword(emailReset, e)
                                    }
                                    className={loading ?
                                        `bg-gray-200 px-6 py-2 text-stone-400 rounded-md hover:opacity-50 duration-150 w-1/2`
                                        :
                                        `bg-blue-500 px-6 py-2 text-white rounded-md hover:opacity-70 duration-150 w-1/2
                                    disabled:bg-gray-200 disabled:cursor-not-allowed disabled:hover:opacity-100 disabled:text-stone-400'
                                    `}>
                                    {loading ? 'Sending' : 'Send Link'}
                                </button>

                            </div>
                        </div>
                    </div>
                }
            >

            </antd.Modal>
        </>
    )
}

export default Signin
