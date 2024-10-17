import { BaseUrl } from "../Constent/baseUrl";
import * as opsService from "./Ops";

const getTransaction = async (data, token) => {
  let result = await opsService.getData(BaseUrl + "/get-transaction", data, token);

  return result;
};
const bonusAddUpdate = async (data, token) => {
  let result = await opsService.postdata(BaseUrl + "/bonus-add-update", data, token);

  return result;
};
const getReferralData = async (data, token) => {
  let result = await opsService.getData(BaseUrl + "/get-referral", data, token);

  return result;
};
const manualEntryAdd = async (data, token) => {
  let result = await opsService.postdata(BaseUrl + "/manual-entry-add", data, token);

  return result;
};
const getmanualEntry = async (data, token) => {
  let result = await opsService.getData(BaseUrl + "/get-manual-entry", data, token);

  return result;
};


export { getTransaction,bonusAddUpdate,manualEntryAdd,getmanualEntry,getReferralData };
