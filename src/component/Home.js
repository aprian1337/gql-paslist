import { Component } from "react";
import { v4 as uuidv4 } from "uuid";
import PassengerInput from "./PassengerInput";
import ListPassenger from "./ListPassenger";
import Header from "./Header";
import { gql, useQuery } from "@apollo/client";

import React from "react";
import { useState } from "react/cjs/react.development";

export default function Home() {
  const [state, setState] = useState({
    data: [
      {
        id: uuidv4(),
        nama: "Yoga",
        umur: 22,
        jenisKelamin: "Pria",
      },
      {
        id: uuidv4(),
        nama: "Ria",
        umur: 19,
        jenisKelamin: "Wanita",
      },
      {
        id: uuidv4(),
        nama: "Fahmi",
        umur: 25,
        jenisKelamin: "Pria",
      },
      {
        id: uuidv4(),
        nama: "Lala",
        umur: 21,
        jenisKelamin: "Wanita",
      },
      {
        id: uuidv4(),
        nama: "Ivan",
        umur: 25,
        jenisKelamin: "Pria",
      },
    ],
  });

  const hapusPengunjung = (id) => {
    this.setState({
      data: [
        ...this.state.data.filter((item) => {
          return item.id !== id;
        }),
      ],
    });
  };

  const tambahPengunjung = (newUser) => {
    const newData = {
      id: uuidv4(),
      ...newUser,
    };
    this.setState({
      data: [...this.state.data, newData],
    });
  };
  return (
    <div>
      <div>
        <Header />
        <ListPassenger data={state.data} hapusPengunjung={hapusPengunjung} />
        <PassengerInput tambahPengunjung={tambahPengunjung} />
      </div>
    </div>
  );
}

// const GetPasList = gql`
// query MyQuery {
//   paslist_visitors {
//     jenis_kelamin
//     id
//     nama
//     umur
//   }
// }
// `;
// const { data, loading, error } = useQuery(GetPasList);
