import React from 'react'

export default function Table() {
    const data = [
        {
            nama: 'Taufik',
            rombel: 'PPLG XI-5',
            rayon: 'Cicurug 4'
        },
        {
            nama: 'Adan',
            rombel: 'PPLG XI-5',
            rayon: 'Ciawi 4'
        },
        {
            nama: 'Noppal',
            rombel: 'PPLG XI-5',
            rayon: 'Cicurug 1'
        },
    ];
    return (
    <>
        <table border={1}>
            <thead>
                <tr>
                    {
                        props.title.map((val, i) =>(
                            <td>{val}</td>
                        ))
                    }
                    <td>No</td>
                    <td>Nama</td>
                    <td>Rombel</td>
                    <td>Rayaon</td>
                </tr>
            </thead>
            <tbody>
                {props.data}
            </tbody>
        </table>
    </>
    )
}
