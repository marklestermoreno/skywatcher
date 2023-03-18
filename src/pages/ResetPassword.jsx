import React, { useState, useEffect } from 'react'
import { verifyPasswordResetCode, getAuth } from 'firebase/auth';
import { where, query, getDocs, collection } from 'firebase/firestore'
import { db } from '../firebase-config';
import { useNavigate } from 'react-router-dom';

import antd from '../lib/antd';
import assets from '../lib/images';
import icons from '../lib/icons';
import { useQuery } from '../util/util';

import { useUserContext } from '../context/userContext';

const ResetPassword = () => {

    const auth = getAuth();
    const navigate = useNavigate();

    const { resetPassword, loading } = useUserContext()

    const [error, setError] = useState(false)
    const [password, setPassword] = useState("")
    const [email, setEmail] = useState('');
    const [userId, setUserId] = useState("");
    const [isToastShown, setIsToastShown] = useState(false);

    const params = useQuery();
    const oobCode = params.get('oobCode');

    console.log(userId)

    useEffect(() => {

        const getUser = async (email) => {
            const q = query(collection(db, "user"), where("email", "==", email));
            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => {
                setUserId(doc.id);
            });
        };

        getUser(email);

        async function getEmailFromCode() {
            try {
                const info = await verifyPasswordResetCode(auth, oobCode);
                setEmail(info);
            } catch (error) {
                setError(true)
                if (!isToastShown) {
                    if (error.code === "auth/expired-action-code") {
                        antd.notification.error({
                            message: 'Password Expired',
                            description: 'Password reset codes are valid for one hour',
                            duration: 3,
                        });
                        setIsToastShown(true)
                        setTimeout(() => {
                            navigate("/login")
                        }, 5000)
                    }
                    else if (error.code === "auth/invalid-action-code") {
                        antd.notification.error({
                            message: 'Password Invalid',
                            description: "Reset code is invalid or you have already been used to reset password",
                            duration: 3,
                        });
                        setIsToastShown(true)
                        setTimeout(() => {
                            navigate("/login")
                        }, 5000)
                    }
                    else if (error.code === "auth/user-disabled") {
                        antd.notification.error({
                            message: 'User Disabled',
                            description: "Your account has been disabled or you have reached your login attempt limit, contact our developer for more information ",
                            duration: 5,
                        });
                        setIsToastShown(true)
                        setTimeout(() => {
                            navigate("/login")
                        }, 5000)
                    }
                    else if (error.code === "auth/user-not-found") {
                        antd.notification.error({
                            message: 'User Not Found',
                            description: "Unable to find a user with the specified email address or user ID",
                            duration: 5,
                        });
                        setIsToastShown(true)
                        setTimeout(() => {
                            navigate("/login")
                        }, 5000)
                    }
                    else if (error.code === "auth/too-many-requests") {
                        antd.notification.error({
                            message: 'Too Many Request',
                            description: "You have been disabled for requesting another for a white",
                            duration: 5,
                        });
                        setIsToastShown(true)
                        setTimeout(() => {
                            navigate("/login")
                        }, 5000)
                    }
                }
            }
        }
        if (oobCode) getEmailFromCode();
        //eslint-disable-next-line
    }, [oobCode][userId]);

    return (
        <>

            <div className="relative h-screen flex flex-col justify-center items-center text-center">
                <div className='bg-white rounded-md shadow-lg
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
                                New Password
                            </span>
                            <antd.Input.Password
                                disabled={error || loading}
                                maxLength={50}
                                onChange={e => {
                                    setPassword(e.target.value)
                                }}
                                placeholder="Input New Password"
                                className='
                                small:py-[3px] small:text-[12px]
                                mobile:py-[4px]
                                tablets:py-[2px]
                                laptop:py-[4px] laptop:text-[10px]
                                computer:py-1.5 computer:text-[14px]'
                                iconRender={(visible) => (visible ? <icons.EyeTwoTone /> : <icons.EyeInvisibleOutlined />)}
                            />
                        </div>

                        <div className='flex flex-col w-10/12 mb-10 mt-4'>

                            <button
                                disabled={error || userId === "" || loading}
                                onClick={e => resetPassword(oobCode, password, userId, e)}
                                className='bg-blue-500 text-white text-xs rounded-sm hover:opacity-80 duration-150 
                                        small:py-1.5 small:mt-2
                                        laptop:px-8 laptop:mt-3
                                        computer:py-3
                                        disabled:opacity-50 disabled:cursor-wait'>
                                <div className='flex justify-center items-center text-center'>
                                    <p className='text-xs'> {loading ? "Resetting" : "Reset your password"}</p>
                                </div>
                            </button>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

export default ResetPassword