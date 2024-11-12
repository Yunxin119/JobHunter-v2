import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./redux/apiSlice";
import authReducer from "./redux/authReducer";
import companyReducer from "./redux/companyReducer";

export default configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
        authReducer,
        companyReducer
    }
});