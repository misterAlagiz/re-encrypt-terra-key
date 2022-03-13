import CryptoJS from 'crypto-js';

const keySize = 256;
const iterations = 100;

// data to be filled
const initialEncryptedTerraKey = "***";
const initialPassword = "***";
const publicWalletAddress = "***";
const walletName = "wallet1";
const newPassword = "newPassword1!";

const decrypt = (terraPrivateKey, password) => {
  try {
    console.log("started decrypting");

    const salt = CryptoJS.enc.Hex.parse(terraPrivateKey.substr(0, 32));
    const iv = CryptoJS.enc.Hex.parse(terraPrivateKey.substr(32, 32));
    const encrypted = terraPrivateKey.substring(64);

    const key = CryptoJS.PBKDF2(password, salt, {
      keySize: keySize / 32,
      iterations: iterations,
    });

    const decrypted = CryptoJS.AES.decrypt(encrypted, key, {
      iv: iv,
      padding: CryptoJS.pad.Pkcs7,
      mode: CryptoJS.mode.CBC,
    }).toString(CryptoJS.enc.Utf8);

    console.log("decrypting successful!");

    return decrypted;
  } catch (error) {
    console.log("error while decrypting:", error);

    throw ("error while decrypting:", error);
  }
}

const encrypt = (message, password) => {
  try {
    console.log("started encrypting");

    const salt = CryptoJS.lib.WordArray.random(128 / 8);

    const key = CryptoJS.PBKDF2(password, salt, {
      keySize: keySize / 32,
      iterations: iterations,
    })

    const iv = CryptoJS.lib.WordArray.random(128 / 8);

    const encrypted = CryptoJS.AES.encrypt(message, key, {
      iv: iv,
      padding: CryptoJS.pad.Pkcs7,
      mode: CryptoJS.mode.CBC,
    })

    const encryptedPrivateKey = salt.toString() + iv.toString() + encrypted.toString();

    console.log("encrypting successful!");

    return encryptedPrivateKey;
  } catch (error) {
    console.log("error while encrypting:", error);

    throw ("error while encrypting:", error);
  }
}

try {
  const wrappedKey = JSON.parse(
    Buffer.from(
      initialEncryptedTerraKey,
      "base64"
    ).toString("utf8")
  );
  const initialDecryptedTerraKey = decrypt(wrappedKey.encrypted_key, initialPassword);
  const newEncryptedTerraKey = encrypt(initialDecryptedTerraKey, newPassword);
  const base64Key = Buffer.from(`{
    "name":"${walletName}",
    "address":"${publicWalletAddress}",
    "encrypted_key":"${newEncryptedTerraKey}"
  }`).toString('base64');

  console.log("\nyour new private key:", base64Key, "\nnew password:", newPassword);
} catch (error) {
  console.log("error:", error);
}
