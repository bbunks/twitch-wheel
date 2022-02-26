import { useState, useEffect } from "react";
import useStickyState from "./customHooks/StickyState";
import Login from "./components/Login/Login";
import Spinner from "./components/Home/Spinner/Spinner";
import Home from "./components/Home/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Remote from "./components/Remote/Remote";
import socket from "./utils/socket";

function App() {
  const [requests, setRequests] = useState([]);
  const [spin, setSpin] = useState(false);

  useEffect(() => {
    socket.on("connect", () => {
      console.log("connected");
    });
    socket.on("init", (data) => {
      setRequests(data);
    });
    socket.on("spin", () => {
      setSpin((prev) => !prev);
    });
    socket.on("new_request", (data) => {
      setRequests((prev) => {
        const filteredList = prev.filter((i) => i.username !== data.username);
        return [...filteredList, data];
      });
    });
    socket.on("delete_request", (data) => {
      setRequests((prev) => {
        const filteredList = prev.filter((i) => i.username !== data.username);
        return [...filteredList];
      });
    });
    return () => {
      socket.off("connect");
      socket.off("init");
      socket.off("spin");
      socket.off("newRequest");
    };
  }, []);

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" exact element={<Home />} />
          <Route
            path="/viewer"
            exact
            element={<Spinner spinning={spin} requests={requests} />}
          />
          <Route path="/remote" element={<Remote requests={requests} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
