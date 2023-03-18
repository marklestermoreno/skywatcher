import React, { useState, lazy } from 'react'
import icons from '../../lib/icons'
import assets from '../../lib/images'
import antd from '../../lib/antd'

const ReportBug = lazy(() => import("../home/ReportBug.jsx"))
const Donate = lazy(() => import("../home/Donate.jsx"))
const Profile = lazy(() => import("../home/Profile.jsx"))

const Header = ({ day, user }) => {

    // Modal Bug
    const [isReportModalOpen, setIsReportModalOpen] = useState(false);

    const showReportModal = () => {
        setIsReportModalOpen(true);
    };
    const closeReportModal = () => {
        setIsReportModalOpen(false);
    };

    // Modal Donation
    const [isDonationModalOpen, setIsDonationModalOpen] = useState(false);

    const showDonationModal = () => {
        setIsDonationModalOpen(true);
    };
    const closeDonationModal = () => {
        setIsDonationModalOpen(false);
    };

    // Modal
    const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);

    const showProfileModal = () => {
        setIsProfileModalOpen(true);
    };
    const closeProfileModal = () => {
        setIsProfileModalOpen(false);
    };

    return (
        <>
            <header className={`flex justify-between items-center text-center shadow-md ${day ? "bg-white" : "bg-stone-900"}
                            tablets:py-4 tablets:px-4
                            small:py-2 small:px-2
                            `}>
                <div>
                    <img src={assets.Logo} alt="header-logo"
                        className="hover:brightness-105 cursor-pointer tablets:w-[250px] small:w-[200px]" />
                </div>
                <div className='tablets:flex small:hidden'>
                    <antd.Tooltip title="Report Bug">
                        <div onClick={showReportModal}
                            className='flex justify-center text-center items-center hover:cursor-pointer'>
                            <icons.MdReport className="text-3xl text-blue-500 mx-3 hover:text-secondary duration-150" />
                        </div>
                    </antd.Tooltip>
                    <antd.Tooltip title="Send Gift to Developer">
                        <div onClick={showDonationModal}
                            className='flex justify-center text-center items-center hover:cursor-pointer'>
                            <icons.RiGift2Fill className="text-3xl text-blue-500 mx-3 hover:text-secondary duration-150" />
                        </div>
                    </antd.Tooltip>
                    <antd.Tooltip title="Profile">
                        <div onClick={showProfileModal}
                            className='flex justify-center text-center items-center hover:cursor-pointer'>
                            <icons.FaUserCircle className="text-3xl text-blue-500 mx-3 hover:text-secondary duration-150" />
                        </div>
                    </antd.Tooltip>
                </div>
                <div className='tablets:hidden small:flex'>
                    <antd.Tooltip title="Menu">
                        <div
                            className='flex justify-center text-center items-center hover:cursor-pointer'>
                            <icons.BsFillMenuButtonWideFill className="text-2xl text-blue-500 mx-1 hover:text-secondary duration-150" />
                        </div>
                    </antd.Tooltip>
                </div>
            </header>

            <ReportBug isReportModalOpen={isReportModalOpen} closeReportModal={closeReportModal} setIsReportModalOpen={setIsReportModalOpen} user={user} />
            <Donate isDonationModalOpen={isDonationModalOpen} closeDonationModal={closeDonationModal} />
            <Profile isProfileModalOpen={isProfileModalOpen} closeProfileModal={closeProfileModal} setIsProfileModalOpen={setIsProfileModalOpen} />

        </>
    )
}

export default Header