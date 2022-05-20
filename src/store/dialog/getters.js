export const getDialogState = (state) => (dialog) =>
  state.dialog[dialog] || false

export const getDialogProperties = (state) => (dialog) =>
  state.properties[dialog] || {}
