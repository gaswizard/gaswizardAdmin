import React, { useEffect, useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import Header from "../widget/Header";
import Navbar from "../widget/Navbar";
import Footer from "../widget/Footer";
import { Link } from "react-router-dom";
import { useAuth } from "../AuthContext";
import { dashboardData,manualCron } from "../services/dashboard";

function Dashboard() {
  const [totalUser, setTotalUser] = useState("");
  const [chainTypes, setSelectChainTypes] = useState("");
  const [offset, setSelectoffset] = useState("");
  const [btnDisable, setBtnDisable] = useState(false);
  const [totalTransaction, setTotalTransaction] = useState("");

  const { login } = useAuth();

  useEffect(() => {
    const jwtToken = localStorage.getItem("jwtToken");
    if (jwtToken) {
      login();
    }
  }, [login]);

  useEffect(() => {
    const fetchData = async () => {
      const config = localStorage.getItem("jwtToken") ;
      const res = await dashboardData(config);
      if (res.status) {
        setTotalUser(res.data.totalUsers) ;
        setTotalTransaction(res.data1.totalTransactions) ;
      }
    };

    fetchData()  ;
  }, []) ;

  const cronHandler = async () => {
    try {
      if(!chainTypes){
        toast.error("Please select chain")
        return
      }
      if(!offset){
        toast.error("Please select limit")
        return
      }
 
      const data = {
        chainTypes,
        offset
      };
      const config = localStorage.getItem("jwtToken");
      setBtnDisable(true)
      toast.success("Your request has been processed successfully. Please wait for 60 seconds.")
      const result = await manualCron(data,config);
  
      if (result?.message) {
       
        toast.dismiss();
        toast.success(result.message);
        setBtnDisable(false)
      } else {
        setBtnDisable(false)
        console.log("No message returned from cron execution");
      }
    } catch (error) {
      setBtnDisable(false)
      console.error("Error in cronHandler:", error);
      
      toast.dismiss();
      toast.error("Failed to execute cron job");
    }
  };

  return (
    <>
      <div id="layout-wrapper">
        <Header />
        <Navbar />
        <div className="main-content">
          <div className="page-content">
            <div className="container-fluid p-0">
              <div className="dash-card-main">
                <div className="row">
                  <div className="col-md-3 col-sm-6 col-12 more-space">
                    <div className="card card-animate">
                      <Link to="/user-management">
                        <div className="card-body">
                          <div className="d-flex justify-content-between align-items-center">
                            <div className="card-left">
                              <p className="fw-medium mb-0">Total users</p>
                            </div>
                            <div className="card-right">
                              <div className="avatar-sm flex-shrink-0">
                                <span className="avatar-title bg-danger rounded-circle fs-2">
                                  <img
                                    src="assets/images/menu-icon-light4.png"
                                    alt=""
                                    className="img-fluid"
                                  />
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className="user-count">
                            <h2 className="m-0 ff-secondary fw-semibold">
                              <span className="counter-value" data-target={100}>
                                {totalUser ? totalUser : 0}
                              </span>
                            </h2>
                          </div>
                        </div>
                      </Link>
                    </div>
                  </div>
                  <div className="col-md-3 col-sm-6 col-12 more-space">
                    <div className="card card-animate">
                      <Link to="/transaction-history">
                        <div className="card-body">
                          <div className="d-flex justify-content-between align-items-center">
                            <div className="card-left">
                              <p className="fw-medium mb-0">
                                Transaction history
                              </p>
                            </div>
                            <div className="card-right">
                              <div className="avatar-sm flex-shrink-0">
                                <span className="avatar-title bg-warning rounded-circle fs-2">
                                  <img
                                    src="assets/images/menu-icon-light1.png"
                                    alt=""
                                    className="img-fluid"
                                  />
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className="total-stack">
                            <h2 className="m-0 ff-secondary fw-semibold">
                              <span className="counter-value" data-target={10}>
                                {totalTransaction ? totalTransaction : 0}
                              </span>
                            </h2>
                          </div>
                        </div>
                      </Link>
                    </div>
                  </div>{" "}
                </div>
                <div className="row">
                  <div className="col-md-6 more-space">
                    <div className="card card-animate p-3 p-md-4">
                      <div className="row">
                        <div className="col-md-6 more-space">
                          <label> Select Chain</label>
                          <select
                            className="form-control"
                            onChange={(e) => setSelectChainTypes(e.target.value)}
                            value={chainTypes}
                          >
                           <option value=""> Select Chain </option>
                            <option value="0"> BNB </option>
                            <option value="1"> ETH </option>
                            <option value="2"> MATIC </option>
                            <option value="4"> AVAX </option>
                          </select>
                        </div>
                        <div className="col-md-6 more-space">
                          <label> Select Limit</label>
                          <select className="form-control"  onChange={(e) => setSelectoffset(e.target.value)}
                            value={offset}>
                            <option value=""> Select Value </option>
                            <option value="10"> 10 </option>
                            <option value="100"> 100 </option>
                            <option value="1000"> 1000 </option>
                          </select>
                        </div>
                      </div>
                      <button className="btn btn-primary m-auto" onClick={cronHandler} disabled={btnDisable}>Submit</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <Footer />
        </div>
      </div>
    </>
  );
}
export default Dashboard;
