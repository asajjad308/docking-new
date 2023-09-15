"use client"
import React, { useState, useRef } from 'react';
import Link from 'next/link';
import Popup from './Popup';
import { AiOutlineMenu, AiOutlineClose } from 'react-icons/ai';

function Nav() {
    const [toggle, setToggle] = useState(false);
    const [active, setActive] = useState(0);
    const [showPopup, setShowPopup] = useState(false);
    const navRef = useRef(null);

    const open = () => {
        setToggle(!toggle);
    };

    //   function closePopupHandler(e) {
    //     setShowPopup(false);
    //     change(e);
    //   }

    const change = (e: any) => {
        let ids = e.target.id;
        ids = Number(ids);
        setActive(ids);

        // if (navRef.current) {
        //   navRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
        // }
    };

    return (
        <div className="shadow-lg p-4 font-semibold ">
            <div className="max-w-[1240px] flex justify-between py-[15px] mx-auto">
                <div className="text-2xl ">My Logo</div>
                <ul className="hidden md:flex gap-6 " ref={navRef}>
                    <li className=" hover:bg-[#1a1a64] hover:text-white hover:border-xl rounded p-2">
                        <Link
                            href="/"
                            id="0"
                            onClick={change}
                            className={active === 0 ? 'bg-[#1a1a64] text-white border-xl p-2 rounded' : ''}>
                                Home
                        </Link>
                    </li>
                    <li className=' hover:bg-[#1a1a64] hover:text-white hover:text-newback hover:border-xl rounded p-2 '>
                        <Link
                            href="/rentals"
                            id="1"
                            onClick={change}
                            className={active === 1 ? 'bg-[#1a1a64] text-white border-xl p-2 rounded' : ''}
                        >
                            Docks Rentals
                        </Link>
                    </li>
                    <li className=' hover:bg-[#1a1a64] hover:text-white hover:border-xl rounded p-2 '>
                        <Link
                            href="/leases"
                            id="2"
                            onClick={change}
                            className={active === 2 ? 'bg-[#1a1a64] text-white border-xl p-2 rounded' : ''}
                        >
                            Moring Leasing
                        </Link>
                    </li>
                    <li className=' hover:bg-[#1a1a64] hover:text-white hover:border-xl rounded p-2 '>
                        <Link
                            href="/contact"
                            id="3"
                            onClick={change}
                            className={active === 3 ? 'bg-[#1a1a64] text-white border-xl p-2 rounded' : ''}
                        >
                            Contact us
                        </Link>
                    </li>
                    <li className='hover:bg-[#1a1a64] hover:text-white hover:border-xl rounded p-2 '>
                        <Link
                            href="/about"
                            id="4"
                            onClick={change}
                            className={active === 4 ? 'bg-[#1a1a64] text-white border-xl p-2 rounded' : ''}
                        >
                            About
                        </Link>
                    </li>
                </ul>

                <ul className="hidden md:flex text-white gap-10 ">
                    <li className='bg-[#1a1a64] hover:bg-black text-white hover:text-white hover:underline hover:border-xl rounded px-4 py-2'>

                        <Link
                            href="/signin"
                            id="4"
                            onClick={change}
                            className={active === 5 ? 'bg-[#1a1a64] text-white border-xl p-2 rounded' : ''}
                        >
                            Login
                        </Link>
                    </li>
                </ul>

                {/* ////////////////////Responsive Menu //////////////////*/}
                <div onClick={open} className='block md:hidden z-10'>


                    {toggle ? <AiOutlineClose /> : <AiOutlineMenu />}




                    <ul>
                        <li className="p-5 ">
                            <Link


                                href="/"
                                id="7"
                                onClick={change}
                                style={
                                    active === 7
                                        ? {
                                            background: 'yellow',
                                            padding: '8px',
                                            color: 'black',
                                            borderRadius: '8px',
                                        }
                                        : { background: 'none' }
                                }
                            >
                                Home
                            </Link>
                        </li>
                        <li className="p-5">
                            <Link
                                href="rentals"
                                id="8"
                                onClick={change}
                                style={
                                    active === 8
                                        ? {
                                            background: 'yellow',
                                            padding: '8px',
                                            color: 'black',
                                            borderRadius: '8px',
                                        }
                                        : { background: 'none' }
                                }
                            >
                                Dock Rentals
                            </Link>
                        </li>
                        <li className="p-5">
                            <Link
                                href="/leases"
                                id="9"
                                onClick={change}
                                style={
                                    active === 9
                                        ? {
                                            background: 'yellow',
                                            padding: '8px',
                                            color: 'black',
                                            borderRadius: '8px',
                                        }
                                        : { background: 'none' }
                                }
                            >
                                Docks Leassing
                            </Link>
                        </li>
                        <li className="p-5">
                            <Link
                                href="/contact"
                                id="10"
                                onClick={change}
                                style={
                                    active === 10
                                        ? {
                                            background: 'yellow',
                                            padding: '8px',
                                            color: 'black',
                                            borderRadius: '8px',
                                        }
                                        : { background: 'none' }
                                }
                            >
                                Contact Us
                            </Link>
                        </li>
                        <li className="p-5">
                            <Link
                                href="/about"
                                id="10"
                                onClick={change}
                                style={
                                    active === 10
                                        ? {
                                            background: 'yellow',
                                            padding: '8px',
                                            color: 'black',
                                            borderRadius: '8px',
                                        }
                                        : { background: 'none' }
                                }
                            >
                                About
                            </Link>
                        </li>



                        <li className="p-5">
                            <Link
                                href="/login"
                                id="13"
                                onClick={change}
                                style={
                                    active === 13
                                        ? {
                                            background: 'yellow',
                                            padding: '5px',
                                            color: 'black',
                                            borderRadius: '8px',
                                        }
                                        : { background: 'none' }
                                }
                            >
                                Login
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
            {/* {showPopup && <Popup closePopupHandler={closePopupHandler} />} */}
        </div>
    );
}

export default Nav;
