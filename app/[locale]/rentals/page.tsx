'use client'
import { FormEvent, useEffect, useState } from 'react';
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
import { getPropertyData } from '@/lib/getProperties';
import { useTranslations } from 'next-intl';

function Rentals() {
  const t = useTranslations("Rentals")
  const session = getSession();
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState({ message: '', ok: false });
  const cookies = new Cookies();
  const initialPropertyState = {
    id: Math.random(),
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
  const [propertyData, setPropertyData] = useState<property[]>()
  const url: string = "https://dockingapi20230918192206.azurewebsites.net/api/Products";
  useEffect(() => {
    const fetchData = async () => {
      try {
        const properties = await getPropertyData(url, "Rentals");
        setPropertyData(properties);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [loading]);

  const { address, location, rentPerMonth, spaceNumber, status, contractDate, available, addedDate } = property;

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setResponse({ message: "", ok: false });
    const jwtAuthorization = cookies.get('jwt_authorization');
    try {
      const response = await fetch(url, {
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
        setTimeout(() => {
          setShowModal(false);
        }, 2000)
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

  const availableTemplate = (property: property) => {
    return (
      <tr>{property.available ? "Yes" : "No"}</tr>
    )
  }
  const [filter, setFilter] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS }
  });
  const addressTemplate = (property: property) => {
    return (
      <Link className='hover:underline hover:text-black' href={`${property.available ? '/property/'+ property.id : "#"} `}>{property.address}
      </Link>
    )
  }
  return (
    <>
      <div className=" flex w-full mx-auto justify-center flex-col">
        <div className="relative h-[400px] flex bg-cover bg-center text-white opacity-90" style={{ backgroundImage: "url('/images/docks.jpg')" }}>
          <div className="absolute inset-0 bg-black opacity-60"></div> {/* Semi-dark overlay */}
          <div className="relative px-4 md:px-0 z-10 flex flex-col items-center justify-center">
            <h1 className="text-4xl text-center font-bold mb-4">{t("title")}</h1>
            <p className="text-lg md:w-[50%] text-center">
              {t("subtitle")}
            </p>
          </div>
        </div>
        <div className="flex flex-col md:flex-row justify-center items-center px-2 md:px-10 mt-[5%]">
          <div className='md:w-1/2 mb-4 md:mb-0 m:px-0 px-4'>
            <h1 className='text-2xl font-bold'>{t("para1")}</h1>
            <p className='text-lg '>{t("para1Subtitle")}</p>
          </div>
          <div className='md:w-1/2 flex justify-end items-end'>
            {(session && session.email) ? (
              <button className="bg-[#1a1a64] active:bg-[#1a1a1a] font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                style={{ color: "white" }}
                type="button" onClick={() => setShowModal(true)} >Add New Rental</button>
            ) : (
              <InputText
                onInput={(e: any) => setFilter({
                  ...filter,
                  global: { value: e.target.value, matchMode: FilterMatchMode.CONTAINS }
                })}
                placeholder='Search..'
              />
            )}
          </div>
        </div>
        {showModal ? (
          <DataModal setProperty={setProperty} setShowModal={setShowModal} property={property} handleSubmit={handleSubmit} loading={loading} response={response} />
        ) : null
        }
        <div className='flex flex-col justify-center mb-[8%] mt-[2%] px-2 md:px-10 overflow-x-auto' style={{ maxWidth: '100vw' }}>
          <div className='flex justify-center md:justify-end mb-4'>
            <InputText
              className={`${!(session && session.email) && "hidden"}`}
              onInput={(e: any) => setFilter({
                ...filter,
                global: { value: e.target.value, matchMode: FilterMatchMode.CONTAINS }
              })}
              placeholder='Search..'
            />
          </div>
          <DataTable showGridlines stripedRows paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown" rows={5} paginator id='myTable' value={propertyData} filters={filter}>
            <Column field='id' header="ID" sortable />
            <Column field='address' header="Address" body={addressTemplate} sortable />
            <Column field='location' header="Location" sortable />
            <Column field='rentPerMonth' header="Rent/Month" sortable />
            <Column field='spaceNumber' header="Space Number" sortable />
            <Column field='contractDate' header="Contract Date" sortable />
            <Column field='available' header="Available" sortable body={availableTemplate} />
            <Column field='pendingForApproval' header="Pending for Approval" sortable />
          </DataTable>
        </div>
      </div>
    </>)
};
export default Rentals;