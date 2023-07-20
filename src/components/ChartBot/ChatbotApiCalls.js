import { REQUEST_CHATBOT_CREDIT } from "../../action/graphql/ChatbotGraphql"
import Chatbotclient from "../../action/client/ChatbotClient";
import { createAsyncThunk } from "@reduxjs/toolkit";
// CREDIT REQUEST API

export const requestCredits = createAsyncThunk(
    // action type string
    "chartbot/responce",
    // callback function
    async (data, { rejectWithValue }) => {
        console.log(data);
      try {
        const listbudget = await Chatbotclient.mutate({
          mutation: REQUEST_CHATBOT_CREDIT,
          variables: {
            userId: data
          },
        });
        return listbudget;
      } catch (error) {
        console.log(error);
        // return custom error message from API if any
        if (error.response && error.response.data.message) {
          return rejectWithValue(error.response.data.message);
        } else {
          return rejectWithValue(error.message);
        }
      }
    }
  );