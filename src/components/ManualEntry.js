import React, { useState, useEffect, Fragment } from "react";

import ReactDatatable from "@mkikets/react-datatable";

import { Row, Col, Form, Button, Modal } from "react-bootstrap";

import Header from "../widget/Header";
import Navbar from "../widget/Navbar";
import Footer from "../widget/Footer";
import moment from "moment";
import { InputValid } from "../validations/InputValid";
import { manualEntryAdd, getmanualEntry } from "../services/transaction";
import { ToastContainer, toast } from "react-toastify";
export const ManualEntry = () => {
  const [record, setRecord] = useState([]);
  const [show, setShow] = useState(false);
  const [wallet_address, setwallet_address] = useState("");
  const [wallet_addressErr, setwallet_addressErr] = useState("");

  const [chain, setchain] = useState("");
  const [chainErr, setchainErr] = useState("");

  const [currency, setcurrency] = useState("");
  const [currencyErr, setcurrencyErr] = useState("");
  const [trans_idErr, settrans_idErr] = useState("");
  const [trans_id, settrans_id] = useState("");
  const [amount, setamount] = useState("");
  const [amountErr, setamountErr] = useState("");
  const [tokenAmount, settokenAmount] = useState("");
  const [tokenAmountErr, settokenAmountErr] = useState("");

  const [id, setId] = useState("");
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
      key: "wallet_address",
      text: "Wallet Address",
      className: "cust_name",
      align: "left",
      sortable: true,
    },

    {
      key: "chain",
      text: "Chain",
      className: "name",
      align: "left",
      sortable: true,
    },
    {
      key: "currency",
      text: "Currency",
      className: "name",
      align: "left",
      sortable: true,
    },
    {
      key: "amount",
      text: "Amount",
      className: "id",
      align: "left",
      sortable: true,
    },
    {
      key: "tokenAmount",
      text: "Token Amount",
      className: "name",
      align: "left",
      sortable: true,
    },
    {
      key: "trans_id",
      text: "Transaction Id",
      className: "qty",
      align: "left",
      sortable: true,
    },
    {
      key: "status",
      text: "Transaction Status",
      className: "qty",
      align: "left",
      sortable: true,
    },
    {
      key: "created_at",
      text: "Date & Time",
      className: "Date",
      align: "left",
      sortable: true,
      cell: (record) => {
        return <Fragment>{moment(record.created_at).format("LLL")}</Fragment>;
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
              disabled={record.status == "Success" ? true : false}
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
  const handleShow = (record) => {
    if (record && record) {
      settrans_id(record.trans_id);
      setchain(record.chain);
      selectCurrency(record.currency);
      setwallet_address(record?.wallet_address);
      setamount(record?.amount);
      settokenAmount(record?.tokenAmount);
      setId(record?.id);
    }
    setShow(true);
    
  };
  const handleClose = () => {
    // setbonus("");
    // setBonusErr("");
    // setUsdt("");

    setShow(false);
  };
  const handlechange = (e) => {
    let { name, value } = e.target;
    if (name === "wallet_address") {
      setwallet_address(value);
      const err = InputValid(name, value);
      setwallet_addressErr(err);
    }
    if (name === "chain") {
      setchain(value);
      const err = InputValid(name, value);
      setchainErr(err);
    }
    if (name === "chain") {
      setchain(value);
      const err = InputValid(name, value);
      setchainErr(err);
    }
    if (name === "currency") {
      setcurrency(value);
      const err = InputValid(name, value);
      setcurrencyErr(err);
    }
    if (name === "trans_id") {
      settrans_id(value);
      const err = InputValid(name, value);
      settrans_idErr(err);
    }
    if (name === "amount") {
      setamount(value);
      const err = InputValid(name, value);
      setamountErr(err);
    }

    if (name === "tokenAmount") {
      settokenAmount(value);
      const err = InputValid(name, value);
      settokenAmountErr(err);
    }
  };

  const chainButtons = [
    { index: "0", alt: "bnb" },
    { index: "1", alt: "usdt" },
    { index: "2", alt: "polygon" },
    // { index: "3", imgSrc: "/img/arbitrum-white.png", alt: "arbitrum" },
    { index: "4", alt: "avalanche" },
  ];
  const selectChain = async (val) => {
    setchain(val);
    setcurrency("");
  };
  const selectCurrency = async (val) => {
    setcurrency(val);
  };
  const chainOptions = [
    { index: 0, imgSrc: "path/to/img", alt: "BNB Chain" },
    { index: 1, imgSrc: "path/to/img", alt: "Ethereum Chain" },
    { index: 2, imgSrc: "path/to/img", alt: "Polygon Chain" },
    // { index: 3, imgSrc: 'path/to/img', alt: 'Arbitrum Chain' },
    { index: 4, imgSrc: "path/to/img", alt: "Avalanche Chain" },
  ];
  useEffect(() => {
    getmanualEntryData();
  }, []);

  const currencyOptions = {
    0: [
      { value: "0", label: "BNB" },
      { value: "1", label: "WBTC (BEP20)" },
      { value: "2", label: "WETH (BEP20)" },
      { value: "3", label: "USDT (BEP20)" },
      { value: "4", label: "USDC (BEP20)" },
    ],
    1: [
      { value: "0", label: "ETH" },
      { value: "1", label: "WBTC (ERC20)" },
      { value: "2", label: "USDT (ERC20)" },
      { value: "3", label: "USDC (ERC20)" },
    ],
    2: [
      { value: "0", label: "MATIC" },
      { value: "1", label: "USDT (polygon)" },
      { value: "2", label: "USDC (polygon)" },
    ],
    3: [
      { value: "0", label: "ARB" },
      { value: "1", label: "USDT (ARB)" },
      { value: "2", label: "USDC (ARB)" },
    ],
    4: [
      { value: "0", label: "AVAX" },
      { value: "1", label: "USDT (AVAX)" },
      { value: "2", label: "USDC (AVAX)" },
    ],
  };
  const getmanualEntryData = async () => {
    try {
      const config = localStorage.getItem("jwtToken");
      const result = await getmanualEntry(config);
      if (result?.status) {
        setRecord(result?.data);
      } else {
      }
    } catch (err) {
      console.log(err);
    }
  };

  const onSubmit = async () => {
    let data = {
      wallet_address,
      chain,
      currency,
      amount,
      tokenAmount,
      trans_id,
      id
    };
    const config = localStorage.getItem("jwtToken");
    const result = await manualEntryAdd(data, config);
    if (result.status) {
      toast.dismiss();
      toast.success(result.message);
      handleClose();
      getmanualEntryData()
    } else {
      toast.dismiss();
      toast.error(result.message);
    }
  };

  return (
    <>
      <div id="layout-wrapper">
        <Header />
        <Navbar />
        <div className="main-content">
          <div className="page-content">
            <div className="section-heading d-flex justify-content-between">
              <h2>
                <b>Manual Entry History</b>
              </h2>
              <button
                className="btn btn-primary mb-3"
                onClick={() => handleShow()}
                title="Bouns"
              >
                Add/Update
              </button>
            </div>

            <Modal show={show} onHide={handleClose}>
              <Modal.Header closeButton>
                <Modal.Title style={{ color: "black" }}></Modal.Title>
              </Modal.Header>

              <Modal.Body>
                <Form>
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Label> Wallet Address </Form.Label>
                    <Form.Control
                      name="wallet_address"
                      onChange={handlechange}
                      type="text"
                      // onKeyPress={(event) => {
                      //   if (!/[0-9]/.test(event.key)) {
                      //     event.preventDefault();
                      //   }
                      // }}
                      value={wallet_address}
                    ></Form.Control>
                    <span style={{ color: "red" }}>{wallet_addressErr}</span>
                  </Form.Group>
                  <Row>
                    <Col md={6}>
                      <Form.Group
                        className="mb-3"
                        name="chain"
                        controlId="exampleForm.SelectControl"
                      >
                        <Form.Label>Select Chain</Form.Label>
                        <Form.Select
                          onChange={(e) => selectChain(e.target.value)}
                          value={chain}
                        >
                          <option value="">Select Chain</option>
                          {chainOptions.map(({ index, alt }) => (
                            <option key={index} value={index}>
                              {alt}
                            </option>
                          ))}
                        </Form.Select>
                      </Form.Group>
                    </Col>

                    <Col md={6}>
                      <Form.Group
                        name="currency"
                        className="mb-3"
                        controlId="exampleForm.SelectControl"
                      >
                        <Form.Label>Select Currency</Form.Label>
                        <Form.Select
                          onChange={(e) => selectCurrency(e.target.value)}
                          value={currency}
                        >
                          <option value="">Select Currency</option>
                          {currencyOptions[chain]?.map(({ value, label }) => (
                            <option key={value} value={value}>
                              {label}
                            </option>
                          ))}
                        </Form.Select>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Form.Group
                    name="trans_id"
                    className="mb-3"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Label> Transaction Id </Form.Label>
                    <Form.Control
                      name="trans_id"
                      onChange={handlechange}
                      type="text"
                      // onKeyPress={(event) => {
                      //   if (!/[0-9]/.test(event.key)) {
                      //     event.preventDefault();
                      //   }
                      // }}
                      value={trans_id}
                    ></Form.Control>
                    <span style={{ color: "red" }}>{trans_idErr}</span>
                  </Form.Group>
                  <Form.Group
                    name="amount"
                    className="mb-3"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Label> Amount </Form.Label>
                    <Form.Control
                      name="amount"
                      onChange={handlechange}
                      onKeyPress={(event) => {
                        if (!/[0-9]/.test(event.key)) {
                          event.preventDefault();
                        }
                      }}
                      value={amount}
                    ></Form.Control>
                    <span style={{ color: "red" }}>{amountErr}</span>
                  </Form.Group>
                  <Form.Group
                    name="tokenAmount"
                    className="mb-3"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Label> Token Amount </Form.Label>
                    <Form.Control
                      name="tokenAmount"
                      onChange={handlechange}
                      // onKeyPress={(event) => {
                      //   if (!/[0-9]/.test(event.key)) {
                      //     event.preventDefault();
                      //   }
                      // }}
                      value={tokenAmount}
                    ></Form.Control>
                    <span style={{ color: "red" }}>{tokenAmountErr}</span>
                  </Form.Group>
                </Form>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                  Close
                </Button>
                <Button variant="primary" onClick={onSubmit}>
                  Save
                </Button>
              </Modal.Footer>
            </Modal>
            <div className="row">
              <div className="col-xxl-12">
                <div className="product-list-outer">
                  <ReactDatatable
                    config={config}
                    records={record}
                    columns={columns}
                    onPageChange={pageChange}
                  />
                </div>
              </div>
            </div>
          </div>
          <Footer />
        </div>
      </div>
    </>
  );
};
