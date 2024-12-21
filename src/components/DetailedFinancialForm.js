import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
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
  Stepper,
  Step,
  StepLabel,
  Slider,
} from '@mui/material';

function DetailedFinancialForm({ onSubmit, initialData }) {
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState(0);
  const steps = ['基本資料', '收入資料', '支出資料', '資產配置', '未來規劃'];

  const defaultFormData = {
    // 基本資料
    name: '',
    age: '',
    occupation: '',
    retirementAge: '',
    
    // 現在收入
    monthlyIncome: '',
    yearEndBonus: '',
    investmentIncome: '',
    otherIncome: '',
    
    // 收入預期變化
    expectedSalaryGrowth: 3,
    expectedBonusGrowth: 3,
    expectedInvestmentReturn: 5,
    
    // 現在支出
    rentMortgage: '',
    dailyExpenses: '',
    transportation: '',
    insurance: '',
    education: '',
    entertainment: '',
    otherExpenses: '',
    
    // 未來支出規劃
    expectedLifestyleChanges: [
      { year: '', description: '', amount: '' }
    ],
    plannedMajorExpenses: [
      { year: '', description: '', amount: '' }
    ],
    expectedExpenseGrowth: 2,
    
    // 現有資產
    savings: '',
    stocks: '',
    bonds: '',
    realEstate: '',
    otherAssets: '',
    
    // 資產配置策略
    stocksAllocation: '',
    bondsAllocation: '',
    realEstateAllocation: '',
    cashAllocation: '',
    
    // 預期報酬率
    expectedStockReturn: 8,
    expectedBondReturn: 4,
    expectedRealEstateReturn: 4,
    expectedCashReturn: 1,
    
    // 負債
    totalDebt: '',
    monthlyDebtPayment: '',
    debtInterestRate: '',
    
    // 理財目標
    financialGoals: '',
    riskTolerance: 'medium',
  };

  const [formData, setFormData] = useState(defaultFormData);

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSliderChange = (name) => (event, newValue) => {
    setFormData(prevData => ({
      ...prevData,
      [name]: newValue
    }));
  };

  const handleNext = () => {
    setActiveStep((prevStep) => prevStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit(formData);
    navigate('/');
  };

  const renderStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom>
                基本資料
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                required
                fullWidth
                label="姓名"
                name="name"
                value={formData.name}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} md={6}>
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
            <Grid item xs={12} md={6}>
              <TextField
                required
                fullWidth
                label="職業"
                name="occupation"
                value={formData.occupation}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                required
                fullWidth
                label="預期退休年齡"
                name="retirementAge"
                type="number"
                value={formData.retirementAge}
                onChange={handleChange}
              />
            </Grid>
          </Grid>
        );

      case 1:
        return (
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom>
                收入資料
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                required
                fullWidth
                label="月薪 (萬元)"
                name="monthlyIncome"
                type="number"
                value={formData.monthlyIncome}
                onChange={handleChange}
                InputProps={{
                  endAdornment: <Typography color="textSecondary">萬</Typography>
                }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="年終獎金 (萬元)"
                name="yearEndBonus"
                type="number"
                value={formData.yearEndBonus}
                onChange={handleChange}
                InputProps={{
                  endAdornment: <Typography color="textSecondary">萬</Typography>
                }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="投資收入 (每月/萬元)"
                name="investmentIncome"
                type="number"
                value={formData.investmentIncome}
                onChange={handleChange}
                InputProps={{
                  endAdornment: <Typography color="textSecondary">萬</Typography>
                }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="其他收入 (每月/萬元)"
                name="otherIncome"
                type="number"
                value={formData.otherIncome}
                onChange={handleChange}
                InputProps={{
                  endAdornment: <Typography color="textSecondary">萬</Typography>
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <Typography gutterBottom>
                預期年薪資成長率 (%)
              </Typography>
              <Slider
                value={formData.expectedSalaryGrowth}
                onChange={handleSliderChange('expectedSalaryGrowth')}
                aria-labelledby="salary-growth-slider"
                valueLabelDisplay="auto"
                step={0.5}
                marks
                min={0}
                max={10}
              />
            </Grid>
            <Grid item xs={12}>
              <Typography gutterBottom>
                預期投資報酬率 (%)
              </Typography>
              <Slider
                value={formData.expectedInvestmentReturn}
                onChange={handleSliderChange('expectedInvestmentReturn')}
                aria-labelledby="investment-return-slider"
                valueLabelDisplay="auto"
                step={0.5}
                marks
                min={0}
                max={15}
              />
            </Grid>
          </Grid>
        );

      case 2:
        return (
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom>
                支出資料
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                required
                fullWidth
                label="房租/房貸 (每月/萬元)"
                name="rentMortgage"
                type="number"
                value={formData.rentMortgage}
                onChange={handleChange}
                InputProps={{
                  endAdornment: <Typography color="textSecondary">萬</Typography>
                }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                required
                fullWidth
                label="日常生活支出 (每月/萬元)"
                name="dailyExpenses"
                type="number"
                value={formData.dailyExpenses}
                onChange={handleChange}
                InputProps={{
                  endAdornment: <Typography color="textSecondary">萬</Typography>
                }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                required
                fullWidth
                label="交通支出 (每月/萬元)"
                name="transportation"
                type="number"
                value={formData.transportation}
                onChange={handleChange}
                InputProps={{
                  endAdornment: <Typography color="textSecondary">萬</Typography>
                }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                required
                fullWidth
                label="保險支出 (每月/萬元)"
                name="insurance"
                type="number"
                value={formData.insurance}
                onChange={handleChange}
                InputProps={{
                  endAdornment: <Typography color="textSecondary">萬</Typography>
                }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="教育支出 (每月/萬元)"
                name="education"
                type="number"
                value={formData.education}
                onChange={handleChange}
                InputProps={{
                  endAdornment: <Typography color="textSecondary">萬</Typography>
                }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="娛樂支出 (每月/萬元)"
                name="entertainment"
                type="number"
                value={formData.entertainment}
                onChange={handleChange}
                InputProps={{
                  endAdornment: <Typography color="textSecondary">萬</Typography>
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <Typography gutterBottom>
                預期年支出成長率 (%)
              </Typography>
              <Slider
                value={formData.expectedExpenseGrowth}
                onChange={handleSliderChange('expectedExpenseGrowth')}
                aria-labelledby="expense-growth-slider"
                valueLabelDisplay="auto"
                step={0.5}
                marks
                min={0}
                max={10}
              />
            </Grid>
          </Grid>
        );

      case 3:
        return (
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom>
                資產配置
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                required
                fullWidth
                label="現金存款 (萬元)"
                name="savings"
                type="number"
                value={formData.savings}
                onChange={handleChange}
                InputProps={{
                  endAdornment: <Typography color="textSecondary">萬</Typography>
                }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                required
                fullWidth
                label="股票投資 (萬元)"
                name="stocks"
                type="number"
                value={formData.stocks}
                onChange={handleChange}
                InputProps={{
                  endAdornment: <Typography color="textSecondary">萬</Typography>
                }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                required
                fullWidth
                label="債券投資 (萬元)"
                name="bonds"
                type="number"
                value={formData.bonds}
                onChange={handleChange}
                InputProps={{
                  endAdornment: <Typography color="textSecondary">萬</Typography>
                }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                required
                fullWidth
                label="不動產 (萬元)"
                name="realEstate"
                type="number"
                value={formData.realEstate}
                onChange={handleChange}
                InputProps={{
                  endAdornment: <Typography color="textSecondary">萬</Typography>
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <Typography variant="subtitle1" gutterBottom>
                預期年報酬率設定
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography gutterBottom>
                股票預期報酬率 (%)
              </Typography>
              <Slider
                value={formData.expectedStockReturn}
                onChange={handleSliderChange('expectedStockReturn')}
                aria-labelledby="stock-return-slider"
                valueLabelDisplay="auto"
                step={0.5}
                marks
                min={0}
                max={15}
              />
            </Grid>
            <Grid item xs={12}>
              <Typography gutterBottom>
                債券預期報酬率 (%)
              </Typography>
              <Slider
                value={formData.expectedBondReturn}
                onChange={handleSliderChange('expectedBondReturn')}
                aria-labelledby="bond-return-slider"
                valueLabelDisplay="auto"
                step={0.5}
                marks
                min={0}
                max={10}
              />
            </Grid>
            <Grid item xs={12}>
              <Typography gutterBottom>
                不動產預期報酬率 (%)
              </Typography>
              <Slider
                value={formData.expectedRealEstateReturn}
                onChange={handleSliderChange('expectedRealEstateReturn')}
                aria-labelledby="real-estate-return-slider"
                valueLabelDisplay="auto"
                step={0.5}
                marks
                min={0}
                max={10}
              />
            </Grid>
          </Grid>
        );

      case 4:
        return (
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom>
                未來規劃
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                multiline
                rows={4}
                label="重大支出規劃"
                name="plannedMajorExpenses"
                placeholder="請描述未來的重大支出計畫，例如：
2025年購屋頭期款 200萬
2026年結婚費用 100萬
2030年子女教育基金 150萬"
                value={formData.plannedMajorExpenses}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                multiline
                rows={4}
                label="生活方式改變"
                name="expectedLifestyleChanges"
                placeholder="請描述預期的生活方式改變，例如：
2026年結婚後每月支出增加 2萬
2028年生育後每月支出增加 3萬"
                value={formData.expectedLifestyleChanges}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
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
          </Grid>
        );

      default:
        return null;
    }
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
      <Paper sx={{ p: 3 }}>
        <Typography variant="h5" gutterBottom>
          詳細財務規劃表
        </Typography>
        
        <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>

        <form onSubmit={handleSubmit}>
          {renderStepContent(activeStep)}
          
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3 }}>
            {activeStep !== 0 && (
              <Button
                onClick={handleBack}
                sx={{ mr: 1 }}
              >
                上一步
              </Button>
            )}
            {activeStep === steps.length - 1 ? (
              <Button
                variant="contained"
                color="primary"
                type="submit"
              >
                提交
              </Button>
            ) : (
              <Button
                variant="contained"
                onClick={handleNext}
              >
                下一步
              </Button>
            )}
          </Box>
        </form>
      </Paper>
    </Container>
  );
}

export default DetailedFinancialForm;
