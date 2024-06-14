import React, { useState } from "react";
import axios from 'axios'; 
import { useNavigate } from 'react-router-dom'; 

export default function Table({ headers, data, endpoint, inputData, titleModal, opsiButton, columnForTd }) {
    const navigate = useNavigate(); 


    function handlePermanentDelete(id) { 
        const endpointPermanentDelete = endpoint['permanentDelete'].replace("{id}", id); 
        axios.delete(endpointPermanentDelete, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token'),
            }
        })
        .then(res => {
            window.location.reload();
        })
        .catch(err => {
            console.log(err);
            if (err.response && err.response.status === 401) {
                navigate('/login?message=' + encodeURIComponent('Anda belum login!'));
            }
        });
    }


    return (
        <>
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg px-20 py-10">
                <div className="flex justify-end">
                    {opsiButton.includes("create") && (
                        <button type="button" onClick={() => navigate('/inbound-stuff/update')} className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800 mb-5">Create</button>
                    )}
                </div>
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            {headers.map((header, index) => (
                                <th scope="col" className="px-6 py-3" key={index}>{header}</th>
                            ))}
                            <th scope="col" className="px-6 py-3"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {Object.entries(data).map(([index, item]) => (
                            <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{parseInt(index) + 1}.</td>
                                {Object.entries(columnForTd).map(([key, value]) => (
                                    <td key={key} className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        {!value ? item[key] : item[key.replace(/[!&*;:]/g, '')] ? item[key.replace(/[!&*;:]/g, '')][value] : '0'}
                                    </td>
                                ))}
                                <td className="px-6 py-4 text-right">
                                {opsiButton.includes("permanentDelete") && (
                                    <button onClick={() => handlePermanentDelete(item.id)} type="button" className="font-medium text-red-600 dark:text-red-500 hover:underline ml-3">Permanent Delete</button>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
}
