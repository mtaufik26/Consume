import React, { useEffect, useState } from "react";
import Case from '../../assets/components/Case';
import Table from "../../assets/components/User/Table";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function TrashUser() {
    const [usersTrash, setUsersTrash] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        axios.get('http://localhost:8000/user/trash', {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token'),
            }
        })
        .then(res => {
            if (res.data && res.data.data) {
                setUsersTrash(res.data.data);
            } else {
                console.error("Data not received in expected format");
            }
        })
        .catch(err => {
            console.log(err);
            if (err.response && err.response.status === 401) {
                navigate('/login?message=' + encodeURIComponent('Anda belum login!'));
            }
        });
    }, [navigate]);

    const headers = [
        "#",
        "Username",
        "Email",
        "Role"
    ];

    const endpointModal = {
        "restore": "http://localhost:8000/user/restore/{id}",
        "permanentDelete": "http://localhost:8000/user/permanent/{id}",
    };

    const inputData = {};

    const title = 'User';

    const columnIdentitasDelete = 'username';

    const buttons = [
        "restore",
        "permanentDelete",
    ];

    const tdColumn = {
        "username": null,
        "email": null,
        "role": null,
    };

    return (
        <Case>
            <Table headers={headers} data={usersTrash} endpoint={endpointModal} inputData={inputData} titleModal={title} identitasColumn={columnIdentitasDelete} opsiButton={buttons} columnForTd={tdColumn} />
        </Case>
    );
}
