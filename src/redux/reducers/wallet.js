import { requisitionToApi } from '../actions/index';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  editor: false,
  idToEdit: 0,
};

function walletReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
  case requisitionToApi:
    return {
      ...state,
      currencies: Object
        .values(action.payload)
        .map((coin) => coin.code)
        .filter((coinRemove, index) => index !== 1),
    };
  default: return state;
  }
}

export default walletReducer;
