import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    comments: []
}

export const commentSlice = createSlice({
    name: "comments",
    initialState,
    reducers: {
        addComment: (state, action) => {
            if (!state.comments) {
                state.comments = [];
            }
            state.comments.push(action.payload);
        },
        deleteComment: (state, action) => {
            state.comments = state.comments.filter(comment => comment.id !== action.payload);
        },
        updateComment: (state, action) => {
            const { id, payload } = action.payload;
            const index = state.comments.findIndex(comment => comment.id === id);
            if (index !== -1) {
                state.comments[index].payload = payload;
            }
        },
        setDBToComments: (state, action) => {
            state.comments = action.payload || [];
        }
    }
})

export const { addComment, deleteComment, updateComment, setDBToComments } = commentSlice.actions;

export default commentSlice.reducer;
