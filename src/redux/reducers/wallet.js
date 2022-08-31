import {
  REQUISITION_TO_API,
  SAVE_DATA_INPUTS,
  REMOVE_ID_TO_EXPANSES,
  EDIT_TABLE_ELEMENT,
  ADD_EDIT_TABLE_ELEMENT,
} from '../actions/index';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  expensesEdit: {},
  editor: false,
  idToEdit: 0,
  id: 0,
};

function walletReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
  case REQUISITION_TO_API:
    return {
      ...state,
      currencies: Object
        .keys(action.payload)
        .filter((coin) => coin !== 'USDT'),
    };
  case SAVE_DATA_INPUTS:
    return {
      ...state,
      expenses: [...state.expenses, { id: state.id, ...action.payload }],
      id: state.id + 1,
    };
  case REMOVE_ID_TO_EXPANSES:
    return {
      ...state,
      expenses: [...state.expenses.filter((key) => key.id !== Number(action.payload))],
    };
  case EDIT_TABLE_ELEMENT:
    return {
      ...state,
      editor: true,
      idToEdit: Number(action.payload),
      expensesEdit: {
        ...state.expenses.filter((key) => key.id === Number(action.payload)),
      },
      expenses: [...state.expenses.filter((key) => key.id !== Number(action.payload))],
    };
  case ADD_EDIT_TABLE_ELEMENT:
    return {
      ...state,
      expenses: [
        ...state.expenses, { id: state.idToEdit, ...action.payload },
      ].sort((a, b) => a.id - b.id),
      expensesEdit: {},
      editor: false,
      idToEdit: 0,
    };
  default: return state;
  }
}

export default walletReducer;
