import { useState } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Layout from './components/Layout'
import './App.css'
import Sidebar from './components/Sidebar'
import EventTimeline from './components/Eventtimeline'
import EvidenceImport from './components/EvidenceImport'
import AnalysisDashboard from './components/Analysis'
import ReportGeneration from './components/Report'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
     <Router>
        <Routes>
          <Route path="/" element={<Layout><EvidenceImport/></Layout>} />
          <Route path="/Eventtimeline" element={<Layout><EventTimeline/></Layout>} />
          <Route path="/Analysis" element={<Layout><AnalysisDashboard/></Layout>} />
          <Route path="/Report" element={<Layout><ReportGeneration/></Layout>} />
        </Routes>
      </Router>
    </>
  )
}

export default App
