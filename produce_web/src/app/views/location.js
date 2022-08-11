import React, { useState, useEffect, useContext } from "react";
// import GoogleMapReact, { Marker } from "google-map-react";
import { GoogleMap, Marker } from "@react-google-maps/api";
import GooglePlacesAutocomplete, {
  geocodeByAddress,
  getLatLng, geocodeByLatLng
} from "react-google-places-autocomplete";
import { useSelector, useDispatch, RootStateOrAny } from "react-redux";
import { useHistory } from "react-router-dom";
import Utility from "../utility/utility";
import Header from "../components/header";

import { Searchicon, goglemap, location, marker, loadingIcon } from "../assets";
import {
  getLocationRequest,
  saveLocationRequest,
} from "../redux/actions/locationAction";
import { actionSuccess } from "../redux/actions/loginAction";
import AsyncStorage from "@react-native-community/async-storage";

const Location = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [isLoading, setLoading] = useState(false);
  const [isLoadingGettingLocationDetails, setLoadingLocationDetails] =
    useState(false);
  const [userLocation, setUserLocation] = useState({});
  const businessId = useSelector((state) => state.updateBusinessIdReducer.data);
  const [address, setAddress] = useState('');
  const businessData = useSelector((state) => state.loginReducer) || {};

  const defaultMapConfig = {
    gestureHandling: "greedy",
    options: {
        fullscreenControl: false
    },
    mapContainerStyle: {
        height: "80vh",
        width: "100%"
    }
  };

  const [defaultProps, setDefaultProps] = useState({
    center: {
      lat: 42.083639,
      lng: -78.429926,
    },
    zoom: 11
  });
  //const isLoading = useSelector((state) => state.locationReducer.isLoading);
  const UserData = useSelector((state) => state.loginReducer.data);
  useEffect(() => {
    Utility.isSignedIn(UserData).then((value) => {
      if (!value) {
        history.push("/");
      }
      getLocationData();
    });
  }, []);

  const getLocationData = async () => {
    setLoadingLocationDetails(true);
    var payload = {
      business_id: JSON.stringify(businessId),
      showSuccessToast: false,
    };
    dispatch(getLocationRequest(payload, onGetLocationSuccess));
  };
  const onGetLocationSuccess = async (result) => {
    if (result.location) {
      setAddress(result.location);
    }
    let latitude = result.latitude;
    let longitude = result.longitude;
    if (latitude) {
      setDefaultProps({
        center: {
          lat: parseFloat(latitude),
          lng: parseFloat(longitude),
        },
        zoom: 11
      });
    }
    setLoadingLocationDetails(false);
  };

  const setLocationData = (result) => {
    setLoading(true);
    getLatLngByPlaceId(result.value.description);
  };

  async function getLatLngByPlaceId(address) {
    geocodeByAddress(address)
      .then((results) => getLatLng(results[0]))
      .then(({ lat, lng }) => {
        setDefaultProps({
          center: {
            lat: lat,
            lng: lng
          },
          zoom: 11
        });
        setAddress(address);
        setUserLocation({
          employee_id: JSON.stringify(UserData.id),
          business_id: JSON.stringify(parseInt(businessId)),
          location: address,
          state: "",
          city: "",
          country: "",
          pincode: "",
          latitude: lat,
          longitude: lng
        });
        setLoading(false);
      });
  }

  const saveLocation = () => {
    setLoading(true);
    let payload = userLocation;
    dispatch(
      saveLocationRequest(payload, onSaveLocationSuccess, onSaveLocationFailure)
    );
  };

  const onSaveLocationSuccess = async (result) => {
    const newBusinessData = businessData.data.business.map( business => {
      if(business.id == userLocation.business_id) {
        business.location = userLocation.location;
        return business;
      }else{
        return business;
      }
    } );
    businessData.data.business = newBusinessData;
    dispatch(actionSuccess(businessData.data));
    AsyncStorage.setItem("BusinessName", userLocation.location);
    setLoading(false);
    window.location.reload();
  };
  const onSaveLocationFailure = async (error) => {};
  const renderMarkers = () => {
    // return (
    //   <div lat={defaultProps.center.lat} lng={defaultProps.center.lng}>
    //     <img src={marker} style={{ height: 22, width: 22 }}></img>
    //   </div>
    // );
    return (
        <Marker position={{ lat: defaultProps.center.lat, lng: defaultProps.center.lng }} onDragEnd={e => onDrag(e)} draggable={true} />
    );
  };

  const onDrag = e => {
    const lat = e.latLng.lat();
    const long = e.latLng.lng();
    geocodeByLatLng({ lat: lat, lng: long })
    .then(results => {
        if(results[0]){
            const newAddress = results[0].formatted_address; 
            setAddress(newAddress);
            setUserLocation({
                employee_id: JSON.stringify(UserData.id),
                business_id: JSON.stringify(parseInt(businessId)),
                location: newAddress,
                state: "",
                city: "",
                country: "",
                pincode: "",
                latitude: lat,
                longitude: long
            });
            setDefaultProps({
                center: {
                  lat: lat,
                  lng: long
                },
                zoom: 11
            });                
        }
    })
    .catch(error => console.error(error));
  }

  return (
    <>
      <Header highlightedItem={"location"} />
      <div className="content mobile location">
        {isLoadingGettingLocationDetails ? (
          <div className="text-center">
            <img src={loadingIcon} alt="loading..." />
          </div>
        ) : (
          <div className="container mobile-full-width mobile-no-padding">
            <h4 className="text-success mt-5 font-family">Location</h4>
            <div className="card mt-3 mb-5">
              <div className="container mobile-full-width mobile-no-padding">
                <div className="col-md-12">
                  <label className="mt-5">
                    Drag the location pin on the map or search your address to
                    edit your location.
                  </label>
                  <div className="input-group">
                    <div className="form-outline w-45">
                      <GooglePlacesAutocomplete
                        minLengthAutocomplete={3}
                        onLoadFailed={(error) =>
                          console.error("Could not inject Google script", error)
                        }
                        styles={{
                          description: {
                            fontWeight: "bold",
                          },
                          predefinedPlacesDescription: {
                            color: "#1faadb",
                          },
                          listView: {
                            color: "black", //To see where exactly the list is
                            zIndex: 1000, //To popover the component outwards
                            position: "absolute",
                            top: 45,
                          },
                        }}
                        className="fontFamilySemiBold_h3"
                        selectProps={{
                          placeholder: "Search for Address or Cross Street",
                          onChange: (data) => [setLocationData(data)],
                          defaultInputValue: address,
                          //inputValue: address
                        }}
                      ></GooglePlacesAutocomplete>
                    </div>
                    <button type="button" className="btns border">
                      <img
                        src={Searchicon}
                        className="img-fluid size-graph"
                        alt="..."
                      />
                    </button>
                  </div>
                </div>
                {isLoading ? (
                  <div className="text-center">
                    <img src={loadingIcon} alt="loading..." />
                  </div>
                ) : (
                  <>
                    <div className="col-md-12 mt-4 mb-4">
                      <div
                        style={{
                          height: `80vh`,
                          width: `100%`,
                          borderTopRightRadius: `14px`,
                          borderTopLeftRadius: `14px`,
                          // position: "absolute",
                          top: 0,
                          left: 0,
                          right: 0,
                          bottom: 0,
                        }}
                      >
                        {!isLoading && (
                        <GoogleMap googleMapsApiKey={"AIzaSyAg75Ekm-fJV3fmMWULmwxp-z3E5P0p3RM"}
                            loadingElement={<div style={{ height: `100%` }} />}
                            containerElement={<div />}
                            mapElement={<div />}
                            {...defaultMapConfig} center={{ lat: defaultProps.center.lat, lng: defaultProps.center.lng }} zoom={3}
                        >
                          {
                            address ? 
                            <>
                              {renderMarkers()}
                              <Marker position={{ lat: defaultProps.center.lat, lng: defaultProps.center.lng }} onDragEnd={e => onDrag(e)} draggable={true} />                            
                            </> :
                            <></>
                          }
                        </GoogleMap>
                        )}
                      </div>
                    </div>
                    <div className=" col-md-12 text-right  margin-auto">
                      <button
                        onClick={() => saveLocation()}
                        type="button"
                        className="btn render color-66 widthss mb-5"
                      >
                        Save
                      </button>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Location;
