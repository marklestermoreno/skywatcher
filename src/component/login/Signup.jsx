import React, { useState } from 'react';

// Icons and Images
import assets from '../../lib/images';
import icons from '../../lib/icons';
import antd from '../../lib/antd';

import { handleKeyPress } from '../../util/util'

import { useUserContext } from '../../context/userContext';

const Signup = ({ handleFlip }) => {

    const { error, setError, loading, register, data, setData } = useUserContext()

    // Checkbox
    const [agree, setAgree] = useState(false)
    const onChangeCheckbox = (e) => {
        setAgree(e.target.checked)
    };

    // Signup
    const [open, setOpen] = useState(false);

    const handleClick = () => {
        setOpen(true);
    };

    const hideModal = () => {
        setOpen(false)
    }

    // Terms and Condition Modal
    const [tac, setTac] = useState(false);

    const showTac = () => {
        setTac(true);
    };

    const cancelTac = () => {
        setTac(false);
    };

    return (
        <>
            <div>
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

                        { /* Email */}
                        <div className='flex items-start flex-col w-10/12'>

                            <span className='text-textColor font-medium justify-start mb-1
                                       small:text-[12px] small:mt-4
                                       mobile:text-[10px]
                                       tablets:mt-3
                                       laptop:text-[9px] laptop:mt-2
                                       computer:text-xs computer:mt-4'>
                                Email Address
                            </span>
                            <antd.Input
                                status={error === "emailError" ? "error" : ""}
                                disabled={loading}
                                onKeyPress={e => handleKeyPress(e)}
                                placeholder={"johnbdoe@gmail.com"}
                                onChange={e => {
                                    setData({ ...data, email: e.target.value })
                                    setError()
                                }
                                }
                                size='small' className='
                                small:py-[3px] small:text-[12px]
                                mobile:py-[4px]
                                tablets:py-[2px]
                                laptop:py-[4px] laptop:text-[10px]
                                computer:py-1.5 computer:text-[14px]'
                            />
                        </div>

                        { /* Username */}
                        <div className='flex items-start flex-col w-10/12'>

                            <div className='flex justify-between w-full'>
                                <label className='text-textColor font-medium my-1
                                                small:text-[12px] small:mt-2
                                                mobile:text-[10px]
                                                tablets:mt-3
                                                laptop:text-[9px] laptop:mt-2
                                                computer:text-xs computer:mt-4'>
                                    Username
                                </label>
                            </div>
                            <antd.Input
                                maxLength={15}
                                disabled={loading}
                                onKeyPress={e => handleKeyPress(e)}
                                status={error === "usernameError" ? "error" : ""}
                                onChange={(e) => {
                                    setData({ ...data, username: e.target.value })
                                    setError()
                                }}
                                placeholder="johndoe" size='small' className='
                                small:py-[3px] small:text-[12px]
                                mobile:py-[4px]
                                tablets:py-[2px]
                                laptop:py-[4px] laptop:text-[10px]
                                computer:py-1.5 computer:text-[14px]'
                            />
                        </div>

                        { /* Password */}
                        <div className='flex items-start flex-col w-10/12'>
                            <div className='flex justify-between w-full'>
                                <label className='text-textColor font-medium my-1
                                                small:text-[12px] small:mt-2
                                                mobile:text-[10px]
                                                tablets:mt-3
                                                laptop:text-[9px] laptop:mt-2
                                                computer:text-xs computer:mt-4
                                         '> Password
                                </label>
                            </div>
                            <antd.Input.Password
                                status={error === "passwordError" ? "error" : ""}
                                disabled={loading}
                                onChange={(e) => {
                                    setData({ ...data, password: e.target.value })
                                    setError()
                                }}
                                placeholder="Input password"
                                size='small'
                                className='
                                small:py-[3px] small:text-[12px]
                                mobile:py-[4px]
                                tablets:py-[2px]
                                laptop:py-[4px] laptop:text-[10px]
                                computer:py-1.5 computer:text-[14px]'
                                iconRender={(visible) => (visible ? <icons.EyeTwoTone /> : <icons.EyeInvisibleOutlined />)}
                            />

                        </div>

                        <div className='flex justify-center w-full mt-3'>
                            <antd.Checkbox
                                disabled={loading}
                                className='
                                        small:text-[12px]
                                        tablets:text-[10px]
                                        laptop:text-[10px] laptop:px-8
                                        computer:text-xs computer:px-8'
                                onChange={onChangeCheckbox}>
                                Agree with <span className='text-blue-500 hover:cursor-pointer hover:text-secondary' onClick={showTac}> Terms and Condition </span>
                            </antd.Checkbox>
                        </div>

                        <div className='flex justify-around w-10/12'>
                            <button
                                disabled={!agree || loading}
                                onClick={handleClick}
                                className={`bg-blue-500 text-white text-sm rounded-sm hover:opacity-50 duration-150 w-full
                                            small:py-1.5 small:mt-2
                                            laptop:px-8 laptop:mt-3
                                            computer:py-3
                                          disabled:bg-gray-200 disabled:cursor-not-allowed disabled:hover:opacity-100 disabled:text-stone-400
                                          `}>
                                <div className='flex justify-center items-center text-center'>
                                    <icons.ImUserPlus className='text-white items-start mr-2' />
                                    <p className='text-xs'>  Signup Account </p>
                                </div>

                            </button>
                        </div>

                        { /* Login */}
                        <div className='flex justify-around w-10/12'>
                            <button onClick={handleFlip} disabled={loading}
                                className={`border-blue-500 border text-sm text-blue-500 rounded-sm hover:opacity-50 duration-150 w-full
                                small:py-1.5 small:mt-2 small:mb-6
                                laptop:px-8 laptop:mt-3
                                computer:py-3
                              disabled:border-gray-200 disabled:border disabled:cursor-wait disabled:text-stone-400
                                `}>
                                <div className='flex justify-center items-center text-center'>
                                    <icons.RiLoginCircleFill className='text-blue-500 items-start mr-2' />
                                    <p className='text-xs'>  Login Account </p>
                                </div>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <antd.Modal
                title={false}
                open={tac}
                closable={false}
                footer={false}
                onCancel={cancelTac} >

                <div className='text-justify m-4'>
                    <h3 className='font-semibold text-lg'> Terms and Condition </h3>
                    <p className='text-sm py-2'>
                        Welcome to SkyWeather! These terms and conditions ("Terms") govern your use of our web
                        application and any services offered through the application ("Services"). By accessing
                        or using the Services, you agree to be bound by these Terms. If you do not agree to these
                        Terms, you may not access or use the Services. </p>

                    <p className='my-4 font-semibold'>
                        User Conduct
                    </p>
                    <p className='text-sm py-2'>
                        You agree to use the Services only for lawful purposes and in a manner that does not violate the rights of any third party. You may not use the Services to:

                        Post, upload, or otherwise transmit any content that is unlawful, harmful, threatening, abusive, harassing, defamatory, vulgar, obscene, or otherwise objectionable, or that may invade another's right of privacy or publicity.
                        Engage in any activity that interferes with or disrupts the Services (or the servers and networks which are connected to the Services), including, but not limited to, hacking, cracking, distribution of viruses, and denial of service attacks.
                        Use the Services in any manner that could damage, disable, overburden, or impair any server or network connected to the Services.
                        Attempt to gain unauthorized access to any part of the Services or to any other user's account.
                    </p>

                    <p className='my-4 font-semibold'>
                        Intellectual Property
                    </p>

                    <p className='text-sm py-2'>
                        The Services and all content and materials on the Services, including but not limited to text, graphics, logos, images, and software, are the property of the web application or its licensors and are protected by United States and international copyright, trademark, and other intellectual property laws. You may not reproduce, distribute, display, perform, or create derivative works of any content or materials on the Services without the prior written consent of the web application.
                    </p>

                    <p className='my-4 font-semibold'>
                        Privacy
                    </p>

                    <p className='text-sm py-2'>
                        The web application respects your privacy and has implemented measures to protect your personal information. Please see our Privacy Policy for more information on how we collect, use, and disclose your information.
                    </p>

                    <p className='my-4 font-semibold'>
                        Limitation of Liability
                    </p>
                    <p className='text-sm py-2'>
                        In no event shall the web application be liable for any direct, indirect, incidental, special, or consequential damages arising out of or in connection with the use or inability to use the Services or any content or materials on the Services. This includes, but is not limited to, damages for loss of profits, goodwill, use, data, or other intangible losses.
                    </p>

                    <p className='my-4 font-semibold'>
                        Termination
                    </p>
                    <p className='text-sm py-2'>
                        The web application may terminate your access to the Services at any time, with or without cause, without prior notice, and without liability to you. All provisions of these Terms which by their nature should survive termination shall survive termination, including, without limitation, ownership provisions, warranty disclaimers, indemnity, and limitations of liability.
                    </p>

                    <p className='my-4 font-semibold'>
                        Changes to Terms
                    </p>
                    <p className='text-sm py-2'>
                        The web application reserves the right to modify these Terms at any time, without prior notice, by posting updated Terms on the Services. Your continued use of the
                    </p>
                </div>

            </antd.Modal>

            <antd.Modal
                title="Reminder"
                open={open}
                closable={false}
                footer={
                    <div className='flex flex-col
                    '>
                        <p className='text-center'> After signup, verify your email on your Gmail/Microsoft (check on your spam)
                            by clicking the link, before you login your email and password.  </p>
                        <div className='mt-6 flex justify-around items-center text-center'>
                            <button
                                onClick={
                                    register
                                }
                                className={loading ?
                                    `bg-gray-200 px-6 py-2 text-stone-400 rounded-md hover:opacity-50 duration-150 w-full`
                                    :
                                    `bg-blue-500 px-6 py-2 text-white rounded-md hover:opacity-70 duration-150 
                                    disabled:bg-gray-200 disabled:cursor-not-allowed disabled:hover:opacity-100 disabled:text-stone-400'
                                    `}>
                                {loading ? 'Signing' : 'Signup'}
                            </button>
                            {loading ? "" :
                                <button
                                    onClick={hideModal}
                                    className={loading ?
                                        `bg-gray-200  px-6 py-2 text-stone-400 rounded-md hover:opacity-50 duration-150 w-full`
                                        :
                                        `border-primary px-6 py-2 border text-primary rounded-md hover:opacity-80 duration-150 w-full'
                                    `}>
                                    Cancel
                                </button>
                            }
                        </div>
                    </div>
                }
            >

            </antd.Modal>


        </>
    )
}

export default Signup