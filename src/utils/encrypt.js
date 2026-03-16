// encrypt.js for encrypt phoneNumber using crypto-js
import CryptoJS from "crypto-js";

export const encryptPhoneNumber = (phoneNumber) => {
  const encryptedPhoneNumber = CryptoJS.AES.encrypt(
    phoneNumber,
    process.env.ENCRYPT_KEY
  ).toString();
  return encryptedPhoneNumber;
};

export const decryptPhoneNumber = (encryptedPhoneNumber) => {
  const decryptedPhoneNumber = CryptoJS.AES.decrypt(
    encryptedPhoneNumber,
    process.env.ENCRYPT_KEY
  ).toString(CryptoJS.enc.Utf8);
  return decryptedPhoneNumber;
};
