import axios from "axios";
import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
export const Table = () => {
  const [items, setItems] = useState([]);

  const [noMore, setNoMore] = useState(true);

  const [page, setPage] = useState(2);

  useEffect(() => {
    const getStudents = async () => {
      axios
        .get("http://localhost:5050/students?_page=1&_limit=20")
        .then((res) => {
          setItems(res.data);
        });
    };

    getStudents();
  }, []);

  const fetchData = () => {
    axios
      .get(`http://localhost:5050/students?_page=${page}&_limit=20`)
      .then((res) => {
        if (res.data.length === 0 || res.data.length < 20) {
          setNoMore(false);
        }
        setItems([...items, ...res.data]);
      })
      .then(() => {
        setPage(page + 1);
      });
  };
  console.log(items);
  return (
    <div>
      <input placeholder="Seacrh name..." type="text" />
      <div>
        {" "}
        {items.map((val) => {
          return <div>{val.name}</div>;
        })}{" "}
      </div>
      <InfiniteScroll
        dataLength={items.length} //This is important field to render the next data
        next={fetchData}
        hasMore={noMore}
        loader={<h4>Loading...</h4>}
        endMessage={
          <p style={{ textAlign: "center" }}>
            <b>Yay! You have seen it all</b>
          </p>
        }
      >
        <table className="table table-success table-striped">
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
            {items &&
              items.map((item) => {
                return (
                  <tr>
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
  );
};