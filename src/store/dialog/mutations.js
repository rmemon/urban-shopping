export const UPDATE_DIALOG_STATE = (state, { dialog, val, parentDialog }) => {
  if (val) {
    if (parentDialog && !state.parentDialogs.includes(parentDialog))
      state.parentDialogs.push(parentDialog)

    if (!parentDialog && !val) state.parentDialogs.pop()

    for (let key in state.dialog) {
      if (key != dialog && !state.parentDialogs.includes(key))
        state.dialog = { ...state.dialog, [key]: false }
    }
  }

  state.dialog = { ...state.dialog, [dialog]: val }
}

export const SET_DIALOG_PROPERTIES = (
  state,
  { dialog, properties, refresh = false }
) => {
  if (!state.properties[dialog]) {
    state.properties = Object.assign({}, state.properties, { [dialog]: {} })
  }
  if (refresh) {
    state.properties[dialog] = Object.assign({}, properties)
  } else {
    state.properties[dialog] = Object.assign(
      {},
      state.properties[dialog],
      properties
    )
  }
}

export const DELETE_DIALOG_PROPERTIES = (state, dialog) => {
  delete state.properties[dialog]
}
