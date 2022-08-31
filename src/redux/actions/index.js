export const saveEmailLogin = 'SAVE_EMAIL_lOGIN';
export const REQUISITION_TO_API = 'REQUISITION_TO_API';
export const SAVE_DATA_INPUTS = 'SAVE_DATA_INPUTS';
export const ADD_EXCHANGE_RATES = 'ADD_EXCHANGE_RATES';
export const REMOVE_ID_TO_EXPANSES = 'REMOVE_ID_TO_EXPANSES';
export const EDIT_TABLE_ELEMENT = 'EDIT_TABLE_ELEMENT';
export const ADD_EDIT_TABLE_ELEMENT = 'ADD_EDIT_TABLE_ELEMENT';
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

export function removeElementToTable(payload) {
  return {
    type: REMOVE_ID_TO_EXPANSES,
    payload,
  };
}

export function editElementToTable(payload) {
  return {
    type: EDIT_TABLE_ELEMENT,
    payload,
  };
}

export function addEditElementToTable(payload) {
  return {
    type: ADD_EDIT_TABLE_ELEMENT,
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
