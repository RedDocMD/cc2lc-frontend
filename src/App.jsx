import { Routes, Route, Link } from "react-router-dom";
import Home from "./Home";
import GamesPage from "./Games";
import { useState, useEffect } from "react";
import axios from "axios";

function NoMatch() {
  return (
    <div>
      <h2>Nothing to see here!</h2>
      <p>
        <Link to="/">Go to the home page</Link>
      </p>
    </div>
  );
}

export default function App() {
  const [months, setMonths] = useState([]);
  const [fetchFailed, setFetchFailed] = useState(null);

  useEffect(() => {
    const url = 'https://cc2lc.chess.reddocmd.dev/months';
    axios.get(url)
      .then((resp) => {
        setFetchFailed(null);
        setMonths(resp.data);
      })
      .catch((err) => {
        setFetchFailed(err);
      });
  }, []);

  return (
    <Routes>
      <Route index element={<Home months={months} monthsFetchFailed={fetchFailed} />} />
      {months.map((data, idx) => {
        return (
          <Route key={idx} path={`${data.month}-${data.year}`}
            element={<GamesPage month={data.month} year={data.year} />} />
        );
      })}
      <Route path="*" element={<NoMatch />} />
    </Routes>
  );
}
