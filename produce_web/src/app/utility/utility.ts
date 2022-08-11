import { NotificationManager } from "react-notifications";
import S3 from "react-aws-s3";
import imageCompression from "browser-image-compression";
import "react-notifications/lib/notifications.css";
const config = {
  bucketName: "produceweb",
  //bucketName: "productwebreact",
  //dirName: dirName /* optional */,
  region: "us-east-2",
  //accessKeyId: "AKIASQHZU7O5WGTAVH4F",
  //secretAccessKey: "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",
  accessKeyId: "AKIASQHZU7O5UCZXOKX4",
  secretAccessKey: "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",
};
class Utils {
  static validateEmail = (email) => {
    var pattern = new RegExp(
      /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i
    );
    return pattern.test(email);
  };
  static passCheck = (password) => {
    const upperCase = new RegExp("(?=.*[A-Z])");
    const lowerCase = new RegExp("(?=.*[a-z])");
    const number = new RegExp("(?=.*[0-9])");
    const eightChar = new RegExp("(?=.{8,})");
    if (
      eightChar.test(password) &&
      upperCase.test(password) &&
      lowerCase.test(password) &&
      number.test(password)
    )
      return true;
    else return false;
  };
  static addressCheck = (address) => {
    const data = new RegExp("([a-zA-Z0-9s,'-]*$)");
    return data.test(address);
  };

  static showToast(type, message, time = 2000) {
    switch (type) {
      case "info":
        NotificationManager.info(message, "", time);
        break;
      case "success":
        NotificationManager.success(message, "", time);
        break;
      case "warning":
        NotificationManager.warning(message, "", time);
        break;
      case "error":
        NotificationManager.error(message, "", time);
        break;
      default:
        NotificationManager.error(
          "Some error occured, please check your intenet connection or try again later!",
          "",
          time
        );
        break;
    }
  }

  static isSignedIn = (data) => {
    return new Promise((resolve, reject) => {
      if (!Utils.isObjEmpty(data)) {
        resolve(true);
      } else {
        resolve(false);
      }
    });
  };

  static async getCompressedUrl(files) {
    const options = {
      maxSizeMB: 2,
      maxWidthOrHeight: 720,
      useWebWorker: true,
    };
    try {
      const compressedFile = await imageCompression(files[0], options);
      //console.log(`getCompressedUrl compressedFile `, compressedFile); // smaller than maxSizeMB
      return compressedFile;
    } catch (error) {
      // console.log(error);
      return null;
    }
  }
  static getTimeStamp = () => {
    return new Date().getTime() + "_image.png";
  };
  //   [
  //     {
  //         "AllowedHeaders": [
  //             "*"
  //         ],
  //         "AllowedMethods": [
  //             "GET",
  //             "PUT",
  //             "POST",
  //             "DELETE"
  //         ],
  //         "AllowedOrigins": [
  //             "http://localhost:3000",
  //             "http://3.141.222.59:3000"
  //         ],
  //         "ExposeHeaders": []
  //     },
  //     {
  //         "AllowedHeaders": [
  //             "*"
  //         ],
  //         "AllowedMethods": [
  //             "GET",
  //             "PUT",
  //             "POST",
  //             "DELETE"
  //         ],
  //         "AllowedOrigins": [
  //             "http://localhost:3000",
  //             "http://3.141.222.59:3000"
  //         ],
  //         "ExposeHeaders": []
  //     },
  //     {
  //         "AllowedHeaders": [],
  //         "AllowedMethods": [
  //             "GET",
  //             "PUT",
  //             "POST",
  //             "DELETE"
  //         ],
  //         "AllowedOrigins": [
  //             "*"
  //         ],
  //         "ExposeHeaders": []
  //     }
  // ]
  // accessKeyId:'AKIASQHZU7O5WGTAVH4F',
  // secretAccessKey:'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'
  //user arn:'arn:aws:iam::172322257851:user/developer_will'

  static uploadImage = (file, dirName, newFileName) => {
    // const config = {
    //   bucketName: "basepop",
    //   dirName: dirName /* optional */,
    //   region: "us-west-2",
    //   accessKeyId: "AKIA4ZTBXMI4VNZ7JGVL",
    //   secretAccessKey: "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",
    // };
    const ReactS3Client = new S3(config);
    return new Promise((resolve, reject) => {
      ReactS3Client.uploadFile(file, newFileName)
        .then((data) => {
          resolve(data);
          console.log("uploadImage.data", data);
        })
        .catch((err) => {
          console.error("uploadImage.error", JSON.stringify(err));
          resolve(err);
        });
    });
  };
  static deleteImage = (fileName) => {
    const ReactS3Client = new S3(config);
    return new Promise((resolve, reject) => {
      ReactS3Client.deleteFile(fileName)
        .then((data) => {
          resolve(data);
          console.log("deletedImage.data", data);
        })
        .catch((err) => {
          console.error("deletedImage.error", JSON.stringify(err));
          resolve(err);
        });
    });
  };
  static isEmpty(item_to_check) {
    if (
      item_to_check === null ||
      item_to_check === undefined ||
      item_to_check === "" ||
      item_to_check === "null"
    )
      return true;
    else return false;
  }

  static isEmptyString(item_to_check) {
    if (item_to_check === "") return true;
    else return false;
  }
  static isObjEmpty(obj) {
    for (var key in obj) {
      if (obj.hasOwnProperty(key)) return false;
    }
    return true;
  }
}

export default Utils;
