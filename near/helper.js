import Cryptr from "cryptr";
import { formatNearAmount } from "near-api-js/lib/utils/format";
import environment from "./config";
const key = process.env.MYLIKITA_SECRET||"MYLIKITA_001_QWERTYUIOP";
// import environment from "./config";
const nearEnv = environment("testnet");
export async function accountBalance() {
  return formatNearAmount(
    (await window.walletConnection.account().getAccountBalance()).total,
    2
  );
}

export async function getAccountId() {
  return window.walletConnection.getAccountId();
}

export function login() {
  window.walletConnection.requestSignIn(nearEnv.contractName);
}

export function logout() {
  window.walletConnection.signOut();
  window.location.reload();
}

const cryptr = new Cryptr(key);

export const encryptedText = (text) => {
  return cryptr.encrypt(text);
};

export const decryptedText = (hash) => {
  return cryptr.decrypt(hash);
};
