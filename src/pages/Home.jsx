import React from 'react'
// import Card from '../assets/components/Card/Card'

export default function Dashboard() {
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
        {
            data.map((value, key)=> {
                return <Card nama={value.nama} rombel={value.rombel} rayon={value.rayon}/>
            })
        }   
        </>
    )
}
