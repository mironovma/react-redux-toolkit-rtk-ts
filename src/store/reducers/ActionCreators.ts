import axios from "axios";
import { AppDispatch } from "../store";
import { IUser } from "../../models/IUser";
import { userSlice } from "./userSlice";
import { createAsyncThunk } from "@reduxjs/toolkit";

// export const fetchUsers = () => async (dispatch: AppDispatch) => {
//   try {
//     // toolkit за нас создает action creator'ы. и вот так удобно получается диспатчить
//     dispatch(userSlice.actions.usersFetching());
//     const response = await axios.get<IUser[]>(
//       "https://jsonplaceholder.typicode.com/users"
//     );
//     /**
//      * Timeout здесь просто, чтобы был виден индикатор загрузки.
//      * В реальных проектах так делать не нужно!
//      */
//     setTimeout(() => {
//       dispatch(userSlice.actions.usersFetchingSuccess(response.data));
//     }, 500);
//   } catch (e) {
//     dispatch(userSlice.actions.usersFetchingError(getErrorMessage(e)));
//   }
// };

// Для получения поля message у ошибки в catch
// function getErrorMessage(error: unknown) {
//   if (error instanceof Error) return error.message;
//   return String(error);
// }

export const fetchUsers = createAsyncThunk(
  "user/fetchAll",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get<IUser[]>(
        "https://jsonplaceholder.typicode.com/users"
      );
      return response.data;
    } catch (e) {
      /**
       * Или передаем e.message, но нужно обработать e.message,
       * как было ранее.
       */
      return thunkAPI.rejectWithValue("Не удалось загрузить пользователей");
    }
  }
);
