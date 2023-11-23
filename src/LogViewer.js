import React, { useState } from 'react';

const LogViewer = () => {
  const [logs, setLogs] = useState([]);
  const [numLines, setNumLines] = useState(0);
  const [fileName, setFileName] = useState('');
  const [keywords, setKeywords] = useState('');

  const fetchLogs = async () => {
    try {
      const response = await fetch('http://localhost:8080/logs/search', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          numLines: parseInt(numLines, 10),
          filename: fileName,
          keywords: keywords
        })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setLogs(data.lines);
    } catch (error) {
      console.error('Error fetching logs:', error);
    }
  };

  return (
    <div>
        <div>
            <label>Number of Lines:</label>
            <input
            type="number"
            value={numLines}
            onChange={(e) => setNumLines(e.target.value)}
            />
        </div>
        <div>
            <label>File Name:</label>
            <input
            type="text"
            value={fileName}
            onChange={(e) => setFileName(e.target.value)}
            />
        </div>
        <div>
            <label>Keywords:</label>
            <input
            type="text"
            value={keywords}
            onChange={(e) => setKeywords(e.target.value)}
            />
        </div>
      <button onClick={fetchLogs}>Fetch Logs</button>
      <div style={{ maxHeight: '400px', overflowY: 'scroll' }}>
        {logs.map((log, index) => (
          <div key={index}>{log}</div>
        ))}
      </div>
    </div>
  );
};

export default LogViewer;
