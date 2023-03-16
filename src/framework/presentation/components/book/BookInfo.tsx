import React from "react";
import { useAppSelector } from "../../store/hooks";

const BookInfo = () => {
  const { readingBook } = useAppSelector((state) => state.BookSlice);
  return (
    <>
      <h2>Candidate Details</h2>
      {readingBook ? (
        <div>
          <p className="fw-bold">Title: {readingBook.title}</p>
          <p className="fw-light">Description: {readingBook.description}</p>
          <p className="fst-italic">Link: {readingBook.link}</p>
          <p className="fst-italic">Location: {readingBook.location}</p>
          <p className="fst-italic">Price: {readingBook.price}</p>
          
        </div>
      ) : (
        <div className="alert alert-secondary" role="alert">
          There is no book selected yet. Please select!
        </div>
      )}
    </>
  );
};

export default BookInfo;
