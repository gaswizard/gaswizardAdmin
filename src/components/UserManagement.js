import React, { useEffect, useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Header from "../widget/Header";
import Navbar from "../widget/Navbar";
import Footer from "../widget/Footer";
import { toast } from "react-toastify";
import ReactDatatable from "@mkikets/react-datatable";
import { ToastContainer } from "react-toastify";

import { userData } from "../services/dashboard";
import moment from "moment";
import { InputValid } from "../validations/InputValid";
import { bonusAddUpdate } from "../services/transaction";
import {
  useWeb3ModalProvider,
  useWeb3ModalAccount,
  createWeb3Modal,
  defaultConfig,
} from "@web3modal/ethers/react";
import {
  parseUnits,
  formatEther,
  BrowserProvider,
  Contract,
  JsonRpcProvider,
  parseEther,
  toBigInt,
} from "ethers";
import {
  EthRpcUrl,
  ethChainId,
  gasWizardEthAddress,
  gasWizardEthabi,
  projectId,
} from "../Constent";

export const UserManagement = () => {
  const { address, chainId, isConnected } = useWeb3ModalAccount();

  const { walletProvider } = useWeb3ModalProvider();
  const [record, setRecord] = useState([]);
  const [show, setShow] = useState(false);
  const [usdt, setUsdt] = useState("");
  const [bonus, setbonus] = useState("");
  const [bonusErr, setBonusErr] = useState("");
  const [id, setId] = useState("");

  const [tokenPrice, setTokenPrice] = useState(null);
  const mainnet = [
    {
      chainId: ethChainId,
      name: "Ethereum Mainnet",
      currency: "ETH",
      explorerUrl: "https://etherscan.io/",

      rpcUrl: EthRpcUrl,
    },
  ];

  const EthRpc = EthRpcUrl;

  const metadata = {
    name: "gaswizard",
    description: "gaswizard",
    url: "https://gaswizard.io/",

    icons: ["https://gaswizard.io/html/img/favicon.ico"],
  };

  createWeb3Modal({
    ethersConfig: defaultConfig({ metadata }),
    chains: mainnet,
    projectId,
    enableAnalytics: true,
  });
  const getSignerOrProvider = async (needSigner = false) => {
    try {
      if (!isConnected) {
        throw Error("User disconnected");
      }

      const ethersProvider = new BrowserProvider(walletProvider);
      const signer = await ethersProvider.getSigner();

      if (needSigner) {
        const signer = await ethersProvider.getSigner();

        return signer;
      }

      return signer;
    } catch (error) {
      // console.error("Error in getWeb3Provider:", error);
      throw error;
    }
  };

  useEffect(() => {
    const fetchTokenPrice = async () => {
      console.log(address, "address");
      if (address) {
        try {
          // const signer = await getSignerOrProvider(true);
          const price = await getLiveUsdtPrice();
          setTokenPrice(price);
          console.log(price, "price");
        } catch (error) {
          console.error("Error fetching token price:", error);
        }
      }
    };

    fetchTokenPrice();
  }, [address]);

  const getLiveUsdtPrice = async () => {
    const provider = new JsonRpcProvider(EthRpcUrl);
    const contract = new Contract(
      gasWizardEthAddress,
      gasWizardEthabi,
      provider
    );
    const result = await contract.allPrice();

    let bnbPrice = Number(result[0]); //bnbPRice

    let tokenPrice = Number(result[1]);
    let tokenPriceDecimalVal = Number(result[2]);
    let tokenPriceDecimal = Math.pow(10, tokenPriceDecimalVal);
    let price = tokenPrice / tokenPriceDecimal;
    let priceLatest = Number(price)
      .toFixed(tokenPriceDecimalVal)
      .replace(/\.?0+$/, "");
    return priceLatest;
  };
  const columns = [
    {
      key: "Sr No.",
      text: "Sr. No.",
      className: "sr_no.",
      align: "left",
      sortable: true,
      cell: (row, index) => index + 1,
    },
    {
      key: "name",
      text: "Name",
      className: "sr_no.",
      align: "left",
      sortable: true,
    },
    {
      key: "email",
      text: "Email",
      className: "sr_no.",
      align: "left",
      sortable: true,
    },
    {
      key: "country_code",
      text: "Country code",
      className: "sr_no.",
      align: "left",
      sortable: true,
    },

    {
      key: "mobile_number",
      text: "Mobile Number",
      className: "sr_no.",
      align: "left",
      sortable: true,
    },

    {
      key: "wallet_address",
      text: "Wallet Address",
      className: "cust_name",
      align: "left",
      sortable: true,
    },
    {
      key: "bonus",
      text: "Bonus",
      className: "cust_name",
      align: "left",
      sortable: true,
    },
    {
      key: "usdt",
      text: "Usdt",
      className: "cust_name",
      align: "left",
      sortable: true,
    },
   
    {
      key: "registerDate",
      text: "Register Date",
      className: "color",
      align: "left",
      sortable: true,
      cell: (record) => {
        return <>{moment(record.created_at).format("LLL")}</>;
      },
    },
    {
      key: "action",
      text: "Action",
      className: "Action",
      align: "left",
      sortable: true,
      cell: (record) => {
        return (
          <>
            <button
              className="btn btn-primary"
              onClick={() => handleShow(record)}
              title="Bouns"
            >
              Add/Update
            </button>
          </>
        );
      },
    },
  ];

  const handleShow = (record) => {
    console.log(record.bonus);
    if (record.bonus) {
      setbonus(record.bonus);
      setUsdt(record.usdt);
    }
    setShow(true);
    setId(record.id);
  };
  const config = {
    page_size: 10,
    length_menu: [10, 20, 50],
    filename: "Download",
    no_data_text: "No user found!",
    button: {
      print: true,
      csv: true,
    },
    language: {
      // length_menu: "Show MENU result per page",
      filter: "Search in records...",
      // info: "Showing START to END of TOTAL records",
      pagination: {
        first: "First",
        previous: "Previous",
        next: "Next",
        last: "Last",
      },
    },
    show_length_menu: true,
    show_filter: true,
    show_pagination: true,
    show_info: true,
  };
  const pageChange = (pageData) => {};

  const userDatas = async () => {
    let config = localStorage.getItem("jwtToken");

    const resp = await userData(config);

    if (resp.status) {
      setRecord(resp?.data);
    }
  };
  useEffect(() => {
    userDatas();
  }, []);

  const handleClose = () => {
    setbonus("");
    setBonusErr("");
    setUsdt("");

    setShow(false);
  };
  const handlechange = (e) => {
    let { name, value } = e.target;
    if (name === "bonus") {
      setbonus(value);
      const err = InputValid(name, value);
      setBonusErr(err);

      let val = Number(value) * Number(tokenPrice);
      setUsdt(val);
    }
  };
  const onsubmit = async (e) => {
    if (!isConnected) {
      toast.dismiss();
      toast.error("Please connect metamusk");
      return false;
    }
    const checkQuestion = InputValid("bonus", bonus);
    if (checkQuestion) {
      setBonusErr(checkQuestion);
      return false;
    }

    let data = {
      bonus,
      usdt,
      id,
    };
    const config = localStorage.getItem("jwtToken");
    const result = await bonusAddUpdate(data, config);
    if (result.status) {
      toast.dismiss();
      toast.success(result.message);
      handleClose();
      userDatas();
    } else {
      toast.dismiss();
      toast.error(result.message);
    }
  };

  return (
    <div id="layout-wrapper">
      <Header />
      <Navbar />

      <div className="main-content">
        <div className="page-content">
          {" "}
          <div className="d-flex justify-content-center"></div>
          <div className="section-heading d-flex justify-content-between">
            <h2>
              <b>User List</b>
            </h2>
            <div>
              {" "}
              <w3m-button balance="hide" />
            </div>
          </div>
          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              {" "}
              <Modal.Title style={{ color: "black" }}>
                Add/Update Bonus
              </Modal.Title>
            </Modal.Header>

            <Modal.Body>
              <Form>
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlInput1"
                >
                  <Form.Label> Bonus </Form.Label>
                  <Form.Control
                    name="bonus"
                    onChange={handlechange}
                    type="text"
                    onKeyPress={(event) => {
                      if (!/[0-9]/.test(event.key)) {
                        event.preventDefault();
                      }
                    }}
                    value={bonus}
                  ></Form.Control>
                  <span style={{ color: "red" }}>{bonusErr}</span>
                </Form.Group>
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlInput1"
                >
                  <Form.Label> Usdt </Form.Label>
                  <Form.Control
                    name="bonus"
                    onChange={handlechange}
                    type="text"
                    value={usdt}
                    disabled={true}
                  ></Form.Control>
                </Form.Group>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
              <Button variant="primary" onClick={onsubmit}>
                Save
              </Button>
            </Modal.Footer>
          </Modal>
          <div className="product-list-outer">
            <ReactDatatable
              config={config}
              records={record}
              columns={columns}
              onPageChange={pageChange}
            />
          </div>
        </div>
        <Footer />
        <ToastContainer
          limit={1}
          autoClose={3000}
          pauseOnHover={false}
          pauseOnFocusLoss={false}
          theme={"dark"}
        />
      </div>
    </div>
  );
};
