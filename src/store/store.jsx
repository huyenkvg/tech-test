
import repoSlice from './features/Repo/repoSlice';
import { configureStore } from '@reduxjs/toolkit'

const rootReducer = {
   ds_repo: repoSlice,
}

const store = configureStore({
    reducer: rootReducer,
})
export default store;