const  initialState = null

export default function userReducer( state = initialState, action) {
  let payload = action.payload
  switch (action.type ){
    case 'GOT_USER':
      return Object.assign({}, state, {
        ...payload
      })
      break
    case 'CURRENCY_CHANGED':  
      return Object.assign({}, state, {
        ...state,
        balance: payload
      })
      break
    case 'USER_LOGOUT':
      console.log(payload)
      return null
      break    
    case 'GOT_AVATAR':
      return Object.assign({}, state, {
        ...state,
        isFetching: false,
        personal: {
          ...state.personal,
          avatar: payload
        }
      })
      break 
    default:
      return state
      break
  }
}
