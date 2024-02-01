import {
  SAVE_EMAIL_PASSWORD,
  SAVE_PERSONAL_DETAILS,
  SAVE_FINANCIAL_DETAILS,
  CLEAR_USER_DATA,
} from "../actions/userActions.js";

const initialState = {
  email: "",
  password: "",
  number: "",
  name: "",
  dob: "",
  address: "",
  title: "",
  year: "",
  about: "",
  employmentStatus: "",
  savings: "",
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case SAVE_EMAIL_PASSWORD:
      return {
        ...state,
        email: action.payload.email,
        password: action.payload.password,
        number: action.payload.number,
      };
    case SAVE_PERSONAL_DETAILS:
      return {
        ...state,
        title: action.payload.title,
        name: action.payload.name,
        address: action.payload.address,
        dob: action.payload.dob,
        year: action.payload.year,
        about: action.payload.about,
      };
    case SAVE_FINANCIAL_DETAILS:
      return {
        ...state,
        employmentStatus: action.payload.employmentStatus,
        savings: action.payload.savings,
      };
      case CLEAR_USER_DATA:
        return initialState; 
      default:
        return state;
  }
};

export default userReducer;
