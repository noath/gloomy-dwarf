const initialState = {
  flag: 1,
  event: {},
}

export default function setSelected(state = initialState) {
    return {
      type: 'SET_SELECTED', 
      payload: state,
    }
  }