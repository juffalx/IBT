import ThemeContextPage from './ThemeContextPage/ThemeContextPage'
import UseFetchPage from './UseFetchPage/UseFetchPage'
import ReducerTestPage from './ReducerTestPage/ReducerTestPage'
import StateToReducerPage from './StateToReducerPage/StateToReducerPage'
import CartProviderPage from './CartProviderPage/CartProviderPage'
import MemoProviderPage from './MemoProviderPage/MemoProviderPage'
import MemoCallbackPage from './MemoCallbackPage/MemoCallbackPage'

export const EXERCISES = [
  { id: 1, label: 'ThemeContext', Page: ThemeContextPage },
  { id: 2, label: 'useFetch', Page: UseFetchPage },
  { id: 3, label: 'cartReducer', Page: ReducerTestPage },
  { id: 4, label: 'useState to useReducer', Page: StateToReducerPage },
  { id: 5, label: 'CartProvider', Page: CartProviderPage },
  { id: 6, label: 'Memoised provider', Page: MemoProviderPage },
  { id: 7, label: 'memo and useCallback', Page: MemoCallbackPage },
]
