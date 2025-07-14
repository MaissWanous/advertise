import React, { useState, useEffect } from 'react';
import {
    Card,
    CardContent,
    Typography,
    Box,
    Divider,
} from '@mui/material';

import {
    ResponsiveContainer,
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    BarChart,
    Bar,
} from 'recharts';

export default function Statistics() {
    const [stats, setStats] = useState({
        otherAdmins: 0,
        viewers: '0',
        advertisers: '0'
    });
    const [sectionData, setSectionData] = useState([]);
    const [accessData, setAccessData] = useState([]);
    const [profitData, setProfitData] = useState([]);

    useEffect(() => {
        setStats({
            otherAdmins: 2,
            viewers: '25.3k',
            advertisers: '1.2k'
        });

        setSectionData([
            { name: 'education', value: 60 },
            { name: 'technology', value: 25 },
            { name: 'restaurants & hotels', value: 15 }
        ]);

        setAccessData([
            { day: 'Jan', value: 800 },
            { day: 'Feb', value: 2200 },
            { day: 'Mar', value: 1800 },
            { day: 'Apr', value: 2500 },
            { day: 'May', value: 2000 },
            { day: 'Jun', value: 2800 },
            { day: 'Jul', value: 3200 },
            { day: 'Aug', value: 3000 },
            { day: 'Sep', value: 3500 },
            { day: 'Oct', value: 3300 },
            { day: 'Nov', value: 3600 },
            { day: 'Dec', value: 3400 }
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
    }, []);

    const COLORS_SEC = ['#F29E4C', '#A6D8F3', '#A6E1AF'];
    const gradientId = 'accessGradient';

    return (
        <Box sx={{ display: 'grid', gap:"40px", gridTemplateColumns: "1fr 1fr" }}>
            <Card sx={{
                m: 0,
                borderRadius: 2,
               
                boxShadow: 3,
                display: 'flex',
                flexDirection: 'column',
                flexShrink: 0,
            }}>
                <CardContent sx={{ flexGrow: 1 }}>
                    <Box sx={{ fontSize: '0.9rem' }}>
                        <Typography variant="h6" component="div" sx={{ mb: 2, fontWeight: 'bold', color: '#333' }}>Viewer:</Typography>
                        <Typography variant="body2" sx={{ textAlign: 'right' }}>{stats.viewers}</Typography>
                        <Divider sx={{ mx: 2 }} />
                        <Typography variant="h6" component="div" sx={{ mb: 2, fontWeight: 'bold', color: '#333' }}>Number Ads:</Typography>
                        <Typography variant="body2" sx={{ textAlign: 'right' }}>{stats.advertisers}</Typography>
                        <Divider sx={{ mx: 2 }} />
                        <Typography variant="h6" component="div" sx={{ mb: 2, fontWeight: 'bold', color: '#333' }}>Most populer:</Typography>
                        <Typography variant="body2" sx={{ textAlign: 'right' }}>N/A</Typography>
                        <Divider sx={{ mx: 2 }} />
                        <Typography variant="h6" component="div" sx={{ mb: 2, fontWeight: 'bold', color: '#333' }}>More active section:</Typography>
                        <Typography variant="body2" sx={{ textAlign: 'right' }}>N/A</Typography>
                        <Divider sx={{ mx: 2 }} />
                        <Typography variant="h6" component="div" sx={{ mb: 2, fontWeight: 'bold', color: '#333' }}>Resturant section:</Typography>
                        <Typography variant="body2" sx={{ textAlign: 'right' }}>N/A</Typography>
                    </Box>
                </CardContent>
            </Card>


            <Box sx={{ display: 'flex', gap:"10px", flexDirection: 'column', flexGrow: 1 }}>
                <Card sx={{ borderRadius: 2, boxShadow: 3, p: 2 }}>
                    <Typography variant="h6" component="h3" sx={{ mb: 1 }}>Access</Typography>
                    <ResponsiveContainer width="100%" height={200}>
                        <AreaChart data={accessData}>
                            <defs>
                                <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#F29E4C" stopOpacity={0.8} />
                                    <stop offset="95%" stopColor="#F29E4C" stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <XAxis dataKey="day" />
                            <YAxis />
                            <CartesianGrid strokeDasharray="3 3" />
                            <Tooltip />
                            <Area
                                type="monotone"
                                dataKey="value"
                                stroke="#F29E4C"
                                fill={`url(#${gradientId})`}
                            />
                        </AreaChart>
                    </ResponsiveContainer>
                </Card>

                <Card sx={{ borderRadius: 2, boxShadow: 3, p: 2 }}>
                    <Typography variant="h6" component="h3" sx={{ mb: 1 }}>Profits</Typography>
                    <ResponsiveContainer width="100%" height={200}>
                        <BarChart data={profitData}>
                            <XAxis dataKey="day" />
                            <YAxis />
                            <CartesianGrid strokeDasharray="3 3" />
                            <Tooltip />
                            <Bar dataKey="value" fill="#A6E1AF" />
                        </BarChart>
                    </ResponsiveContainer>
                </Card>
            </Box>
        </Box>
    );
};
