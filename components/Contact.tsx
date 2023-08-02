'use client'

import React, { FormEventHandler, useRef, useState } from 'react';
import emailjs from '@emailjs/browser';

import { FiMail, FiPhoneCall, FiPocket } from "react-icons/fi"
import { Luckiest_Guy, Pacifico } from 'next/font/google'
import Alert from './Alert';
const luckiest = Luckiest_Guy({ subsets: ['latin'], weight: ['400'] })

const Contact = () => {
    const form = useRef<any>();
    const [alertState, setAlertState] = useState<boolean>(false)

    const sendEmail: FormEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault();

        emailjs.sendForm('service_w75yzjp', 'template_bathl5q', form.current, 'P2w6wEwYIAeZK8r1g')
            .then((result) => {
                setAlertState(true)
                form.current.reset()
                window.scrollTo(0, 0)
            }, (error) => {
                console.log(error.text);
            });
    }

    return (
        <main className='bg-white w-full h-[36rem] rounded-3xl mt-2 p-14 hover:overflow-y-scroll overflow-hidden hover:shadow-lg duration-700'>

            { alertState && <Alert message='Message sent successfully' alertState={alertState} setAlertState={setAlertState} /> }

            <div className='flex gap-4 items-center'>
                <h1 className={`capitalize font-bold text-4xl flex items-center gap-3 ${luckiest.className}`}>Contact <span className="text-5xl"></span></h1>
                <hr className="w-[50rem]" />
            </div>

            <div className="grid grid-cols-2 gap-5 mt-5">

                <div className="bg-[#FFEED9] p-5 flex flex-col justify-center rounded-xl w-full">
                    <div className="top mb-1 flex items-center gap-2">
                        <FiPhoneCall className="text-red-500" size={25} />
                        <h6 className="font-bold text-2xl">Phone:</h6>
                    </div>

                    <p className="text-sm ml-8">+234 814 787 1946</p>
                </div>

                <div className="bg-[#FFEED9] p-5 flex flex-col justify-center rounded-xl w-full">
                    <div className="top mb-1 flex items-center gap-2">
                        <FiMail className="text-red-500" size={25} />
                        <h6 className="font-bold text-2xl">Email:</h6>
                    </div>

                    <p className="text-sm ml-8">godsonazubuike15@gmail.com</p>
                </div>

                <div className="bg-[#F2F7FC] p-5 flex flex-col justify-center rounded-xl w-full col-span-2">
                    <p className="w-full">I am always open to discussing <b>new projects</b>, opportunities in tech world, <b>partnerships</b> and more so <b>mentorship</b>.</p>

                    <form className="mt-5 grid grid-cols-2 gap-3" ref={form} onSubmit={sendEmail}>
                        <div className="form-group flex flex-col gap-1">
                            <label htmlFor="name">Name</label>
                            <input required type="text" name="user_name" id="name" className="border-2 p-2 rounded-lg focus:border-red-400 outline-none transition duration-500 focus:animate-pulse" />
                        </div>

                        <div className="form-group flex flex-col gap-1">
                            <label htmlFor="email">Email</label>
                            <input required type="email" name="user_email" id="email" className="border-2 p-2 rounded-lg focus:border-red-400 outline-none transition duration-500 focus:animate-pulse" />
                        </div>

                        <div className="form-group flex flex-col gap-1 col-span-2">
                            <label htmlFor="message">Message</label>
                            <input required type="text" name="message" id="message" className="border-2 p-2 rounded-lg focus:border-red-400 outline-none transition duration-500 focus:animate-pulse" />
                        </div>

                        <button className="btn btn-warning col-span-2" type="submit">Send message</button>
                    </form>
                </div>

            </div>
        </main>
    )
}

export default Contact