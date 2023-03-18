import React, { useState, useEffect } from 'react';
import assets from '../../lib/images';
import misc from '../../lib/misc';

const Loading = () => {

    const moment = misc.moment;
    const currentHour = moment().hour();

    const [day, setDay] = useState()

    useEffect(() => {

        if (currentHour >= 6 && currentHour < 18) {
            setDay(true)
        } else {
            setDay(false)
        }

    }, [currentHour])

    return (
        <div
            className={`flex justify-center text-center items-center h-screen relative
            ${day ? `bg-blue-300` : `bg-stone-900`}`} >
            <img
                src={day ? assets.Sun : assets.Moon}
                alt="background"
                className="animate-spin-slow w-1/5"
            />
        </div >
    );
}


export default Loading