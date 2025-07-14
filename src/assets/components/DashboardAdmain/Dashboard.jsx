import { Route, Routes } from "react-router-dom"
import Sidbar from "./Sidebar"
import { Box } from "@mui/material"
import Statistics from "./statistics"


const Dashboard = () => {
return (
    <>
 <Box sx={{ display: 'flex', minHeight: '100vh', width: '100%' }}>
      <Sidbar />
      <Box sx={{ flexGrow: 1, padding: '20px', overflowY: 'auto' }}>
        <Routes>
          <Route path="statistics" element={<Statistics />} />
             <Route index element={<Statistics />} />
        </Routes>
      </Box>
    </Box>
      </>
      )
}
export default Dashboard