
import { createSlice } from '@reduxjs/toolkit'


const repoSlice = createSlice({
    name: 'repo',
    initialState: {
        list_repo: [],
    },
    reducers: {
        setDanhSachRepo(state, action) {
            state.list_repo = action.payload;
        },

        addRepo(state, action) {
            state.list_repo.push(action.payload);
        },

        removeRepo(state, action) { // truyền index của NV trong list_repo
            state.list_repo.splice(action.payload);
        },

    }
})

const { reducer, actions } = repoSlice;
export const {
    setDanhSachRepo,
    addRepo,
    removeRepo,
} = actions;
export default reducer;


// export const { addNhanVien } = Slice.actions
// export default Slice.reducer