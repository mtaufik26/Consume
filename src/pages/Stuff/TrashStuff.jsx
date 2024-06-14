import React, { useEffect, useState } from "react";
import Case from '../../assets/components/Case';
import Table from "../../assets/components/Stuff/Table";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function TrashStuff() {
    const [stuffsTrash, setStuffsTrash] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        axios.get('http://localhost:8000/stuffs/trash', {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token'),
            }
        })
        .then(res => {
            setStuffsTrash(res.data.data);
        })
        .catch(err => {
            console.log(err);
            if (err.response.status === 401) {
                navigate('/login?message=' + encodeURIComponent('Anda belum login!'));
            }
        });
    }, [navigate]);

    const headers = [
        "#",
        "Name",
        "Category"
    ];

    const endpointModal = {
        "restore": "http://localhost:8000/stuffs/restore/{id}",
        "permanentDelete": "http://localhost:8000/stuffs/permanent/{id}",
    };

    const inputData = {};

    const title = 'Stuffs';

    const columnIdentitasDelete = 'name';

    const buttons = [
        "restore",
        "permanentDelete",
    ];

    const tdColumn = {
        "name": null,
        "category": null,
    };

    return (
        <Case>
            <Table headers={headers} data={stuffsTrash} endpoint={endpointModal} inputData={inputData} titleModal={title} identitasColumn={columnIdentitasDelete} opsiButton={buttons} columnForTd={tdColumn} />
        </Case>
    );
}
