import React, { useState, useEffect, lazy, Suspense } from 'react'

import misc from '../lib/misc';

const Header = lazy(() => import("../component/home/Header"))
const Banner = lazy(() => import("../component/home/Banner"))
const Loading = lazy(() => import("../component/unauth/Loading"))

const Dashboard = () => {

    const user = JSON.parse(sessionStorage.getItem('user'))

    // Time and Date
    const moment = misc.moment;
    const currentHour = moment().hour();
    const currentDate = moment().format("dddd, MMMM Do YYYY")
    const formattedTime = moment().format("h:mm A");

    console.log(formattedTime)

    const currentTime = {
        time: formattedTime,
        currentDate: currentDate
    }

    const [day, setDay] = useState();

    useEffect(() => {

        if (currentHour >= 6 && currentHour < 18) {
            setDay(true)
        } else {
            setDay(false)
        }

    }, [currentHour])

    return (
        <>
            <Suspense fallback={<Loading />}>
                <Header day={day} user={user} />
                <Banner day={day} currentTime={currentTime} />
            </Suspense>
        </>
    )
}

export default Dashboard