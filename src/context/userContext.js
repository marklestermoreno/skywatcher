import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { addDoc, collection, serverTimestamp, onSnapshot, doc, updateDoc } from 'firebase/firestore';
import {
    getAuth, signInWithPopup, createUserWithEmailAndPassword, sendEmailVerification,
    signInWithEmailAndPassword, sendPasswordResetEmail, confirmPasswordReset
} from "firebase/auth";
import { db, provider } from '../firebase-config';
import { notification } from 'antd';

import CryptoJS from "crypto-js";

const UserContext = createContext({})

export const useUserContext = () => useContext(UserContext);

export const UserContextProvider = ({ children }) => {

    const auth = getAuth();

    const secretPass = "MarkLesterMorenoRegalXkhZG4fW2t2W";
    const navigate = useNavigate()

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false)

    const [data, setData] = useState({
        email: "",
        password: "",
        username: "",
        timestamp: serverTimestamp()
    })

    const [user, setUser] = useState({})
    const userCollection = collection(db, "user");

    useEffect(() => {

        onSnapshot(userCollection, snapshot => {
            setUser(snapshot.docs.map(doc => {
                return {
                    id: doc.id,
                    ...doc.data()
                }
            }))
        })

        // eslint-disable-next-line
    }, [])

    const register = async () => {
        setLoading(true)

        let isEmailRegistered = false;

        for (let x = 0; x < user.length; x++) {

            if (user[x].email === data.email) {
                isEmailRegistered = true;
            }

        }

        if (isEmailRegistered) {
            setError("emailError");
            notification.error({
                message: 'Email already been registered',
                description: 'Please use another email',
                duration: 3,
            });
            setLoading(false)
        }

        else {
            // eslint-disable-next-line
            let emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
            let passwordRegexNum = /123|234|345|456|567|678|789|987|876|765|654|543|432|321/
            let passwordRegexAlp = /qwertyuiop|asdfghjkl|zxcvbnm/

            if (!emailRegex.test(data.email) || data.email.length === 0) {
                setError("emailError");
                notification.error({
                    message: 'Invalid Email',
                    description: 'Make sure that you input an invalid email address',
                    duration: 3,
                });
                setLoading(false)
            }

            else if (data.username.length < 6) {
                setError("usernameError")
                notification.error({
                    message: 'Username is too short',
                    description: 'Username must be 6 characters and above',
                    duration: 3,
                });
                setLoading(false)
            }

            else if (data.username.length > 20) {
                setError("usernameError")
                notification.error({
                    message: 'Username is too long',
                    description: 'Username must be 20 characters and below',
                    duration: 3,
                });
                setLoading(false)
            }

            else if (data.password.length < 6) {
                setError("passwordError")
                notification.error({
                    message: 'Password is too short',
                    description: 'Password must be 6 characters and above',
                    duration: 3,
                });
                setLoading(false)
            }

            else if ((passwordRegexNum.test(data.password)) || (passwordRegexAlp.test(data.password))) {
                setError("passwordError")
                notification.error({
                    message: 'Password Error',
                    description: 'Password must not contain any pattern such as 123 or QWERTY.',
                    duration: 3,
                });
                setLoading(false)
            }

            else {

                const encryptedPw = CryptoJS.AES.encrypt(
                    JSON.stringify(data.password),
                    secretPass
                ).toString();

                try {

                    const userCredential = await createUserWithEmailAndPassword(auth, data.email, data.password);

                    if (userCredential) {

                        sendEmailVerification(auth.currentUser)
                            .then(() => {
                                notification.success({
                                    message: 'Email Verification Sent',
                                    description:
                                        'Check your spam to verify your link before logging in.',
                                    duration: 5
                                });
                            })

                        const userCollectionRef = collection(db, "user")
                        addDoc(userCollectionRef, {
                            email: data.email,
                            username: data.username,
                            password: encryptedPw,
                            timestamp: serverTimestamp(),

                        })
                            .then(() => {
                                setError('success')
                                notification.success({
                                    message: 'Registered Successfully',
                                    description:
                                        'You can now login with your email and password',
                                    duration: 5
                                });
                                setLoading(false)
                            }).catch((err) => {
                                notification.error({
                                    message: 'Oops! Something went wrong',
                                    description: err,
                                    duration: 5,
                                });
                                setLoading(false)
                            }).finally(() => {
                                setTimeout(() => {
                                    window.location.reload()
                                }, 2000);
                            })

                    }
                    else {
                        notification.error({
                            message: 'Email Exists',
                            description: "Make sure that your email is not yet registered",
                            duration: 5,
                        });
                    }

                } catch (error) {
                    notification.error({
                        message: 'Oops Something went wrong!',
                        description: "Contact our developer - marklestermoreno09@gmail.com",
                        duration: 5,
                    });
                    console.log(error)
                }

            }
        }
    }


    // Login with Google
    const googleLogin = () => {
        setLoading(true)
        signInWithPopup(auth, provider)
            .then((result) => {

                const googleInfo = result.user;
                let isRegistered = false

                for (let x = 0; x < user.length; x++) {

                    if (user[x].email === googleInfo.email) {
                        sessionStorage.setItem('user', JSON.stringify({
                            email: user[x].email,
                            username: user[x].username
                        }));
                        isRegistered = true;
                        break;
                    }

                }

                if (!isRegistered) {
                    const userCollectionRef = collection(db, "user")
                    addDoc(userCollectionRef, {
                        email: googleInfo.email,
                        username: googleInfo.displayName,
                        timestamp: serverTimestamp(),
                        password: "Sign in with Google Provider"
                    }).then(() => {
                        notification.success({
                            message: 'Google Login Successfully',
                            duration: 5
                        });
                        sessionStorage.setItem('user', JSON.stringify(
                            googleInfo.email,
                            googleInfo.displayName,
                            "Sign in with Google Provider",
                        ));
                        navigate("/")
                        setLoading(false)

                    }).catch((err) => {
                        notification.error({
                            message: 'Oops! Something went wrong',
                            description: err,
                            duration: 5,
                        });
                        setLoading(false)
                    })
                }

                else {
                    notification.error({
                        message: 'Email already registered',
                        description: "Login using Email/Password instead",
                        duration: 5,
                    });
                    setLoading(false)
                }
            }).catch((error) => {
                console.log(error)
                setLoading(false)
            });
    }


    const [login, setLogin] = useState({
        email: "",
        password: ""
    })

    const loginEmail = (event) => {
        event.preventDefault();

        setLoading(true)
        let count = 0;

        for (let x = 0; x < user.length; x++) {

            if ((user[x].password === "Sign in with Google Provider") && (user[x].email === login.email)) {

                notification.info({
                    message: 'Email Registered',
                    description: "Just use Login with Google to proceed",
                    duration: 5,
                });
                setLoading(false)
                break;

            }

            else {

                if (user[x].email === login.email) {

                    const bytes = CryptoJS.AES.decrypt(user[x].password, secretPass);
                    const decryptedPw = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));

                    if ((login.password === decryptedPw) && (user[x].email === login.email)) {
                        count = 0
                        signInWithEmailAndPassword(auth, login.email, login.password)
                            .then((userCredential) => {
                                if (userCredential.user.emailVerified) {
                                    setLoading(false)
                                    sessionStorage.setItem('user', JSON.stringify(user[x]));
                                    notification.success({
                                        message: 'Login Successfully',
                                        duration: 5
                                    });
                                }
                                else {
                                    setLoading(false)
                                    notification.error({
                                        message: 'Email Unregistered',
                                        description: "Verify email link in your spam/mail",
                                        duration: 5,
                                    });
                                }

                            })
                            .catch((error) => {
                                setLoading(false)
                                notification.error({
                                    message: 'Oops! Something went wrong.',
                                    description: "Contact our developer to fix this issue",
                                    duration: 5,
                                });
                                console.log(error);
                            }).finally(() => {
                                navigate("/")
                            })
                    }
                    else {
                        count++;
                        setLoading(false)

                    }
                }
                else {
                    count++;
                    setLoading(false)

                }
            }

        }

        if (count !== 0) {
            notification.error({
                message: 'User not found',
                description: "Wrong Password or Email",
                duration: 5,
            });
        }

    };

    const forgotPassword = async (email, e) => {
        e.preventDefault();
        setLoading(true);

        try {
            await sendPasswordResetEmail(auth, email);
            setLoading(false);
            notification.success({
                message: `Link sent to ${email}`,
                description: `Check your mail/spam for password reset link`,
                duration: 5,
            });
        }
        catch (error) {
            if (error.code === 'auth/user-not-found') {
                notification.error({
                    message: `User Not Found`,
                    description: `Please check your email and try again.`,
                    duration: 5,
                });
                setLoading(false)
            } else if (error.code === 'auth/invalid-email') {
                notification.error({
                    message: `Invalid Email Address`,
                    description: `Please check your email and try again.`,
                    duration: 5,
                });
                setLoading(false)
            } else {
                notification.error({
                    message: `Something went wrong`,
                    description: `Error sending password reset email`,
                    duration: 5,
                });
                setLoading(false);
            }

        }
        finally {
            navigate('/')
        }

    }

    const resetPassword = async (oobCode, newPassword, userId, e) => {

        e.preventDefault();
        setLoading(true)

        let passwordRegexNum = /123|234|345|456|567|678|789|987|876|765|654|543|432|321/
        let passwordRegexAlp = /qwertyuiop|asdfghjkl|zxcvbnm/

        if ((passwordRegexNum.test(newPassword)) || (passwordRegexAlp.test(newPassword))) {
            notification.error({
                message: 'Password Error',
                description: 'Password must not contain any pattern such as 123 or QWERTY',
                duration: 3,
            });
            setLoading(false)
        }

        else {

            const encryptedPw = CryptoJS.AES.encrypt(
                JSON.stringify(newPassword),
                secretPass
            ).toString();

            const userRef = doc(db, "user", userId);

            try {
                await updateDoc(userRef, { password: encryptedPw });

                confirmPasswordReset(auth, oobCode, newPassword).then(() => {
                    setLoading(false);
                    notification.success({
                        message: 'Password changed',
                        description: "You can now use your new password",
                        duration: 5
                    });
                }).catch((error) => {
                    console.log(error)
                    setLoading(false);
                    notification.error({
                        message: `Something went wrong`,
                        description: `Error changing your password. Please try again or contact our developer - marklestermoreno09@gmail.com`,
                        duration: 5,
                    });
                })
                    .finally(() => {
                        navigate("/")
                    })
            } catch (error) {
                console.error(error);
                notification.error({
                    message: `Something went wrong`,
                    description: `Error changing your password. Please try again or contact our developer - marklestermoreno09@gmail.com`,
                    duration: 5,
                });
            }
        }
    }

    const contextvalue = {

        error, setError, loading, setLoading,
        register, data, setData, googleLogin,
        loginEmail, setLogin, login, forgotPassword, resetPassword
    }

    return (
        <UserContext.Provider value={contextvalue}>
            {children}
        </UserContext.Provider>
    )
}
