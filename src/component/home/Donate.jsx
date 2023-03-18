import React from 'react'
import antd from '../../lib/antd'

const Donate = ({ isDonationModalOpen, closeDonationModal }) => {
    return (
        <antd.Modal
            title="Donate for more future updates!"
            open={isDonationModalOpen}
            onCancel={closeDonationModal}
            footer={false}
        >
            <div className='flex flex-col my-5'>
                <p className='small:text-[12px] computer:text-sm my-2'>
                    As you may know, our application has been providing valuable services to our users and we are committed to
                    continually improving and expanding its features.
                </p>
                <p className='small:text-[12px] computer:text-sm my-2'>
                    Your donation will be instrumental in helping us to develop new features, improve the performance of the application,
                    and cover the ongoing expenses that are required to keep it running. We understand that there are many worthy causes
                    out there and appreciate any amount that you can contribute towards our efforts. No amount is too small and every cent counts.
                </p>
                <p className='small:text-[12px] computer:text-sm my-2'>
                    Thank you for your consideration and for supporting our web application.
                </p>
                <div className='flex flex-col mt-5'>
                    <p className='small:text-[12px] computer:text-sm'>
                        <b> GCASH Number: </b> 09089260456
                    </p> <p className='small:text-[12px] computer:text-sm'>
                        <b> PAYPAL Account: </b>marklestermoreno09@gmail.com
                    </p>
                </div>
            </div>
        </antd.Modal>
    )
}

export default Donate