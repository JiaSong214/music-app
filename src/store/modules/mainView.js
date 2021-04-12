//define action type
const UPDATE_VIEW_TYPE = 'mainView/UPDATE_VIEW_TYPE'

//make action generate function
export const updateViewType = (data) => ({
  type: UPDATE_VIEW_TYPE,
  viewType: data
});

//initial state of module
const initialState = {
  viewType: '',
  error: null
}

//make a reducer and export
export default function reducer (state = initialState, action) {
  switch(action.type) {
      case UPDATE_VIEW_TYPE:
        return {
          ...state,
          viewType: action.viewType
        };
    default:
      return state;
  }
}