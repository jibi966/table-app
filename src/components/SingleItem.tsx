// @ts-nocheck
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { gettingSingleItem, unSetSingle } from "../redux/action";
import { useDispatch, useSelector } from "react-redux";
export const SingleItem = () => {
  const { id } = useParams();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(gettingSingleItem(id));

    // clean up function
    return () => {
      dispatch(unSetSingle());
    };
  }, []);

  const data = useSelector((store) => store.singleReducer.oneStudent);
  console.log(data);
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
              <a href="#" className="card-link">
                Card link
              </a>
              <a href="#" className="card-link">
                Another link
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
