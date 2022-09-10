const createSlice = require('@reduxjs/toolkit');

const initialState = {
    selectedStatus: 'all',
    selectedColors: [],
}

const filterSlice = createSlice.createSlice({
    name: 'filter',
    initialState,
    reducers: {
        filterStatusSelected: (state, action) => {
            state.selectedStatus = action.payload;
        },
        filterColorSelected: (state, action) => {
            const color = action.payload;
            if (state.selectedColors.includes(color)) {
                state.selectedColors = state.selectedColors.filter((c) => c !== color);
            } else {
                state.selectedColors.push(color);
            }
        }
    }
});

export default filterSlice.reducer;
export const { filterStatusSelected, filterColorSelected } = filterSlice.actions;
