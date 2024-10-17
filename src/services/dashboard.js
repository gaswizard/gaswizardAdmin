import { BaseUrl } from "../Constent/baseUrl";
import * as opsService from "./Ops";

const dashboardData = async (data, token) => {
  let result = await opsService.getData(
    BaseUrl + "/dashboard-data",
    data,
    token
  );
  return result;
};
const userData = async (data, token) => {
  let result = await opsService.getData(BaseUrl + "/user-data", data, token);
  return result;
};
const signUpUserData = async (data, token) => {
  let result = await opsService.getData(
    BaseUrl + "/sign-up-user-data",
    data,
    token
  );
  return result;
};

const manualCron = async (data, token) => {

  let result = await opsService.postdata(BaseUrl + "/manual-cron-hit", data, token);
  return result;
};

export { dashboardData, userData, signUpUserData,manualCron };
