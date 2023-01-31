import React, { useState } from "react";

export default function FileUpload() {
  const [selectedFile, setSelectedFile] = useState();
  const [loading, setLoading] = useState(false);
  const [downloadFileUrl, setDownloadFileUrl] = useState("");

  const changeHandler = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleFileUpload = () => {
    const formData = new FormData();
    formData.append("file", selectedFile);
    setLoading(true);
    fetch("http://localhost:3001/api/upload", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((result) => {
        console.log("Success:", result);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error:", error);
        setLoading(false);
      });
  };

  const handleFileDownload = () => {
    // const formData = new FormData();
    // formData.append("file", selectedFile);
    setLoading(true);
    fetch("http://localhost:3001/api/download/data.log", {
      method: "GET",
    })
      .then((response) => response.json())
      .then((result) => {
        console.log("Success:", result);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error:", error);
        setLoading(false);
      });
  };

  return (
    <div>
      <h1>Select a file</h1>
      <input type="file" name="file" onChange={changeHandler} />
      <div>
        <button onClick={handleFileUpload}>Submit</button>
      </div>

      <button onClick={handleFileDownload}>Download</button>
    </div>
  );
}
