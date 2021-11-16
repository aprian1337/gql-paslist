import { v4 as uuidv4 } from "uuid";
import PassengerInput from "./PassengerInput";
import ListPassenger from "./ListPassenger";
import Header from "./Header";
import { gql, useLazyQuery, useQuery } from "@apollo/client";

import React from "react";
import { useEffect, useState } from "react/cjs/react.development";

const GET_PAS_LIST = gql`
  query MyQuery($_eq: Int_comparison_exp = {}) {
    paslist_visitors(where: { id: $_eq }) {
      nama
      id
      jenis_kelamin
      umur
    }
  }
`;
export default function Home() {
  const [getPasList, { data, loading, error }] = useLazyQuery(GET_PAS_LIST);
  const [input, setInput] = useState("");

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

  const handleChange = (e) => {
    setInput(e.target.value);
  };

  useEffect(() => {
    if (input.length > 0) {
      getPasList({
        variables: {
          _eq: {
            _eq: input,
          },
        },
      });
    } else {
      getPasList();
    }
  }, [input]);

  if (loading) return <p>Loading ...</p>;
  if (error) return `Error! ${error}`;

  return (
    <div>
      <div>
        <Header />
        <input
          type="text"
          placeholder="Search"
          value={input}
          onChange={handleChange}
        />
        <ListPassenger
          data={data?.paslist_visitors}
          hapusPengunjung={hapusPengunjung}
        />
        <PassengerInput tambahPengunjung={tambahPengunjung} />
      </div>
    </div>
  );
}
