import authActions from "./actions";
import commonActions from "../common/actions";
import { takeEvery, call, all, put, delay, select } from "redux-saga/effects";
import axios from "axios";
import { API_URL } from "../../utils/constants";
import Cookies from "js-cookie";
import candidatesActions from "../../redux/candidates/actions";

import {
  DecryptFunction,
  EncryptFunction,
  EncryptObjectFunction,
} from "../../utils/cryptoFunction";
import {
  handleDecodeJSON,
  handleEncodeJson,
} from "../../utils/encodeDecodeJson";
import keycloakService from "../../modules";

const authSagas = function* () {
  yield all([
    yield takeEvery(authActions.CHECK_MOBILE_VERIFIED, checkmobileVerified),

    yield takeEvery(authActions.CANDIDATE_TOKEN_VERIFY, candidateTokenVerify),

    yield takeEvery(authActions.CANDIDATE_LOGOUT, candidateLogout),
    yield takeEvery(
      authActions.VERIFY_MOBILENO_FOR_SIGNUP,
      verifyMobilenoForSignup
    ),
    yield takeEvery(
      authActions.GET_PROFILE_REGISTRATION_ACTIVE_TAB,
      getProfileRegistrationActiveTab
    ),
    yield takeEvery(
      authActions.CHECK_CANDIDATE_MOBILENO,
      checkCandidateMobileno
    ),
    yield takeEvery(
      authActions.SEND_OTP_FOR_MOBILE_VERIFICATION,
      sendOtpForMobileVerification
    ),
    yield takeEvery(
      authActions.CHECK_DUPLICATE_EMAIL_OR_MOBILENO,
      checkDuplicateEmailOrMobileno
    ),
    yield takeEvery(
      authActions.GET_TEMP_CANDIDATE_DETAILS,
      getTempCanidateDetails
    ),
  ]);
};
const checkmobileVerified = function* (data) {
  const { payload } = data;
  const { setMobileVerified, dispatch, setOpenDialog, navigate,setResendCountdown } = payload;
      yield put({ type: commonActions.SET_DASHBOARD_PAGE_LOADER, payload: true });

  yield delay(6000);
  
  yield put({ type: commonActions.SET_DASHBOARD_PAGE_LOADER, payload: false });
  const uploadDetails = yield select(
    (state) => state.candidatesReducer.uploadDetails
  );
  
console.log('uploadDetails___',uploadDetails);

  const allProfiledetailsDraft = uploadDetails?.[0]?.statusmain ? true : false;


if (allProfiledetailsDraft) {
  Cookies.set('uploaddetails', 'true', { expires: 7 }); 
}
  try {
    const encryptedData = yield call(handleEncodeJson, {
      encodeJSON: payload?.data,
    });
    const result = yield call(async () => {
      const response = await axios.post(
        `${API_URL}/candidate/check-mobileverified`,
        encryptedData
      );
      return response; 
    });


    if (result?.data?.statusCode === 200) {
      Cookies.set("mhet_cnd_email", result?.data?.data?.emailid);
      Cookies.set("mhet_cnd_mobileno", result?.data?.data?.mobileno);
      if(!allProfiledetailsDraft){
        navigate(`/${Cookies.get("mhet_cnd_project")}/registration?page=personaldetails`)
      }
      else{
        navigate(`/${Cookies.get("mhet_cnd_project")}/home`);
      }
      yield put({ type:  "SIGNUP_SUCCESS", payload: result.data });
    } 
    else if(result?.data?.statusCode === 409){

      yield put({
        type: commonActions.SET_ALERT,
        payload: {
          status: result?.data?.statusCode === 200 ? "success" : "failed",
          show: true,
          message: result?.data?.message,
        }
      });

      yield put({
        type: commonActions.SET_ALERT,
        payload: {
          status: result?.data?.statusCode === 200 ? "success" : "failed",
          show: true,
          message: result?.data?.message,
        }
      });
    yield put({ type:authActions?.CANDIDATE_LOGOUT})
     
      
      yield delay(2000);
      yield put({
        type: commonActions.SET_ALERT,
        payload: {
          show: false,
        }
      });
    }
    
    else {


      setOpenDialog(true);
      yield put({ type: "SIGNUP_FAILED", payload: result.data });
      dispatch({
        type: authActions.SEND_OTP_FOR_MOBILE_VERIFICATION,
        payload: {
          data: {
            mobileno: Cookies.get("mhet_cnd_mobileno"),
            candidatename:payload?.data?.candidatename
          },
        },
      });
      setResendCountdown(120)
    }
    yield put({ type: commonActions.SET_CLICKABLE, payload: true });

  } catch (error) {

    if (error.response) {
      console.error("Error response data:", error.response.data);
    } else if (error.request) {
      console.error("No response received:", error.request);
    } else {
      console.error("Error message:", error.message);
    }

    yield put({ type: "SIGNUP_ERROR", payload: error.message });
  }
};


const candidateLogout = function* (data) {

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

const sendOtpForMobileVerification = function* (data) {
  const { payload } = data;
  console.log("payload", payload);

  const { navigate, mobileno, setResendCountdown,candidatename } = payload.data;
  try {
    yield put({ type: commonActions.SET_BUTTON_LOADER, payload: true });

    const result = yield call(
      async () =>
        await axios.get(`${API_URL}/candidate/check-mobileno/${encodeURIComponent(EncryptFunction(mobileno))}/${encodeURIComponent(EncryptFunction(candidatename))}`)
    );
    // console.log(result)
    console.log("resulto----", result?.data);

    if (result?.data?.statusCode === 200) {
      console.log("result----", result?.data?.statusCode);

      yield put({
        type: commonActions.SET_ALERT,
        payload: {
          status: "success",
          show: true,
          message: result?.data?.message,
        },
      });
      yield delay(2000);
      yield put({
        type: commonActions.SET_ALERT,
        payload: { status: null, show: false, message: null },
      });
      yield console.log("otp---", result);

      // yield
      Cookies.set("mhet_cnd_mobileno_otp", result?.data?.testotp);
      yield put({
        type: commonActions.SET_SHOW_MODAL,
        payload: {
          show: false,
          type: "EVS",
          method: "emailAndMobileVerification",
        },
      });
      yield put({
        type: commonActions.SET_SHOW_MODAL,
        payload: {
          show: true,
          type: "MV",
          method: "emailAndMobileVerification",
        },
      });
      setResendCountdown(120);
      //   navigate(`/${Cookies.get("mhet_cnd_project")}/verify-mobileno`);
    }
  } catch (err) {
    console.log(err);
  }
};
const getTempCanidateDetails = function* (data) {
  const { payload } = data;
  try {
    const result = yield call(() =>
      axios.get(`${API_URL}/candidate/get/mobileno/${encodeURIComponent(EncryptFunction(payload?.emailid))}`)
    );
    if (result) {
      yield put({
        type: authActions.SET_TEMP_CANDIDATE_DETAILS,
        payload: result?.data?.statusCode === 200 ? result?.data?.result : [],
      });
    }
  } catch (err) {
    console.log(err);
  }
};
const verifyMobilenoForSignup = function* (data) {
  console.log(data, "sagas trigeered verify mobile for sig");
  const { payload } = data;
  const { setMobileVerified } = payload;
  console.log(payload, "payload---");

  const { navigate, setRed, setAttempt, setWrongotp, attempt, wrongOTP } =
    payload;
  const verifiedmob = Cookies.get("mhet_cnd_mobileno");
  const currentMob = payload?.data?.mobileno;
  const isMobChanged = false;
  payload.data.isMobChanged = isMobChanged;
  const email = Cookies.get("mhet_cnd_email");
  payload.data.email = email;

  try {
    const encryptedData = yield call(handleEncodeJson, {
      encodeJSON: payload?.data,
    });
    
    const result = yield call(() =>
      axios.post(`${API_URL}/candidate/verify-mobileno`, encryptedData)
    );
    console.log('result-mob',result);
    
    if (result?.data?.statusCode === 200) {
      // navigate(`/${Cookies.get("mhet_cnd_project")}/mobileno-verification`);
      setMobileVerified(true);
      navigate(`/${Cookies.get("mhet_cnd_project")}/registration?page=personaldetails`)
      yield put({
        type: commonActions.SET_SHOW_MODAL,
        payload: {
          show: false,
          type: "Mv",
          method: "emailAndMobileVerification",
        },
      });
      // yield put({
      //   type: commonActions.SET_SHOW_MODAL,
      //   payload: {
      //     show: true,
      //     type: "MVS",
      //     method: "emailAndMobileVerification",
      //   },
      // });
      yield put({
        type: commonActions.SET_ALERT,
        payload: { status: null, show: false, message: null },
      });
      yield delay(2000);
      yield put({
        type: commonActions.SET_SHOW_MODAL,
        payload: {
          show: false,
          type: "MVS",
          method: "emailAndMobileVerification",
        },
      });
      // navigate(`/${Cookies.get("mhet_cnd_project")}/login`);
      Cookies.set("mhet_cnd_mobileno_verified", true);
      Cookies.remove("mhet_cnd_mobileno");
      Cookies.set("mhet_cnd_email_verified", false);
      yield put({ type: commonActions.SET_BUTTON_LOADER, payload: false });

      setRed(false);
    } else {
      setWrongotp(wrongOTP + 1);
      setRed(true);
    }
    yield put({
      type: commonActions.SET_ALERT,
      payload: {
        status: result?.data?.statusCode === 200 ? "success" : "failed",
        show: true,
        message: result?.data?.message,
      },
    });
    yield delay(2000);
    yield put({
      type: commonActions.SET_ALERT,
      payload: {
        status: null,
        show: false,
        message: null,
      },
    });
    // setRed(false)
  } catch (err) {
    console.log(err);
  }
};

const getProfileRegistrationActiveTab = function* (data) {
  const { payload } = data;

  try {
    const result = yield call(() =>
      axios.get(`${API_URL}/candidate/profile-activetab/${encodeURIComponent(EncryptFunction(payload?.id))}`)
    );
    // const decryptedData = yield call(handleDecodeJSON, {decodeJSON:result?.data?.result});
    yield put({
      type: authActions.SET_PROFILE_REGISTRATION_ACTIVE_TAB,
      payload: result?.data?.statusCode === 200 ? result?.data?.result : [],
    });
  } catch (err) {
    console.log(err);
  }
};

const checkCandidateMobileno = function* (data) {
  const { payload } = data;
  const { handleShowOtpInput, setForget, setResendCountdown, setVerified } =
    payload;

  yield put({ type: commonActions.SET_PAGE_LOADER, payload: true });
  try {
    const result = yield call(() =>
      axios.get(`${API_URL}/candidate/check-mobileno/${payload?.data}`)
    );
    yield put({ type: commonActions.SET_PAGE_LOADER, payload: false });
    if (result?.data?.statusCode === 200) {
      Cookies.set(
        "mhet_cnd_forgetemail_otp",
        EncryptFunction(result?.data?.otp)
      );
      setForget(false);
      setResendCountdown(120);
      handleShowOtpInput();
      setVerified(false);
      yield delay(2000);
    }

    yield put({
      type: commonActions.SET_ALERT,
      payload: {
        status: result?.data?.statusCode === 200 ? "success" : "failed",
        show: true,
        message: result?.data?.message,
      },
    });
    yield delay(2000);
    yield put({
      type: commonActions.SET_ALERT,
      payload: { status: null, show: false, message: null },
    });
  } catch (err) {
    console.log(err);
  }
  yield put({ type: commonActions.SET_PAGE_LOADER, payload: false });
};

;

const checkDuplicateEmailOrMobileno = function* (data) {
  const { payload } = data;
  const { setAndClearError } = payload;

  try {
    const result = yield call(() =>
      axios.post(`${API_URL}/candidate/check-duplicate`, payload?.data)
    );
    if (result?.data) {
      setAndClearError({ ...result?.data, type: payload?.data?.type });
    }

  } catch (err) {
    console.log(err);
  }
};




// const checkKeycloakSessionId = function* () {

//   yield put({ type: authActions.CANDIDATE_TOKEN_VERIFY });
//   yield delay(1000)

//   try {
//   const candidateTokenDetails = yield select(
//     (state) => state?.authReducer?.candidateTokenDetails
//   );
//   const data = { candidateid: candidateTokenDetails?.candidateid }
//   const encodedData = yield call(handleEncodeJson,{encodeJSON:data});
//   // yield put({ type: commonActions.SET_BUTTON_LOADER, payload: true });
//     const result = yield call(() =>
//       axios.post(`${API_URL}/candidate/check-keycloak-sid`, encodedData)
//     );
//     // debugger
//     // yield put({ type: commonActions.SET_BUTTON_LOADER, payload: false });
//     // yield put({
//     //   type: commonActions.SET_ALERT,
//     //   payload: {
//     //     status: result?.data?.statusCode === 200 ? "success" : "failed",
//     //     show: true,
//     //     message: result?.data?.message,
//     //   },
//     // });
//     if (result?.data?.statusCode === 200) {

//       const localSid = Cookies.get("mhet_cnd_sid");
//       const sid = result?.data?.sid

//       if (localSid != sid) {

//       Cookies.remove("mhet_cnd_token");
//       Cookies.remove("mhet_cnd_sid")
//       window.location.href = `/${Cookies.get("mhet_cnd_project")}/`;
//       window.location.reload()
//         // yield put({ type: authActions.CANDIDATE_LOGOUT });

//       }
//       // yield put({ type: authActions.CANDIDATE_TOKEN_VERIFY });
//     }else if(result?.data?.statusCode == 400){

//       Cookies.remove("mhet_cnd_token");
//       Cookies.remove("mhet_cnd_sid")
//       window.location.href = `/${Cookies.get("mhet_cnd_project")}/`;
//       window.location.reload()

//         // yield put({ type: authActions.CANDIDATE_LOGOUT });

//     }
//     // yield delay(2000);
//     // yield put({
//     //   type: commonActions.SET_ALERT,
//     //   payload: { status: null, show: false, message: null },
//     // });
//   } catch (error) {
//     console.log(error);
//     Cookies.remove("mhet_cnd_token");
//     window.location.href = `/${Cookies.get("mhet_cnd_project")}/login`;
//   }
// };

export default authSagas;









