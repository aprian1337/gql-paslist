import PassengerInput from "./PassengerInput";
import ListPassenger from "./ListPassenger";
import Header from "./Header";
import { gql, useMutation, useQuery, useSubscription } from "@apollo/client";

import React from "react";
import { useState, useEffect } from "react";
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

const UPDATE_PAS_LIST = gql`
  mutation MyMutation(
    $id: Int!
    $jenis_kelamin: String!
    $nama: String!
    $umur: Int!
  ) {
    update_paslist_visitors_by_pk(
      pk_columns: { id: $id }
      _set: { jenis_kelamin: $jenis_kelamin, nama: $nama, umur: $umur }
    ) {
      id
    }
  }
`;

const SUBS_GETALL_PASS_LIST = gql`
  subscription MyQuery($_eq: Int_comparison_exp = {}) {
    paslist_visitors(where: { id: $_eq }) {
      nama
      id
      jenis_kelamin
      umur
    }
  }
`;

export default function Home() {
  const [input, setInput] = useState("");
  const [edit, setEdit] = useState("");
  // const [Edit, setEdit] = useState({
  //   nama: "",
  //   umur: "",
  //   jenis_kelamin: "",
  //   is: true,
  // });
  const { loading, error, data, refetch } = useQuery(GET_PAS_LIST, {
    variables: { _eq: {} },
    notifyOnNetworkStatusChange: true,
  });

  const { data: dataSubs, loading: loadingSubs } = useSubscription(
    SUBS_GETALL_PASS_LIST
  );

  const [
    insertPasList,
    { data: dataInsert, loading: loadingInsert, error: errorInsert },
  ] = useMutation(INSERT_PAS_LIST);

  const [
    deletePasList,
    { data: dataDelete, loading: loadingDelete, error: errorDelete },
  ] = useMutation(DELETE_PAS_LIST);

  const [
    updatePasList,
    { data: dataUpdate, loading: loadingUpdate, error: errorUpdate },
  ] = useMutation(UPDATE_PAS_LIST);

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

  const editPengunjung = (newEditUser) => {
    setEdit({
      is: !edit,
      id: newEditUser[0],
      nama: newEditUser[1],
      umur: newEditUser[2],
      jenis_kelamin: newEditUser[3],
    });
  };

  const updatePengunjung = (editUser) => {
    updatePasList({
      variables: {
        id: editUser.id,
        nama: editUser.nama,
        umur: editUser.umur,
        jenis_kelamin: editUser.jenis_kelamin,
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
      {/* {console.log(dataSubs)} */}
      <div>
        <Header />
        <input
          type="text"
          placeholder="Search By Id"
          value={input}
          onChange={handleChange}
        />
        {loading || loadingInsert || loadingDelete || loadingUpdate ? (
          <Loading />
        ) : (
          ""
        )}
        {error ? error : ""}
        <ListPassenger
          data={data?.paslist_visitors}
          hapusPengunjung={hapusPengunjung}
          editPengunjung={editPengunjung}
        />
        {data?.paslist_visitors.length == 0 ? "Data Tidak Ditemukan" : ""}
        <PassengerInput
          tambahPengunjung={tambahPengunjung}
          updatePengunjung={updatePengunjung}
          edit={edit}
          setEdit={setEdit}
        />
      </div>
    </div>
  );
}
