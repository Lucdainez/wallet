export const saveEmailLogin = 'SAVE_EMAIL_lOGIN';
export const REQUISITION_TO_API = 'REQUISITION_TO_API';
export const SAVE_DATA_INPUTS = 'SAVE_DATA_INPUTS';
export const ADD_EXCHANGE_RATES = 'ADD_EXCHANGE_RATES';
export const ADD_SUM_VALUE = 'ADD_SUM_VALUE';
const ENDPOINT = 'https://economia.awesomeapi.com.br/json/all';

export function addPersonalLogin(payload) {
  return {
    type: saveEmailLogin,
    payload,
  };
}

function successRequisition(payload) {
  return {
    type: REQUISITION_TO_API,
    payload,
  };
}

export function addDataInputs(payload) {
  return {
    type: SAVE_DATA_INPUTS,
    payload,
  };
}

export function addSumValue(payload) {
  return {
    type: ADD_SUM_VALUE,
    payload,
  };
}

export function fetchApiCoinsAction() {
  return async (dispatch) => {
    const response = await fetch(ENDPOINT);
    const json = await response.json();
    dispatch(successRequisition(json));
  };
}
