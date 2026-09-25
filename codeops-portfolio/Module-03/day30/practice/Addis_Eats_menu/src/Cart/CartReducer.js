export function CartReducer(state, action) {
  if (action.type === 'add') {
    return { ...state, item: [...state.item, action.item] };
  }

  if (action.type === 'remove') {
    return {
      ...state,
      item: state.item.filter((d) => d.id !== action.item.id),
    };
  }

  if (action.type === 'clean') {
    return { ...state, item: [] };
  }

  return state;
}
