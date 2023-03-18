import React, { useState } from 'react'
import antd from '../../lib/antd'
import emailjs from 'emailjs-com';

const { TextArea } = antd.Input;

const ReportBug = ({ isReportModalOpen, closeReportModal, setIsReportModalOpen, user }) => {

    const [loading, setLoading] = useState(false)

    // Form 
    const [form, setForm] = useState({
        subject: "",
        message: "",
        email: user.email,
    })

    const sendReport = e => {
        e.preventDefault();
        setLoading(true)

        emailjs.send(process.env.REACT_APP_EMAIL_JS_SERVICE_KEY, process.env.REACT_APP_EMAIL_JS_TEMPLATE_KEY, {
            from_name: form.name,
            subject: form.subject,
            message: form.message,
            email: form.email
        }, process.env.REACT_APP_EMAIL_JS_ACCOUNT_KEY)
            .then(() => {
                setLoading(false)
                antd.notification.success({
                    message: 'Thank you for your report! ',
                    description: 'Your form has been submitted, the developer will address this matter within 3-5 days! ',
                    duration: 5,
                })
            })
            .catch((error) => {
                setLoading(false)
                console.log(error)
                antd.notification.error({
                    message: 'Something went wrong!',
                    description: 'Please try sending again, or you can directly contact our developer @ marklestermoreno09@gmail.com',
                    duration: 5,
                })
            })
            .finally(() => {
                setIsReportModalOpen(false)
                setLoading(false)
            })
        setForm({
            ...form,
            subject: "",
            message: "",
            email: user.email,
        })
    }


    return (
        <antd.Modal
            title="Report Bug"
            open={isReportModalOpen}
            onCancel={closeReportModal}
            footer={false}
        >
            <div className='flex flex-col my-5'>
                <p className='small:text-[12px] computer:text-sm'> Kindly complete the report form and the developer will endeavor to address the matter within a duration of 1 to 3 days. </p>

                <div className='flex items-start flex-col w-full'>
                    <div className='flex justify-between w-full'>
                        <label className='text-textColor my-2 font-semibold mt-6
                    small:text-[12px]
                    computer:text-sm'>
                            Email
                        </label>
                    </div>
                    <antd.Input
                        disabled={true}
                        value={user.email}
                        className='
                small:py-[3px] small:text-[12px]
                mobile:py-[4px]
                tablets:py-[2px]
                laptop:py-[4px] laptop:text-[10px]
                computer:py-1.5 computer:text-[14px]'
                    />
                </div>
                <div className='flex items-start flex-col w-full'>
                    <div className='flex justify-between w-full'>
                        <label className='text-textColor my-2 font-semibold mt-6
                    small:text-[12px]
                    computer:text-sm'>
                            Subject
                        </label>
                    </div>
                    <antd.Input
                        disabled={loading}
                        value={form.subject}
                        onChange={(e) => {
                            setForm({ ...form, subject: e.target.value })
                        }}
                        placeholder="Subject"
                        className='
                small:py-[3px] small:text-[12px]
                mobile:py-[4px]
                tablets:py-[2px]
                laptop:py-[4px] laptop:text-[10px]
                computer:py-1.5 computer:text-[14px]'
                    />
                </div>
                <div className='flex items-start flex-col w-full'>
                    <div className='flex justify-between w-full'>
                        <label className='text-textColor my-2 font-semibold mt-6
                    small:text-[12px]
                    computer:text-sm'>
                            Message
                        </label>
                    </div>
                    <TextArea
                        disabled={loading}
                        value={form.message}
                        onChange={(e) => {
                            setForm({ ...form, message: e.target.value })
                        }}
                        placeholder="Message (Input atleast 10 characters)"
                        className='
                small:py-[3px] small:text-[12px]
                mobile:py-[4px]
                tablets:py-[2px]
                laptop:py-[4px] laptop:text-[10px]
                computer:py-1.5 computer:text-[14px]'
                    />
                </div>
                <div className='flex justify-center items-center text-center mt-10'>
                    <button disabled={loading || form.message.length <= 10 || form.subject.length === 0}
                        onClick={e => sendReport(e)}
                        className='bg-blue-500 text-white px-5 py-2 rounded-md 
                hover:cursor-pointer hover:opacity-50 duration-150
                disabled:opacity-50 disabled:cursor-not-allowed
        '>
                        Send Report
                    </button>
                </div>
            </div>
        </antd.Modal>
    )
}

export default ReportBug