import React from 'react'
import { useNavigate } from 'react-router-dom'
import assets from '../../lib/images'
import antd from '../../lib/antd'

const Profile = ({ isProfileModalOpen, closeProfileModal, setIsProfileModalOpen }) => {

    const navigate = useNavigate();

    const logout = () => {
        sessionStorage.clear()
        setIsProfileModalOpen(false)
        antd.notification.success({
            message: "Successfully Logout",
            desciption: "You will be logout in 3 seconds. Thank you for using my web app",
            duration: 3
        })
        setTimeout(() => {
            navigate("/")
            window.location.reload();
        }, 2000)
    }

    return (
        <antd.Modal
            title={false}
            open={isProfileModalOpen}
            closeIcon={true}
            onCancel={closeProfileModal}
            footer={false}
            width={350}
        >

            <div className='flex flex-col justify-center items-center text-center mt-2 w-full'>

                <img src={assets.Logo} alt="skywatcher-logo" />

                <button
                    className='bg-blue-500 text-white px-5 py-3 rounded-md w-full text-sm mt-6
                hover:cursor-pointer hover:bg-secondary duration-150
                '>
                    Edit Profile
                </button>
                <button onClick={logout}
                    className='bg-blue-500 text-white px-5 py-3 rounded-md w-full text-sm mt-2 mb-2
                hover:cursor-pointer hover:bg-secondary duration-150
                '>
                    Logout
                </button>
                <span className='text-[10px] mt-3 mb-2 text-textColor'> Developed by:
                    <a href='https://marklestermoreno.vercel.app/' target='_blank' className="text-blue-500 pl-1">
                        Mark Lester Moreno </a>
                </span>
            </div>

        </antd.Modal>
    )
}

export default Profile