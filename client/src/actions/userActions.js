export const SAVE_EMAIL_PASSWORD = "SAVE_EMAIL_PASSWORD";

export const saveEmailPassword = (data) => ({
  type: SAVE_EMAIL_PASSWORD,
  payload: data,
});

export const SAVE_PERSONAL_DETAILS = "SAVE_PERSONAL_DETAILS";

export const savePersonalDetails = (data) => ({
  type: SAVE_PERSONAL_DETAILS,
  payload: data,
});

export const SAVE_FINANCIAL_DETAILS = "SAVE_FINANCIAL_DETAILS";

export const saveFinancialDetails = (data) => ({
  type: SAVE_FINANCIAL_DETAILS,
  payload: data,
});
export const CLEAR_USER_DATA = "CLEAR_USER_DATA";

export const clearUserData = () => ({
  type: CLEAR_USER_DATA,
});
