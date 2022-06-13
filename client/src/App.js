import "./App.css";
import axios from "axios";
import { useEffect, useState } from "react";

function App() {
  //Tanımda boş bırakılırsa tanımı sonradan yapılacak demektır
  const [users, setUsers] = useState([]);
  const [name, setName] = useState("");
  const [age, setAge] = useState(0);
  const [username, setUsername] = useState("");
  const [img, setImg] = useState("");
  const [newName, setnewName] = useState("");
  const [newAge, setnewAge] = useState(0);

  useEffect(() => {
    //axios ile parametre olarak verilen adresten get işlemi yapılacak
    axios
      .get("http://localhost:3050/getUsers")
      .then((response) => setUsers(response.data))
      .catch((error) => console.log(error));
  }, [users]);

  const createUser = () => {
    axios
      .post("http://localhost:3050/createUser", {
        name: name,
        age: age,
        username: username,
        img: img,
      })
      .then((res) => {
        alert("User created...");
      });
  };

  const updateUser = (id) => {
    console.log(id);
    axios
      .put("http://localhost:3050/updateUser", {
        id: id,
        newName: newName,
        newAge: newAge,
      })
      .then((res) => {
        alert("Employee updated...");
      });
  };

  const deleteUser = (id) => {
    axios.delete(`http://localhost:3050/deleteUser/${id}`);
  };

  return (
    <div className="App">
      <div className="container bg-dark">
        <h1 className="text-center text-danger">User List</h1>
        <div className="row">
          {users.map((user) => (
            <div className="col-md-4 col-sm-12">
              <div className="card radius-15">
                <div className="card-body text-center">
                  <div className="p-4 border radius-15">
                    <img
                      src={
                        user.img === ""
                          ? "https://t3.ftcdn.net/jpg/03/46/83/96/360_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg"
                          : user.img
                      }
                      width={110}
                      height={110}
                      className="rounded-circle shadow"
                      alt=""
                    />
                    <h5 className="mb-0 mt-5">{user.name}</h5>
                    <p className="mb-3">{user.username}</p>
                    <p className="mb-3">Age {user.age}</p>
                  </div>
                  <input
                    className="form-control p-1 m-1"
                    placeholder="Güncellenecek ismi giriniz...."
                    onChange={(e) => setnewName(e.target.value)}
                  ></input>
                  <input
                    className="form-control p-1 m-1"
                    placeholder="Güncellenecek yaşı giriniz...."
                    onChange={(e) => setnewAge(e.target.value)}
                  ></input>
                  <button
                    className="btn btn-success"
                    // burada işlemleri seçilen id'ye gore yapcagımız ıcın parametre olarak user._id ekledık ve bu _id datadase'den gelıyor
                    onClick={() => {
                      updateUser(user._id);
                    }}
                  >
                    Güncelle
                  </button>
                  <br></br>
                  <button
                    className="btn btn-danger"
                    onClick={() => deleteUser(user._id)}
                  >
                    Sil
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="col">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-md-12">
              <div className="card">
                <div className="card-body">
                  <div>
                    <h2>Create a User</h2>
                    <form>
                      <div className="form-outline mb-4">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="İsmi giriniz"
                          onChange={(e) => setName(e.target.value)}
                        />
                      </div>
                      <div className="form-outline mb-4">
                        <input
                          type="number"
                          className="form-control"
                          placeholder="Yaşı giriniz"
                          onChange={(e) => setAge(e.target.value)}
                        />
                      </div>
                      <div className="form-outline mb-4">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Kullanıcı adını giriniz"
                          onChange={(e) => setUsername(e.target.value)}
                        />
                      </div>
                      <div className="form-outline mb-4">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Fotoğraf linki giriniz"
                          onChange={(e) => setImg(e.target.value)}
                        />
                      </div>
                      <div className="d-flex justify-content-center">
                        <button
                          type="button"
                          className="btn btn-warning"
                          onClick={createUser}
                        >
                          Kullanıcıyı Kaydet
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
