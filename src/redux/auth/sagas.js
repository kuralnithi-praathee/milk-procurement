import authActions from "./actions";
import commonActions from "../common/actions";
import { takeEvery, call, all, put, delay, select } from "redux-saga/effects";
import axios from "axios";
import Cookies from "js-cookie";


const authSagas = function* () {
  yield all([

    yield takeEvery(authActions.CANDIDATE_TOKEN_VERIFY, candidateTokenVerify),
    yield takeEvery(authActions.USER_LOGOUT, userLogout),
    yield takeEvery(authActions.USER_LOGIN, userLogin)
  ]);
};


const userLogout = function* (data) {

  try {
    let token = Cookies.get("mhet_cnd_token");
    if (token) {
      const result = yield call(() =>
        axios.post(`${API_URL}/candidate/logout`, { token: token })
      );

        Cookies.remove("mhet_cnd_email");
  Cookies.remove("mhet_cnd_email_verified");
  Cookies.remove("mhet_cnd_mobileno");
  Cookies.remove("mhet_cnd_mobileno_otp");
  Cookies.remove("mhet_cnd_mobileno_verified");
  Cookies.remove("mhet_cnd_project");
  Cookies.remove("mhet_cnd_token");
  Cookies.remove("profile_completed")
  Cookies.remove("uploaddetails")

      keycloakService.doLogout()
      yield put({
        type: commonActions.SET_ALERT,
        payload: {
          status: result?.data?.statusCode === 200 ? "success" : "failed",
          show: true,
          message: result?.data?.message,
        },
      });
      if (result?.data?.statusCode === 200) {
      }
      yield delay(2000);
      yield put({
        type: commonActions.SET_ALERT,
        payload: { status: null, show: false, message: null },
      });
    }else{
      keycloakService.doLogout()
    }
  } catch (error) {
    console.log(error);
    Cookies.remove("mhet_cnd_token");
    window.location.href = `/${Cookies.get("mhet_cnd_project")}/login`;
  }
};

const userLogin = function* (data) {

  try {
    let token = Cookies.get("mhet_cnd_token");
    if (token) {
      const result = yield call(() =>
        axios.post(`${API_URL}/candidate/logout`, { token: token })
      );

        Cookies.remove("mhet_cnd_email");
  Cookies.remove("mhet_cnd_email_verified");
  Cookies.remove("mhet_cnd_mobileno");
  Cookies.remove("mhet_cnd_mobileno_otp");
  Cookies.remove("mhet_cnd_mobileno_verified");
  Cookies.remove("mhet_cnd_project");
  Cookies.remove("mhet_cnd_token");
  Cookies.remove("profile_completed")
  Cookies.remove("uploaddetails")

      keycloakService.doLogout()
      yield put({
        type: commonActions.SET_ALERT,
        payload: {
          status: result?.data?.statusCode === 200 ? "success" : "failed",
          show: true,
          message: result?.data?.message,
        },
      });
      if (result?.data?.statusCode === 200) {
      }
      yield delay(2000);
      yield put({
        type: commonActions.SET_ALERT,
        payload: { status: null, show: false, message: null },
      });
    }else{
      keycloakService.doLogout()
    }
  } catch (error) {
    console.log(error);
    Cookies.remove("mhet_cnd_token");
    window.location.href = `/${Cookies.get("mhet_cnd_project")}/login`;
  }
};


const candidateTokenVerify = function* () {
  try {
    const { candidateTokenDetails } = yield select(
      (state) => state.authReducer
    );
    const Token=Cookies.get("mhet_cnd_token")
    console.log("token",Token)
    if (!candidateTokenDetails) {
      const result = yield call(() =>
        axios.get(`${API_URL}/candidate/verify-token`, {
          headers: {
            authorization: `Bearer ${Token}`,
          },
        })
      );
      if (result?.data?.statusCode === 200) {
        yield put({
          type: authActions.SET_CANDIDATE_TOKEN_DETAILS,
          payload: result?.data?.result,
        });
      } else {
      }
    }

  } catch (err) {
    console.log(err);
    Cookies.remove("mhet_cnd_token");
  }
};








export default authSagas;









