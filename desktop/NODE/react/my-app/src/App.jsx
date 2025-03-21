import React, { useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { Modal, Button, Spinner } from "react-bootstrap";

const loginCode = "152727"; // Hardcoded access code
const API_URL = "/products.json"; // JSON file in 'public/' folder

const App = () => {
  const [data, setData] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showModal, setShowModal] = useState(true);
  const [userCode, setUserCode] = useState("");
  const [loading, setLoading] = useState(false);

  // Fetch Data from JSON file
  const fetchData = () => {
    setInterval(setLoading(true), 10000); // Show loader before fetching
    axios
      .get(API_URL)
      .then((response) => {
        setData(response.data);
        setLoading(false); // Hide loader after fetching
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  };

  // Handle Code Submission
  const handleCodeSubmit = () => {
    if (userCode === loginCode) {
      setIsAuthenticated(true);
      setShowModal(false);
      fetchData();
    } else {
      alert("Incorrect code! Try again.");
    }
  };

  return (
    <>
      {/* Code Entry Modal */}
      <Modal show={showModal} backdrop="static" keyboard={false}>
        <Modal.Header>
          <Modal.Title>Enter Access Code</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <input
            type="password"
            className="form-control"
            placeholder="Enter access code"
            value={userCode}
            onChange={(e) => setUserCode(e.target.value)}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleCodeSubmit}>
            Submit
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Product List */}
      {isAuthenticated ? (
        <div className="container mt-4">
          <h2 className="text-center mb-4">Product List</h2>

          {loading ? (
            <div className="text-center my-4">
              <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
              </Spinner>
              <p>Fetching Data...</p>
            </div>
          ) : (
            <div className="table-responsive">
              <table className="table table-bordered table-striped">
                <thead className="thead-dark">
                  <tr>
                    <th>Product</th>
                    <th>Packing</th>
                    <th>Expiry</th>
                    <th>Purchase</th>
                    <th>Sale</th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((item, index) => (
                    <tr key={index}>
                      <td>{item.product_name}</td>
                      <td>{item.packing}</td>
                      <td>{item.expiry_date}</td>
                      <td>Rs.{item.purchase_rate.toFixed(2)}</td>
                      <td>Rs.{item.sale_rate.toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      ) : (
        <p>Access denied. Refresh to try again.</p>
      )}
    </>
  );
};

export default App;
