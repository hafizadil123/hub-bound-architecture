import React, { useState, useEffect, useContext } from "react";
import { useSelector, useDispatch, RootStateOrAny } from "react-redux";
import Header from "../components/header";
import { Deleteicon, loadingIcon } from "../assets";
import Utility from "../utility/utility";
import APP_STRING from "../constants/String";
import Modal from "react-bootstrap/Modal";
import SweetAlert from "react-bootstrap-sweetalert";
import { useHistory, Link } from "react-router-dom";
import { EMP_REGISTER_URL, EMP_UPDATE_URL } from "../services/ApiUrls";
import { useRest, CALL_TYPES } from "../services/rest/api";
import {
  employeeListRequest,
  employeeDeleteRequest,
} from "../redux/actions/employeeAction";
var loadMorePage = 1;
var selectedEmpId = "";
var empName = "";
const Employee = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const UserData = useSelector((state) => state.loginReducer.data || {});
  const { id = {} } = UserData;

  // const EmployeeListing = useSelector(
  //   (state: RootStateOrAny) => state.employeeReducer.data || []
  // );
  const [EmployeeListing, setEmployeeListing] = useState([]);
  const isLoading = useSelector((state) => state.employeeReducer.isLoading);
  const businessReducerData =
    useSelector((state) => state.loginReducer.data) || [];
  const [businessArray, setBusinessArray] = useState(
    businessReducerData.business ? businessReducerData.business : []
  );
  const [showLoader, setShowLoader] = useState(false);
  const [show, setShow] = useState(false);
  const [empPermissions, setEmpPermissions] = useState([]);
  const [business, setBusiness] = useState([]);
  const [email, setEmail] = useState("");
  const [firstname, setFirstname] = useState("");
  const [phone, setPhone] = useState("");
  const [lastname, setLastname] = useState("");
  const [deleteBox, setDeleteBox] = useState(false);
  const [deleteEmployeeID, setDeleteEmployeeID] = useState("");
  const [updateForm, setUpdateForm] = useState(false);
  const [EmployeeProfile, setEmployeeProfile] = useState({});
  const [isupdating, setupdating] = useState(false);
  const [isAllSelected, setIsAllSelected] = useState(false);
  const [totalPage, setTotalPage] = useState(0);
  const [isLoadMoreLoader, setLoadMoreLoader] = useState(false);
  const businessId = useSelector((state) => state.updateBusinessIdReducer.data);

  const handleShow = () => {
    setUpdateForm(false);
    setEmail("");
    setFirstname("");
    setLastname("");
    setShow(true);
  };

  const handleClose = () => {
    setShow(false);
    setBusinessArray(businessArray.map((v) => ({ ...v, value: false })));
    setIsAllSelected(false);
    setEmployeeProfile({});
    setEmpPermissions([]);
    setBusiness([]);
    selectedEmpId = "";
  };

  const handleEditShow = (item) => {
    selectedEmpId = item.id;
    let data = item.business_ids.split(",");
    for (var i = 0; i < businessArray.length; i++) {
      if (data.includes(JSON.stringify(businessArray[i].id))) {
        businessArray[i].value = true;
        business.push({
          value: true,
          name: businessArray[i].name,
          id: JSON.stringify(businessArray[i].id),
        });
      } else {
        businessArray[i].value = false;
      }
    }
    // for emp permission
    const {
      business_hours,
      delete_business,
      employees,
      inventor,
      location,
      order_management,
      payment,
      performance,
      integrations,
    } = item.permissions;
    if (business_hours == 1) {
      empPermissions.push({ value: true, name: "business_hours" });
    }
    if (delete_business == 1) {
      empPermissions.push({ value: true, name: "delete_business" });
    }
    if (employees == 1) {
      empPermissions.push({ value: true, name: "employees" });
    }
    if (inventor == 1) {
      empPermissions.push({ value: true, name: "inventor" });
    }
    if (location == 1) {
      empPermissions.push({ value: true, name: "location" });
    }
    if (order_management == 1) {
      empPermissions.push({ value: true, name: "order_management" });
    }

    if (performance == 1) {
      empPermissions.push({ value: true, name: "performance" });
    }

    if (payment == 1) {
      empPermissions.push({ value: true, name: "payment" });
    }

    if (integrations == 1) {
      empPermissions.push({ value: true, name: "integrations" });
    }

    setEmpPermissions(empPermissions);
    setUpdateForm(true);
    setShow(true);
    setEmail(item.email);
    setFirstname(item.firstname);
    setLastname(item.lastname);
    setEmployeeProfile(item);
    if (item.phone) {
      setPhone(item.phone);
    }
  };

  const handleSelectPermission = (e) => {
    var is_Added = empPermissions.findIndex(
      (obj) => obj.name === e.target.name
    );
    is_Added !== -1
      ? empPermissions.splice(is_Added, 1)
      : empPermissions.push({ value: e.target.checked, name: e.target.name });
    setEmpPermissions(empPermissions);
  };

  const handleUpdateSelectPermission = (e) => {
    if (EmployeeProfile != null) {
      const name = e.target.name;
      EmployeeProfile.permissions[name] = e.target.checked;
      var is_Added = empPermissions.findIndex(
        (obj) => obj.name === e.target.name
      );
      is_Added !== -1
        ? empPermissions.splice(is_Added, 1)
        : empPermissions.push({ value: e.target.checked, name: e.target.name });
      setEmpPermissions(empPermissions);
      setupdating(!isupdating);
    }
  };
  const handleUpdateSelectBusiness = (e, index) => {
    var is_Added = business.findIndex((obj) => obj.name == e.target.name);
    is_Added !== -1
      ? business.splice(is_Added, 1)
      : business.push({
          value: e.target.checked,
          name: e.target.name,
          id: e.target.id,
        });
    setBusiness(business);
    businessArray[index].value = !businessArray[index].value;
    setupdating(!isupdating);
  };

  const handleSelectBusiness = (e, index) => {
    var is_Added = business.findIndex((obj) => obj.name == e.target.name);
    is_Added !== -1
      ? business.splice(is_Added, 1)
      : business.push({
          value: e.target.checked,
          name: e.target.name,
          id: e.target.id,
        });
    setBusiness(business);
    businessArray[index].value = !businessArray[index].value;
    setupdating(!isupdating);
    setBusinessArray(businessArray);
  };

  const handleSelectAll = (e) => {
    setIsAllSelected(!isAllSelected);
    let data = businessArray;
    if (e.target.checked) {
      for (var i = 0; i < data.length; i++) {
        let object = {
          value: true,
          name: data[i].name,
          id: data[i].id,
        };
        business.push(object);
      }
      setBusiness(business);
      setBusinessArray(businessArray.map((v) => ({ ...v, value: true })));
    } else {
      setBusiness([]);
      setBusinessArray(businessArray.map((v) => ({ ...v, value: false })));
    }
  };

  const businessList = () => {
    return businessArray.map((item, index) => {
      return (
        <div className="myTest custom-control custom-checkbox mt-2 business-checkbox-wrapper">
          <input
            checked={item.value}
            type="checkbox"
            className="custom-control-input"
            id={item.id}
            name={item.name}
            onClick={(e) =>
              updateForm === false
                ? handleSelectBusiness(e, index)
                : handleUpdateSelectBusiness(e, index)
            }
          />
          <label className="custom-control-label">{item.location ? item.location: item.name}</label>
        </div>
      );
    });
  };

  //register the employee
  const {
    data,
    loading: updateloading,
    error: updateerror,
    fetchData: registerEmp,
    responseCode: responseCode__,
  } = useRest({
    URL: EMP_REGISTER_URL,
    CALL_TYPE: CALL_TYPES.POST,
    PAYLOAD: {
      firstname: firstname,
      lastname: lastname,
      email: email,
      empPermissions: empPermissions,
      business: business,
      phone: phone,
    },
    lazy: true,
  });

  async function AddEmployee(e) {
    e.preventDefault();
    if (validateFields()) {
      registerEmp(0);
    }
  }

  //update the employee
  const {
    data: editdata,
    loading: editloading,
    error: editerror,
    fetchData: updateEmp,
    responseCode: responseCode,
  } = useRest({
    URL: EMP_UPDATE_URL,
    CALL_TYPE: CALL_TYPES.POST,
    PAYLOAD: {
      firstname: firstname,
      lastname: lastname,
      email: email,
      empPermissions: empPermissions,
      business: business,
      phone: phone,
      id: JSON.stringify(selectedEmpId),
    },
    lazy: true,
  });

  async function UpdateEmployee(e) {
    e.preventDefault();
    if (validateFields()) {
      updateEmp(0);
    }
  }
  const onEmployeeListingSuccess = (data) => {
    console.log("data", JSON.stringify(data));
    setLoadMoreLoader(false);
    setEmployeeListing(data.listing);
    setTotalPage(data.total_pages);
  };
  useEffect(() => {
    Utility.isSignedIn(UserData).then((value) => {
      if (!value) {
        history.push("/");
      }
      setBusinessArray(businessArray.map((v) => ({ ...v, value: false })));
    });

    let payload = {
      uid: id.toString(),
      business_id: JSON.stringify(parseInt(businessId)),
      page: loadMorePage,
      showSuccessToast: false
    };

    dispatch(employeeListRequest(payload, onEmployeeListingSuccess));
  }, []);

  useEffect(() => {
    //hide create form popup
    if (data != null) {
      setShow(false);
    }
    //refresh the employee listing
    let payload = {
      uid: id.toString(),
      business_id: JSON.stringify(parseInt(businessId)),
      showSuccessToast: false
    };

    dispatch(employeeListRequest(payload, onEmployeeListingSuccess));
    handleClose();
  }, [data, editdata]);

  const loadMoreClick = () => {
    if (loadMorePage != totalPage) {
      setLoadMoreLoader(true);
      let payload = {
        uid: id.toString(),
        business_id: JSON.stringify(parseInt(businessId)),
        showSuccessToast: false
      };

      dispatch(employeeListRequest(payload, onSuccessLoadMore));
    }
  };
  const onSuccessLoadMore = async (result) => {
    loadMorePage++;
    setLoadMoreLoader(false);
    let data = EmployeeListing.concat(result.listing);
    setEmployeeListing(data);
    setTotalPage(result.total_pages);
    console.log("data", JSON.stringify(data));
    console.log("totalPage", JSON.stringify(totalPage));
    console.log("loadMorePage", JSON.stringify(loadMorePage));
  };
  const validateFields = () => {
    var message = "";
    if (Utility.isEmpty(firstname)) {
      message = "Please enter employee's first name";
    } else if (Utility.isEmpty(lastname)) {
      message = "Please enter employee's last name";
    } else if (Utility.isEmpty(email)) {
      message = "Please enter employee's email";
    } else if (!Utility.validateEmail(email)) {
      message = APP_STRING.ENTER_VALID_EMAIL;
    } else if (empPermissions.length == 0) {
      message = APP_STRING.EMP_BUSINESS;
    } else if (business.length == 0) {
      message = APP_STRING.SELECT_BUSINESS;
    }
    if (message === "") {
      return true;
    }
    Utility.showToast("error", message);
    return false;
  };

  const DeleteEmployeePop = (e, item) => {
    e.preventDefault();
    setDeleteBox(true);
    setDeleteEmployeeID(item.id);
    empName = item.firstname + ` ` + item.lastname;
  };

  const DeleteEmployee = () => {
    let payload = {
      employee_id: JSON.stringify(deleteEmployeeID),
    };

    dispatch(employeeDeleteRequest(payload, onEmpDeleteSuccess));
  };

  async function onEmpDeleteSuccess() {
    setDeleteBox(false);
    setDeleteEmployeeID("");
    empName = "";
    //refresh the employee listing
    let payload = {
      uid: id.toString(),
      business_id: JSON.stringify(parseInt(businessId)),
      showSuccessToast: false
    };

    dispatch(employeeListRequest(payload, onEmployeeListingSuccess));
  }

  const EmployeeListingData = EmployeeListing.map((item, index) => (
    <tr key={index.toString()}>
      <td>
        {!Utility.isEmpty(item.firstname)
          ? item.firstname + ` ` + item.lastname
          : ""}
      </td>
      <td>{!Utility.isEmpty(item.email) ? item.email : ""}</td>
      <td>
        <span className="number">
          {!Utility.isEmpty(item.phone) ? item.phone : ""}
        </span>
      </td>
      <td className="text-success" onClick={() => handleEditShow(item)}>
        <Link to="#">Edit</Link>
      </td>
      <td>
        <button
          type="button"
          className="delete-btn"
          aria-label="Close"
          onClick={(e) => [DeleteEmployeePop(e, item)]}
        >
          <img src={Deleteicon} className="img-fluid" alt="..." />
        </button>
      </td>
    </tr>
  ));

  const EmployeeListingDataMobile = EmployeeListing.map((item, index) => (
    <div key={index.toString()} className="col-12 border-bottom">
      <div className="row mt-2">
        <div className="col-3 pl-0">
          <p className="ml-2 mobile mt-2">
            {!Utility.isEmpty(item.firstname)
              ? item.firstname + ` ` + item.lastname
              : ""}
          </p>
        </div>
        <div className="col-4 pl-0">
          <p className="mobile admins mt-2 ml-0">
            {!Utility.isEmpty(item.email) ? item.email : ""}
          </p>
        </div>
        <div className="col-3 pl-0">
          <p className="mobile admins mt-2">
            {!Utility.isEmpty(item.phone) ? item.phone : ""}
          </p>
        </div>
        <div className="col-2 pl-0">
          <div className="row">
            <p
              className="text-success mt-2 admins ml-2"
              onClick={() => handleEditShow(item)}
            >
              <Link to="#">Edit</Link>
            </p>
            <img
              src={Deleteicon}
              className="img-fluid employee-img ml-2"
              alt="..."
              onClick={(e) => [DeleteEmployeePop(e, item)]}
            />
          </div>
        </div>
      </div>
    </div>
  ));

  const loadMoreView = () => {
    if (loadMorePage != totalPage) {
      return (
        <button
          disabled={isLoadMoreLoader}
          onClick={(e) => [loadMoreClick()]}
          type="button"
          className="btn render width mb-5 mt-4 mr-4 load-more-data load-more-employee"
        >
          {isLoadMoreLoader ? (
            <div className="text-center">
              <img src={loadingIcon} alt="loading..." />
            </div>
          ) : (
            <span>Load More</span>
          )}
        </button>
      );
    }
  };

  return (
    <>
      <Header highlightedItem={"employee"} />
      <div className="content mobile">
        {isLoading && !isLoadMoreLoader ? (
          <>
            <div className="text-center">
              <img src={loadingIcon} alt="loading..." />
            </div>
          </>
        ) : (
          <div className="container">
            <h4 className="text-success mt-5 font-family">Employees</h4>
            <div className="card mt-5">
              <div className="container employee-container">
                <div className="col-md-12 mt-3 desktop_view">
                  <div className="table-responsive header-center">
                    <table className="table">
                      <thead>
                        <tr>
                          <th scope="col">Employee</th>
                          <th scope="col">Email</th>
                          <th scope="col">Phone</th>
                        </tr>
                      </thead>
                      <tbody>
                        {EmployeeListing && EmployeeListing.length > 0 ? (
                          <>{EmployeeListingData}</>
                        ) : (
                          <tr>
                            <td colSpan={5}>No Record Found!!!</td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>

                <div className="card mobile_view border-0">
                  <div className="col-12 border-bottom">
                    <div className="row mt-3 mb-2">
                      <div className="col-3 pl-0 ">
                        <h6 className="ml-2 mobile-admin">Admin</h6>
                      </div>
                      <div className="col-4 pl-0">
                        <h6 className="ml-2  mobile-admin">Email</h6>
                      </div>
                      <div className="col-3 pl-0">
                        <h6 className="ml-2  mobile-admin">Phone</h6>
                      </div>
                    </div>
                  </div>
                  {EmployeeListing && EmployeeListing.length > 0 ? (
                    <>{EmployeeListingDataMobile}</>
                  ) : (
                    <div className="col-12">
                      <p className="ml-2 mobile mt-2">No record found!!!</p>
                    </div>
                  )}
                </div>

                <div className=" col-md-12 text-right  margin-auto">
                  {loadMoreView()}
                  <button
                    type="button"
                    className="btn render color-66 width mb-5 mt-4"
                    onClick={handleShow}
                  >
                    <Link to="#" className="text-white">
                      Add Employee
                    </Link>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {deleteBox ? (
          <SweetAlert
            title=""
            confirmBtnText="Delete Employee"
            confirmBtnBsStyle="success"
            onConfirm={DeleteEmployee}
            onCancel={() => setDeleteBox(false)}
          >
            <h6>Are you sure you want to delete this employee?</h6>
            <p style={{ color: "#F0924E", marginTop: "2rem" }}>{empName}</p>
          </SweetAlert>
        ) : (
          ""
        )}

        <Modal
          show={show}
          onHide={handleClose}
          backdrop="static"
          keyboard={false}
        >
          <Modal.Header>
            <Modal.Title className="blue">
              {updateForm === false ? "Add Employee" : "Edit Employee"}
              <h6 className="mt-3 black">
                {updateForm === false
                  ? "Send your employee on invite to create an account."
                  : ""}
              </h6>
              <img
                src={Deleteicon}
                onClick={handleClose}
                className="modal_closer"
              />
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {showLoader ? (
              <>
                <div className="text-center">
                  <img src={loadingIcon} alt="loading..." />
                </div>
              </>
            ) : (
              <>
                <div className="col-md-12">
                  <div className="row">
                    <div className="form-group col-md-12">
                      <label>Employee First Name</label>
                      <input
                        type="text"
                        className="form-control"
                        id="fname"
                        value={firstname}
                        onChange={(firstname) =>
                          setFirstname(firstname.target.value)
                        }
                      />
                    </div>
                  </div>
                </div>
                <div className="col-md-12">
                  <div className="row">
                    <div className="form-group mt-3 col-md-12">
                      <label>Employee Last Name</label>
                      <input
                        type="text"
                        className="form-control"
                        id="lname"
                        value={lastname}
                        onChange={(lastname) =>
                          setLastname(lastname.target.value)
                        }
                      />
                    </div>
                  </div>
                </div>
                <div className="col-md-12">
                  <div className="row">
                    <div className="form-group col-md-12">
                      <label className="mt-3">Email</label>
                      <input
                        type="text"
                        className="form-control"
                        id="email"
                        value={email}
                        onChange={(email) => setEmail(email.target.value)}
                      />
                    </div>
                  </div>
                </div>
                <div className="col-md-12">
                  <div className="row">
                    <div className="form-group mt-3 col-md-12">
                      <label>Phone</label>
                      <input
                        type="text"
                        className="form-control"
                        id="phone"
                        value={phone}
                        onChange={(phone) => setPhone(phone.target.value)}
                      />
                    </div>
                  </div>
                </div>
                <div className="col-md-12">
                  <div className="row">
                    <div className="form-group col-md-12">
                      <label className="mt-3">Set Permissions</label>
                      <div className="border"></div>
                    </div>
                  </div>
                </div>
                <div className="col-md-12 margin mt-3">
                  <div className="row">
                    <div className="col-md-6">
                      <p className="mt-3 text-dark">Account Tabs</p>
                      <div className="border m-t-65"></div>
                      <div className="myTest custom-control custom-checkbox mt-2">
                        <input
                          type="checkbox"
                          className="custom-control-input"
                          id="inventor"
                          name="inventor"
                          checked={EmployeeProfile?.permissions?.inventor}
                          onClick={(e) =>
                            updateForm === false
                              ? handleSelectPermission(e)
                              : handleUpdateSelectPermission(e)
                          }
                        />
                        <label className="custom-control-label">
                          Catalog
                        </label>
                      </div>
                      <div className="myTest custom-control custom-checkbox mt-2">
                        <input
                          type="checkbox"
                          className="custom-control-input"
                          id="business_hours"
                          name="business_hours"
                          checked={EmployeeProfile?.permissions?.business_hours}
                          onClick={(e) =>
                            updateForm === false
                              ? handleSelectPermission(e)
                              : handleUpdateSelectPermission(e)
                          }
                        />
                        <label className="custom-control-label">
                          Business Hours
                        </label>
                      </div>
                      <div className="myTest custom-control custom-checkbox mt-2">
                        <input
                          type="checkbox"
                          className="custom-control-input"
                          id="location"
                          name="location"
                          checked={EmployeeProfile?.permissions?.location}
                          onClick={(e) =>
                            updateForm === false
                              ? handleSelectPermission(e)
                              : handleUpdateSelectPermission(e)
                          }
                        />
                        <label className="custom-control-label">Location</label>
                      </div>                                            
                      <div className="myTest custom-control custom-checkbox mt-2">
                        <input
                          type="checkbox"
                          className="custom-control-input"
                          id="integrations"
                          name="integrations"
                          checked={EmployeeProfile?.permissions?.integrations}
                          onClick={(e) =>
                            updateForm === false
                              ? handleSelectPermission(e)
                              : handleUpdateSelectPermission(e)
                          }
                        />
                        <label className="custom-control-label">Integrations</label>
                      </div>                      
                      <div className="myTest custom-control custom-checkbox  mt-2">
                        <input
                          type="checkbox"
                          className="custom-control-input"
                          id="performance"
                          name="performance"
                          checked={EmployeeProfile?.permissions?.performance}
                          onClick={(e) =>
                            updateForm === false
                              ? handleSelectPermission(e)
                              : handleUpdateSelectPermission(e)
                          }
                        />
                        <label className="custom-control-label">
                          Performance
                        </label>
                      </div>
                      <div className="myTest custom-control custom-checkbox mt-2">
                        <input
                          type="checkbox"
                          className="custom-control-input"
                          id="employee"
                          name="employee"
                          checked={EmployeeProfile?.permissions?.employees}
                          onClick={(e) =>
                            updateForm === false
                              ? handleSelectPermission(e)
                              : handleUpdateSelectPermission(e)
                          }
                        />
                        <label className="custom-control-label">
                          Admins
                        </label>
                      </div>
                      <div className="myTest custom-control custom-checkbox mt-2">
                        <input
                          type="checkbox"
                          className="custom-control-input"
                          id="payment"
                          name="payment"
                          checked={EmployeeProfile?.permissions?.payment}
                          onClick={(e) =>
                            updateForm === false
                              ? handleSelectPermission(e)
                              : handleUpdateSelectPermission(e)
                          }
                        />
                        <label className="custom-control-label">Billing</label>
                      </div>                                            
                      <div className="myTest custom-control custom-checkbox mt-2">
                        <input
                          type="checkbox"
                          className="custom-control-input"
                          id="business_delete"
                          name="business_delete"
                          checked={
                            EmployeeProfile?.permissions?.delete_business
                          }
                          onClick={(e) =>
                            updateForm === false
                              ? handleSelectPermission(e)
                              : handleUpdateSelectPermission(e)
                          }
                        />
                        <label className="custom-control-label">
                          Delete Business
                        </label>
                      </div>
                      <div className="custom-control custom-switch mt-2">
                        <input
                          type="checkbox"
                          className="custom-control-input"
                          id="order_management"
                          name="order_management"
                          checked={
                            EmployeeProfile?.permissions?.order_management
                          }
                          onClick={(e) =>
                            updateForm === false
                              ? handleSelectPermission(e)
                              : handleUpdateSelectPermission(e)
                          }
                        />
                        <label className="custom-control-label">
                          Order Management
                        </label>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <p className="mt-3 text-dark">Businesses</p>
                      <div className="border m-t-65"></div>
                      <div className="myTest custom-control custom-checkbox mt-2">
                        <input
                          checked={isAllSelected}
                          type="checkbox"
                          onClick={(e) => handleSelectAll(e)}
                          className="custom-control-input"
                          id="all_business"
                        />
                        <label
                          className="custom-control-label"
                          //onClick={handleSelectAll}
                        >
                          All
                        </label>
                      </div>
                      {businessList()}
                    </div>
                  </div>
                </div>
                <div className="mt-4">
                  <div className="text-right margin-auto col-md-12">
                    <button
                      type="button"
                      className="btn render color-66 w-32 mt-3"
                      onClick={(e) => [
                        updateForm === false
                          ? AddEmployee(e)
                          : UpdateEmployee(e),
                      ]}
                    >
                      {updateForm === false ? "Send Invite" : "Update"}
                    </button>
                  </div>
                </div>
              </>
            )}
          </Modal.Body>
        </Modal>
      </div>
    </>
  );
};

export default Employee;
