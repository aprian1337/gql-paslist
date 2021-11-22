import { useState } from "react";
import { useEffect } from "react/cjs/react.development";
import "./Home.css";

function PassengerInput(props) {
  const [state, setState] = useState({
    id: "",
    nama: "",
    umur: "",
    jenisKelamin: "Pria",
    editing: true,
    isEdit: false,
  });

  useEffect(() => {
    setState({
      id: props.edit.id,
      nama: props.edit.nama,
      umur: props.edit.umur,
      jenisKelamin: props.edit.jenis_kelamin,
      editing: false,
      isEdit: true,
    });
  }, [props.edit]);

  const onChange = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    if (state.nama.trim() && state.umur && state.jenisKelamin) {
      const umur = state.umur;
      if (umur >= 75 || umur <= 12) {
        alert("Umur tidak sesuai");
      } else {
        const newData = {
          id: state.id,
          nama: state.nama,
          umur: state.umur,
          jenis_kelamin: state.jenisKelamin,
        };
        if (state.isEdit) {
          props.updatePengunjung(newData);
        } else {
          props.tambahPengunjung(newData);
        }
        setState({
          ...state,
          nama: "",
          umur: "",
          editing: false,
          jenisKelamin: "Pria",
        });
      }
    } else {
      alert("Data masih ada yang kosong");
    }
  };

  // const handleBukaEdit = () => {

  // }

  const handleBukaInput = () => {
    // props.setEdit(false);
    // console.log(state);
    setState({
      ...state,
      isEdit: false,
      editing: false,
    });
  };

  const handleTutupInput = () => {
    setState({
      ...state,
      editing: true,
    });
  };

  let viewMode = {};
  let editMode = {};

  if (state.editing) {
    viewMode.display = "none";
  } else {
    editMode.display = "none";
  }

  return (
    <div>
      <div onSubmit={handleSubmit} style={viewMode}>
        <p>Masukkan Nama Anda</p>
        <input
          type="text"
          className="input-text"
          placeholder="Nama anda ..."
          value={state.nama}
          name="nama"
          onChange={onChange}
        />
        <p>Masukkan Umur Anda</p>
        <input
          type="number"
          className="input-text"
          placeholder="Umur anda ..."
          value={state.umur}
          name="umur"
          onChange={onChange}
        />
        <p>Masukkan Jenis Kelamin Anda</p>
        <select
          onChange={onChange}
          value={state.jenisKelamin}
          name="jenisKelamin"
        >
          <option value="Pria">Pria</option>
          <option value="Wanita">Wanita</option>
        </select>
        <p></p>
        <button onClick={handleSubmit}>Submit</button>
        <button onClick={handleTutupInput} style={{ marginLeft: "10px" }}>
          Selesai
        </button>
      </div>
      <button className="inputan" onClick={handleBukaInput} style={editMode}>
        Masukkan Nama Pelanggan
      </button>
    </div>
  );
}

export default PassengerInput;
