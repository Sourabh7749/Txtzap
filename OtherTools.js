import React, { useState, useEffect } from "react";
import axios from "axios";
import { API_ENDPOINT } from "../../../utils/common";
import { withRouter } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Introduction from "./Introduction";
import { RiseLoader } from "react-spinners";

const OtherTools = props => {
  const [data, setData] = useState([]);
  const [titles, settitle] = useState([]);
  const [content, setContent] = useState({
  });
  const [contentother, setContentother] = useState({
    otherclicked: 0,
    othercontent: ""
  });
  const [showLoading, setShowLoading] = useState(true);
  const apiUrl =
    API_ENDPOINT + "othertoolslist/" + localStorage.getItem("user_id");
  
  //To get All tools from Db
  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(apiUrl, {
        headers: {
          Authorization: localStorage.getItem("token")
        }
      });
      setData(result.data);
      setShowLoading(false);
    };

    fetchData();
    //Remove Classes of Front end
    document.body.classList.remove("tp-fp", "blue_bg", "review_bg");
  }, []);

  useEffect(() => {
    //Set Updated data by removing Inactive 
    const result = data.filter(d => d.status !== 0);
    settitle(result);
  }, [data]);

  useEffect(() => {
    //Set Default Fields on Load 
    for (let i = 0; i < titles.length; i++) {
      var ids = titles[0].id;
      var name = titles[0].name;
      var content = titles[0].content;
      selectedtext(ids, name, content);
    }
  }, [titles]);

  const checkboxfunction = event => {
     //Set Checkbox Value 0 or 1
    let id = event.target.id;
    let status = "";
    if (event.target.checked === false) {
      status = 0;
    } else {
      status = 1;
    }
    
    var postData = {
      user_id: localStorage.getItem("user_id"),
      id: id,
      status: status
    };

    let axiosConfig = {
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
        Authorization: localStorage.getItem("token")
      }
    };
    const apiadd = API_ENDPOINT + "othertools_checkbox";
   //Update Status in Db
    axios
      .post(apiadd, postData, axiosConfig)
      .then(res => {
        toast("Settings Updated Successfully");
        setTimeout(function() {
          window.location.reload();
        }, 1000);
      })
      .catch(err => {
        console.log("AXIOS ERROR: ", err);
      });
  };
  const selectedtext = (id, name, contentdata) => {
    let lowercase = name.toLowerCase();
    let contentid = lowercase + "content";
    contentid = contentid.replace(/ /g, "");
    setContent({
      ...content,
      ["content"]: contentdata,
      ["title"]: name,
      ["id"]: id
    });
  };
  const handleChange = event => {
    //Update State for Content
    setContent({ ...content, [event.target.id]: event.target.value });
  };

  const handleChangeother = event => {
    //Update State for Other Content 
    setContentother({ ...contentother, [event.target.id]: event.target.value });
  };
  //To Add New Tool Data
  const AddTool = async () => {
    var postData = {
      user_id: localStorage.getItem("user_id"),
      name: contentother.othercontent
    };

    let axiosConfig = {
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
        Authorization: localStorage.getItem("token")
      }
    };
    const apiadd = API_ENDPOINT + "othertools_add";

    axios
      .post(apiadd, postData, axiosConfig)
      .then(res => {
        toast("Settings Added Successfully");
        setTimeout(function() {
          window.location.reload();
        }, 1000);
      })
      .catch(err => {
        console.log("AXIOS ERROR: ", err);
      });
  };
  
   //To Update Data in Db
  const SubmitForm = async () => {
    var postData = content;
    let axiosConfig = {
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
        Authorization: localStorage.getItem("token")
      }
    };
    const apiedit =
      API_ENDPOINT + "othertoolsweb/" + localStorage.getItem("user_id");

    axios
      .post(apiedit, postData, axiosConfig)
      .then(res => {
        toast("Settings Updated Successfully");
        setTimeout(function() {
          window.location.reload();
        }, 1000);
      })
      .catch(err => {
        console.log("AXIOS ERROR: ", err);
      });
  };
  // To Previous File
  const back = () => {
    props.history.push({
      pathname: "/"
    });
  };

  // Update on Click Data for Checkbox
  const otherclicked = event => {
    if (event.target.checked === true) {
      setContentother({ ...contentother, ["otherclicked"]: 1 });
    } else {
      setContentother({ ...contentother, ["otherclicked"]: 0 });
    }
  };
  return (
    <div className="main">
      {showLoading && (
        <RiseLoader sizeUnit={"px"} size={20} color={"#cc9933"} />
      )}
      <div className="toolbox">
        <div className="row tool-head">
          <div className="col-md-6">
            <h5 className="mb-3">Other Tools</h5>
          </div>
          <div className="col-md-6"></div>
        </div>

        <div className="review">
          <div className="row">
            <div className="col-md-12">
              <div className="card border-top-0 border-right-0 border-left-0 pb-4">
                <div className="card-header bg-white ">
                  <div className="row">
                    <div className="col-md-6">
                      <h5 className="card-title mb-0 pt-2">
                        Other Tools Buttons Settings
                      </h5>
                    </div>
                    <div className="col-md-6">
                      <div className="text-right">
                        <button
                          type="button"
                          className="btn btn-primary bg-white back-btn"
                          onClick={() => back()}
                        >
                          <i
                            className="fa fa-long-arrow-left"
                            aria-hidden="true"
                          ></i>{" "}
                          Back
                        </button>
                        <button
                          onClick={() => SubmitForm()}
                          type="button"
                          className="btn custom-btn font-weight-bold"
                        >
                          Save
                        </button>
                        <button
                          type="button"
                          className="btn btn-success save-btn font-weight-bold"
                          data-toggle="modal"
                          data-target="#myModal"
                        >
                          Custom Button +
                        </button>
                      </div>
                      <div className="modal" id="myModal">
                        <div className="modal-dialog">
                          <div className="modal-content">
                            <div className="modal-header">
                              <h4 className="modal-title">Custom Button</h4>
                            </div>
                            <div className="modal-body">
                              <h6>Select buttons from the following:</h6>
                              {data.map((item, idx) => (
                                <div className="form-check">
                                  <label>
                                    <input
                                      type="checkbox"
                                      name={"checkbox" + item.id}
                                      id={item.id}
                                      checked={item.status === 1}
                                      onChange={checkboxfunction}
                                    />{" "}
                                    <span className="label-text">
                                      {item.name}
                                    </span>
                                  </label>
                                </div>
                              ))}
                              <div class="form-check">
                                <label class="left">
                                  <input
                                    type="checkbox"
                                    name="check"
                                    checked={contentother.otherclicked === 1}
                                    onChange={otherclicked}
                                  />{" "}
                                  <span class="label-text">OTHER</span>
                                </label>
                                <div class="inline-form">
                                  <input
                                    type="text"
                                    id="othercontent"
                                    class="form-control"
                                    onChange={handleChangeother}
                                    value={contentother.othercontent}
                                    disabled={contentother.otherclicked === 0}
                                  />{" "}
                                  <button
                                    class="btn save-btn"
                                    disabled={contentother.otherclicked === 0}
                                    onClick={() => AddTool()}
                                  >
                                    ADD
                                  </button>
                                </div>
                              </div>
                            </div>
                            <div className="modal-footer">
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="card-body">
                  <section id="tabs">
                    <div className="tabs-wrapper">
                      <div className="row">
                        <div className="col-12 ">
                          <nav>
                            <div
                              className="nav nav-tabs nav-fill"
                              role="tablist"
                            >
                              {titles.map((item, idx) => (
                                <a
                                  className="nav-item nav-link"
                                  key={idx}
                                  onClick={() => {
                                    selectedtext(
                                      item.id,
                                      item.name,
                                      item.content
                                    );
                                  }}
                                  id="nav-home-tab"
                                  data-toggle="tab"
                                  href="#Social"
                                  role="tab"
                                  aria-selected="true"
                                >
                                  {(() => {
                                    switch (item.name) {
                                      case "WEBSITE":
                                        return (
                                          <img
                                            src={require("../../../assets/images/website.png")}
                                            alt="WEBSITE"
                                          />
                                        );
                                      case "SOCIAL":
                                        return (
                                          <img
                                            src={require("../../../assets/images/like.png")}
                                            alt="SOCIAL"
                                          />
                                        );
                                      case "QUOTE":
                                        return (
                                          <img
                                            src={require("../../../assets/images/quote.png")}
                                            alt="WEBSITE"
                                          />
                                        );
                                      case "PAYMENT":
                                        return (
                                          <img
                                            src={require("../../../assets/images/payment.png")}
                                            alt="payment"
                                          />
                                        );
                                      case "THANK YOU":
                                        return (
                                          <img
                                            src={require("../../../assets/images/thank-you.png")}
                                            alt="payment"
                                          />
                                        );
                                      case "SPECIALS":
                                        return (
                                          <img
                                            src={require("../../../assets/images/special.png")}
                                            alt="payment"
                                          />
                                        );
                                      case "TESTIMONIALS":
                                        return (
                                          <img
                                            src={require("../../../assets/images/testimonial.png")}
                                            alt="payment"
                                          />
                                        );
                                      default:
                                        return (
                                          <img
                                            src={require("../../../assets/images/thank-you.png")}
                                            alt="WEBSITE"
                                          />
                                        );
                                    }
                                  })()}
                                  {item.name}
                                </a>
                              ))}
                            </div>
                          </nav>
                          <div
                            className="tab-content py-3 px-3 px-sm-0"
                            id="nav-tabContent"
                          >
                            <div
                              className="tab-pane fade show active"
                              id="Social"
                              role="tabpanel"
                              aria-labelledby="nav-home-tab"
                            >
                              <Introduction
                                data={content}
                                onChange={handleChange}
                              />
                            </div>
                            <div
                              className="tab-pane fade"
                              id="Website"
                              role="tabpanel"
                            >
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </section>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default withRouter(OtherTools);
