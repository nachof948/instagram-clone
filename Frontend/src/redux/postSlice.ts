import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IPosts, IPost } from "../types";

let initialState: IPosts = {
    posts: []
}

const postSlice = createSlice({
    name: 'post',
    initialState: initialState,
    reducers: {
        setPosts: (state, action: PayloadAction<IPost[]>) => {
            state.posts = action.payload;
        },
        addPost: (state, action: PayloadAction<IPost>) => {
            state.posts.unshift(action.payload);
        },
        deleteUserPost: (state, action: PayloadAction<string>) =>{
            state.posts = state.posts.filter((post) => post._id !== action.payload)
        }
    }
})

export const { setPosts, addPost, deleteUserPost } = postSlice.actions;
export default postSlice.reducer;
