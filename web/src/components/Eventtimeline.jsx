// import React, { useState } from "react";
// import Papa from "papaparse";
// import { VerticalTimeline, VerticalTimelineElement } from "react-vertical-timeline-component";
// import "react-vertical-timeline-component/style.min.css";
// import moment from "moment";

// const EventTimeline = () => {
//   const [events, setEvents] = useState([]); // State to store parsed events
//   const [selectedEvent, setSelectedEvent] = useState(null); // State to track the selected event

//   const handleFileUpload = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       Papa.parse(file, {
//         header: true,
//         skipEmptyLines: true,
//         complete: (result) => {
//           const parsedData = result.data;

//           // Map the parsed data to the event structure
//           const timelineEvents = parsedData.map((row) => ({
//             time: moment(row.time).format("YYYY-MM-DD HH:mm:ss"), // Format time
//             eventid: row.eventid || "Unknown Event", // Fallback for missing event IDs
//             description: row.description || "No description available", // Optional column
//             eventTypeName: row.eventTypeName || "Unknown Type", // New property
//             sourceName: row.sourceName || "Unknown Source", // New property
//             message: row.message || "No message available", // New property
//           }));

//           setEvents(timelineEvents);
//         },
//         error: (error) => {
//           console.error("Error parsing CSV file:", error);
//         },
//       });
//     }
//   };

//   const handleEventClick = (event) => {
//     setSelectedEvent(event); // Set the clicked event as the selected event
//   };

//   const closeEventDetails = () => {
//     setSelectedEvent(null); // Deselect the event
//   };

//   return (
//     <div className="p-6 bg-black text-white min-h-screen">
//       <h1 className="text-xl font-bold text-green-400">Dynamic Event Timeline</h1>

//       {/* File Upload Section */}
//       <div className="mt-6 p-4 bg-gray-900 border border-gray-700 rounded-md">
//         <h2 className="text-lg font-semibold text-green-400">Upload CSV File</h2>
//         <input
//           type="file"
//           accept=".csv"
//           onChange={handleFileUpload}
//           className="mt-4 text-white bg-gray-800 p-2 rounded-md focus:outline-none"
//         />
//       </div>

//       {/* Timeline Display */}
//       {events.length > 0 ? (
//         <div className="mt-6">
//           <VerticalTimeline>
//             {events.map((event, index) => (
//               <VerticalTimelineElement
//                 key={index}
//                 date={event.time}
//                 iconStyle={{ background: "#4caf50", color: "#fff" }}
//                 onTimelineElementClick={() => handleEventClick(event)} // Make the bubble clickable
//               >
//                 <h3 className="text-lg font-bold text-green-400">{event.eventid}</h3>
//                 <p className="text-sm text-gray-300">{event.description}</p>
//               </VerticalTimelineElement>
//             ))}
//           </VerticalTimeline>
//         </div>
//       ) : (
//         <div className="mt-6 text-gray-400">No events to display. Upload a CSV file to generate the timeline.</div>
//       )}

//       {/* Event Details Modal */}
//       {selectedEvent && (
//         <div className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-50">
//           <div className="bg-gray-800 p-6 rounded-lg text-white max-w-md">
//             <h2 className="text-lg font-bold text-green-400 mb-4">{selectedEvent.eventid}</h2>
//             <p>
//               <strong>Time:</strong> {selectedEvent.time}
//             </p>
//             <p>
//               <strong>Description:</strong> {selectedEvent.description}
//             </p>
//             <p>
//               <strong>Event Type:</strong> {selectedEvent.eventTypeName}
//             </p>
//             <p>
//               <strong>Source Name:</strong> {selectedEvent.sourceName}
//             </p>
//             <p>
//               <strong>Message:</strong> {selectedEvent.message}
//             </p>
//             <button
//               onClick={closeEventDetails}
//               className="mt-4 px-4 py-2 bg-red-500 text-white rounded-md"
//             >
//               Close
//             </button>
//           </div>
//         </div>
//       )}

//       {/* Action Buttons */}
//       <div className="flex justify-between items-center mt-6">
//         <button
//           onClick={() => setEvents([])} // Clear events
//           className="px-4 py-2 bg-red-500 text-white rounded-md"
//         >
//           Clear Timeline
//         </button>
//       </div>
//     </div>
//   );
// };

// export default EventTimeline;


import React, { useState } from "react";
import Papa from "papaparse";
import { VerticalTimeline, VerticalTimelineElement } from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import moment from "moment";

const EventTimeline = () => {
  const [events, setEvents] = useState([]); // State to store parsed events
  const [selectedEvent, setSelectedEvent] = useState(null); // State to track the selected event

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      Papa.parse(file, {
        header: true,
        skipEmptyLines: true,
        complete: (result) => {
          const parsedData = result.data;

          // Helper function to get a random color
          const getRandomColor = () => {
            const colors = ["text-red-400", "text-green-400", "text-blue-400"];
            return colors[Math.floor(Math.random() * colors.length)];
          };

          // Map the parsed data to the event structure
          const timelineEvents = parsedData.map((row) => ({
            time: moment(row.time).format("YYYY-MM-DD HH:mm:ss"), // Format time
            eventid: row.eventid || "Unknown Event", // Fallback for missing event IDs
            description: row.description || "No description available", // Optional column
            eventTypeName: row.eventTypeName || "Unknown Type", // New property
            sourceName: row.sourceName || "Unknown Source", // New property
            message: row.message || "No message available", // New property
            colorClass: getRandomColor(), // Assign a random color class
          }));

          setEvents(timelineEvents);
        },
        error: (error) => {
          console.error("Error parsing CSV file:", error);
        },
      });
    }
  };

  const handleEventClick = (event) => {
    setSelectedEvent(event); // Set the clicked event as the selected event
  };

  const closeEventDetails = () => {
    setSelectedEvent(null); // Deselect the event
  };

  return (
    <div className="p-6 bg-black text-white min-h-screen">
      <h1 className="text-xl font-bold text-green-400">Dynamic Event Timeline</h1>

      {/* File Upload Section */}
      <div className="mt-6 p-4 bg-gray-900 border border-gray-700 rounded-md">
        <h2 className="text-lg font-semibold text-green-400">Upload CSV File</h2>
        <input
          type="file"
          accept=".csv"
          onChange={handleFileUpload}
          className="mt-4 text-white bg-gray-800 p-2 rounded-md focus:outline-none"
        />
      </div>

      {/* Timeline Display */}
      {events.length > 0 ? (
        <div className="mt-6">
          <VerticalTimeline>
            {events.map((event, index) => (
              <VerticalTimelineElement
                key={index}
                date={event.time}
                iconStyle={{ background: "#4caf50", color: "#fff" }}
                onTimelineElementClick={() => handleEventClick(event)} // Make the bubble clickable
              >
                <h3 className={`text-lg font-bold ${event.colorClass}`}>{event.eventid}</h3>
                <p className="text-sm text-gray-300">{event.description}</p>
              </VerticalTimelineElement>
            ))}
          </VerticalTimeline>
        </div>
      ) : (
        <div className="mt-6 text-gray-400">No events to display. Upload a CSV file to generate the timeline.</div>
      )}

      {/* Event Details Modal */}
      {selectedEvent && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-50">
          <div className="bg-gray-800 p-6 rounded-lg text-white max-w-md">
            <h2 className="text-lg font-bold text-green-400 mb-4">{selectedEvent.eventid}</h2>
            <p>
              <strong>Time:</strong> {selectedEvent.time}
            </p>
            <p>
              <strong>Description:</strong> {selectedEvent.description}
            </p>
            <p>
              <strong>Event Type:</strong> {selectedEvent.eventTypeName}
            </p>
            <p>
              <strong>Source Name:</strong> {selectedEvent.sourceName}
            </p>
            <p>
              <strong>Message:</strong> {selectedEvent.message}
            </p>
            <button
              onClick={closeEventDetails}
              className="mt-4 px-4 py-2 bg-red-500 text-white rounded-md"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex justify-between items-center mt-6">
        <button
          onClick={() => setEvents([])} // Clear events
          className="px-4 py-2 bg-red-500 text-white rounded-md"
        >
          Clear Timeline
        </button>
      </div>
    </div>
  );
};

export default EventTimeline;

