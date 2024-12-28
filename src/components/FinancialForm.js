import React, { useState } from 'react';
import {
  Container,
  Grid,
  Paper,
  TextField,
  Button,
  Typography,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';

function FinancialForm({ onSubmit }) {
  const [formData, setFormData] = useState({
    // 基本資料
    name: '',
    age: '',
    occupation: '',
    
    // 收入
    monthlyIncome: '',
    investmentIncome: '',
    otherIncome: '',
    
    // 支出
    rentMortgage: '',
    dailyExpenses: '',
    transportation: '',
    insurance: '',
    otherExpenses: '',
    
    // 資產
    savings: '',
    stocks: '',
    bonds: '',
    realEstate: '',
    
    // 負債
    totalDebt: '',
    
    // 風險承受度
    riskTolerance: 'medium',
    
    // 理財目標
    financialGoals: '',
    retirementAge: '',
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit(formData);
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
      <Paper sx={{ p: 3 }}>
        <Typography variant="h5" gutterBottom>
          個人財務資料表
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            {/* 基本資料 */}
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom>
                基本資料
              </Typography>
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                required
                fullWidth
                label="姓名"
                name="name"
                value={formData.name}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                required
                fullWidth
                label="年齡"
                name="age"
                type="number"
                value={formData.age}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                required
                fullWidth
                label="職業"
                name="occupation"
                value={formData.occupation}
                onChange={handleChange}
              />
            </Grid>

            {/* 收入 */}
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom>
                月收入 (TWD)
              </Typography>
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                required
                fullWidth
                label="月薪"
                name="monthlyIncome"
                type="number"
                value={formData.monthlyIncome}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                label="投資收入"
                name="investmentIncome"
                type="number"
                value={formData.investmentIncome}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                label="其他收入"
                name="otherIncome"
                type="number"
                value={formData.otherIncome}
                onChange={handleChange}
              />
            </Grid>

            {/* 支出 */}
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom>
                月支出 (TWD)
              </Typography>
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                required
                fullWidth
                label="房租/房貸"
                name="rentMortgage"
                type="number"
                value={formData.rentMortgage}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                required
                fullWidth
                label="日常生活支出"
                name="dailyExpenses"
                type="number"
                value={formData.dailyExpenses}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                required
                fullWidth
                label="交通支出"
                name="transportation"
                type="number"
                value={formData.transportation}
                onChange={handleChange}
              />
            </Grid>

            {/* 資產 */}
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom>
                資產 (TWD)
              </Typography>
            </Grid>
            <Grid item xs={12} md={3}>
              <TextField
                fullWidth
                label="存款"
                name="savings"
                type="number"
                value={formData.savings}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} md={3}>
              <TextField
                fullWidth
                label="股票投資"
                name="stocks"
                type="number"
                value={formData.stocks}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} md={3}>
              <TextField
                fullWidth
                label="現金流投資"
                name="bonds"
                type="number"
                value={formData.bonds}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} md={3}>
              <TextField
                fullWidth
                label="不動產"
                name="realEstate"
                type="number"
                value={formData.realEstate}
                onChange={handleChange}
              />
            </Grid>

            {/* 風險承受度 */}
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom>
                投資偏好
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel>風險承受度</InputLabel>
                <Select
                  name="riskTolerance"
                  value={formData.riskTolerance}
                  onChange={handleChange}
                  label="風險承受度"
                >
                  <MenuItem value="low">保守型</MenuItem>
                  <MenuItem value="medium">穩健型</MenuItem>
                  <MenuItem value="high">積極型</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="期望退休年齡"
                name="retirementAge"
                type="number"
                value={formData.retirementAge}
                onChange={handleChange}
              />
            </Grid>

            {/* 理財目標 */}
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="理財目標"
                name="financialGoals"
                multiline
                rows={4}
                value={formData.financialGoals}
                onChange={handleChange}
                placeholder="請描述您的理財目標（例如：退休規劃、子女教育基金、購屋計畫等）"
              />
            </Grid>

            <Grid item xs={12}>
              <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3 }}>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  size="large"
                >
                  生成財務報告
                </Button>
              </Box>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
}

export default FinancialForm;
