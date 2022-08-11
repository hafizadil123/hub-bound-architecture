/* eslint-disable jsx-a11y/alt-text */
import React, { useState, useEffect, useRef, useContext } from "react";
import { useSelector, useDispatch, RootStateOrAny } from "react-redux";
import Switch from "react-switch";
import { useHistory, Link } from "react-router-dom";
import Utility from "../utility/utility";
import Header from "../components/header";
import Modal from "react-bootstrap/Modal";
import SweetAlert from "react-bootstrap-sweetalert";
import APP_STRING from "../constants/String";
import {
  Deleteicon,
  loadingIcon,
  camera,
  Signuparrowbutton,
  trash,
} from "../assets";
import Dropdown1 from "react-dropdown";
import "react-dropdown/style.css";
import { SplitButton, Dropdown } from "react-bootstrap";
import { INVENTORY_SAVE, INVENTORY_EDIT } from "../services/ApiUrls";
import { useRest, CALL_TYPES } from "../services/rest/api";
import {
  inventoryListRequest,
  inventoryDeleteRequest,
  inventoryUpdateRequest,
  deleteImageRequest,
} from "../redux/actions/inventoryAction";
import {
  uploadImageRequest,
  imageListingRequest,
} from "../redux/actions/uploadImageAction";
import { moveProductImagesRequest } from "../redux/actions/moveProductImagesAction";
import { Tab, Nav } from "react-bootstrap";
var selectedEmpID = "";
var avatarSource = "";
var STATIC_IMAGE = null;
var STATIC_ID = null;
var STATIC_NAME = null;
var categoryArrayDataDropdown = [
  { key: "1", value: "In Stock" },
  { key: "2", value: "Out of Stock" },
];
var categoryData = [
  { key: "1", value: "Alcohol" },
  { key: "2", value: "Babies" },
  { key: "3", value: "Bakery" },
  { key: "4", value: "Beverages" },
  { key: "5", value: "Canned" },
  { key: "6", value: "Dairy & Eggs" },
  { key: "7", value: "Dry Goods" },
  { key: "8", value: "Frozen" },
  { key: "9", value: "Household" },
  { key: "10", value: "Meats & Seafood" },
  { key: "11", value: "Pantry" },
  { key: "12", value: "Pets" },
  { key: "13", value: "Prepared" },
  { key: "14", value: "Produce" },
];

var loadMorePage = 1;
const Inventory = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [InventoryListingForFilter, setInventoryListingForFilter] = useState(
    []
  );
  const [InventoryListing, setInventoryListing] = useState([]);
  const [SharedImages, setSharedImages] = useState([]);
  const [filterValue, setFilterValue] = useState("");
  const [filterId, setFilterId] = useState([]);
  const [categoryValue, setCategoryValue] = useState("");
  const [show, setShow] = useState(false);
  const [categoryId, setCategoryId] = useState("");
  const [selectedImageIndex, setSelectedImageIndex] = useState(null);
  const [showImagePicker, setShowImagePicker] = useState(false);
  const [isSwitch, isSwitchUpdate] = useState(false);
  const [updateForm, setUpdateForm] = useState(false);
  const [isupdating, setupdating] = useState(false);
  const [showLoader, setShowLoader] = useState(false);
  const [deleteBox, setDeleteBox] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [PID, setPID] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [deleteProductName, setDeleteProductName] = useState("");
  const [product_name, setProductName] = useState("");
  const [brand_name, setBrandName] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [availability, setAvailability] = useState(1);
  const [product_image, setProductImage] = useState("");
  const [deal_price, setDealPrice] = useState("");
  const [deal_quantity, setDealQuantity] = useState("");
  const [unit1_type_text, setUnit1TypeText] = useState("");
  const [unit1_type, setUnit1Type] = useState("");
  const [unit1_qty, setUnit1QTY] = useState("");
  const [unit2_type_text, setUnit2TypeText] = useState("");
  const [unit2_type, setUnit2Type] = useState("");
  const [unit2_qty, setUnit2QTY] = useState("");
  const [filter_text, setFilterText] = useState("Filter");
  const [filterType, setFilterType] = useState(null);
  const [move_text, setMoveText] = useState("Move");
  const [moveType, setMoveType] = useState(null);
  const [isUploads, setUpload] = useState(true);
  const [totalPage, setTotalPage] = useState(0);
  const [isLoadMoreLoader, setLoadMoreLoader] = useState(false);
  const inputFile = useRef(null);
  const [filterCategory, setFilterCategory] = useState([]);
  const [inOutStock, setInOutStock] = useState(-1);
  const [selectedImageIds, setSelectedImageIds] = useState([]);
  const [selectedSharedImageIds, setSelectedSharedImageIds] = useState([]);
  const [selectedSharedImages, setSelectedSharedImages] = useState([]);
  const [categoryClicked, setCategoryClicked] = useState(false);

  const categoryArry = [
    { key: "1", value: "Ct" },
    { key: "2", value: "Bunch" },
    { key: "3", value: "Bag" },
    { key: "4", value: "Container" },
    { key: "5", value: "lb" },
    { key: "6", value: "oz" },
    { key: "7", value: "gal" },
    { key: "8", value: "L" },
    { key: "9", value: "pint" },
    { key: "10", value: "quart" },
  ];

  const CATEGORY_KEY_FRUITS = 1;
  const CATEGORY_KEY_VEGETABLES = 2;

  const categoryArrayDataForItemCategory = [
    { key: CATEGORY_KEY_FRUITS, value: "Fruits" },
    { key: CATEGORY_KEY_VEGETABLES, value: "Vegetables" },
  ];

  const getCategoryValueArr = [
    {key: 1, value: "Alcohol"},
    {key: 2, value: "Babies"},
    {key: 3, value: "Bakery"},
    {key: 4, value: "Beverages"},
    {key: 5, value: "Canned"},
    {key: 6,value: "Dairy & Eggs"},
    {key: 7, value: "Dry Goods"},
    {key: 8, value: "Frozen"},
    {key: 9, value: "Household"},
    {key: 10, value: "Meats & Seafood"},
    {key: 11, value: "Pantry"},
    {key: 12, value: "Pets"},
    {key:13, value: "Prepared"},
    {key: 14, value: "Produce"}
  ]

  const businessId = useSelector((state) => state.updateBusinessIdReducer.data);

  const ImageLibraryData =
    useSelector((state) => state.uploadImageReducer.data) || [];
  const UserData = useSelector((state) => state.loginReducer.data || {});
  const { id = {} } = UserData;

  const isLoading = useSelector((state) => state.inventoryReducer.isLoading);

  const handleClose = () => {
    resetImage();
  };
  const handleCloseImagePicker = () => {
    setSelectedImage(null);
    STATIC_IMAGE = null;
    setSelectedImageIndex(null);
    setSelectedImageIds([]);
    setShowImagePicker(false);
  };

  const resetImage = () => {
    STATIC_IMAGE = null;
    STATIC_ID = null;
    STATIC_NAME = null;
    setMoveType(null);
    setSelectedImage(null); 
    isSwitchUpdate(false);
    setShow(false);
    setUpdateForm(false);
    setCategoryId("");
    setCategoryValue("");       
    setSelectedImageIndex(null);
    setSelectedImageIds([]); 
    setFilterText("Filter");
    setFilterType(null);
    setMoveText("Move");
    setSelectedSharedImageIds([]);
    setSelectedSharedImages([]);
  }

  const handleShow = () => {
    setShow(true);
    setProductName("");
    setBrandName("");
    setCategory("");
    setPrice("");
    setAvailability("");
    setProductImage("");
    setDealPrice("");
    setDealQuantity("");
    setUnit1Type("");
    setUnit1TypeText("");
    setUnit1QTY("");
    setUnit1Type("");
    setUnit2TypeText("");
    setUnit2QTY("");
    setCategoryId("");
    setCategoryValue("");
  };

  const handleEditShow = (item) => {
    selectedEmpID = item.id;
    setUpdateForm(true);
    setShow(true);
    setPID(item.id);
    setProductName(item.product_name);
    setBrandName(item.brand_name);
    //setCategory(item.category);
    setPrice(item.price);
    setAvailability(item.availability);
    setProductImage(item.product_image);
    setSelectedImageIds(item.product_image_ids.split(',').map(v => parseInt(v)));
    setDealPrice(item.deal_price);
    setDealQuantity(item.deal_quantity);
    setUnit1Type(item.unit1_type);
    setUnit1QTY(item.unit1_quantity);
    setUnit1TypeText(getCategoryName(item.unit1_type, categoryArry));
    setUnit2Type(item.unit2_type);
    setUnit2QTY(item.unit2_quantity);
    setUnit2TypeText(getCategoryName(item.unit2_type, categoryArry));
    setSelectedImage(item.product_image);
    setCategoryId(item.category);
    setCategoryValue(
      getCategoryName(item.category, getCategoryValueArr)
    );
  };

  //save inventory
  const {
    data,
    loading: updateloading,
    error: updateerror,
    fetchData: InventorySave,
    responseCode: responseCode__,
  } = useRest({
    URL: INVENTORY_SAVE,
    CALL_TYPE: CALL_TYPES.POST,
    PAYLOAD: {
      product_name: product_name,
      brand_name: brand_name,
      category_id: categoryId,
      employee_id: selectedEmpID,
      business_id: JSON.stringify(parseInt(businessId)),
      availability: JSON.stringify(availability),
      product_image: selectedImage,
      product_image_ids: selectedImageIds,
      price: price.toString(),
      deal: {
        qty: deal_quantity,
        price: deal_price,
      },
      unit: [
        {
          number: unit1_qty,
          type: unit1_type,
        },
        {
          number: unit2_qty,
          type: unit2_type,
        },
      ],
    },
    lazy: true
  });

  async function addInventory(e) {
    if (validateFields()) {
      InventorySave(0);
    }
  }

  async function editInventory(e) {
    e.preventDefault();
    if (validateFields()) {
      updateInventory(true);
    }
  }
  const updateInventory = async (show_success_toast = true) => {
    var updateInventoryPayload = {
      pid: JSON.stringify(PID),
      product_name: product_name,
      brand_name: brand_name,
      category_id: categoryId,
      employee_id: selectedEmpID,
      business_id: JSON.stringify(parseInt(businessId)),
      availability: availability.toString(),
      product_image: selectedImage,
      product_image_ids: selectedImageIds,
      price: price.toString(),
      showSuccessToast: show_success_toast,
      deal: {
        qty: deal_quantity,
        price: deal_price
      },
      unit: [
        {
          number: unit1_qty,
          type: unit1_type,
        },
        {
          number: unit2_qty,
          type: unit2_type,
        },
      ],
    };
    console.log(
      "catalog.payload.business_id",
      JSON.stringify(updateInventoryPayload)
    );
    dispatch(inventoryUpdateRequest(updateInventoryPayload, onUpdateSuccess));
  };
  const onUpdateSuccess = async (response) => {
    let payload = {
      business_id: JSON.stringify(parseInt(businessId)),
      showSuccessToast: false
    };
    dispatch(inventoryListRequest(payload, onSuccess));
    getImageLibrary();
    resetImage();
  };
  

  const onSuccess = async (result) => {
    setInventoryListing(result.listing);
    setInventoryListingForFilter(result.listing);
    setTotalPage(result.total_pages);
  };

  const validateFields = () => {

    var message = "";
    if (Utility.isEmpty(product_name)) {
      message = APP_STRING.ENTER_PRODUCT_NAME;
    } else if (Utility.isEmpty(brand_name)) {
      message = APP_STRING.ENTER_BRAND_NAME;
    } else if (Utility.isEmpty(categoryId)) {
      message = APP_STRING.SELECT_CATEGORY;
    } else if (Utility.isEmpty(price)) {
      message = APP_STRING.PRICE;
    } else if (Utility.isEmpty(unit1_qty)) {
      message = APP_STRING.UNIT1QTY;
    } else if (Utility.isEmpty(unit1_type)) {
      message = APP_STRING.UNIT1TYPE;
    } else if (unit1_type != 5 && unit1_type != 6) {

      if(Utility.isEmpty(unit2_type))
        message = APP_STRING.UNIT2TYPE;
      else if(Utility.isEmpty(unit2_qty))
        message = APP_STRING.UNIT2QTY;

    }
    // else if (Utility.isEmpty(deal_quantity)) {
    //   message = APP_STRING.DEAL_QTY;
    // } else if (Utility.isEmpty(deal_price)) {
    //   message = APP_STRING.DEAL_PRICE;
    // }
    else if (Utility.isEmpty(selectedImage)) {
      message = APP_STRING.PRODUCT_IMAGE;
    }
    // else if (Utility.isEmpty(availability)) {
    //   message = APP_STRING.SELECT_AVAILABILITY;
    // }
    if (message === "") {
      return true;
    }
    Utility.showToast("error", message);
    return false;
  };

  const handleSelectUnitsecound = (id, obj) => {
    var optionText = obj.nativeEvent.target.innerText;
    setUnit2TypeText(optionText);
    setUnit2Type(id);
  };
  const handleFilterText = (id, obj) => {
    var optionText = obj.nativeEvent.target.innerText;
    setFilterText(optionText);
    setFilterType(id);
  };

  const handleMoveText = (id, obj) => {
    var optionText = obj.nativeEvent.target.innerText;
    setMoveText(optionText);
    setMoveType(id);

    dispatch( moveProductImagesRequest({
      move_type: parseInt(id),
      product_image_ids: selectedImageIds
    }, function(resp){
      
      // //On success, move the reqd images to the given category
      // ImageLibraryData.filter( obj => {
      //   return selectedImageIds.includes(obj.id)
      // } ).map( obj => {
      //   obj.category = id;
      // });
      getImageLibrary();

    }) );

  };

  useEffect(() => {
    Utility.isSignedIn(UserData).then((value) => {
      if (!value) {
        history.push("/");
      }
      isSwitchUpdate(false);
    });
    let payload = {
      business_id: JSON.stringify(parseInt(businessId)),
      showSuccessToast: false
    };
    setFilterId(filterId);
    dispatch(inventoryListRequest(payload, onSuccess));
  }, []);

  const onFilterSelection = (obj) => {
    let filterData = [];
    const IN_STOCK = "In Stock";
    const OUT_OF_STOCK = "Out of Stock";
    var itemName = obj.nativeEvent.target.innerText;

    if (itemName === IN_STOCK) {

      const updatedCategories = [];
      
      InventoryListingForFilter.filter( obj => {
        const availability = obj.availability == '1';
        const categoryFilteration = categoryClicked ? filterCategory.includes(obj.category) : true;
        return availability && categoryFilteration;
      }).map( obj => {
        filterData.push(obj);
        updatedCategories.push(obj.category);
      } );

      if(!categoryClicked) setFilterCategory(updatedCategories);
      setInOutStock(1);

    }

    if (itemName === OUT_OF_STOCK) {

      const updatedCategories = [];
      
      InventoryListingForFilter.filter( obj => {
        const availability = obj.availability != '1';
        const categoryFilteration = categoryClicked ? filterCategory.includes(obj.category) : true;
        return availability && categoryFilteration;
      }).map( obj => {
        filterData.push(obj);
        updatedCategories.push(obj.category);
      } );      

      if(!categoryClicked) setFilterCategory(updatedCategories);
      setInOutStock(0);
    
    }

    setInventoryListing(InventoryListingForFilter);
    //else setInventoryListing(filterData);
    setIsUpdating(!isUpdating);
  };

  const isAllSelected = (fitlerId, item) => {
    return true;
  };

  useEffect(() => {
    isSwitchUpdate(false);
    //hide create form popup
    if (data != null) {
      setShow(false);
    }
    let payload = {
      business_id: JSON.stringify(parseInt(businessId)),
      showSuccessToast: false
    };
    dispatch(inventoryListRequest(payload, onSuccess));
    getImageLibrary();
    getSharedImages();
    resetImage();
  }, [data]);
  function importAll(r) {
    let images = {};
    r.keys().map((item, index) => {
      images[item.replace("./", "")] = r(item);
    });
    return images;
  }

  const images = importAll(
    require.context("../assets/Produce-Photos/", false, /\.(png|jpe?g|svg)$/)
  );

  const getSharedImages = () => {
    for (const [key, value] of Object.entries(images)) {
      console.log(`${key}: ${value}`);
      SharedImages.push(value);
    }
    console.log("getSharedImages", JSON.stringify(SharedImages));
    setSharedImages(SharedImages);
  };

  const getImageLibrary = async () => {
    let payloadData = { showSuccessToast: false, uid: id };
    dispatch(imageListingRequest(payloadData));
  };
  const DeleteInventoryPop = (e, item) => {
    e.preventDefault();
    setDeleteBox(true);
    setPID(item.id);
    setDeleteProductName(item.product_name);
  };

  const DeleteInventory = () => {
    let payload = {
      pid: PID.toString(),
    };
    dispatch(inventoryDeleteRequest(payload, onInventoryDeleteSuccess));
  };

  async function onInventoryDeleteSuccess() {
    setDeleteBox(false);
    setPID("");
    setDeleteProductName("");
    //refresh the inventory listing
    let payload = {
      business_id: JSON.stringify(parseInt(businessId)),
      showSuccessToast: false
    };
    dispatch(inventoryListRequest(payload, onSuccess));
  }

  const getCategoryName = (nameKey, myArray) => {
    for (var i = 0; i < myArray.length; i++) {
      if (myArray[i].key == nameKey) {
        return myArray[i].value;
      }
    }
  }; 

  // will compress file and get compressed link @developer_will
  const handleFileUpload = async (e, type) => {
    const { files } = e.target;
    const compressedFile = await Utility.getCompressedUrl(files);
    if (files && files.length) {
      uploadFileToServer(compressedFile, Utility.getTimeStamp(), files[0]);
    }
  };

  // will upload file and get uploaded image link  @developer_will
  const uploadFileToServer = async (imageFile, fileName, files) => {
    var imageObj = await Utility.uploadImage(
      imageFile,
      APP_STRING.CATALOG,
      fileName
    );
    avatarSource = imageObj.location;
    let payload = {
      url: avatarSource,
      category: JSON.stringify(parseInt(moveType)),
      name: fileName,
      uid: id
    };
    dispatch(uploadImageRequest(payload, onImageUploadSuccess));
  };
  
  const onImageUploadSuccess = async () => {
    getImageLibrary();
  };

  const onImageUploadingPress = () => {
    inputFile.current.click();
  };

  const onInsertPress = () => {
    if (STATIC_IMAGE == null) {
      Utility.showToast("error", "Please select atleast one Image");
    } else {
      setSelectedImage(STATIC_IMAGE);
      setTimeout(() => {
        hideImagePicker();
      }, 500);
    }
  };


  const onInsertStock = () => {

    if (STATIC_IMAGE == null || selectedSharedImages.length == 0) {
      Utility.showToast("error", "Please select atleast one Image");
    } else {

      setSelectedImageIds([]);

      for(let i in selectedSharedImages){

        const payload = {
          url: selectedSharedImages[i].image,
          name: Math.floor( Date.now()/ 1000) + '_image.jpg',
          showSuccessToast: false,
          uid: id
        }
        dispatch(uploadImageRequest(payload, function(resp){

          setSelectedImageIds( selectedImageIds.concat([resp.id]) );

          setSelectedImage(STATIC_IMAGE);
          setTimeout(() => {
            hideImagePicker();
          }, 500);

        }));
        

      }

    }

  }

  const onSelectImagePress = (e, image, id, index, image_name) => {

    const checkboxObj = e.currentTarget.querySelector("input[type=checkbox]");
    onCheckedImagePress(!checkboxObj.checked, image, id, index, image_name);

    // document.getElementsByClassName("library-cards").forEach(function (val, i) {
    //   val.querySelector("input[type=checkbox]").removeAttribute("checked");
    // });

    //If false, then make the checkbox checked true
    // if(checkboxObj.checked == false){

    //   STATIC_IMAGE = image;
    //   STATIC_ID = id;
    //   STATIC_NAME = image_name;
    //   setSelectedImageIndex(index);

    //   checkboxObj.setAttribute("checked", true);
    //   //setSelectedImageIds(selectedImageIds.concat([id]));

    // }else{

    //   // const newArr = selectedImageIds.filter( val => {
    //   //   return val != id
    //   // } );
    //   //selectedImageIds(newArr);
    //   checkboxObj.setAttribute("checked", false);

    // }

  };


  const onCheckedImagePress = (checkbox_checked, image, id, index, image_name) => {

    if(checkbox_checked == true){

      STATIC_IMAGE = image;
      STATIC_ID = id;
      STATIC_NAME = image_name;
      setSelectedImageIndex(index); 
      setSelectedImageIds(selectedImageIds.concat([id]));   

    }else{

      //Remove the unchecked image id from the array
      const newArr = selectedImageIds.filter( val => {
        return val != id
      } );

      //If after unchecking the current image, there are still (previous) checked images
      if(newArr.length > 0){

        //Assign new static data from the previous checked images by looping through the images library
        ImageLibraryData.find( img_data => {

          if(newArr.includes(img_data.id)){
            STATIC_IMAGE = img_data.url;
            STATIC_ID = img_data.id;
            STATIC_NAME = img_data.name;
            return;            
          }

        } );

      }else{

        onImageDeleteSuccess();

      }

      setSelectedImageIds(newArr);

    }

  }


  const onSelectSharedImagePress = (e, image, index) =>{

    const checkboxObj = e.currentTarget.querySelector("input[type=checkbox]");
    const isChecked = (e.target.type == 'checkbox') ? checkboxObj.checked : !checkboxObj.checked;
    const imgSrc = e.currentTarget.querySelector('img').src;
    checkedSharedImagePress(isChecked, image, index, imgSrc);

  }


  const checkedSharedImagePress = (is_checked, image, index, img_src) => {

    if(is_checked){

      STATIC_IMAGE = img_src;
      STATIC_NAME = image;
      console.log("checked shared");
      setSelectedSharedImageIds( selectedSharedImageIds.concat([index]) );
      const newArr = selectedSharedImages;
      newArr.push({ id: index, image: img_src });
      setSelectedSharedImages( newArr );

    }else{

      console.log("not checked");
      const newArr = selectedSharedImageIds.filter( val => val != index );
      setSelectedSharedImageIds(newArr);
      const newSharedImgsArr = selectedSharedImages.filter( obj => obj.id != index );
      setSelectedSharedImages(newSharedImgsArr);

    }

  }


  const onImageDeletePress = async () => {
    if (STATIC_IMAGE == null) {
      Utility.showToast("error", "Please select any image");
    } else {
      await Utility.deleteImage(STATIC_NAME);
      let payload = {
        img_id: JSON.stringify(STATIC_ID),
      };
      dispatch(deleteImageRequest(payload, onImageDeleteSuccess));
    }
  };
  const onImageDeleteSuccess = (resp) => {
    STATIC_ID = null;
    STATIC_NAME = null;
    STATIC_IMAGE = null;
    getImageLibrary();
  };

  useEffect(() => {
    console.log("hah:", isSwitch, updateForm);
    if (isSwitch) {
      if (!updateForm) {
        updateInventory(false);
        isSwitchUpdate(false);
      }
    }
  }, [
    selectedImage,
    PID,
    product_image,
    brand_name,
    category,
    price,
    availability,
    product_image,
    deal_price,
    deal_quantity,
    unit1_type,
    unit2_type,
    unit2_qty,
    unit1_qty,
    unit1_type_text,
    unit2_type_text,
  ]);
  const onCheckBoxChange = (selectedItemIndex, item) => {
  
    selectedEmpID = item.id;

    if (InventoryListing[selectedItemIndex].availability == "1") {
      InventoryListing[selectedItemIndex].availability = "0";
      setAvailability(0);
    } else {
      setAvailability(1);
      InventoryListing[selectedItemIndex].availability = "1";
    }
    setIsUpdating(!isUpdating);
    setPID(item.id);
    setProductName(item.product_name);
    setBrandName(item.brand_name);
    setCategory(item.category);

    setCategoryId(item.category);
    setPrice(item.price);
    setAvailability(item.availability);
    setProductImage(item.product_image);
    setDealPrice(item.deal_price);
    setDealQuantity(item.deal_quantity);
    setUnit1Type(item.unit1_type);
    setUnit1QTY(item.unit1_quantity);
    setUnit1TypeText(getCategoryName(item.unit1_type, categoryArry));
    setUnit2Type(item.unit2_type);
    setUnit2QTY(item.unit2_quantity);
    setUnit2TypeText(getCategoryName(item.unit2_type, categoryArry));
    setSelectedImage(item.product_image);
    setSelectedImageIds(item.product_image_ids.split(',').map(v => parseInt(v)));
    isSwitchUpdate(true);
  };

  const handleSelectUnitfirst = (id, obj) => {
    var optionText = obj.nativeEvent.target.innerText;
    setUnit1TypeText(optionText);
    setUnit1Type(id);
  };

  const onCategorySelection = (id, obj) => {
    var optionText = obj.nativeEvent.target.innerText;
    setCategoryValue(optionText);
    setCategoryId(id);
  };

  const InventoryListingData = InventoryListing.filter((item) => {
   
    let availabilityFilter = true;
    if(inOutStock == 1)
      availabilityFilter = item.availability == 1;
    else if(inOutStock == 0)
      availabilityFilter = item.availability != 1;
    const categoryFilter = (filterCategory.length == 0) ? true: filterCategory.includes(item.category);
    return availabilityFilter && categoryFilter;
  
  }).map((item, index) => {
    return (
      <tr key={index.toString()}>
        <td className="listing-switch-button">
          <Switch
            className="custom-btn"
            uncheckedIcon={false}
            checkedIcon={false}
            onChange={() => onCheckBoxChange(index, item)}
            checked={item.availability == "1" ? true : false}
            onColor="#344d89"
          />
        </td>
        <td className="w-25">
          <span className="hi-w-set">
            {item.product_image ? (
              <img
                className="catalog_productimg"
                src={item.product_image}
              ></img>
            ) : (
              <button
                type="button"
                className="btn btn-secondary radius mt-4"
              ></button>
            )}
          </span>
          <span className="mt-4 block">{item.product_name}</span>
        </td>
        <td className="border-mobile-catalog">
          ${item.price}/{getCategoryName(item.unit1_type, categoryArry)}
        </td>
        <td className="border-mobile-right">
          { item.deal_quantity && item.deal_price ? `${item.deal_quantity} for ${item.deal_price}` : <></>}
        </td>
        <td className="text-success" onClick={() => handleEditShow(item)}>
          <Link to="#">Edit</Link>
        </td>
        <td>
          <button
            type="button"
            className="delete-btn"
            aria-label="Close"
            onClick={(e) => [DeleteInventoryPop(e, item)]}
          >
            <img src={Deleteicon} className="img-fluid" alt="..." />
          </button>
        </td>
      </tr>
    );
  });

  const InventoryListingDataMobile = InventoryListing.filter((item) => {

    let availabilityFilter = true;
    if(inOutStock == 1)
      availabilityFilter = item.availability == 1;
    else if(inOutStock == 0)
      availabilityFilter = item.availability != 1;
    const categoryFilter = (filterCategory.length == 0) ? true: filterCategory.includes(item.category);
    return availabilityFilter && categoryFilter;

  }).map((item, index) => {
    return (
      <div key={index.toString()} className="col-12 border-bottom">
        <div className="row">
          <div className="col-3 p-0">
            <div className="custom-control custom-switch ml-2 mt-4">
              <Switch
                uncheckedIcon={false}
                checkedIcon={false}
                onChange={() => onCheckBoxChange(index, item)}
                checked={item.availability == "1" ? true : false}
                className="custom-control-input"
                id="customSwitches"
                onColor="#344d89"
              />
            </div>
          </div>
          <div className="col-3 p-0">
            <span className="hi-w-set">
              {item.product_image ? (
                <img
                  className="catalog_productimg"
                  src={item.product_image}
                ></img>
              ) : (
                <button
                  type="button"
                  className="btn btn-secondary radius mt-4"
                ></button>
              )}
            </span>
            <p className="block mobile-right">{item.product_name}</p>
          </div>
          <div className="col-2 p-0 border-left border-right">
            <p className="block mobile-right ml-2">
              ${item.price}/{getCategoryName(item.unit1_type, categoryArry)}
            </p>
          </div>
          
          <div className="col-2 p-0 border-right">
            <p className="block mobile-right  ml-2">
              {item.deal_quantity && item.deal_price ? `${item.deal_quantity} for ${item.deal_price}` : ''} 
            </p>
          </div>          
          
          <div className="col-2 p-0">
            <div className="row">
              <p
                className="block mobile-right ml-4 text-success"
                onClick={() => handleEditShow(item)}
              >
                <Link to="#">Edit</Link>
              </p>
              <img
                src={Deleteicon}
                className="img-fluid ml-2"
                alt="..."
                onClick={(e) => [DeleteInventoryPop(e, item)]}
              />
            </div>
          </div>
        </div>
      </div>
    );
  });

  const loadMoreClick = () => {
    if (loadMorePage != totalPage) {
      let payload = {
        business_id: JSON.stringify(parseInt(businessId)),
        page: loadMorePage
      };
      console.log("loadMorePage payload=", JSON.stringify(payload));
      setLoadMoreLoader(true);
      dispatch(inventoryListRequest(payload, onSuccessLoadMore));
    }
  };
  const onSuccessLoadMore = async (result) => {
    loadMorePage++;

    setLoadMoreLoader(false);
    let data = InventoryListing.concat(result.listing);
    setInventoryListing(data);
    setInventoryListingForFilter(data);
    setIsUpdating(!isUpdating);
  };
  const loadMoreView = () => {
    // if (loadMorePage != totalPage) {
    return (
      <button
        disabled={isLoadMoreLoader}
        onClick={(e) => [loadMoreClick()]}
        type="button"
        className="btn render width mb-5 mt-4 load-more-data load-more-catalog"
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
    // }
  };

  function ImageLibraryView() {

    let ImageLibraryDataFilter = ImageLibraryData;

    if(filterType != null){

      ImageLibraryDataFilter = ImageLibraryData.filter( (item, idx) => {
        return item.category == filterType;
      } );

    }

    return(
      <>
      {
        ImageLibraryDataFilter.map( (item, index) => {
            return <div onClick={(e) => onSelectImagePress(e, item.url, item.id, index, item.name)}
                style={
                  selectedImageIndex == null || selectedImageIndex != index
                  ? { border: "2px solid white", margin: 5 }
                  : { border: "2px solid white", margin: 5 }
                }
                className="library-cards"
            >
              <input type="checkbox" onChange={e => onCheckedImagePress(e.target.checked, item.url, item.id, index, item.name)} checked={selectedImageIds.includes(item.id)} className="library-card-image-check" />
              <img src={item.url} style={{ height: "100%", width: "100%", padding: 10, resize: "contain"}}
                //className="img-fluid image-centers" alt="..."
              />
            </div>
        })
      }
      </>
    );

  }

  // const imageLibraryView = ImageLibraryData.map((item, index) => (
  //   <div
  //     onClick={(e) =>
  //       onSelectImagePress(e, item.url, item.id, index, item.name)
  //     }
  //     style={
  //       selectedImageIndex == null || selectedImageIndex != index
  //         ? { border: "2px solid white", margin: 5 }
  //         : { border: "2px solid white", margin: 5 }
  //     }
  //     className="library-cards"
  //   >
  //     <input type="checkbox" className="library-card-image-check" />
  //     <img
  //       src={item.url}
  //       style={{
  //         height: "100%",
  //         width: "100%",
  //         padding: 10,
  //         resize: "contain",
  //       }}
  //       //className="img-fluid image-centers" alt="..."
  //     />
  //   </div>
  // ));

  const ImageLibraryViewShared = () => {

    return (<>
    {
      SharedImages.map( (item, index)  => {

        return <div onClick={(e) => onSelectSharedImagePress(e, item.default, index)}
          style={
            selectedImageIndex == null || selectedImageIndex != index
            ? { border: "2px solid white", margin: 5 }
            : { border: "2px solid white", margin: 5 }
          }
          className="library-cards"
        >
          <input type="checkbox" onChange={e => console.log('')} checked={selectedSharedImageIds.includes(index)} className="library-card-image-check" />
          <img  src={item.default} style={{ height: "100%", width: "100%", padding: 10, resize: "contain"}}
            //className="img-fluid image-centers" alt="..."
          />
        </div>

      })  
    }
    </>);

  }

  // const imageLibraryViewShared = SharedImages.map((item, index) => (
  //   <div
  //     onClick={(e) =>
  //       onSelectImagePress(e, item.default, item.id, index, item.name)
  //     }
  //     style={
  //       selectedImageIndex == null || selectedImageIndex != index
  //         ? { border: "2px solid white", margin: 5 }
  //         : { border: "2px solid white", margin: 5 }
  //     }
  //     className="library-cards"
  //   >
  //     <input type="checkbox" className="library-card-image-check" />
  //     <img
  //       src={item.default}
  //       style={{
  //         height: "100%",
  //         width: "100%",
  //         padding: 10,
  //         resize: "contain",
  //       }}
  //       //className="img-fluid image-centers" alt="..."
  //     />
  //   </div>
  // ));

  const filterByCategory = (e, id) => {

    if (filterCategory.includes(id)) {
      const newArr = filterCategory.filter((val) => {
        return val != id;
      });
      setFilterCategory(newArr);
    } else {
      setFilterCategory([...filterCategory, id]);
    }

    setCategoryClicked(true);

  };

  const removeFilter = () => {
    setInventoryListing(InventoryListingForFilter);
    setInOutStock(-1);
    setFilterCategory([]);
    setCategoryClicked(false);
  }

  const hideImagePicker = () => {
    setShowImagePicker(false);
    setMoveType(null);
    setFilterText("Filter");
    setFilterType(null);
    setMoveText("Move");    
  }

  return (
    <>
      <Header highlightedItem={"catalog"} />
      {isLoading && !isLoadMoreLoader ? (
        <div className="text-center">
          <img src={loadingIcon} alt="loading..." />
        </div>
      ) : (
        <div className="content mobile catalog">
          {/* this input will use for uploading photos */}
          <input
            style={{ display: "none" }}
            accept=".png,.jpg,.jpeg"
            ref={inputFile}
            onChange={(value) => handleFileUpload(value, "INPUT")}
            type="file" onClick={() => inputFile.current.value = null}
          />
          <div className="container menu-page">
            <h4 className="text-success mt-5">Catalog</h4>
            <div className="card mt-4 mb-5">
              <div className="container">
                <div className="col-md-12">
                  <div className="row">
                    <div className="col-md-12 col-12">
                      {categoryData.map((item, index) => (
                        <button
                          onClick={(e) => filterByCategory(e, item.key)}
                          style={{}}
                          type="button"
                          className={
                            "btn btn-success wid radius catalog-select mt-3 ml-2" +
                            (filterCategory.includes(item.key) ? " active" : "")
                          }
                        >
                          {item.value}
                        </button>
                      ))}
                      {
                        inOutStock == -1 ? 
                        <></> : 
                        <div className="availability-container">
                          <span className="px-3 availibility-button"><img className="img-fluid pointer" onClick={removeFilter} alt="delete icon" width="17" src={Deleteicon}/> {inOutStock == 1 ? "Available" : "Out of Stock" }</span>
                        </div>
                      }
                    </div>
                    <div className="col-md-2 col-xs-2 cat_filter">
                      <div className="text mobile">
                        {["Secondary"].map((variant, index) => (
                          <SplitButton
                            key={variant}
                            id={`dropdown-split-variants-${variant}`}
                            variant={variant.toLowerCase()}
                            title={"Filter"}
                            className="product-units"
                            onSelect={(id, obj) => onFilterSelection(obj)}
                          >
                            {categoryArrayDataDropdown.map((item, index) => (
                              <Dropdown.Item eventKey={index} active={false}>
                                {item.value}
                              </Dropdown.Item>
                            ))}
                          </SplitButton>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-12 mt-3 mobile-no-padding">
                  <div className="table-responsive desktop_view">
                    <table className="table menu-page">
                      <thead>
                        <tr>
                          <th scope="col">Available</th>
                          <th scope="col" className="ml-3">
                            Items
                          </th>
                          <th scope="col">Price</th>
                          <th scope="col">Deal</th>
                        </tr>
                      </thead>
                      <tbody>
                        {InventoryListing && InventoryListing.length > 0 ? (
                          <>{InventoryListingData}</>
                        ) : (
                          <tr>
                            <td colSpan={4}>No Record Found!!!</td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                  <div className="mobile_view">
                    <div className="col-12 mt-2 border-bottom">
                      <div className="row">
                        <div className="col-3 p-0">
                          <h5 className="font-size mobile ml-2">Avaible</h5>
                        </div>
                        <div className="col-3 p-0">
                          <h5 className="font-size mobile ml-4 m-0">Item</h5>
                        </div>
                        <div className="col-2 p-0">
                          <h5 className="font-size mobile m-0 mbl">Price</h5>
                        </div>
                        <div className="col-2 p-0">
                          <h5 className="font-size mobile m-0">Deal</h5>
                        </div>
                      </div>
                    </div>

                    {InventoryListing && InventoryListing.length > 0 ? (
                      <>{InventoryListingDataMobile}</>
                    ) : (
                      <div className="col-md-12">
                        <p>No Record Found!!!</p>
                      </div>
                    )}
                  </div>
                </div>
                <div className=" col-md-12 text-right  margin-auto mt-4">
                  {loadMoreView()}
                  <button
                    type="button"
                    className="btn render color-66 width mb-5 mt-4"
                    onClick={handleShow}
                  >
                    Add Item
                  </button>
                </div>
              </div>
            </div>

            {deleteBox ? (
              <SweetAlert
                title=""
                confirmBtnText="Delete Inventory"
                confirmBtnBsStyle="success"
                onConfirm={DeleteInventory}
                onCancel={() => setDeleteBox(false)}
              >
                <h6>Are you sure you want to delete this inventory?</h6>
                <p style={{ color: "#F0924E", marginTop: "2rem" }}>
                  {deleteProductName}
                </p>
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
              <Modal.Body>
                {showLoader ? (
                  <>
                    <div className="text-center">
                      <img src={loadingIcon} alt="loading..." />
                    </div>
                  </>
                ) : (
                  <>
                    <div className="container">
                      <div className="row">
                        <h4 className="text-blues">
                          {updateForm === false ? "Add Item" : "Edit Item"}
                        </h4>
                        <img
                          src={Deleteicon}
                          onClick={handleClose}
                          className="modal_closer"
                        />
                      </div>
                      <div className="row">
                        <div className="col-md-12 mt-4">
                          <div className="form-group">
                            <label className="ml-ty">Name of Items</label>
                            <div className="row mobile-no-margin">
                              <input
                                type="text"
                                className="form-control  border-rdius-no"
                                placeholder=""
                                value={product_name}
                                onChange={(product_name) =>
                                  setProductName(product_name.target.value)
                                }
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-12">
                          <div className="form-group">
                            <label className="ml-ty">Brand Name</label>
                            <div className="row mobile-no-margin">
                              <input
                                type="text"
                                className="form-control  border-rdius-no"
                                placeholder=""
                                value={brand_name}
                                onChange={(brand_name) =>
                                  setBrandName(brand_name.target.value)
                                }
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-12">
                          <div className="form-group">
                            <label className="ml-ty">Category</label>
                            <div className="row mobile-no-margin">
                              {["Secondary"].map((variant) => (
                                <SplitButton
                                  key={variant}
                                  id={`dropdown-split-variants-${variant}`}
                                  variant={variant.toLowerCase()}
                                  title={categoryValue}
                                  className="product-unit w-100"
                                  onSelect={(obj, id) =>
                                    onCategorySelection(obj, id)
                                  }
                                >
                                  <Dropdown.Item
                                    eventKey="1"
                                    active={categoryId == "1" ? true : false}
                                  >
                                    Alcohol
                                  </Dropdown.Item>
                                  <Dropdown.Item
                                    eventKey="2"
                                    active={categoryId == "2" ? true : false}
                                  >
                                    Babies
                                  </Dropdown.Item>
                                  <Dropdown.Item
                                    eventKey="3"
                                    active={categoryId == "3" ? true : false}
                                  >
                                    Bakery
                                  </Dropdown.Item>
                                  <Dropdown.Item
                                    eventKey="4"
                                    active={categoryId == "4" ? true : false}
                                  >
                                    Beverages
                                  </Dropdown.Item>
                                  <Dropdown.Item
                                    eventKey="5"
                                    active={categoryId == "5" ? true : false}
                                  >
                                    Canned
                                  </Dropdown.Item>
                                  <Dropdown.Item
                                    eventKey="6"
                                    active={categoryId == "6" ? true : false}
                                  >
                                    Dairy & Eggs
                                  </Dropdown.Item>
                                  <Dropdown.Item
                                    eventKey="7"
                                    active={categoryId == "7" ? true : false}
                                  >
                                    Dry Goods
                                  </Dropdown.Item>
                                  <Dropdown.Item
                                    eventKey="8"
                                    active={categoryId == "8" ? true : false}
                                  >
                                    Frozen
                                  </Dropdown.Item>
                                  <Dropdown.Item
                                    eventKey="9"
                                    active={categoryId == "9" ? true : false}
                                  >
                                    Household
                                  </Dropdown.Item>
                                  <Dropdown.Item
                                    eventKey="10"
                                    active={categoryId == "10" ? true : false}
                                  >
                                    Meats & Seafood
                                  </Dropdown.Item>
                                  <Dropdown.Item
                                    eventKey="11"
                                    active={categoryId == "11" ? true : false}
                                  >
                                    Pantry
                                  </Dropdown.Item>
                                  <Dropdown.Item
                                    eventKey="12"
                                    active={categoryId == "12" ? true : false}
                                  >
                                    Pets
                                  </Dropdown.Item>
                                  <Dropdown.Item
                                    eventKey="13"
                                    active={categoryId == "13" ? true : false}
                                  >
                                    Prepared
                                  </Dropdown.Item>
                                  <Dropdown.Item
                                    eventKey="14"
                                    active={categoryId == "14" ? true : false}
                                  >
                                    Produce
                                  </Dropdown.Item>
                                </SplitButton>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-6">
                          <div className="form-group">
                            <label className="ml-ty pr-15">Unit 1</label>
                            <div className="row pr-15 mobile-no-margin">
                              <input
                                type="text"
                                className="form-control w-25 border-rdius-no"
                                placeholder="#"
                                value={unit1_qty}
                                onChange={(unit1_qty) =>
                                  setUnit1QTY(unit1_qty.target.value)
                                }
                              />
                              {["Secondary"].map((variant) => (
                                <SplitButton
                                  key={variant}
                                  id={`dropdown-split-variants-${variant}`}
                                  variant={variant.toLowerCase()}
                                  title={unit1_type_text}
                                  className="product-unit"
                                  onSelect={(obj, id) =>
                                    handleSelectUnitfirst(obj, id)
                                  }
                                >
                                  <Dropdown.Item
                                    eventKey="1"
                                    active={unit2_type == "1" ? true : false}
                                  >
                                    Ct
                                  </Dropdown.Item>
                                  <Dropdown.Item
                                    eventKey="2"
                                    active={unit1_type == "2" ? true : false}
                                  >
                                    Bunch
                                  </Dropdown.Item>
                                  <Dropdown.Item
                                    eventKey="3"
                                    active={unit1_type == "3" ? true : false}
                                  >
                                    Bag
                                  </Dropdown.Item>
                                  <Dropdown.Item
                                    eventKey="4"
                                    active={unit1_type == "4" ? true : false}
                                  >
                                    Container
                                  </Dropdown.Item>
                                  <Dropdown.Item
                                    eventKey="5"
                                    active={unit1_type == "5" ? true : false}
                                  >
                                    lb
                                  </Dropdown.Item>
                                  <Dropdown.Item
                                    eventKey="6"
                                    active={unit1_type == "6" ? true : false}
                                  >
                                    oz
                                  </Dropdown.Item>
                                </SplitButton>
                              ))}
                            </div>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-group">
                            <label className="ml-ty pl-15">Unit 2</label>
                            <div className="row pl-15 mobile-no-margin">
                              <input
                                type="email"
                                className="form-control w-25 border-rdius-no"
                                placeholder="#"
                                value={unit2_qty}
                                onChange={(unit2_qty) =>
                                  setUnit2QTY(unit2_qty.target.value)
                                }
                              />
                              {["Secondary"].map((variant) => (
                                <SplitButton
                                  key={variant}
                                  id={`dropdown-split-variants-${variant}`}
                                  variant={variant.toLowerCase()}
                                  title={unit2_type_text}
                                  className="product-unit"
                                  onSelect={(obj, id) =>
                                    handleSelectUnitsecound(obj, id)
                                  }
                                >
                                  <Dropdown.Item
                                    eventKey="5"
                                    active={unit2_type == "5" ? true : false}
                                  >
                                    lb
                                  </Dropdown.Item>
                                  <Dropdown.Item
                                    eventKey="6"
                                    active={unit2_type == "6" ? true : false}
                                  >
                                    oz
                                  </Dropdown.Item>
                                  <Dropdown.Item
                                    eventKey="7"
                                    active={unit2_type == "7" ? true : false}
                                  >
                                    gal
                                  </Dropdown.Item>
                                  <Dropdown.Item
                                    eventKey="8"
                                    active={unit2_type == "8" ? true : false}
                                  >
                                    L
                                  </Dropdown.Item>
                                  <Dropdown.Item
                                    eventKey="9"
                                    active={unit2_type == "9" ? true : false}
                                  >
                                    pint
                                  </Dropdown.Item>
                                  <Dropdown.Item
                                    eventKey="10"
                                    active={unit2_type == "10" ? true : false}
                                  >
                                    quart
                                  </Dropdown.Item>
                                </SplitButton>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-6">
                          <div className="form-group">
                            <label className="ml-ty pr-15">price</label>
                            <div className="row pr-15 mobile-no-margin">
                              <input
                                type="text"
                                className="form-control"
                                id="exampleInputEmail1"
                                placeholder="$"
                                value={price}
                                onChange={(price) =>
                                  setPrice(price.target.value)
                                }
                              />
                            </div>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-group">
                            <label className="border-bottom ml-ty">Deal</label>
                            <div className="row pl-15">
                              <input
                                type="text"
                                className="form-control w-40 mr-2 border-rdius-no"
                                placeholder="#"
                                value={deal_quantity}
                                onChange={(deal_quantity) =>
                                  setDealQuantity(deal_quantity.target.value)
                                }
                              />
                              <p className="w-20 middle_word">for</p>
                              <input
                                type="text"
                                className="form-control w-40 ml-2 border-rdius-no"
                                placeholder=""
                                value={deal_price}
                                onChange={(deal_price) =>
                                  setDealPrice(deal_price.target.value)
                                }
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <p className="text-dark">
                          {price != ""
                            ? "Price per unit: $" + price + "/lb"
                            : ""}
                        </p>
                      </div>
                      <div className="row">
                        <div className="col-md-6 col-6">
                          <div className="row mobile-no-margin">
                            <p className="text-dark">Availability</p>
                          </div>
                          <div className="row mobile-no-margin">
                            <label className="containers popup-radio-wrapper">
                              In Stock
                              <input
                                type="radio"
                                id="in_stock"
                                name="in_stock"
                                value="1"
                                checked={availability == 1}
                                onClick={() => setAvailability(1)}
                              />
                              <span className="checkmark"></span>
                            </label>
                          </div>
                          <div className="row mobile-no-margin">
                            <label className="containers popup-radio-wrapper">
                              Out of Stock
                              <input
                                type="radio"
                                id="out_of_stock"
                                name="out_of_stock"
                                value="0"
                                checked={availability != 1}
                                onClick={() => setAvailability(0)}
                              />
                              <span className="checkmark"></span>
                            </label>
                          </div>
                        </div>
                        <div
                          onClick={() => setShowImagePicker(true)}
                          className="col-md-6 col-6"
                        >
                          <p className="text-dark">Add Photo</p>
                          <img
                            src={selectedImage ? selectedImage : camera}
                            className="img-fluid"
                            alt="..."
                          />
                        </div>
                      </div>
                      <div className="row float-right mt-4 sm-mr-2">
                        <button
                          type="button"
                          className="btn render color-66 w-190"
                          onClick={(e) => [
                            updateForm === false
                              ? addInventory(e)
                              : editInventory(e),
                          ]}
                        >
                          {updateForm === false ? "Post" : "Save"}
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </Modal.Body>
            </Modal>

            {/* Imagepicker modal */}

            <Modal
              show={showImagePicker}
              onHide={() => hideImagePicker()}
              backdrop="static"
              keyboard={false}
              className="model-large"
            >
              <div style={{ height: 50 }} className="row">
                <img
                  src={Deleteicon}
                  onClick={() => hideImagePicker()}
                  className="modal_closer"
                />
              </div>
              <Modal.Body>
                <section id="tabs" className="project-tab">
                  <div className="col-md-12">
                    <div className="bg-lightgreyc">
                      <Nav className="nav nav-tabs nav-fill" id="nav-tab">
                        <div onClick={() => setUpload(true)}>
                          <Nav.Link
                            eventKey="uploads"
                            className="nav-item tabs-popup-width"
                          >
                            Uploads
                          </Nav.Link>
                        </div>
                        <div onClick={() => setUpload(false)}>
                          <Nav.Link
                            eventKey="stock"
                            className="nav-item tabs-popup-widths"
                          >
                            Stock Photos
                          </Nav.Link>
                        </div>
                      </Nav>
                    </div>
                    {isUploads ? (
                      <Tab.Container id="tabs" defaultActiveKey="uploads">
                        <Tab.Content
                          id="nav-tabContent"
                          className="tab-content"
                        >
                          <Tab.Pane eventKey="uploads" className="card">
                            <div className="container">
                              <div className="col-md-12 mt-4">

                                <div className="desktop_view">

                                    <div className="row">

                                      <div className="col-md-2">
                                        <button
                                          onClick={onImageUploadingPress}
                                          type="button"
                                          className="btn tabscc"
                                        >
                                          New
                                        </button>
                                      </div>
                                      <div
                                        onClick={onImageDeletePress}
                                        className="col-md-2 text-center pt-2 pb-2"
                                      >
                                        {
                                          <img
                                            src={trash}
                                            className="img-fluid delete-catalog-img pointer"
                                            alt="..."
                                          />
                                        }
                                      </div>
                                      <div className="col-md-3">
                                        <div className="">
                                          <div className="row pl-15">
                                            {["Secondary"].map((variant) => (
                                              <SplitButton
                                                key={variant}
                                                id={`dropdown-split-variants-${variant}`}
                                                variant={variant.toLowerCase()}
                                                title={filter_text}
                                                className="product-uni"
                                                onSelect={(obj, id) =>
                                                  handleFilterText(obj, id)
                                                }
                                              >
                                                <Dropdown.Item
                                                  eventKey="1"
                                                  active={
                                                    filterType == "1" ? true : false
                                                  }
                                                >
                                                  Alcohol
                                                </Dropdown.Item>
                                                <Dropdown.Item
                                                  eventKey="2"
                                                  active={
                                                    filterType == "2" ? true : false
                                                  }
                                                >
                                                  Babies
                                                </Dropdown.Item>
                                                <Dropdown.Item
                                                  eventKey="3"
                                                  active={
                                                    filterType == "3" ? true : false
                                                  }
                                                >
                                                  Bakery
                                                </Dropdown.Item>
                                                <Dropdown.Item
                                                  eventKey="4"
                                                  active={
                                                    filterType == "4" ? true : false
                                                  }
                                                >
                                                  Beverages
                                                </Dropdown.Item>
                                                <Dropdown.Item
                                                  eventKey="5"
                                                  active={
                                                    filterType == "5" ? true : false
                                                  }
                                                >
                                                  Canned
                                                </Dropdown.Item>
                                                <Dropdown.Item
                                                  eventKey="6"
                                                  active={
                                                    filterType == "6" ? true : false
                                                  }
                                                >
                                                  {"Dairy & Eggs"}
                                                </Dropdown.Item>
                                                <Dropdown.Item
                                                  eventKey="7"
                                                  active={
                                                    filterType == "7" ? true : false
                                                  }
                                                >
                                                  Dry Goods
                                                </Dropdown.Item>
                                                <Dropdown.Item
                                                  eventKey="8"
                                                  active={
                                                    filterType == "8" ? true : false
                                                  }
                                                >
                                                  Frozen
                                                </Dropdown.Item>
                                                <Dropdown.Item
                                                  eventKey="9"
                                                  active={
                                                    filterType == "9" ? true : false
                                                  }
                                                >
                                                  HouseHold
                                                </Dropdown.Item>
                                                <Dropdown.Item
                                                  eventKey="10"
                                                  active={
                                                    filterType == "10" ? true : false
                                                  }
                                                >
                                                  Meats & Seafood
                                                </Dropdown.Item>
                                                <Dropdown.Item
                                                  eventKey="11"
                                                  active={
                                                    filterType == "11" ? true : false
                                                  }
                                                >
                                                  Pantry
                                                </Dropdown.Item> 
                                                <Dropdown.Item
                                                  eventKey="12"
                                                  active={
                                                    filterType == "12" ? true : false
                                                  }
                                                >
                                                  Pets
                                                </Dropdown.Item> 
                                                <Dropdown.Item
                                                  eventKey="13"
                                                  active={
                                                    filterType == "13" ? true : false
                                                  }
                                                >
                                                  Prepared
                                                </Dropdown.Item> 
                                                <Dropdown.Item
                                                  eventKey="14"
                                                  active={
                                                    filterType == "14" ? true : false
                                                  }
                                                >
                                                  Produce
                                                </Dropdown.Item>                                                                                                                                                                                                                                                
                                              </SplitButton>
                                            ))}
                                          </div>
                                        </div>
                                      </div>
                                      <div className="col-md-3">
                                        <div className="">
                                          {["Secondary"].map((variant) => (
                                            <SplitButton
                                              key={variant}
                                              id={`dropdown-split-variants-${variant}`}
                                              variant={variant.toLowerCase()}
                                              title={move_text}
                                              className="product-uni"
                                              onSelect={(obj, id) =>
                                                handleMoveText(obj, id)
                                              }
                                            >
                                              <Dropdown.Item
                                                eventKey="1"
                                                active={
                                                  moveType == "1" ? true : false
                                                }
                                              >
                                                Alcohol
                                              </Dropdown.Item>
                                              <Dropdown.Item
                                                eventKey="2"
                                                active={
                                                  moveType == "2" ? true : false
                                                }
                                              >
                                                Babies
                                              </Dropdown.Item>
                                              <Dropdown.Item
                                                eventKey="3"
                                                active={
                                                  moveType == "3" ? true : false
                                                }
                                              >
                                                Bakery
                                              </Dropdown.Item>
                                              <Dropdown.Item
                                                eventKey="4"
                                                active={
                                                  moveType == "4" ? true : false
                                                }
                                              >
                                                Beverages
                                              </Dropdown.Item>
                                              <Dropdown.Item
                                                eventKey="5"
                                                active={
                                                  moveType == "5" ? true : false
                                                }
                                              >
                                                Canned
                                              </Dropdown.Item>
                                              <Dropdown.Item
                                                eventKey="6"
                                                active={
                                                  moveType == "6" ? true : false
                                                }
                                              >
                                                {"Dairy & Eggs"}
                                              </Dropdown.Item>
                                              <Dropdown.Item
                                                eventKey="7"
                                                active={
                                                  moveType == "7" ? true : false
                                                }
                                              >
                                                Dry Goods
                                              </Dropdown.Item>
                                              <Dropdown.Item
                                                eventKey="8"
                                                active={
                                                  moveType == "8" ? true : false
                                                }
                                              >
                                                Frozen
                                              </Dropdown.Item>
                                              <Dropdown.Item
                                                eventKey="9"
                                                active={
                                                  moveType == "9" ? true : false
                                                }
                                              >
                                                HouseHold
                                              </Dropdown.Item>
                                              <Dropdown.Item
                                                eventKey="10"
                                                active={
                                                  filterType == "10" ? true : false
                                                }
                                              >
                                                Meats & Seafood
                                              </Dropdown.Item>
                                              <Dropdown.Item
                                                eventKey="11"
                                                active={
                                                  filterType == "11" ? true : false
                                                }
                                              >
                                                Pantry
                                              </Dropdown.Item>
                                              <Dropdown.Item
                                                eventKey="12"
                                                active={
                                                  filterType == "12" ? true : false
                                                }
                                              >
                                                Pets
                                              </Dropdown.Item>
                                              <Dropdown.Item
                                                eventKey="13"
                                                active={
                                                  filterType == "13" ? true : false
                                                }
                                              >
                                                Prepared
                                              </Dropdown.Item>
                                              <Dropdown.Item
                                                eventKey="14"
                                                active={
                                                  filterType == "14" ? true : false
                                                }
                                              >
                                                Produce
                                              </Dropdown.Item>                                              
                                            </SplitButton>
                                          ))}
                                        </div>
                                      </div>
                                      <div className="col-md-2">
                                        <button
                                          onClick={onInsertPress}
                                          type="button"
                                          className="btn tabsccsd float-right"
                                        >
                                          Insert
                                        </button>
                                      </div>
                                    </div>

                                </div>


                                <div className="mobile_view">

                                  <div className="row">

                                        <div className="col-xs-2">
                                            <button
                                              onClick={onImageUploadingPress}
                                              type="button"
                                              className="btn tabscc"
                                            >
                                              New
                                            </button>
                                          </div>
                                          <div
                                            onClick={onImageDeletePress}
                                            className="col-xs-1 text-center pt-2 pb-2"
                                          >
                                            {
                                              <img
                                                src={trash}
                                                className="img-fluid delete-catalog-img pointer"
                                                alt="..."
                                              />
                                            }
                                          </div>
                                          <div className="col-xs-2">
                                            <div className="">
                                              <div className="row pl-15">
                                                {["Secondary"].map((variant) => (
                                                  <SplitButton
                                                    key={variant}
                                                    id={`dropdown-split-variants-${variant}`}
                                                    variant={variant.toLowerCase()}
                                                    title={filter_text}
                                                    className="product-uni"
                                                    onSelect={(obj, id) =>
                                                      handleFilterText(obj, id)
                                                    }
                                                  >
                                                    <Dropdown.Item
                                                      eventKey="1"
                                                      active={
                                                        filterType == "1" ? true : false
                                                      }
                                                    >
                                                      Alcohol
                                                    </Dropdown.Item>
                                                    <Dropdown.Item
                                                      eventKey="2"
                                                      active={
                                                        filterType == "2" ? true : false
                                                      }
                                                    >
                                                      Babies
                                                    </Dropdown.Item>
                                                    <Dropdown.Item
                                                      eventKey="3"
                                                      active={
                                                        filterType == "3" ? true : false
                                                      }
                                                    >
                                                      Bakery
                                                    </Dropdown.Item>
                                                    <Dropdown.Item
                                                      eventKey="4"
                                                      active={
                                                        filterType == "4" ? true : false
                                                      }
                                                    >
                                                      Beverages
                                                    </Dropdown.Item>
                                                    <Dropdown.Item
                                                      eventKey="5"
                                                      active={
                                                        filterType == "5" ? true : false
                                                      }
                                                    >
                                                      Canned
                                                    </Dropdown.Item>
                                                    <Dropdown.Item
                                                      eventKey="6"
                                                      active={
                                                        filterType == "6" ? true : false
                                                      }
                                                    >
                                                      {"Dairy & Eggs"}
                                                    </Dropdown.Item>
                                                    <Dropdown.Item
                                                      eventKey="7"
                                                      active={
                                                        filterType == "7" ? true : false
                                                      }
                                                    >
                                                      Dry Goods
                                                    </Dropdown.Item>
                                                    <Dropdown.Item
                                                      eventKey="8"
                                                      active={
                                                        filterType == "8" ? true : false
                                                      }
                                                    >
                                                      Frozen
                                                    </Dropdown.Item>
                                                    <Dropdown.Item
                                                      eventKey="9"
                                                      active={
                                                        filterType == "9" ? true : false
                                                      }
                                                    >
                                                      HouseHold
                                                    </Dropdown.Item>
                                                    <Dropdown.Item
                                                      eventKey="10"
                                                      active={
                                                        filterType == "10" ? true : false
                                                      }
                                                    >
                                                      Meats & Seafood
                                                    </Dropdown.Item>
                                                    <Dropdown.Item
                                                      eventKey="11"
                                                      active={
                                                        filterType == "11" ? true : false
                                                      }
                                                    >
                                                      Pantry
                                                    </Dropdown.Item> 
                                                    <Dropdown.Item
                                                      eventKey="12"
                                                      active={
                                                        filterType == "12" ? true : false
                                                      }
                                                    >
                                                      Pets
                                                    </Dropdown.Item> 
                                                    <Dropdown.Item
                                                      eventKey="13"
                                                      active={
                                                        filterType == "13" ? true : false
                                                      }
                                                    >
                                                      Prepared
                                                    </Dropdown.Item> 
                                                    <Dropdown.Item
                                                      eventKey="14"
                                                      active={
                                                        filterType == "14" ? true : false
                                                      }
                                                    >
                                                      Produce
                                                    </Dropdown.Item>                                                    
                                                  </SplitButton>
                                                ))}
                                              </div>
                                            </div>
                                          </div>

                                    
                                      
                                      <div className="col-xs-2">
                                        <div className="">
                                          {["Secondary"].map((variant) => (
                                            <SplitButton
                                              key={variant}
                                              id={`dropdown-split-variants-${variant}`}
                                              variant={variant.toLowerCase()}
                                              title={move_text}
                                              className="product-uni mobile-move"
                                              onSelect={(obj, id) =>
                                                handleMoveText(obj, id)
                                              }
                                            >
                                              <Dropdown.Item
                                                eventKey="1"
                                                active={
                                                  moveType == "1" ? true : false
                                                }
                                              >
                                                Alcohol
                                              </Dropdown.Item>
                                              <Dropdown.Item
                                                eventKey="2"
                                                active={
                                                  moveType == "2" ? true : false
                                                }
                                              >
                                                Babies
                                              </Dropdown.Item>
                                              <Dropdown.Item
                                                eventKey="3"
                                                active={
                                                  moveType == "3" ? true : false
                                                }
                                              >
                                                Bakery
                                              </Dropdown.Item>
                                              <Dropdown.Item
                                                eventKey="4"
                                                active={
                                                  moveType == "4" ? true : false
                                                }
                                              >
                                                Beverages
                                              </Dropdown.Item>
                                              <Dropdown.Item
                                                eventKey="5"
                                                active={
                                                  moveType == "5" ? true : false
                                                }
                                              >
                                                Canned
                                              </Dropdown.Item>
                                              <Dropdown.Item
                                                eventKey="6"
                                                active={
                                                  moveType == "6" ? true : false
                                                }
                                              >
                                                {"Dairy & Eggs"}
                                              </Dropdown.Item>
                                              <Dropdown.Item
                                                eventKey="7"
                                                active={
                                                  moveType == "7" ? true : false
                                                }
                                              >
                                                Dry Goods
                                              </Dropdown.Item>
                                              <Dropdown.Item
                                                eventKey="8"
                                                active={
                                                  moveType == "8" ? true : false
                                                }
                                              >
                                                Frozen
                                              </Dropdown.Item>
                                              <Dropdown.Item
                                                eventKey="9"
                                                active={
                                                  moveType == "9" ? true : false
                                                }
                                              >
                                                HouseHold
                                              </Dropdown.Item>
                                              <Dropdown.Item
                                                eventKey="10"
                                                active={
                                                  filterType == "10" ? true : false
                                                }
                                              >
                                                Meats & Seafood
                                              </Dropdown.Item>
                                              <Dropdown.Item
                                                eventKey="11"
                                                active={
                                                  filterType == "11" ? true : false
                                                }
                                              >
                                                Pantry
                                              </Dropdown.Item> 
                                              <Dropdown.Item
                                                eventKey="12"
                                                active={
                                                  filterType == "12" ? true : false
                                                }
                                              >
                                                Pets
                                              </Dropdown.Item> 
                                              <Dropdown.Item
                                                eventKey="13"
                                                active={
                                                  filterType == "13" ? true : false
                                                }
                                              >
                                                Prepared
                                              </Dropdown.Item> 
                                              <Dropdown.Item
                                                eventKey="14"
                                                active={
                                                  filterType == "14" ? true : false
                                                }
                                              >
                                                Produce
                                              </Dropdown.Item>                                              
                                            </SplitButton>
                                          ))}
                                        </div>
                                      </div>
                                      <div className="col-xs-2">
                                        <button
                                          onClick={onInsertPress}
                                          type="button"
                                          className="btn tabsccsd mobile-move float-right"
                                        >
                                          Insert
                                        </button>
                                      </div>
                                    </div>

                                  </div>
                                
                              </div>
                              <div className="col-md-12 mb-3 mt-3">
                                <div className="row">{<ImageLibraryView/>}</div>
                              </div>
                            </div>
                          </Tab.Pane>
                          <Tab.Pane
                            eventKey="stock"
                            className="card"
                          ></Tab.Pane>
                        </Tab.Content>
                      </Tab.Container>
                    ) : (
                      <Tab.Container id="tabs" defaultActiveKey="uploads">
                        <Tab.Content
                          id="nav-tabContent"
                          className="tab-content"
                        >
                          <Tab.Pane eventKey="uploads" className="card">
                            <div className="container">
                              <div className="col-md-12 mt-4">

                                <div className="desktop_view">

                                    <div className="row">
                                      
                                      <div className="col-md-2">
                                        <button
                                          onClick={onInsertStock}
                                          type="button"
                                          className="btn tabsccsd float-right"
                                        >
                                          Insert
                                        </button>
                                      </div>
                                    </div>

                                </div>


                                <div className="mobile_view">

                                    <div className="row">
                                      <div className="col-xs-2">
                                        <button
                                          onClick={onInsertStock}
                                          type="button"
                                          className="bh btn tabsccsd float-right"
                                        >
                                          Insert
                                        </button>
                                      </div>
                                    </div>

                                </div>

                                
                              </div>
                              <div className="col-md-12 mb-3 mt-3">
                                <div className="row hh">
                                  {<ImageLibraryViewShared/>}
                                </div>
                              </div>
                            </div>
                          </Tab.Pane>
                          <Tab.Pane
                            eventKey="stock"
                            className="card"
                          ></Tab.Pane>
                        </Tab.Content>
                      </Tab.Container>
                    )}
                  </div>
                </section>
              </Modal.Body>
            </Modal>
          </div>
        </div>
      )}
    </>
  );
};

export default Inventory;
