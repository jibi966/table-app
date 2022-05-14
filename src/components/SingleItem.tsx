// @ts-nocheck
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { gettingSingleItem, unSetSingle } from "../redux/action";
import { useDispatch, useSelector } from "react-redux";
export const SingleItem = () => {
  const { id } = useParams();

  const dispatch = useDispatch();

  // dispatching function to get the details of the student
  useEffect(() => {
    // function for getting student details
    dispatch(gettingSingleItem(id));

    // clean up function for clearing the previous item details from the redux
    return () => {
      dispatch(unSetSingle());
    };
  }, []);

  const data = useSelector((store) => store.singleReducer.oneStudent);
  const obj = data && data.marks;
  console.log("obj:", obj);
  return (
    <>
      {!data ? (
        <div>Loading....</div>
      ) : (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "20px",
          }}
        >
          <div className="card" style={{ width: "18rem" }}>
            <img src={data.avatarURL} className="card-img-top" alt="Img" />
            <div className="card-body">
              <h5 className="card-title">{data.name}</h5>
            </div>
            <ul className="list-group list-group-flush">
              <li className="list-group-item">
                TotalLectures: {data.totalLectures}
              </li>
              <li className="list-group-item">
                LecturesAttended: {data.lecturesAttended}
              </li>
            </ul>
            <div className="card-body">
              {/* mapping throgh the nested marks objects */}
              {/* diplaying the subjects and marks of the specific student */}
              {obj &&
                Object.keys(obj).map((el, i) => {
                  return (
                    <ul className="list-group list-group-flush" key={i}>
                      {" "}
                      <li className="list-group-item">
                        Subject: {obj[el].subjectTitle}
                        <br />
                        Total Marks: {obj[el].totalMarks}
                        <br />
                        Marks Obtained: {obj[el].markesObtained}
                      </li>
                    </ul>
                  );
                })}
            </div>
          </div>
        </div>
      )}
    </>
  );
};
