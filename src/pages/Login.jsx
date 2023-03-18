import React, { useState, useEffect, lazy, Suspense } from 'react';
import Loading from '../component/unauth/Loading';

import assets from '../lib/images';
import misc from '../lib/misc';
import '../component/component.css'

const Signin = lazy(() => import('../component/login/Signin'));
const Signup = lazy(() => import('../component/login/Signup'));

const Login = () => {

    const moment = misc.moment;
    const currentHour = moment().hour();

    const [day, setDay] = useState()
    const [imageLoaded, setImageLoaded] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    const [isFlipped, setIsFlipped] = useState(false);

    const handleFlip = () => {
        setIsFlipped(!isFlipped);
    };

    // Image Load 
    const handleImageLoad = () => {
        setImageLoaded(true);
        setIsLoading(false)
    };

    useEffect(() => {

        if (currentHour >= 6 && currentHour < 18) {
            setDay(true)
        } else {
            setDay(false)
        }

    }, [currentHour])

    return (
        <>
            {isLoading && <Loading />}
            <div className="relative h-screen">
                <img
                    src={day ? assets.Day : assets.Night}
                    alt="background-login" onLoad={handleImageLoad}
                    className="absolute object-cover w-full h-full"
                />   {imageLoaded && !isLoading && (
                    <Suspense fallback={<Loading />}>
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="absolute inset-0 bg-black opacity-50"></div>
                            <div className="bg-white shadow-md rounded-md p-8 max-w-md mx-auto">

                                <div className={`absolute top-0 left-0 right-0 flip-card ${isFlipped ? 'flipped' : ''}`}>
                                    <div className="flip-card-inner flex items-center justify-center min-h-screen">
                                        <div className="flip-card-front absolute flex justify-center text-center items-center">
                                            <Signin handleFlip={handleFlip} />
                                        </div>
                                        <div className="flip-card-back absolute flex justify-center text-center items-center">
                                            <Signup handleFlip={handleFlip} />
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </Suspense>
                )}
            </div>
        </>
    )

}

export default Login