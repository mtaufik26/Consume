import React, { useEffect, useState } from "react";
import Case from '../../assets/components/Case'
import Table from "../../assets/components/User/Table";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function User() {
    const [users, setUsers] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        getUsers()
    }, []);

    function getUsers() {
        axios.get('http://localhost:8000/user', {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token'),
            }
        })
        .then(res => {
            setUsers(res.data.data);
        })
        .catch(err => {
            console.error(err);
            if (err.response && err.response.status === 401) {
                navigate('/login?message=' + encodeURIComponent('Anda belum login!'));
            } else {
                console.error("Gagal mengambil data user:", err);
            }
        });
    }

    const headers = [
        "#",
        "Username",
        "Email",
        "Role",
    ];

    const endpointModal = {
        "data_detail" : "http://localhost:8000/user/{id}",
        "delete" : "http://localhost:8000/user/{id}",
        "update" : "http://localhost:8000/user/update/{id}",
        "store" : "http://localhost:8000/user/store",
    }

    const columnIdentitasDelete = 'name';

    const inputData = {
        "username": {
            "tag": "input",
            "type": "text",
            "option": null
        },
        "email": {
            "tag": "input",
            "type": "email",
            "option": null
        },
        "password": {
            "tag": "input",
            "type": "password", // Tambahkan field password jika diperlukan
            "option": null
        },
        "role": {
            "tag": "select",
            "option": ['admin', 'staff'] // Pastikan ini sesuai dengan validasi backend
        }
    }
    
            

    const titleModal = 'User';

    const buttons = [
        "create",
        "trash",
        "edit",
        "delete",
    ];

    const tdColumn = {
        "username": null,
        "email": null,
        "role": null,
    }

    return (
        <Case>
            <div className="mt-20">
                <h1 className="mr-2 text-sm font-semibold uppercase text-center text-white">Data {titleModal}</h1>
            </div>
            <Table headers={headers} data={users} endpoint={endpointModal} identitasColumn={columnIdentitasDelete} inputData={inputData} titleModal={titleModal} opsiButton={buttons} columnForTd={tdColumn}></Table>
        </Case>
    )
}
