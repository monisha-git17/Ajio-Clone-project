import React, { useEffect, useState } from "react";

export default function Admin() {
  const [vendors, setVendors] = useState([]);
  const [msg, setMsg] = useState("");

  // ✅ fetch pending vendors (GET)
  const fetchPendingVendors = async () => {
    try {
      const response = await fetch(
        "http://localhost:5000/api/admin/pending-vendors"
      );

      const data = await response.json();

      if (!response.ok) {
        setMsg(data.message || "Failed to load vendors");
        return;
      }

      setVendors(data.vendors);
    } catch (error) {
      setMsg("Server error ❌");
      console.log(error);
    }
  };

  useEffect(() => {
    fetchPendingVendors();
  }, []);

  // ✅ approve vendor (PUT)
  const handleApprove = async (id) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/admin/approve-vendor/${id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setMsg(data.message || "Approval failed");
        return;
      }

      setMsg(data.message);

      // ✅ refresh list
      fetchPendingVendors();
    } catch (error) {
      setMsg("Server error ❌");
      console.log(error);
    }
  };

  return (
    <div style={{ width: "800px", margin: "50px auto" }}>
      <h2 style={{ textAlign: "center" }}>Admin Panel ✅</h2>

      <h4>Pending Vendor Approvals</h4>

      {msg && <p style={{ color: "green" }}>{msg}</p>}

      {vendors.length === 0 ? (
        <p>No pending vendors 🎉</p>
      ) : (
        <table border="1" width="100%" cellPadding="10">
          <thead>
            <tr>
              <th>Vendor Name</th>
              <th>Mobile</th>
              <th>Email</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {vendors.map((vendor) => (
              <tr key={vendor._id}>
                <td>{vendor.name}</td>
                <td>{vendor.mobile}</td>
                <td>{vendor.email}</td>
                <td>
                  <button
                    style={{
                      padding: "8px 15px",
                      background: "green",
                      color: "white",
                      border: "none",
                      cursor: "pointer",
                    }}
                    onClick={() => handleApprove(vendor._id)}
                  >
                    Approve ✅
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
