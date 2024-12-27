import { addDoc, collection, deleteDoc, doc, onSnapshot, updateDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { db } from '../firebase/firebase';

const Getdata = () => {
  const [form, setForm] = useState({});
  const [data, setData] = useState([]);
  const [editId, setEditId] = useState(null);

  const roitaiRef = collection(db, "rmuttlocations");

  useEffect(() => {
    const unsubscribe = loadRealtime();
    return () => {
      unsubscribe();
    };
  }, []);

  const loadRealtime = () => {
    const unsubscribe = onSnapshot(roitaiRef, (snapshot) => {
      const newData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setData(newData);
    });
    return () => {
      unsubscribe();
    };
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  const handleAddData = async () => {
    const formData = {
      ...form,
      latitude: parseFloat(form.latitude) || 0,
      longitude: parseFloat(form.longitude) || 0,
    };

    await addDoc(roitaiRef, formData)
      .then(() => {
        setForm({});
      })
      .catch((err) => console.log(err));
  };

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(roitaiRef, id));
    } catch (err) {
      console.log(err);
    }
  };

  const handleEdit = (item) => {
    setEditId(item.id);
    setForm({
      namelocation: item.namelocation || '',
      latitude: item.latitude?.toString() || '',
      longitude: item.longitude?.toString() || '',
      detail: item.detail || '',
      type: item.type || '',
    });
  };

  const handleSave = async (id) => {
    const formData = {
      ...form,
      latitude: parseFloat(form.latitude) || 0,
      longitude: parseFloat(form.longitude) || 0,
    };

    try {
      await updateDoc(doc(roitaiRef, id), formData);
      setEditId(null);
      setForm({});
    } catch (err) {
      console.log(err);
    }
  };

  const handleCancel = () => {
    setEditId(null);
    setForm({});
  };

  return (
    <div className="container">
      <table className="table table-hover">
        <thead>
          <tr>
            <th scope="col">เพิ่มข้อมูล</th>
            <th scope="col">
              <input
                className="form-control"
                onChange={handleChange}
                type="text"
                name="namelocation"
                placeholder="namelocation"
                value={form.namelocation || ''}
              />
            </th>
            <th scope="col">
              <input
                className="form-control"
                onChange={handleChange}
                type="number"
                name="latitude"
                placeholder="latitude"
                value={form.latitude || ''}
              />
            </th>
            <th scope="col">
              <input
                className="form-control"
                onChange={handleChange}
                type="number"
                name="longitude"
                placeholder="longitude"
                value={form.longitude || ''}
              />
            </th>
            <th scope="col">
              <input
                className="form-control"
                onChange={handleChange}
                type="text"
                name="detail"
                placeholder="detail"
                value={form.detail || ''}
              />
            </th>
            <th scope="col">
              <select
                className="form-control"
                onChange={handleChange}
                name="type"
                value={form.type || ''}
              >
                <option value="">Select Type</option>
                <option value="ห้องน้ำ">ห้องน้ำ</option>
                <option value="ATM">ATM</option>
                <option value="ลานจอดรถ">ลานจอดรถ</option>
                <option value="อาหารและเครื่องดื่ม">อาหารและเครื่องดื่ม</option>
              </select>
            </th>
            <th scope="col">
              <button className="btn btn-primary" onClick={handleAddData}>
                Add Data
              </button>
            </th>
          </tr>
        </thead>

        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">NameLocation</th>
            <th scope="col">Latitude</th>
            <th scope="col">Longitude</th>
            <th scope="col">Detail</th>
            <th scope="col">Type</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              <th scope="row">{index + 1}</th>
              <td>
                {editId === item.id ? (
                  <input
                    className="form-control"
                    onChange={handleChange}
                    type="text"
                    name="namelocation"
                    value={form.namelocation || ''}
                    placeholder="namelocation"
                  />
                ) : (
                  item.namelocation
                )}
              </td>
              <td>
                {editId === item.id ? (
                  <input
                    className="form-control"
                    onChange={handleChange}
                    type="number"
                    name="latitude"
                    value={form.latitude || ''}
                    placeholder="latitude"
                  />
                ) : (
                  item.latitude
                )}
              </td>
              <td>
                {editId === item.id ? (
                  <input
                    className="form-control"
                    onChange={handleChange}
                    type="number"
                    name="longitude"
                    value={form.longitude || ''}
                    placeholder="longitude"
                  />
                ) : (
                  item.longitude
                )}
              </td>
              <td>
                {editId === item.id ? (
                  <input
                    className="form-control"
                    onChange={handleChange}
                    type="text"
                    name="detail"
                    value={form.detail || ''}
                    placeholder="detail"
                  />
                ) : (
                  item.detail
                )}
              </td>
              <td>
                {editId === item.id ? (
                  <select
                    className="form-control"
                    onChange={handleChange}
                    name="type"
                    value={form.type || ''}
                  >
                    <option value="">Select Type</option>
                    <option value="ห้องน้ำ">ห้องน้ำ</option>
                    <option value="ATM">ATM</option>
                    <option value="ลานจอดรถ">ลานจอดรถ</option>
                    <option value="อาหารและเครื่องดื่ม">อาหารและเครื่องดื่ม</option>
                  </select>
                ) : (
                  item.type
                )}
              </td>
              <td>
                {editId === item.id ? (
                  <>
                    <button
                      className="btn btn-success"
                      onClick={() => handleSave(item.id)}
                    >
                      Save
                    </button>
                    <button
                      className="btn btn-secondary"
                      onClick={handleCancel}
                    >
                      Cancel
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      className="btn btn-warning"
                      onClick={() => handleEdit(item)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-danger"
                      onClick={() => handleDelete(item.id)}
                    >
                      Delete
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Getdata;
