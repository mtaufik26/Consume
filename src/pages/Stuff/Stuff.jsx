import React, { useEffect, useState } from "react";
import Case from '../../assets/components/Case'
import Table from "../../assets/components/Stuff/Table";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Dashboard from "../Dashboard";

export default function Stuff() {
    const [stuffs, setStuffs] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        getStuffs()
    }, []);

    function getStuffs() {
        axios.get('http://localhost:8000/stuffs', {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token'),
            }
        })
        .then(res => {
            setStuffs(res.data.data);
        })
        .catch(err => {
            console.error(err);
            if (err.response && err.response.status === 401) {
                navigate('/login?message=' + encodeURIComponent('Anda belum login!'));
            } else {
                console.error("Gagal mengambil data stuffs:", err);
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
        "data_detail" : "http://localhost:8000/stuffs/{id}",
        "delete" : "http://localhost:8000/stuffs/{id}",
        "update" : "http://localhost:8000/stuffs/update/{id}",
        "store" : "http://localhost:8000/stuffs/store",
    }

    const columnIdentitasDelete = 'name';

    const inputData = {
        "name": {
            "tag": "input",
            "type": "text",
            "option": null
        },
        "category" : {
            "tag": "select",
            "type": "select",
            "option": ["HTL", "KLN", "Teknisi/Sarpras"]
        },
    }

    const titleModal = 'Stuffs';

    const buttons = [
        "create",
        "trash",
        "edit",
        "delete",
    ];

    const tdColumn = {
        "name": null,
        "category": null,
        "stuff_stock": "total_available",
        "stuff_": "total_defect",
    }

    return (
        <Case>
            <div className="mt-20">
                <h1 className="mr-2 text-sm font-semibold uppercase text-center text-white">Data Stuffs</h1>
            </div>
            <Table headers={headers} data={stuffs} endpoint={endpointModal} identitasColumn={columnIdentitasDelete} inputData={inputData} titleModal={titleModal} opsiButton={buttons} columnForTd={tdColumn}></Table>
        </Case>
    )
}




























// saya sedang membuat suatu website yang menggunakan bahasa pemerograman laravel dan react, Backend Api laravel dan frontend React.js, web ini memiliki 2 role admin dan stuff, dibagian halaman dashboard ini terdapat tiga data yaitu Data Stuff, Data User, dan Diagram lending, masalanya saya ingin jika login menggunakan role Stuff data yang muncul yaitu Data Stuff dan diagram Lending dan jika menggunakan role admin yang tertampil yaitu Data Stuff, Data User, dan diagram lending, berarti menggunakan pengecekan jika user menggunak akun yang memliki role Stuff maka yangkana tertampil adalah Data Stuff dan diagram Lending tetapi jiaka menggunakan Akun yang memliki role admin maka yang tertapil adalah Data Stuff, Data User, dan diagram lending. Dan ini dalah Code Halaman Dashboard