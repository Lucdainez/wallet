export const saveEmailLogin = 'SAVE_EMAIL_lOGIN';
export const requisitionToApi = 'REQUISITION_TO_API';
const ENDPOINT = 'https://economia.awesomeapi.com.br/json/all';

export function addPersonalLogin(payload) {
  return {
    type: saveEmailLogin,
    payload,
  };
}

function successRequisition(payload) {
  return {
    type: requisitionToApi,
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
