// @ts-nocheck
import { ChangeEvent, useEffect, useState } from "react";

import InfiniteScroll from "react-infinite-scroll-component";

import { useSelector, useDispatch } from "react-redux";

import { useNavigate } from "react-router-dom";

import "./Table.css";

import useDebounce from "./Debouncer";

import {
  addingFirst,
  addingAllData,
  debouncingData,
  addingAllAfterSearch,
} from "../redux/action";

export const Table = () => {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const [page, setPage] = useState(2);

  const [value, setValue] = useState<string>("");

  const data = useSelector((store: any) => store.allReducer.allStudents);

  const Loading = useSelector((store: any) => store.allReducer.load);

  const debouncedValue = useDebounce<string>(value, 500);

  // useEffect calling for first time
  useEffect(() => {
    // dispatching function for loading first set of elements
    dispatch(addingFirst());
  }, []);

  // calling useEffect on debouncingData
  useEffect(() => {
    // if the user types more than one character
    if (debouncedValue.length >= 3) {
      dispatch(debouncingData(debouncedValue));
    }
    // for restoring redux state after search
    else if (debouncedValue.length > 0 && debouncedValue.length < 3) {
      dispatch(addingAllAfterSearch());
    }
  }, [debouncedValue]);

  const fetchData = () => {
    // dispatching function to load more data from
    dispatch(addingAllData(page));
    // increasing the page number
    setPage(page + 1);
  };

  const handleFilter = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  return (
    <div className="container">
      <br />
      <input placeholder="Seacrh name..." type="text" onChange={handleFilter} />
      <br />
      <br />
      <div className="scroll-container">
        <InfiniteScroll
          dataLength={data && data.length} //This is important field to render the next data
          next={fetchData}
          hasMore={Loading}
          loader={<h4>Loading...</h4>}
          endMessage={
            <p style={{ textAlign: "center" }}>
              <b>Yay! You have seen it all</b>
            </p>
          }
        >
          <table className="table table-success table-striped">
            {/* table data */}
            <thead>
              <tr>
                <th scope="col">ID</th>
                <th scope="col">Name</th>
                <th scope="col">Image</th>
                <th scope="col">LecturesAttended</th>
                <th scope="col">TotalLectures</th>
              </tr>
            </thead>
            <tbody>
              {data &&
                data.map((item) => {
                  // mapping the data to rows
                  return (
                    <tr
                      onClick={() => navigate(`details/${item.id}`)}
                      key={`item.id`}
                    >
                      <th scope="row">{item.id}</th>
                      <td>{item.name}</td>
                      <td>
                        {" "}
                        <img src={item.avatarURL} alt="Img" />{" "}
                      </td>
                      <td>{item.lecturesAttended}</td>
                      <td>{item.totalLectures}</td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </InfiniteScroll>
      </div>
    </div>
  );
};
