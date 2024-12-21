import React from 'react';
import {
  Container,
  Grid,
  Paper,
  Typography,
  Box,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Alert,
  Card,
  CardContent,
} from '@mui/material';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import WarningIcon from '@mui/icons-material/Warning';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import PriorityHighIcon from '@mui/icons-material/PriorityHigh';

function PlanningAdvice({ data }) {
  // 計算每月總收入
  const monthlyTotalIncome = parseFloat(data.monthlyIncome || 0) +
    (parseFloat(data.yearEndBonus || 0) / 12) +
    (parseFloat(data.investmentIncome || 0) / 12) +
    (parseFloat(data.otherIncome || 0) / 12);

  // 計算每月總支出
  const monthlyTotalExpenses = parseFloat(data.rentMortgage || 0) +
    parseFloat(data.dailyExpenses || 0) +
    parseFloat(data.transportation || 0) +
    parseFloat(data.insurance || 0) +
    parseFloat(data.education || 0) +
    parseFloat(data.entertainment || 0) +
    parseFloat(data.otherExpenses || 0);

  // 計算總資產
  const totalAssets = parseFloat(data.savings || 0) +
    parseFloat(data.stocks || 0) +
    parseFloat(data.bonds || 0) +
    parseFloat(data.realEstate || 0) +
    parseFloat(data.otherAssets || 0);

  // 計算總負債
  const totalDebt = parseFloat(data.totalDebt || 0);

  // 計算淨資產
  const netWorth = totalAssets - totalDebt;

  // 計算儲蓄率
  const savingsRate = ((monthlyTotalIncome - monthlyTotalExpenses) / monthlyTotalIncome) * 100;

  // 計算債務收入比
  const debtToIncomeRatio = (parseFloat(data.monthlyDebtPayment || 0) / monthlyTotalIncome) * 100;

  // 根據年齡計算建議的資產配置
  const age = parseInt(data.age || 0);
  const suggestedStockAllocation = Math.max(0, Math.min(100, 110 - age));
  const suggestedBondAllocation = 100 - suggestedStockAllocation;

  // 生成個性化建議
  const generateAdvice = () => {
    const advice = [];
    
    // 緊急基金建議
    const emergencyFundNeeded = monthlyTotalExpenses * 6;
    const currentEmergencyFund = parseFloat(data.savings || 0);
    if (currentEmergencyFund < emergencyFundNeeded) {
      advice.push({
        type: 'warning',
        title: '緊急基金不足',
        content: `建議維持${Math.round(emergencyFundNeeded)}萬元的緊急基金（約6個月支出）。目前差距：${Math.round(emergencyFundNeeded - currentEmergencyFund)}萬元。`,
        priority: 1
      });
    }

    // 儲蓄率建議
    if (savingsRate < 20) {
      advice.push({
        type: 'warning',
        title: '儲蓄率偏低',
        content: `目前儲蓄率為${Math.round(savingsRate)}%，建議提高到至少20%。可以考慮檢視非必要支出，或尋找額外收入來源。`,
        priority: 2
      });
    } else if (savingsRate >= 20) {
      advice.push({
        type: 'success',
        title: '良好的儲蓄習慣',
        content: `您的儲蓄率為${Math.round(savingsRate)}%，繼續保持這個好習慣！`,
        priority: 5
      });
    }

    // 債務建議
    if (debtToIncomeRatio > 30) {
      advice.push({
        type: 'error',
        title: '債務負擔過重',
        content: `您的債務收入比為${Math.round(debtToIncomeRatio)}%，超過建議的30%。請考慮制定債務清償計劃。`,
        priority: 1
      });
    }

    // 投資組合建議
    const currentStockAllocation = parseFloat(data.stocksAllocation || 0);
    if (Math.abs(currentStockAllocation - suggestedStockAllocation) > 10) {
      advice.push({
        type: 'info',
        title: '投資組合配置建議',
        content: `根據您的年齡，建議的股票配置為${Math.round(suggestedStockAllocation)}%，債券配置為${Math.round(suggestedBondAllocation)}%。請考慮調整您的投資組合。`,
        priority: 3
      });
    }

    // 退休規劃建議
    const yearsToRetirement = parseInt(data.retirementAge || 0) - age;
    const monthlyRetirementNeeded = monthlyTotalExpenses * 0.7; // 假設退休後需要70%的現有支出
    const retirementFundNeeded = monthlyRetirementNeeded * 12 * 25; // 25年退休生活
    
    if (yearsToRetirement > 0) {
      const monthlyRetirementSavingNeeded = (retirementFundNeeded - netWorth) / (yearsToRetirement * 12);
      if (monthlyRetirementSavingNeeded > 0) {
        advice.push({
          type: 'info',
          title: '退休規劃建議',
          content: `距離退休還有${yearsToRetirement}年，建議每月額外儲存${Math.round(monthlyRetirementSavingNeeded)}萬元作為退休基金。`,
          priority: 2
        });
      }
    }

    // 保險建議
    const monthlyInsurance = parseFloat(data.insurance || 0);
    if (monthlyInsurance < monthlyTotalIncome * 0.1) {
      advice.push({
        type: 'warning',
        title: '保險保障建議',
        content: '您的保險支出偏低，建議檢視是否有足夠的保障，特別是意外、醫療和重大疾病保險。',
        priority: 3
      });
    }

    // 根據職業給予特別建議
    if (data.occupation) {
      const occupationLowerCase = data.occupation.toLowerCase();
      if (occupationLowerCase.includes('自由') || occupationLowerCase.includes('freelance')) {
        advice.push({
          type: 'info',
          title: '自由工作者建議',
          content: '建議增加緊急基金至12個月支出，並考慮投保職業傷害險和收入中斷險。',
          priority: 2
        });
      }
    }

    // 排序建議（優先級高的在前）
    return advice.sort((a, b) => a.priority - b.priority);
  };

  const advice = generateAdvice();

  const getAlertSeverity = (type) => {
    switch (type) {
      case 'error': return 'error';
      case 'warning': return 'warning';
      case 'success': return 'success';
      default: return 'info';
    }
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h4" gutterBottom>
              個人化財務建議
            </Typography>
            <Typography variant="body1" paragraph>
              根據您提供的財務資料，我們為您生成了以下建議：
            </Typography>
          </Paper>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                財務概況
              </Typography>
              <List>
                <ListItem>
                  <ListItemIcon>
                    <TrendingUpIcon />
                  </ListItemIcon>
                  <ListItemText 
                    primary="月收入"
                    secondary={`${Math.round(monthlyTotalIncome)}萬元`}
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <AccountBalanceIcon />
                  </ListItemIcon>
                  <ListItemText 
                    primary="淨資產"
                    secondary={`${Math.round(netWorth)}萬元`}
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <PriorityHighIcon />
                  </ListItemIcon>
                  <ListItemText 
                    primary="儲蓄率"
                    secondary={`${Math.round(savingsRate)}%`}
                  />
                </ListItem>
              </List>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={8}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {advice.map((item, index) => (
              <Alert 
                key={index} 
                severity={getAlertSeverity(item.type)}
                sx={{ '& .MuiAlert-message': { width: '100%' } }}
              >
                <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 0.5 }}>
                  {item.title}
                </Typography>
                <Typography variant="body2">
                  {item.content}
                </Typography>
              </Alert>
            ))}
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
}

export default PlanningAdvice;
