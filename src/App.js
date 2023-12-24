// App.js
import React, { useState } from 'react';
import './App.css';

const App = () => {
  const [segmentName, setSegmentName] = useState('');
  const [newSchema, setNewSchema] = useState('');
  const [selectedSchemas, setSelectedSchemas] = useState([]);
  const [dynamicDropdowns, setDynamicDropdowns] = useState([]);
  const [selectedOption, setSelectedOption] = useState('');
  const schemas = [
    { label: 'First Name', value: 'first_name' },
    { label: 'Last Name', value: 'last_name' },
    { label: 'Gender', value: 'gender' },
    { label: 'Age', value: 'age' },
    { label: 'Account Name', value: 'account_name' },
    { label: 'City', value: 'city' },
    { label: 'State', value: 'state' },
  ];

  const addNewSchema = () => {
    if (selectedOption && !selectedSchemas.includes(selectedOption)) {
      setSelectedSchemas([...selectedSchemas, selectedOption]);
      setDynamicDropdowns([...dynamicDropdowns, selectedOption]);
      setNewSchema('');
    }
  };

  const saveSegment = () => {
    const data = {
      segment_name: segmentName,
      schema: selectedSchemas.map((schema) => ({ [schema]: schema })),
    };

    // Send data to the server using the provided webhook URL
    fetch('https://webhook.site/e5526dfb-9a35-4c66-a5ea-27699b1b5a73', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => console.log('Success:', data))
      .catch((error) => console.error('Error:', error));
  };

  const cancelSegment = () => {
    setSegmentName('');
    setNewSchema('');
    setSelectedSchemas([]);
    setDynamicDropdowns([]);
    setSelectedOption('');
  };

  return (
    <div className="app-container">
      <button onClick={() => setSegmentName('Save Segment')}>SAVE SEGMENT</button>

      {segmentName && (
        <div>
          <p>Enter the Name of the Segment: {segmentName}</p>
          <input type="text" placeholder="Name of the Segment" value={newSchema} onChange={(e) => setNewSchema(e.target.value)} />
          <br />
          <p>To save your segment, you need to add the schemas to build the query </p>

          {/* Add schema to segment dropdown */}
          <label htmlFor="addSchemaDropdown">Add schema to segment:</label>
          <select
            id="addSchemaDropdown"
            value={selectedOption}
            onChange={(e) => setSelectedOption(e.target.value)}
          >
            <option value="" disabled>Select Schema</option>
            {schemas.map((schema) => (
              <option key={schema.value} value={schema.value}>
                {schema.label}
              </option>
            ))}
          </select>

          {/* Display dynamic dropdowns */}
          {dynamicDropdowns.map((dropdown, index) => (
            <div key={index}>
              <select value={dropdown} onChange={(e) => {}}>
                <option value="" disabled>Select Schema</option>
                {schemas.map((schema) => (
                  <option key={schema.value} value={schema.value}>
                    {schema.label}
                  </option>
                ))}
              </select>
            </div>
          ))}

          <br />
          <a href="#" onClick={() => addNewSchema()}>
            + Add new schema
          </a>
          <ul>{selectedSchemas.map((schema, index) => <li key={index}>{schema}</li>)}</ul>
          <button onClick={() => saveSegment()}>Save the Segment</button>
          <button className="cancel-button" onClick={() => cancelSegment()}>
            Cancel
          </button>
        </div>
      )}
    </div>
  );
};

export default App;
