import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { CSVLink, CSVDownload } from "react-csv";

const Home = () => {
  const [input, setInput] = useState("");
  const [vidData, setVidData] = useState([]);
  let csvData = [];

  useEffect(() => {
    axios
      .post("http://localhost:9000/", { input })
      .then((data) => {
        setVidData(data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [input]);
  return (
    <>
      <center>
        <h1>Search For Videos</h1>
        <input
          type="text"
          onChange={(e) => {
            setInput(e.target.value);
          }}
        ></input>
        <br />
        <br />
        {input.length > 0 &&
          vidData.map((vid) => {
            csvData.push({
              publishedAt: vid.snippet.publishedAt,
              description: vid.snippet.description,
              title: vid.snippet.title,
            });
          })}
        {input.length > 0 &&
          vidData.map((vid) => (
            <>
              <iframe
                width="300"
                height="250"
                src={"https://www.youtube.com/embed/" + vid.ID.videoId}
                style={{ margin: "10px" }}
              ></iframe>
              <p>{vid.snippet.title}</p>
            </>
          ))}

        {csvData.length > 0 && input.length > 0 && (
          <CSVLink data={csvData}>Download Results</CSVLink>
        )}
      </center>
    </>
  );
};
export default Home;
