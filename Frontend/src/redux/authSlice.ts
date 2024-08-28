import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IUser } from "../types";

interface AuthState {
    user: IUser | null;
}

// Estado inicial
const initialState: AuthState = {
    user: null
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        // Acción para actualizar el usuario autenticado
        setAuthUser: (state, action: PayloadAction<IUser | null>) => {
            state.user = action.payload;
        }
    }
});

// Exporta la acción y el reductor
export const { setAuthUser } = authSlice.actions;
export default authSlice.reducer;
