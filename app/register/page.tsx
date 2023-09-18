"use client"
import Link from 'next/link';
import React, { FormEvent, useState } from 'react';
import { FaEnvelope } from 'react-icons/fa';
import { MdLockOutline } from 'react-icons/md';

import Modal from '../components/Modal';
import Cookies from 'universal-cookie';
const Page = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        firstName: '',
        lastName: '',
        gender: '',
        address: '',
        userAvatar: '',
    });
    const {email, password, firstName, lastName, gender, address, userAvatar} = formData;
    const [showModal, setShowModal] = useState(false);

    const cookies = new Cookies();

    const submit = async (e: FormEvent) => {
        e.preventDefault(); // Prevent form submission and page refresh
        try {
            const response = await fetch(`https://dockingapi20230918192206.azurewebsites.net/api/Users/RegisterUser`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include',
                body: JSON.stringify({
                    email,
                    password,
                    firstName,
                    lastName,
                    gender,
                    address,
                    userAvatar
                })
            });
            if (response.ok) {
                const responseBody = await response.json();
                setShowModal(true);
                setTimeout(() => {
                    setShowModal(false);
                }, 2000);
            } else {
                console.error('Login failed');
            }
        } catch (error) {
            console.error('Error during login:', error);
            cookies.set('jwt_authorization', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1laWQiOiI1OGNkMGVjOS05ZTc0LTRiYWUtYjAwNy0wODVlZGU1MGY2NjMiLCJ1bmlxdWVfbmFtZSI6InRlc3QgYWxpIiwiZW1haWwiOiJ6aWFAZ21haWwuY29tIiwiVXNlckF2YXRhciI6IiIsIm5iZiI6MTY5Mzk5NDU0NywiZXhwIjoxNjkzOTk2MzQ3LCJpYXQiOjE2OTM5OTQ1NDcsImlzcyI6Imh0dHA6Ly9jb2RlcHVsc2Uub3JnLyIsImF1ZCI6Imh0dHA6Ly9sb2NhbGhvc3Q6MzAwMCJ9.poMvfCuTqxtjbeZUX_ALsf6OjVgpiTqrpEW04uu8rD')
            window.location.href = "/"
        }
    };

    return (
        <main className='overflow-x-hidden flex flex-col items-center justify-center w-full flex-1 text-center min-h-screen py-2 bg-[#faf7f2]'>
            <div className="w-screen justify-center relative h-[400px] flex bg-cover bg-center text-white opacity-90" style={{ backgroundImage: "url('/images/docks.jpg')" }}>
                <div className="absolute inset-0 bg-black opacity-60"></div> {/* Semi-dark overlay */}
                <div className="relative  z-10 flex flex-col items-center justify-center">
                    <h1 className="text-4xl font-bold mb-4 text-white">Registration Page</h1>
                    {/* <p className="md:text-lg md:w-[50%] text-center">
                        Providing Docking Leasing and Rental Services in Umeå. Lorem ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
                    </p> */}
                </div>
            </div>
            <form onSubmit={submit} className='mt-[-20%] z-10' >
                <div className='bg-white flex flex-col md:flex-row rounded-2xl shadow-2xl my-20  md:w-full md:max-w-4xl '>
                    {/* sign in section */}
                    <div className='w-full md:w-4/5 p-5'>
                        <div className='font-bold text-center md:text-left'>
                            <span className='text-newback'>Company</span>Name
                        </div>
                        <div className='py-10'>
                            <h2 className='md:text-3xl text-2xl font-bold text-black mb-2'>Register Yourself</h2>
                            <div className='border-2 w-10 border-black inline-block mb-2'></div>
                            <div className='flex flex-col justify-center'>
                                <div className='flex flex-col md:flex-row space-y-2 md:space-x-2 w-full'>
                                    <div className='bg-[#edf2f7] w-full md:w-64 p-2 flex items-center '>
                                        <FaEnvelope className='text-[#a0aec0] mr-2' />
                                        <input required type='email' name='email' placeholder='Email' onChange={e => setFormData({ 
                                            ...formData, 
                                            email:e.target.value })} className='bg-[#edf2f7] rounded outline-none text-sm flex-1' />
                                    </div>
                                    <div className='bg-[#edf2f7] w-full md:w-64 mt-3 p-2 flex items-center '>
                                        <MdLockOutline className='text-[#a0aec0] mr-2' />
                                        <input required type='password' name='password' placeholder='Password' onChange={e => setFormData({ 
                                            ...formData, 
                                            password:e.target.value })} className='bg-[#edf2f7] rounded outline-none text-sm flex-1' />
                                    </div>
                                </div>
                                <div className='flex flex-col md:flex-row space-y-2 md:space-x-2'>
                                    <input required type='text' name='firstName' placeholder='First Name' onChange={e => setFormData({ 
                                            ...formData, 
                                            firstName:e.target.value })} className='bg-[#edf2f7] outline-none text-sm w-full md:w-64 p-2 mt-3' />
                                    <input required type='text' name='lastName' placeholder='Last Name' onChange={e => setFormData({ 
                                            ...formData, 
                                            lastName:e.target.value })} className='bg-[#edf2f7] rounded outline-none text-sm w-full md:w-64 p-2 mt-3' />
                                </div>
                                <div className='flex flex-col md:flex-row space-y-2 md:space-x-2'>
                                    <input required type='text' name='gender' placeholder='Gender' onChange={e => setFormData({ 
                                            ...formData, 
                                            gender:e.target.value })} className='bg-[#edf2f7] rounded outline-none text-sm w-full md:w-64 p-2 mt-3' />
                                    <input required type='text' name='address' placeholder='Address' onChange={e => setFormData({ 
                                            ...formData, 
                                            address:e.target.value })} className='bg-[#edf2f7] rounded outline-none text-sm w-full md:w-64 p-2 mt-3' />
                                </div>
                                <div className='flex flex-col md:flex-row space-y-2 md:space-x-2'>
                                    <input type='text' name='userAvatar' placeholder='User Avatar' onChange={e => setFormData({ 
                                            ...formData, 
                                            userAvatar:e.target.value })} className='bg-[#edf2f7] rounded outline-none text-sm w-full md:w-64 p-2 mt-3' />
                                </div>
                                <div className='flex justify-center'>
                                    <button className='mt-5 border-2 border-black text-black rounded-full px-12 py-2 inline-block font-semi-bold hover:bg-black hover:text-white' type="submit">
                                        Sign Up
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='w-full md:w-2/5 bg-[#1a1a64]  text-white rounded  md:rounded-tr-2xl md:rounded-br-2xl py-36 px-12'>
                        <h2 className='text-3xl font-bold mb-2 '>Hello, David</h2>
                        <div className='border-2 w-10 inline-block mb-2 '></div>
                        <p className='mb-10'>Already a member? Click below to sign in</p>
                        <Link href='/signin' className='border-2 border-white rounded-full px-12 py-2 inline-block font-semi-bold hover:bg-white hover:text-black '>Sign In</Link>

                    </div>
                </div>
            </form>
            {showModal && (<Modal
                title="Registration Successful"
                content="<h2>You are registered successfully.</h2>"
                setShowModal={setShowModal} />)
            }
        </main >
    );
};

export default Page;