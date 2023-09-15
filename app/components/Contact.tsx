import React from 'react'
import { FaEnvelope, FaLocationArrow, FaPhoneAlt } from 'react-icons/fa';


function page() {
    return (

        <main className='flex flex-col items-center justify-center  w-full  text-center py-2 bg-[#faf7f2] '>

            {/* wraper div */}
            <div className='flex flex-col md:flex-row justify-center w-full p-2 md:p-16'>
                <div className='w-full m:w-[50%] p-6 rounded bg-primary'>
                    <div className='py-10'>
                        <h2 className='md:text-3xl text-2xl font-bold text-black mb-2'>Send us a message</h2>
                        <p className="  mb-4 mt-6 px-12">
                            We would love to hear from you! Fill out the form below and we&apos;ll
                            get back to you as soon as possible.
                        </p>
                        <div className='border-2 w-10 border-black inline-block mb-8'></div>
                        <div className='flex flex-col items-center'>
                            <div className='bg-[#edf2f7] w-full border border-gray-300 md:w-[70%] p-2 flex items-center mb-3s mb-3'>

                                <input type='name' name='name' placeholder='Name' className='bg-[#edf2f7] outline-none text-sm flex-1  ' />
                            </div>
                            <div className='bg-[#edf2f7] w-full border border-gray-300 md:w-[70%] p-2 flex items-center  mb-4'>

                                <input type='email' name='email' placeholder='Email' className='bg-[#edf2f7] outline-none text-sm flex-1' />
                            </div>
                            <div className='bg-[#edf2f7] w-full border border-gray-300 md:w-[70%] p-2 flex items-center mb-4'>
                                <input type='Ämne' name='email' placeholder='Ämne' className='bg-[#edf2f7] outline-none text-sm flex-1  ' />
                            </div>
                            <div className='bg-[#edf2f7] w-full border border-gray-300 md:w-[70%] p-2 flex items-center mb-3s mb-3'>
                                <textarea
                                    id="message"
                                    className="bg-[#edf2f7] outline-none text-sm flex-1 "
                                    rows={4}
                                    placeholder="Write your message"
                                ></textarea>
                            </div>

                            <a href='#' className='border-2 mt-8 border-black hover:border-primary text-black rounded-full px-12 py-2 inline-block font-semi-bold hover:bg-[#1a1a64] hover:text-white '>Sign In</a>


                        </div>
                    </div>
                </div>

                {/* sign up section */}
                <div className='w-full md:w-[40%] bg-[#1a1a64] text-white rounded  md:rounded-tr-2xl md:rounded-br-2xl py-16'>
                    <p className='mb-10'>Contacts us</p>
                    <h2 className='text-3xl font-bold mb-2 '>We are here for you</h2>
                    <div className='border-2 w-10 inline-block'></div>
                    <p className='mb-10 mt-8'>Fill up personal information and and start journey with us!</p>
                    <div>
                        <div className='flex flex-col items-center mb-10'><span className="flex flex-row px-2 ">
                            <FaPhoneAlt className='mt-2' />   <h2 className='text-xl font-semibold'>&nbsp; - Telefone:</h2></span>
                            <h3><a href="tel:090-123456">090-123456</a></h3>
                        </div>
                        <div className='flex flex-col items-center mb-10'><span className="flex flex-row px-2   "><FaEnvelope className='mt-2' />   <h2 className='text-xl font-semibold'>&nbsp; - Email:</h2></span>
                            <a href="mailto:ursziakan@gmail.com">
                                <h3>ursziakan@gmail.com</h3>
                            </a>
                        </div>
                        <div className='flex flex-col items-center mb-10 '><span className="flex flex-row px-2   pt-6 "><FaLocationArrow className='mt-2' />   <h2 className='text-xl font-semibold'>&nbsp; -     Location</h2></span>
                            <h3>Lorem ipsum Lorem 234 Umeå</h3>
                        </div>
                    </div>
                </div>
            </div>

        </main>




    )
}

export default page