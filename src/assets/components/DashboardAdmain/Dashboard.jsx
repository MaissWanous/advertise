import { Route, Routes } from "react-router-dom";
import Sidbar from "./Sidebar";
import { Box } from "@mui/material";
import Statistics from "./statistics";
 import Adminstrative from "./Administrative";
import "./Dashboard.css"
import General from "./General";
import PaySettings from "./PaySettings";

const Dashboard = () => {
  return (
    <>
      <Box sx={{
        display: 'grid',
        gridTemplateColumns: 'auto 1fr',
        minHeight: '100vh',
        width: '100%',
      }}>
        <Sidbar />

        <Box sx={{
          flexGrow: 1,
          padding: '20px',
          overflowY: 'auto',
          height: '100%',
        }}>
          <Routes>
            <Route path="statistics" element={<Statistics />} />
             <Route path="Administrative" element={<Adminstrative/>} />
             <Route path="General" element={<General/>} />
             <Route path="Pay" element={<PaySettings />} /> 
            <Route index element={<Statistics />} />
          </Routes>
        </Box>
      </Box>
    </>
  );
};

export default Dashboard;
