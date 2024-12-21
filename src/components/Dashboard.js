import React from 'react';
import {
  Container,
  Grid,
  Paper,
  Typography,
  Box,
} from '@mui/material';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, PieChart, Pie, Cell } from 'recharts';

function Dashboard({ data }) {
  // 計算總收入
  const totalIncome = Number(data.monthlyIncome) + Number(data.investmentIncome) + Number(data.otherIncome);
  
  // 計算總支出
  const totalExpenses = Number(data.rentMortgage) + Number(data.dailyExpenses) + Number(data.transportation);
  
  // 計算總資產
  const totalAssets = Number(data.savings) + Number(data.stocks) + Number(data.bonds) + Number(data.realEstate);

  // 資產配置數據
  const assetAllocationData = [
    { name: '存款', value: Number(data.savings) },
    { name: '股票', value: Number(data.stocks) },
    { name: '債券', value: Number(data.bonds) },
    { name: '不動產', value: Number(data.realEstate) },
  ];

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  // 收支比較數據
  const monthlyData = [
    {
      name: '本月',
      收入: totalIncome,
      支出: totalExpenses,
    }
  ];

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Grid container spacing={3}>
        {/* 基本資訊 */}
        <Grid item xs={12}>
          <Paper sx={{ p: 2 }}>
            <Typography component="h2" variant="h6" color="primary" gutterBottom>
              {data.name} 的財務概況
            </Typography>
            <Typography variant="body1">
              年齡：{data.age} 歲
            </Typography>
            <Typography variant="body1">
              職業：{data.occupation}
            </Typography>
          </Paper>
        </Grid>

        {/* 收支概況 */}
        <Grid item xs={12}>
          <Paper sx={{ p: 2 }}>
            <Typography component="h2" variant="h6" color="primary" gutterBottom>
              月收支概況
            </Typography>
            <LineChart
              width={800}
              height={300}
              data={monthlyData}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="收入" stroke="#8884d8" />
              <Line type="monotone" dataKey="支出" stroke="#82ca9d" />
            </LineChart>
          </Paper>
        </Grid>

        {/* 資產配置 */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2 }}>
            <Typography component="h2" variant="h6" color="primary" gutterBottom>
              資產配置
            </Typography>
            <PieChart width={400} height={300}>
              <Pie
                data={assetAllocationData}
                cx={200}
                cy={150}
                labelLine={false}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              >
                {assetAllocationData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </Paper>
        </Grid>

        {/* 理財目標 */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2 }}>
            <Typography component="h2" variant="h6" color="primary" gutterBottom>
              理財目標
            </Typography>
            <Box sx={{ mt: 2 }}>
              <Typography variant="body1" gutterBottom>
                期望退休年齡：{data.retirementAge} 歲
              </Typography>
              <Typography variant="body1" gutterBottom>
                風險承受度：{
                  data.riskTolerance === 'low' ? '保守型' :
                  data.riskTolerance === 'medium' ? '穩健型' : '積極型'
                }
              </Typography>
              <Typography variant="body1" gutterBottom>
                目標：
              </Typography>
              <Typography variant="body2">
                {data.financialGoals}
              </Typography>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}

export default Dashboard;
