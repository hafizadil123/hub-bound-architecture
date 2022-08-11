import firebase from "../config/firebase-config";

const socialMediaAuth = async (provider) => {
  return await firebase
    .auth()
    .signInWithPopup(provider)
    .then((res) => {
      return res.user;
    })
    .catch((err) => {
      return err;
    });
};

export default socialMediaAuth;
