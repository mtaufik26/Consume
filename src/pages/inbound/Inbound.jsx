import React, { useEffect, useState } from "react";
import Case from '../../assets/components/Case'
import Table from "../../assets/components/Inbound/Table";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Dashboard from "../Dashboard";

export default function inbound() {
    const [inbounds, setinbounds] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        getinbounds()
    }, []);

    function getinbounds() {
        axios.get('http://localhost:8000/inbound-stuff', {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token'),
            }
        })
        .then(res => {
            setinbounds(res.data.data);
        })
        .catch(err => {
            console.error(err);
            if (err.response && err.response.status === 401) {
                navigate('/login?message=' + encodeURIComponent('Anda belum login!'));
            } else {
                console.error("Gagal mengambil data inbound:", err);
            }
        });
    }

    const headers = [
        "#",
        "Name",
        "Category",
        "Total Available",
        "Total Defect"
    ];

    const endpointModal = {
        "delete" : "http://localhost:8000/stuffs/{id}",
        "store" : "http://localhost:8000/inbound-stuff/store",
    }

    const columnIdentitasDelete = 'name';


    const titleModal = 'Inbound';

    const buttons = [
        "create",
        "edit",
        "delete",
    ];

    const tdColumn = {
        
    }

    return (
        <Case>
            <div className="mt-20">
                <h1 className="mr-2 text-sm font-semibold uppercase text-center text-white">Data Stuffs</h1>
            </div>
            <Table headers={headers} data={inbounds} endpoint={endpointModal} identitasColumn={columnIdentitasDelete}  titleModal={titleModal} opsiButton={buttons} columnForTd={tdColumn}></Table>
        </Case>
    )
}





