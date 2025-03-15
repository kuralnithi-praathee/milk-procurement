import commonActions from "./actions";

const initialState = {
  showSidebar: true,
  buttonLoader: false,
  draftButtonLoader: false,
  alert: { status: null, show: false, message: null },
  pageLoader: false,
  dashBoardpageLoader: false,
  showModal: {
    show: false,
    type: null,
    method: null,
    data: null,
  },
  clickable:false
};

const commonReducer = (state = initialState, action) => {
  switch (action.type) {
    case commonActions.SHOW_SIDEBAR:
      return {
        ...state,
        showSidebar: action.payload,
      };
    case commonActions.SET_BUTTON_LOADER:
      return {
        ...state,
        buttonLoader: action.payload,
      };
    case commonActions.SET_ALERT:
      return {
        ...state,
        alert: action.payload,
      };
    case commonActions.SET_DRAFT_BUTTON_LOADER:
      return {
        ...state,
        draftButtonLoader: action.payload,
      };
    case commonActions.SET_PAGE_LOADER:
      return {
        ...state,
        pageLoader: action.payload
      }
    case commonActions.SET_DASHBOARD_PAGE_LOADER:
      return {
        ...state,
        dashBoardpageLoader: action.payload
      }
    case commonActions.SET_SHOW_MODAL:
      return {
        ...state,
        showModal: action.payload
      }  
    case commonActions.SET_CLICKABLE:
      return {
        ...state,
        clickable: action.payload
      }  
    default:
      return state;
  }
};

export default commonReducer;
