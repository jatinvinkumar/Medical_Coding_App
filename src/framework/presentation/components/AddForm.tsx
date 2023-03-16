import React, { useRef } from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { InsertPeopleEvents } from "../viewmodel/events/GetPeopleEvents";
import { InsertBookEvents } from "../viewmodel/events/InsertBookEvents";

const AddForm = () => {
  const { isLoggedIn } = useAppSelector((state) => state.AuthSlice);
  const dispatch = useAppDispatch();

  const titleRef = useRef<HTMLInputElement>(null);
  const priceRef = useRef<HTMLInputElement>(null);
  const descRef = useRef<HTMLTextAreaElement>(null);

  const formSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (
      titleRef.current?.checkValidity() &&
      priceRef.current?.checkValidity() &&
      descRef.current?.checkValidity()
    ) {
      dispatch(
        InsertPeopleEvents().insertBookEvent({
          title: titleRef.current.value,
          price: +priceRef.current.value,
          description: descRef.current.value
        })
      );
      titleRef.current.value = "";
      priceRef.current.value = "";
      descRef.current.value = "";
    }
  };

  return (
    <div className="row">
      <div className="col-6 offset-3 mt-3">
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

          Based on the information above, return a json object that answers the following fields:
EM_Service_Levels: Determine the level(s) of E/M service
EM_Codes: Find the appropriate E/M code(s)
ICD-10-CM_Codes: Determine the diagnosis code(s) based on the ICD-10-CM codebook
CPT_Codes:  Determine the procedure code(s) based on the CPT codebook
expected output: {"EM_Service_Level": "",  "EM_Code": "", "ICD-10-CM_Code": "", "CPT_Codes": ""} 

{"EM_Service_Levels": "99285, 99214",  "EM_Codes": "99285, 99214", "ICD-10-CM_Codes": "T25.3XXA, T20.2XXA", "CPT_Codes": "15002, 15003, 15004"}

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
            <label htmlFor="Description">Description</label>
            <textarea
              className="form-control"
              id="description"
              placeholder="Write down what the patient's problem was and the care provided"
              rows={3}
              required
              ref={descRef}
            ></textarea>
          </div>
          <button
            type="submit"
            className="btn btn-primary"
            disabled={!isLoggedIn}
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddForm;
