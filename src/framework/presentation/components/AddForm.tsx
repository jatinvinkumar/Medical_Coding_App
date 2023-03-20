import React, { useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { InsertPeopleEvents } from "../viewmodel/events/GetPeopleEvents";
import { InsertBookEvents } from "../viewmodel/events/InsertBookEvents";
import BooksList from "./book/BooksList";
import { JsonViewer } from '@textea/json-viewer'

const AddForm = () => {
  const { isLoggedIn } = useAppSelector((state) => state.AuthSlice);
  const dispatch = useAppDispatch();

  const titleRef = useRef<HTMLInputElement>(null);
  const priceRef = useRef<HTMLInputElement>(null);
  const descRef = useRef<HTMLTextAreaElement>(null);
  const [jsonDesc, setJsonDesc] = useState(null); 

  const formSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (
      descRef.current?.checkValidity()
    ) {
      const payload = { situation:  descRef.current.value};
      //const url = 'http://127.0.0.1:5000/getCodes';
      const url = 'https://medcodeapi.herokuapp.com/getCodes';
      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      };

      await fetch(url, options)
        .then(response => response.json())
        .then(data => {
          console.log(data);
          setJsonDesc(data)
        })
        .catch(error => console.error(error));
      
      //descRef.current.value = "";
    }
  };

  return (
    <div className="row">
      <div className="col mt-5">
        <h2>Patient Care Description</h2>
        <form onSubmit={formSubmit}>
        {/* <div className="form-group">
            <label htmlFor="title">Company</label>
            <input
              type="text"
              className="form-control"
              ref={titleRef}
              id="title"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="title">Job Title</label>
            <input
              type="text"
              className="form-control"
              ref={titleRef}
              id="title"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="title">Job Description</label>
            <input
              type="text"
              className="form-control"
              ref={titleRef}
              id="title"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="price">Salary Max</label>
            <input
              type="number"
              className="form-control"
              ref={priceRef}
              id="price"
              required
            />
          </div> */}

          <div className="form-group">
            <label htmlFor="Description">EHR Data (up to 5,000 words)</label>
            <textarea
              className="form-control"
              id="description"
              placeholder="Write down what the patient's problem was and the care provided"
              rows={3}
              required
              ref={descRef}
            ></textarea>
          </div>
          <div className="row">
            <button
              type="submit"
              className="btn btn-primary"
              disabled={!isLoggedIn}
            >
              Analyze
            </button>
            <button
              type="submit"
              className="btn btn-primary ml-2"
              disabled={!isLoggedIn}
            >
              Get PHI 
            </button>
            <button
              type="submit"
              className="btn btn-primary ml-2"
              disabled={!isLoggedIn}
            >
              Redact 
            </button>
          </div>
          
        </form>
      </div>
      <div className="col-5 mt-5 ">
      {/* <BooksList /> */}
      <JsonViewer value={jsonDesc}/>
    </div>
      
    </div>
  
  );
};

export default AddForm;
