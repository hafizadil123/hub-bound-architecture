import React, { createContext, useState } from "react";
import AsyncStorage from "@react-native-community/async-storage";

const DEFAULT_BUSINESS_ID = "1";
const DEFAULT_APP_CONTEXT = "appContext";

// const getInitalBusinessId = async () => {
//   let data = await AsyncStorage.getItem("appContext");
//   //alert(data);
//   if (data) {
//     //return JSON.stringify(data);
//     return data;
//   } else {
//     return "1";
//   }
// };
export const BusinessAppContext = createContext({
  setBusinessId: () => {},
  businessId: DEFAULT_BUSINESS_ID,
  initializeBusinessId: () => {},
});

const BusinessContextProvider = ({ children }) => {
  const [businessId, setBusinessId] = useState(DEFAULT_BUSINESS_ID);

  const setBusinessIdIn = async (businessId) => {
    setBusinessId(businessId);
    await AsyncStorage.setItem(DEFAULT_APP_CONTEXT, businessId);
  };
  return (
    <BusinessAppContext.Provider
      value={{
        setBusinessId: setBusinessIdIn,
        businessId,
      }}
    >
      {children}
    </BusinessAppContext.Provider>
  );
};
export default BusinessContextProvider;
