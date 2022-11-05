import { useEffect, useRef, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Axios from "axios";
import Button from "react-bootstrap/Button";
// import Modal from "react-bootstrap/Modal";
import { Alert } from "react-bootstrap";
import "./App.css";

function App() {
  const [login, setLogin] = useState(false);
  const [email, setEmail] = useState();
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [title, setTitle] = useState(localStorage.getItem("title"));
  const [subtitle, setSubTitle] = useState(localStorage.getItem("subtitle"));
  const [aboutme, setAboutme] = useState(localStorage.getItem("aboutme"));
  const [alert, setAlert] = useState(false);
  const [data_artikel, setData_artikel] = useState();
  const [data_activity, setData_activity] = useState();
  const [title_artikel, setTitle_artikel] = useState(
    localStorage.getItem("titleArtikel")
  );
  const [contain_artikel, setContain_artikel] = useState(
    localStorage.getItem("containArtikel")
  );
  const [title_activity, setTitle_activity] = useState(
    localStorage.getItem("titleActivity")
  );
  const [contain_activity, setContain_activity] = useState(
    localStorage.getItem("containActivity")
  );
  const [address, setAddress] = useState(localStorage.getItem("address"));
  const [phone, setPhone] = useState(localStorage.getItem("phone"));
  const [contact_email, setContact_email] = useState(
    localStorage.getItem("email")
  );

  const inputAboutme = useRef();

  useEffect(() => {
    Axios.get(`https://db.adisimanullang.online/api/artikel`).then((res) =>
      setData_artikel(res.data)
    );
    Axios.get(`https://db.adisimanullang.online/api/activity`).then((res) =>
      setData_activity(res.data)
    );
  }, []);

  const modal = () => {
    return (
      <Alert key="info" variant="info" show={alert ? alert : false}>
        Berhasil Diedit Silahkan Refresh Halaman
        <Button
          variant="info"
          onClick={() => setAlert(false)}
          style={{ margin: "20px" }}
        >
          Close
        </Button>
      </Alert>
    );
  };
  const onInputEmail = (e) => {
    let text = e.target.value;
    setEmail(text);
  };
  const onInputTitle = (e) => {
    let text = e.target.value;
    setTitle(text);
    localStorage.setItem("title", text);
  };
  const onClickTitle = () => {
    let data = { title: title };
    Axios.put(`https://db.adisimanullang.online/api/title/1/update`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((res) => console.log(res.data));
    setAlert(true);
    localStorage.setItem("title", ""); //baru jalan ketika direfresh
  };
  const onInputSubTitle = (e) => {
    let text = e.target.value;
    setSubTitle(text);
    localStorage.setItem("subtitle", text);
  };
  const onClickSubTitle = () => {
    let data = { subtitle: subtitle };
    Axios.put(`https://db.adisimanullang.online/api/subtitle/1/update`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((res) => console.log(res.data));
    setAlert(true);
    localStorage.setItem("subtitle", ""); //baru jalan ketika direfresh
  };
  const onInputAboutme = (e) => {
    let text = e.target.value;
    setAboutme(text);
    localStorage.setItem("aboutme", text);
  };
  const onClickAboutme = () => {
    let data = { aboutme: aboutme };
    Axios.put(`https://db.adisimanullang.online/api/aboutme/1/update`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((res) => console.log(res.data));
    setAlert(true);
    localStorage.setItem("aboutme", ""); //baru jalan ketika direfresh
  };
  const onClickDelArtikel = (id) => {
    Axios.delete(`https://db.adisimanullang.online/api/artikel/${id}/delete`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((res) => console.log(res.data));
    setAlert(true);
  };
  const onClickDelActivity = (id) => {
    Axios.delete(`https://db.adisimanullang.online/api/activity/${id}/delete`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((res) => console.log(res.data));
    setAlert(true);
  };

  const onInputTitleActivity = (e) => {
    let text = e.target.value;
    setTitle_activity(text);
    localStorage.setItem("titleActivity", text);
  };
  const onInputContainActivity = (e) => {
    let text = e.target.value;
    setContain_activity(text);
    localStorage.setItem("containActivity", text);
  };
  const onClickAddActivity = () => {
    let data = { title: title_activity, contain: contain_activity };
    Axios.post(`https://db.adisimanullang.online/api/activity`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((res) => console.log(res.data));
    setAlert(true);
    localStorage.setItem("titleActivity", ""); //baru jalan ketika direfresh
    localStorage.setItem("containActivity", "");
  };

  const onInputTitleArtikel = (e) => {
    let text = e.target.value;
    setTitle_artikel(text);
    localStorage.setItem("titleArtikel", text);
  };
  const onInputContainArtikel = (e) => {
    let text = e.target.value;
    setContain_artikel(text);
    localStorage.setItem("containArtikel", text);
  };
  const onClickAddArtikel = () => {
    let data = { title: title_artikel, contain: contain_artikel };
    Axios.post(`https://db.adisimanullang.online/api/artikel`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((res) => console.log(res.data));
    setAlert(true);
    localStorage.setItem("titleArtikel", ""); //baru jalan ketika direfresh
    localStorage.setItem("containArtikel", "");
  };
  const onInputAddress = (e) => {
    let text = e.target.value;
    setAddress(text);
    localStorage.setItem("address", text);
  };
  const onInputPhone = (e) => {
    let text = e.target.value;
    setPhone(text);
    localStorage.setItem("phone", text);
  };
  const onInputContactEmail = (e) => {
    let text = e.target.value;
    setContact_email(text);
    localStorage.setItem("email", text);
  };
  const onClickAddress = () => {
    let data = { address: address };
    Axios.put(`https://db.adisimanullang.online/api/contact/1/update`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((res) => console.log(res.data));
    setAlert(true);
    localStorage.setItem("address", ""); //baru jalan ketika direfresh
  };
  const onClickPhone = () => {
    let data = { phone: phone };
    Axios.put(`https://db.adisimanullang.online/api/contact/1/update`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((res) => console.log(res.data));
    setAlert(true);
    localStorage.setItem("phone", ""); //baru jalan ketika direfresh
  };

  const onClickEmail = () => {
    let data = { email: contact_email };
    Axios.put(`https://db.adisimanullang.online/api/contact/1/update`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((res) => console.log(res.data));
    setAlert(true);
    localStorage.setItem("email", ""); //baru jalan ketika direfresh
  };

  const onClick = () => {
    //Login
    let data = { email: email };
    Axios.post(`https://db.adisimanullang.online/api/login`, data).then(
      (res) => {
        setToken(res.data.token);
        localStorage.setItem("token", res.data.token);
      }
    );
    setLogin(false);
  };
  const onClickLogout = () => {
    Axios.get(`https://db.adisimanullang.online/api/logout`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((res) => console.log(res.data));
    console.log(token);
    console.log(`localStorage : ${localStorage.getItem("token")}`);
    localStorage.setItem("token", "");
    setLogin(true);
  };
  //Activity

  //Articel

  if (!token || login) {
    return (
      <div className="App">
        <header className="App-header">
          {console.log(`token : ${token}`)}
          {console.log(`localStorage : ${localStorage.getItem("token")}`)}
          <label>Masukan Code</label> <br></br>
          <input type="text" onChange={(e) => onInputEmail(e)} />
          <Button variant="light" onClick={onClick} style={{ margin: "20px" }}>
            Masuk
          </Button>
        </header>
      </div>
    );
  } else {
    return (
      <div className="App">
        <header className="App-header">
          <div
            style={{
              fontSize: "28px",
              fontFamily: "sans-serif",
              margin: "10px",
              position: "fixed",
              top: "0",
              left: "0",
            }}
          >
            Admin Area
          </div>
          <div style={{ position: "fixed", top: "0" }}>{modal()}</div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                width: "80%",
              }}
            >
              <label>Title</label>
              <input
                type="text"
                style={{ width: "100%", padding: "10px", borderRadius: "10px" }}
                onChange={(e) => onInputTitle(e)}
                defaultValue={localStorage.getItem("title")}
              />
              <Button
                onClick={onClickTitle}
                variant="danger"
                style={{ marginTop: "5px", marginBottom: "10px" }}
              >
                Edit Title
              </Button>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                width: "80%",
              }}
            >
              <label>Sub Title</label>
              <input
                type="text"
                style={{ width: "100%", padding: "10px", borderRadius: "10px" }}
                onChange={(e) => onInputSubTitle(e)}
                defaultValue={localStorage.getItem("subtitle")}
              />
              <Button
                onClick={onClickSubTitle}
                variant="danger"
                style={{ marginTop: "5px", marginBottom: "10px" }}
              >
                Edit Sub Title
              </Button>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                marginTop: "2%",
                width: "80%",
              }}
            >
              <label>About Me</label>
              <textarea
                name="paragraph_text"
                placeholder="Text Here"
                defaultValue={localStorage.getItem("aboutme")}
                style={{
                  width: "400%",
                  height: "300px",
                  padding: "10px",
                  borderRadius: "10px",
                }}
                onChange={(e) => onInputAboutme(e)}
                ref={inputAboutme}
              ></textarea>
              <Button
                onClick={onClickAboutme}
                variant="danger"
                style={{ marginTop: "5px", marginBottom: "10px" }}
              >
                Edit About Me
              </Button>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                marginTop: "2%",
                width: "80%",
              }}
            >
              <label>Artikel</label>
              <h4>Hapus Artikel</h4>
              {data_artikel
                ? data_artikel.map((d, i) => (
                    <div key={`${d.title}-${i}`}>
                      <Button
                        style={{ margin: "10px", width: "100%" }}
                        variant="warning"
                        onClick={() => onClickDelArtikel(d.id)}
                      >
                        {" "}
                        Delete Artikel : {d.title}
                      </Button>
                    </div>
                  ))
                : "Loading..."}
              <h4>Tambahkan Artikel</h4>
              <textarea
                name="paragraph_text"
                placeholder="Text Title Here"
                defaultValue={localStorage.getItem("titleArtikel")}
                style={{
                  width: "400%",
                  height: "100px",
                  padding: "10px",
                  borderRadius: "10px",
                }}
                onChange={(e) => onInputTitleArtikel(e)}
              ></textarea>
              <textarea
                name="paragraph_text"
                placeholder="Text Contain Here"
                defaultValue={localStorage.getItem("containArtikel")}
                style={{
                  width: "400%",
                  height: "300px",
                  padding: "10px",
                  borderRadius: "10px",
                }}
                onChange={(e) => onInputContainArtikel(e)}
              ></textarea>
              <Button
                onClick={onClickAddArtikel}
                variant="danger"
                style={{ marginTop: "5px", marginBottom: "10px" }}
              >
                Tambahkan Artikel
              </Button>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                marginTop: "2%",
                width: "80%",
              }}
            >
              <label>Activity</label>
              <h4>Hapus Activity</h4>
              {data_activity
                ? data_activity.map((d, i) => (
                    <div key={`${d.title}-${i}`}>
                      <Button
                        style={{ margin: "10px", width: "100%" }}
                        variant="warning"
                        onClick={() => onClickDelActivity(d.id)}
                      >
                        {" "}
                        Delete Activity : {d.title}
                      </Button>
                    </div>
                  ))
                : "Loading..."}
              <h4>Tambahkan Activity</h4>
              <textarea
                name="paragraph_text"
                placeholder="Text Title Here"
                defaultValue={localStorage.getItem("titleActivity")}
                style={{
                  width: "400%",
                  height: "100px",
                  padding: "10px",
                  borderRadius: "10px",
                }}
                onChange={(e) => onInputTitleActivity(e)}
              ></textarea>
              <textarea
                name="paragraph_text"
                placeholder="Text Contain Here"
                defaultValue={localStorage.getItem("containActivity")}
                style={{
                  width: "400%",
                  height: "300px",
                  padding: "10px",
                  borderRadius: "10px",
                }}
                onChange={(e) => onInputContainActivity(e)}
              ></textarea>
              <Button
                onClick={onClickAddActivity}
                variant="danger"
                style={{ marginTop: "5px", marginBottom: "10px" }}
              >
                Tambahkan Activity
              </Button>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                width: "80%",
              }}
            >
              <label>Contact Info</label>
              <input
                placeholder="address"
                type="text"
                style={{ width: "100%", padding: "10px", borderRadius: "10px" }}
                onChange={(e) => onInputAddress(e)}
                defaultValue={localStorage.getItem("address")}
              />
              <Button
                onClick={onClickAddress}
                variant="danger"
                style={{ marginTop: "5px", marginBottom: "10px" }}
              >
                Edit Address
              </Button>
              <input
                placeholder="phone"
                type="text"
                style={{ width: "100%", padding: "10px", borderRadius: "10px" }}
                onChange={(e) => onInputPhone(e)}
                defaultValue={localStorage.getItem("phone")}
              />
              <Button
                onClick={onClickPhone}
                variant="danger"
                style={{ marginTop: "5px", marginBottom: "10px" }}
              >
                Edit Phone
              </Button>
              <input
                placeholder="email"
                type="text"
                style={{ width: "100%", padding: "10px", borderRadius: "10px" }}
                onChange={(e) => onInputContactEmail(e)}
                defaultValue={localStorage.getItem("email")}
              />
              <Button
                onClick={onClickEmail}
                variant="danger"
                style={{ marginTop: "5px", marginBottom: "10px" }}
              >
                Edit Email
              </Button>
            </div>
          </div>
          <Button
            onClick={onClickLogout}
            variant="light"
            style={{
              margin: "10px",
              position: "fixed",
              bottom: "0",
              right: "0",
            }}
          >
            Log out
          </Button>
        </header>
      </div>
    );
  }
}

export default App;
