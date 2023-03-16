
import { BookState } from "../slices/BookSlice";
import { createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import Book from "../../../../business/domain/Book";
import di from "../../../../di";
import BookInfo from "../../components/book/BookInfo";

export const InsertPeopleEvents = () => {
  const insertBookEvent = createAsyncThunk(
    "book/insertBookEvent",
    async (book: Book, thunkAPI) => {
      const { dispatch } = thunkAPI;
      try {
        const response = await fetch("http://127.0.0.1:5000/searchPeople");
        const data = await response.json();
        // Modify the book object with data from the API response
        // e.g., book.title = data.title;
        console.log(data);
        book.description = JSON.stringify(data);
        book.price = 100;
        book.title = "New Book";
        for (let i = 0; i < data.length; i++) {
            book.description = data[i]["jobtitle"];
            book.price = 100;
            book.link = data[i]["navigation_url"];
            book.title = data[i]["name"];
            book.location = data[i]["location"];
            dispatch(di.InsertBookUseCase.insertBook(book));
        }
        
      } catch (error) {
        console.error(error);
      }
    }
  );

  const handlePending = (state: BookState) => {
    state.isLoading = true;
    state.error = null;
  };

  const handleFulfilled = (state: BookState, action: PayloadAction<Book>) => {
    state.books.push(action.payload);
    state.isLoading = false;
  };

  const handleRejected = (state: BookState, action: PayloadAction<unknown>) => {
    state.isLoading = false;
    state.error = action.payload as string;
  };
  
  return {
    insertBookEvent,
    handlePending,
    handleFulfilled,
    handleRejected,
  };
};