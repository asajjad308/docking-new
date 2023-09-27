'use client'
import { getLocations } from '@/lib/getProperties';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { useEffect, useState } from 'react';


// export async function generateMetaata () {
//     const t = await useTranslations("Index");
//     return {
//         title: t("title")
//     }
// }
function Hero() {
    const t = useTranslations("Index") 
    const [locations, setLocations] = useState<string[]>();
    const [selectedLocation, setSelectedLocation] = useState<string>();
    const [selectedCategory, setSelectedCategory] = useState<string>();
    useEffect(() => {
        const fetchData = async () => {
            try {
                const locations = await getLocations();
                setLocations(locations);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchData();
    }, []);
    return (
        <div className="relative  sm:h-300 md:h-600 flex justify-center    h-[600px] ">
            <video className="absolute h-full w-full object-cover " autoPlay loop muted playsInline>
                <source src="./videos/video.mp4" type="video/mp4" />
            </video>
            <div className="absolute inset-0 bg-back opacity-40"></div>
            <div
                className="z-10 flex flex-col items-center justify-between h-full" >
                <div className="text-center mt-20 mx-4">
                    <h1 className="heading text-xl text-black bg-[#e8e8ef] md:text-2xl lg:text-2xl font-bold p-4 rounded font-heading">
                        {t("title")}
                    </h1>
                    <p className="pt-10 text-xl md:mx-auto md:max-w-sm font-bold lg:text-2xl  line leading-snug text-white font-heading ">
                        Set sail for unforgettable experiences rent or lease your perfect boat today!
                    </p>
                </div>
                <div className="md:flex bg-[#e5e5e5]/80 p-5 mt-8 w-[90%] md:w-[600px] rounded-md md:rounded-full z-10 mb-20">
                    <div className="w-full md:w-1/3 px-0 md:px-5">
                        <select onChange={e => setSelectedLocation(e.target.value)}
                            id="location" className="border-2 border-gray-300 w-full rounded-full py-2 px-4" name='location'>
                            <option value="" selected>Select Location</option>
                            {locations?.map((loc: string, index) => {
                                return <option key={index} value={loc}>{loc}</option>
                            })}
                        </select>
                    </div>
                    <div className="w-full md:w-1/3 px-0 md:px-5 my-4 md:my-0 md:mt-0 ">
                        <select onChange={e => setSelectedCategory(e.target.value)}
                            id="type" className="border-2 border-gray-300 w-full rounded-full py-2 px-3" name='type'>
                            <option value="">Select Type</option>
                            <option value="rentals">Rental</option>
                            <option value="leases" >Lease</option>
                        </select>
                    </div>
                    <div className="flex md:w-1/3 w-full px-0 md:px-5 sm:mt-4 md:mt-0 items-center ">
                        <button className="transition-all duration-300 rounded-full hover:border-black  py-2 px-8 bg-primary border border-black hover:bg-black hover:text-white w-full">
                            <Link href={`/${selectedCategory}/${selectedLocation}`}>
                                Search
                            </Link>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Hero;
