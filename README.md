# re-encrypt-terra-key

## description
this allows to reencrypt terra private key with a new password.

potentially helps to solve "invalid hex string" error when importing the key.

## prerequisites
* the following installed of recent versions: 
  * node with npm

## setup
* clone the repo
* run 
  ```bash
  npm install
  ```
* set variables in app.js
  * must be set:
    * **initialEncryptedTerraKey** - initial exported terra private key
    * **initialPassword** - initial terra wallet password 
    * **publicWalletAddress** - public wallet address (starts with "terra1")
  * optionally can be set 
    * **walletName** - name for the imported wallet, defaults to "wallet1"
    * **newPassword** - new terra wallet password, defaults to "newPassword1!"

## execution
  ```bash
  npm start
  ```
* console should print the new private key importable to terra and new password

## import wallet to terra station
* use printed key in the console as private key
* use newPassword as password
