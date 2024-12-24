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
    console.log(e.target.name, e.target.value);
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleAddData = async () => {
    form.latitude = parseFloat(form.latitude);
    form.longitude = parseFloat(form.longitude);
  
    await addDoc(roitaiRef, form)
      .then((res) => {})
      .catch((err) => console.log(err));
  };
  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(roitaiRef, id));
    } catch (err) {
      console.log(err);
    }
  };

  const handleSave = async (id) => {
    form.latitude = parseFloat(form.latitude);
    form.longitude = parseFloat(form.longitude);
  
    try {
      await updateDoc(doc(roitaiRef, id), form);
      setEditId(null);
    } catch (err) {
      console.log(err);
    }
  };
  const handleCancel = () => {
    setEditId(null);
    setForm({});
  };

  console.log(editId);
  return (
    <div className="container">
      <table className="table table-hover">
        <thead>
          <tr>
            <th scope="col">เพิ่มข้อมูล</th>
            <th scope="col">
              <input
                className="form-control"
                onChange={(e) => handleChange(e)}
                type="text"
                name="namelocation"
                placeholder="namelocation"
              />
            </th>
            <th scope="col">
              <input
                className="form-control"
                onChange={(e) => handleChange(e)}
                type="text"
                name="latitude"
                placeholder="latitude"
              />
            </th>
            <th scope="col">
              <input
                className="form-control"
                onChange={(e) => handleChange(e)}
                type="text"
                name="longitude"
                placeholder="longitude"
              />
            </th>
            <th scope="col">
              <input
                className="form-control"
                onChange={(e) => handleChange(e)}
                type="text"
                name="detail"
                placeholder="detail"
              />
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
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              <th scope="row">{index + 1}</th>

              <td>
                {editId === item.id ? (
                  <>
                    <input
                      className="form-control"
                      onChange={(e) => handleChange(e)}
                      type="text"
                      name="namelocation"
                      value={form.namelocation !== undefined ? form.namelocation : item.namelocation}
                      placeholder="namelocation"
                    />
                  </>
                ) : (
                  item.namelocation
                )}
              </td>

              <td>
                {editId === item.id ? (
                  <>
                    <input
                      className="form-control"
                      onChange={(e) => handleChange(e)}
                      type="text"
                      name="latitude"
                      value={
                        form.latitude !== undefined ? form.latitude : item.latitude
                      }
                      placeholder="latitude"
                    />
                  </>
                ) : (
                  item.latitude
                )}
              </td>

              <td>
                {editId === item.id ? (
                  <>
                    <input
                      className="form-control"
                      onChange={(e) => handleChange(e)}
                      type="text"
                      name="longitude"
                      value={
                        form.longitude !== undefined ? form.longitude : item.longitude
                      }
                      placeholder="longitude"
                    />
                  </>
                ) : (
                  item.longitude
                )}
              </td>

              <td>
                {editId === item.id ? (
                  <>
                    <input
                      className="form-control"
                      onChange={(e) => handleChange(e)}
                      type="text"
                      name="detail"
                      value={
                        form.detail !== undefined ? form.detail : item.detail
                      }
                      placeholder="detail"
                    />
                  </>
                ) : (
                  item.detail
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
                      onClick={() => handleCancel()}
                    >
                      Cancel
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      className="btn btn-warning"
                      onClick={() => setEditId(item.id)}
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