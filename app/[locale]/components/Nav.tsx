'use client'
import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Popup from "./Popup";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import getSession, { destroySession } from "../../../lib/session";
import LocaleSwitcher from "./Switcher";
// import dynamic from "next/dynamic";


export default function Nav() {
    const [toggle, setToggle] = useState(false);
    const [active, setActive] = useState(0);
    const [showPopup, setShowPopup] = useState(false);
    const [session, setSession] = useState() as any;
    const navRef = useRef(null);

    const open = () => {
        setToggle(!toggle);
    };

    useEffect(() => {
        const sessionUser = getSession();
        setSession(sessionUser)
    }, [])

    const closePopupHandler = (e: any) => {
        setShowPopup(false);
        change(e);
    };

    const change = (e: any) => {
        const id = Number(e.target.id);
        setActive(id);
    };

    const handleLogout = () => {
        destroySession();
    };

    return (
        <div className="shadow-lg p-4 font-semibold">
            <div className="max-w-[1240px] flex justify-between py-[15px] mx-auto">
                <div className="text-2xl">My Logo</div>
                {toggle ? (
                    <AiOutlineClose
                        onClick={open}
                        className="text-2xl md:hidden block"
                    />
                ) : (
                    <AiOutlineMenu
                        onClick={open}
                        className="text-black cursor-pointer text-2xl md:hidden block"
                    />
                )}

                <ul className="hidden md:flex gap-6" ref={navRef}>
                    {menuItems.map((menuItem, index) => (
                        <NavItem
                            // id={index}
                            key={index}
                            active={active}
                            change={change}
                            {...menuItem}
                        />
                    ))}
                </ul>

                <ul className="hidden md:flex text-white gap-10">
                    {(session && session.email) ? (
                        <>
                            <li className="text-[#1a1a64] cursor-default hover:underline hover:border-xl rounded px-4 py-2">
                                {session.email}
                            </li>
                            <li className="bg-[#1a1a64] hover:bg-black text-white hover:text-white hover:underline hover:border-xl rounded px-4 py-2">
                                <button onClick={handleLogout}>Logout</button>
                            </li>
                        </>
                    ) : (
                        <li className="bg-[#1a1a64] hover:bg-black text-white hover:text-white hover:underline hover:border-xl rounded px-4 py-2">
                            <Link href="/login" id="5" onClick={change}>
                                Login
                            </Link>
                        </li>
                    )}
                </ul>

                <ResponsiveMenu handleLogout={handleLogout} session={session} active={active} change={change} toggle={toggle} />
                <LocaleSwitcher />
            </div>
            {showPopup && <Popup closePopupHandler={closePopupHandler} />}
        </div>
    );
}
type NavItemProps = {
    id: number;
    active: number;
    change: (e: any) => void,
    text: string
    href: string
}
function NavItem({ id, active, change, text, href }: NavItemProps) {
    return (
        <li
            className={`${active === id ? "bg-[#1a1a64] text-white" : ""} transition-all duration-300 hover:bg-[#1a1a64] hover:text-white hover:border-xl rounded p-2`}>
            <Link href={href} id={String(id)} onClick={change}>
                {text}
            </Link>
        </li>
    );
}

const menuItems = [
    { text: "Home", href: "/", id: 0 },
    { text: "Docks Rentals", href: "/rentals", id: 1 },
    { text: "Moring Leasing", href: "/leases", id: 2 },
    { text: "Contact us", href: "/contact", id: 3 },
    { text: "About", href: "/about", id: 4 },
];

function ResponsiveMenu({ active, change, toggle, session, handleLogout }: { active: number, change: (e: any) => void, toggle: boolean, session: any, handleLogout: () => void }) {
    return (
        <ul className={`md:hidden w-full h-screen z-20 text-white fixed top-[92px] bg-black ${toggle ? "left-[0]" : "left-[-100%]"}`}>
            {menuItems.map((menuItem, index) => (
                <li key={index} className="p-5">
                    <Link
                        href={menuItem.href}
                        id={String(index)}
                        onClick={change}
                        style={
                            active === index ? { color: "rgb(255, 230, 200)", fontWeight: "bold" } : {}
                        }>
                        {menuItem.text}
                    </Link>
                </li>
            ))}
            <ul>
                {(session && session.email) ? (
                    <>
                        <li className="text-[#1a1a64] cursor-default hover:underline hover:border-xl rounded px-4 py-2">
                            {session.email}
                        </li>
                        <li className="bg-[#1a1a64] hover:bg-black text-white hover:text-white hover:underline hover:border-xl rounded px-4 py-2">
                            <button onClick={handleLogout}>Logout</button>
                        </li>
                    </>
                ) : (
                    <li className="bg-[#1a1a64] hover:bg-black text-white hover:text-white hover:underline hover:border-xl rounded px-4 py-2">
                        <Link href="/login" id="5" onClick={change}>
                            Login
                        </Link>
                    </li>
                )}
            </ul>
        </ul>
    );
}

// export default dynamic(Promise.resolve(Nav), {ssr: false});
