import { v4 as uuidv4 } from "uuid";
import PassengerInput from "./PassengerInput";
import ListPassenger from "./ListPassenger";
import Header from "./Header";
import { gql, useLazyQuery, useMutation, useQuery } from "@apollo/client";

import React from "react";
import { useEffect, useState } from "react/cjs/react.development";
import Loading from "./Loading";

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

const DELETE_PAS_LIST = gql`
  mutation MyMutation($id: Int!) {
    delete_paslist_visitors_by_pk(id: $id) {
      id
    }
  }
`;

const INSERT_PAS_LIST = gql`
  mutation MyMutation($object: paslist_visitors_insert_input = {}) {
    insert_paslist_visitors_one(object: $object) {
      id
    }
  }
`;

export default function Home() {
  const [input, setInput] = useState("");
  const { loading, error, data, refetch } = useQuery(GET_PAS_LIST, {
    variables: { _eq: {} },
    notifyOnNetworkStatusChange: true,
  });
  const [
    insertPasList,
    { data: dataInsert, loading: loadingInsert, error: errorInsert },
  ] = useMutation(INSERT_PAS_LIST);

  const [
    deletePasList,
    { data: dataDelete, loading: loadingDelete, error: errorDelete },
  ] = useMutation(DELETE_PAS_LIST);

  const hapusPengunjung = (id) => {
    deletePasList({
      variables: {
        id: id,
      },
      refetchQueries: [
        {
          query: GET_PAS_LIST,
        },
      ],
    });
  };

  const tambahPengunjung = (newUser) => {
    insertPasList({
      variables: {
        object: {
          nama: newUser.nama,
          umur: newUser.umur,
          jenis_kelamin: newUser.jenis_kelamin,
        },
      },
      refetchQueries: [
        {
          query: GET_PAS_LIST,
        },
      ],
    });
  };

  const handleChange = (e) => {
    setInput(e.target.value);
  };

  useEffect(() => {
    if (input.length > 0) {
      refetch({
        _eq: {
          _eq: input,
        },
      });
    } else {
      refetch({
        _eq: {},
      });
    }
  }, [input]);

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
        {loading || loadingInsert || loadingDelete ? <Loading /> : ""}
        {error ? error : ""}
        <ListPassenger
          data={data?.paslist_visitors}
          hapusPengunjung={hapusPengunjung}
        />
        {data?.paslist_visitors.length == 0 ? "Data Tidak Ditemukan" : ""}
        <PassengerInput tambahPengunjung={tambahPengunjung} />
      </div>
    </div>
  );
}
