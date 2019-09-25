import axios from "axios";
import { setAlert } from "./alert";
import { GET_CHATS, CHAT_ERROR } from "./types";

//Get chats
export const getChats = () => async dispatch => {
  try {
    const res = await axios.get("/api/chats");

    dispatch({
      type: GET_CHATS,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: CHAT_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};
