'use client'
import { FormEvent, useState } from 'react';
import propertyData from '../../lib/data';
import DataModal from '../components/DataModal';
import Cookies from 'universal-cookie';
import Link from 'next/link';
import getSession from '@/lib/session';
import { DataTable } from "primereact/datatable";
import { Column } from 'primereact/column';
import { FilterMatchMode } from "primereact/api"
import { InputText } from "primereact/inputtext"
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";

function Rentals() {

  const session = getSession();
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState({ message: '', ok: false });
  const cookies = new Cookies();
  const initialPropertyState = {
    address: '',
    location: '',
    rentPerMonth: 1,
    spaceNumber: '',
    status: true,
    contractDate: '2023-08-16T14:19:03.138Z',
    available: true,
    addedDate: '2023-08-16T14:19:03.138Z'
  };
  const [property, setProperty] = useState(initialPropertyState);

  const { address, location, rentPerMonth, spaceNumber, status, contractDate, available, addedDate } = property;

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setResponse({ message: "", ok: false });
    const jwtAuthorization = cookies.get('jwt_authorization');
    try {
      const response = await fetch('https://localhost:7064/api/Products', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Authorization': `Bearer ${jwtAuthorization}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id: 0, address, location, rentPerMonth, spaceNumber, status, contractDate, available, addedDate, category: 'Rentals' })
      });

      if (response.ok) {
        setLoading(false);
        setResponse({ message: "Your product has been added successfully.", ok: true });
      } else {
        setLoading(false);
        console.error('Failed to add product');
        setResponse({ message: "There was an error in adding your product", ok: false });
      }
    } catch (error) {
      setLoading(false);
      console.error('Error while adding product:', error);
      setResponse({ message: "There was an error in adding your product", ok: false });
    }
    setProperty(initialPropertyState);
    setTimeout(() => {
      setResponse({ message: '', ok: false })
    }, 2000)
  };

  const [filter, setFilter] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS }
  })
  return (
    <>
      <div className=" flex w-full mx-auto justify-center flex-col">
        <div className="relative h-[400px] flex bg-cover bg-center text-white opacity-90" style={{ backgroundImage: "url('/images/docks.jpg')" }}>
          <div className="absolute inset-0 bg-black opacity-60"></div> {/* Semi-dark overlay */}
          <div className="relative  z-10 flex flex-col items-center justify-center">
            <h1 className="text-4xl font-bold mb-4">Docks Rentals Page</h1>
            <p className="text-lg md:w-[50%] text-center">
              Providing Docking Leasing and Rental Services in Umeå. Lorem ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry&apos;s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
            </p>
          </div>
        </div>
        <div className="flex flex-col md:flex-row justify-center items-center px-2 md:px-10 mt-[5%]">
          <div className='md:w-1/2 mb-4 md:mb-0'>
            <h1 className='text-2xl font-bold'> Docking Available Leases in Umeå</h1>
            <p className='md:w-1/2 text-lg '>Explore available rental docking spaces for your convenience. write abaout some rules and regulation or procedure</p>
          </div>
          <div className='md:w-1/2 flex justify-end items-end'>
            {((session && session.email) == 'zia@gmail.com') && (
              <button className="bg-[#1a1a64] active:bg-[#1a1a1a] font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                style={{ color: "white" }}
                type="button" onClick={() => setShowModal(true)} >Add New Rental</button>
            )}
          </div>
        </div>
        {showModal ? (
          <DataModal setProperty={setProperty} setShowModal={setShowModal} property={property} handleSubmit={handleSubmit} loading={loading} response={response} />
        ) : null
        }
        <div className='flex flex-col justify-center mb-[8%] mt-[2%] px-2 md:px-10 overflow-x-auto' style={{ maxWidth: '100vw' }}>
          <div className='flex justify-start'>
            <InputText
            onInput={(e: any) => setFilter({
              ...filter,
              global: { value: e.target.value, matchMode: FilterMatchMode.CONTAINS }
            })}
            placeholder='Search..'
            />
          </div>
          <DataTable id='myTable' value={propertyData} filters={filter}>
            <Column field='id' header="ID" sortable />
            <Column field='address' header="Address" sortable />
            <Column field='location' header="Location" sortable />
            <Column field='rentPerMonth' header="Rent/Month" sortable />
            <Column field='spaceNumber' header="Space Number" sortable />
            <Column field='contractDate' header="Contract Date" sortable />
            <Column field='available' header="Available" sortable />
            <Column field='pendingForApproval' header="Pending for Approval" sortable />
            <tbody>
              {propertyData.map(({ address, location, rentPerMonth, spaceNumber, contractDate, available, id, pendingForApproval }) => (
                <tr key={id} className="bg-white border-t border-[#c0c0c0]">
                  <td className="px-4 py-2">{id}</td>
                  <td className="px-4 py-2">
                    <Link href={`/property/${id}`} className="text-[#5d5df4] hover:underline" >
                      {address}
                    </Link>
                  </td>
                  <td className="px-4 py-2">{location}</td>
                  <td className="px-4 py-2">{rentPerMonth}</td>
                  <td className="px-4 py-2">{spaceNumber}</td>
                  <td className="px-4 py-2">{contractDate}</td>
                  <td className="px-4 py-2">{available ? 'Yes' : 'No'}</td>
                  <td className="px-4 py-2">{pendingForApproval ? 'Yes' : 'No'}</td>
                </tr>
              ))}
            </tbody>
          </DataTable>
        </div>
      </div>
    </>)
};
export default Rentals;