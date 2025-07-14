import { Route, Routes } from "react-router-dom";
import Sidbar from "./Sidebar";
import { Box } from "@mui/material";
import Statistics from "./statistics";
import "./Dashboard.css"

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
            <Route index element={<Statistics />} />
            {/* <Route path="Administrative" element={<AdministrativeSettingsContent />} /> */}
            {/* <Route path="General" element={<GeneralSettingsContent />} /> */}
            {/* <Route path="Pay" element={<PaySettingsContent />} /> */}
          </Routes>
        </Box>
      </Box>
    </>
  );
};

export default Dashboard;
