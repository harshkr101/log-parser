import React, { useState } from "react";
import { Button, Form, Spinner, Alert } from "react-bootstrap";
import download from "downloadjs";

const FileComponent = () => {
  const [fileData, setFileData] = useState({});
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFileUpload = (event) => {
    setFile(event.target.files[0]);
  };

  const handleFileDownload = async () => {
    setLoading(true);
    await fetch(
      `http://localhost:3001/api/download?file=${fileData.fileName}`,
      {
        method: "GET",
      }
    )
      .then((response) => response.json())
      .then((data) => {
        // download the json file to browser
        download(JSON.stringify(data), fileData.fileName);
        alert("File downloaded successfully");
      })
      .catch((error) => {
        console.error(error);
        alert("Unable to download file");
      });
    setLoading(false);
  };

  const handleUpload = async () => {
    setLoading(true);
    const formData = new FormData();
    formData.append("file", file);
    setLoading(false);
    await fetch("http://localhost:3001/api/upload", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((result) => {
        setFileData(result);
        setLoading(false);
      })
      .catch((error) => {
        alert("Unable to upload data file to server");
        console.error(error);
      });
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-5">File Upload and Download</h2>
      <Form.Group className="d-flex justify-content-center">
        <Form.Control
          type="file"
          id="filePicker"
          accept=".log, .txt"
          onChange={handleFileUpload}
          className="w-50"
        />
        <Button
          variant="primary"
          className="ml-3"
          onClick={() => {
            if (!file) {
              alert("Please select a file");
              return;
            }
            handleUpload();
          }}
        >
          Upload
        </Button>
      </Form.Group>
      {loading && (
        <div className="d-flex justify-content-center mt-3">
          <Spinner animation="border" variant="primary" />
          <p className="ml-3">Loading...</p>
        </div>
      )}
      {fileData.fileName && (
        <div className=" row d-flex justify-content-center mt-3">
          <Alert variant="success">Download is ready</Alert>
          <h3 className="w-50 text-center">{fileData.fileName}</h3>
          <Button
            variant="primary"
            className="ml-3"
            onClick={handleFileDownload}
          >
            Download
          </Button>
        </div>
      )}
    </div>
  );
};

export default FileComponent;
