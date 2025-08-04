import React, { useState } from 'react';
import {
  Card,
  CardContent,
  Typography,
  Box,
  Divider,
} from '@mui/material';

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from 'recharts';

import api from '../../../api';
import Loading from "../../loading/loading.jsx";

export default function Statistics() {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState(null);
  const [accessData, setAccessData] = useState([]);
  const [profitData, setProfitData] = useState([]);

  // الدالة لتحميل البيانات
  const loadStatistics = async () => {
    try {
      const response = await api.get('/api/statistics');
      const data = response.data;

      setAccessData([
        { province: 'Damascus', value: 800 },
        { province: 'Rif Dimashq', value: 2200 },
        { province: 'Aleppo', value: 1800 },
        { province: 'Homs', value: 2500 },
        { province: 'Daraa', value: 2000 },
        { province: 'Latakia', value: 2800 },
        { province: 'Tartus', value: 3200 },
        { province: 'Hama', value: 3000 },
        { province: 'Quneitra', value: 3500 },
        { province: 'Deir ez-Zor', value: 3300 },
        { province: 'Raqqa', value: 3600 },
        { province: 'Hasakah', value: 3400 }
      ]);

      setProfitData([
        { day: 'Jan', value: 500 },
        { day: 'Feb', value: 1500 },
        { day: 'Mar', value: 3000 },
        { day: 'Apr', value: 2500 },
        { day: 'May', value: 4000 },
        { day: 'Jun', value: 3000 },
        { day: 'Jul', value: 4500 },
        { day: 'Aug', value: 4200 },
        { day: 'Sep', value: 4800 },
        { day: 'Oct', value: 4600 },
        { day: 'Nov', value: 5000 },
        { day: 'Dec', value: 4900 }
      ]);

      setStats({
        otherAdmins: data.otherAdmins || 2,
        viewers: data.viewers || "2.3k",
        advertisers: data.advertisers || "1.2k",
        mostPopular: data.mostPopular || 'N/A',
        activeSection: data.activeSection || 'N/A'
      });
    } catch (err) {
      console.error('Error fetching statistics:', err);
            setProfitData([
        { day: 'Jan', value: 500 },
        { day: 'Feb', value: 1500 },
        { day: 'Mar', value: 3000 },
        { day: 'Apr', value: 2500 },
        { day: 'May', value: 4000 },
        { day: 'Jun', value: 3000 },
        { day: 'Jul', value: 4500 },
        { day: 'Aug', value: 4200 },
        { day: 'Sep', value: 4800 },
        { day: 'Oct', value: 4600 },
        { day: 'Nov', value: 5000 },
        { day: 'Dec', value: 4900 }
      ]);
      setStats({
        otherAdmins:2,
        viewers: "2.4k",
        advertisers: "2.3k",
        mostPopular: "",
        activeSection: "Resturant"
      });
    } finally {
      setLoading(false);
    }
  };

  
  if (loading ) {
    loadStatistics();
  }

  if (loading || !stats) {
    return <Loading />;
  }

  return (
    <Box sx={{ display: 'grid', transform: 'translateY(25%)', gap: "40px", gridTemplateColumns: "1fr 1fr", alignItems: "center" }}>
      <Card sx={{
        borderRadius: 2,
        boxShadow: 3,
        display: 'flex',
        flexDirection: 'column',
        flexShrink: 0,
      }}>
        <CardContent>
          <Box sx={{ fontSize: '0.9rem', color: '#345c6f' }}>
            <Typography variant="body1" sx={{ mb: 2, fontSize: "21px", fontWeight: 'bold' }}>Viewer:</Typography>
            <Typography variant="body2" sx={{ textAlign: 'right', fontSize: "21px" }}>{stats.viewers}</Typography>
            <Divider sx={{ mx: 2 }} />

            <Typography variant="body1" sx={{ mb: 2, fontSize: "21px", fontWeight: 'bold' }}>Number Ads:</Typography>
            <Typography variant="body2" sx={{ textAlign: 'right', fontSize: "21px" }}>{stats.advertisers}</Typography>
            <Divider sx={{ mx: 2 }} />

            <Typography variant="body1" sx={{ mb: 2, fontSize: "21px", fontWeight: 'bold' }}>Most popular Ads:</Typography>
            <Typography variant="body2" sx={{ textAlign: 'right', fontSize: "21px" }}>{stats.mostPopular}</Typography>
            <Divider sx={{ mx: 2 }} />

            <Typography variant="body1" sx={{ mb: 2, fontSize: "21px", fontWeight: 'bold' }}>More active section:</Typography>
            <Typography variant="body2" sx={{ textAlign: 'right', fontSize: "21px", color: "#f600ca" }}>{stats.activeSection}</Typography>
          </Box>
        </CardContent>
      </Card>

      <Card sx={{ borderRadius: 2, boxShadow: 3, p: 2, flexShrink: 0 }}>
        <Typography variant="h6" sx={{ mb: 1 }}>Profits</Typography>
        <ResponsiveContainer width="100%" height={275}>
          <BarChart data={profitData}>
            <XAxis dataKey="day" />
            <YAxis />
            <CartesianGrid strokeDasharray="3 3" />
            <Tooltip />
            <Bar dataKey="value" fill="#345c6f" />
          </BarChart>
        </ResponsiveContainer>
      </Card>
    </Box>
  );
}
