import React from 'react';
import {
  Container,
  Grid,
  Paper,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Box,
} from '@mui/material';

function FinancialAnalysis({ data }) {
  // 計算總收入
  const totalIncome = Number(data.monthlyIncome) + Number(data.investmentIncome) + Number(data.otherIncome);
  
  // 計算總支出
  const totalExpenses = Number(data.rentMortgage) + Number(data.dailyExpenses) + Number(data.transportation);
  
  // 計算總資產
  const totalAssets = Number(data.savings) + Number(data.stocks) + Number(data.bonds) + Number(data.realEstate);

  // 計算各項收入佔比
  const monthlyIncomePercent = ((Number(data.monthlyIncome) / totalIncome) * 100).toFixed(1);
  const investmentIncomePercent = ((Number(data.investmentIncome) / totalIncome) * 100).toFixed(1);
  const otherIncomePercent = ((Number(data.otherIncome) / totalIncome) * 100).toFixed(1);

  // 計算各項支出佔比
  const rentMortgagePercent = ((Number(data.rentMortgage) / totalExpenses) * 100).toFixed(1);
  const dailyExpensesPercent = ((Number(data.dailyExpenses) / totalExpenses) * 100).toFixed(1);
  const transportationPercent = ((Number(data.transportation) / totalExpenses) * 100).toFixed(1);

  // 計算財務比率
  const savingsRate = (((totalIncome - totalExpenses) / totalIncome) * 100).toFixed(1);
  const debtToAssetRatio = (Number(data.totalDebt || 0) / totalAssets * 100).toFixed(1);
  const monthlyIncomeToExpenseRatio = (totalIncome / totalExpenses).toFixed(2);

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Grid container spacing={3}>
        {/* 收入分析 */}
        <Grid item xs={12}>
          <Paper sx={{ p: 2 }}>
            <Typography component="h2" variant="h6" color="primary" gutterBottom>
              收入分析
            </Typography>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>收入來源</TableCell>
                    <TableCell align="right">金額 (TWD)</TableCell>
                    <TableCell align="right">佔比</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell>薪資收入</TableCell>
                    <TableCell align="right">{Number(data.monthlyIncome).toLocaleString()}</TableCell>
                    <TableCell align="right">{monthlyIncomePercent}%</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>投資收入</TableCell>
                    <TableCell align="right">{Number(data.investmentIncome).toLocaleString()}</TableCell>
                    <TableCell align="right">{investmentIncomePercent}%</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>其他收入</TableCell>
                    <TableCell align="right">{Number(data.otherIncome).toLocaleString()}</TableCell>
                    <TableCell align="right">{otherIncomePercent}%</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell><strong>總收入</strong></TableCell>
                    <TableCell align="right"><strong>{totalIncome.toLocaleString()}</strong></TableCell>
                    <TableCell align="right"><strong>100%</strong></TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Grid>

        {/* 支出分析 */}
        <Grid item xs={12}>
          <Paper sx={{ p: 2 }}>
            <Typography component="h2" variant="h6" color="primary" gutterBottom>
              支出分析
            </Typography>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>支出項目</TableCell>
                    <TableCell align="right">金額 (TWD)</TableCell>
                    <TableCell align="right">佔比</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell>房租/房貸</TableCell>
                    <TableCell align="right">{Number(data.rentMortgage).toLocaleString()}</TableCell>
                    <TableCell align="right">{rentMortgagePercent}%</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>日常生活</TableCell>
                    <TableCell align="right">{Number(data.dailyExpenses).toLocaleString()}</TableCell>
                    <TableCell align="right">{dailyExpensesPercent}%</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>交通</TableCell>
                    <TableCell align="right">{Number(data.transportation).toLocaleString()}</TableCell>
                    <TableCell align="right">{transportationPercent}%</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell><strong>總支出</strong></TableCell>
                    <TableCell align="right"><strong>{totalExpenses.toLocaleString()}</strong></TableCell>
                    <TableCell align="right"><strong>100%</strong></TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Grid>

        {/* 財務健康指標 */}
        <Grid item xs={12}>
          <Paper sx={{ p: 2 }}>
            <Typography component="h2" variant="h6" color="primary" gutterBottom>
              財務健康指標
            </Typography>
            <Box sx={{ mt: 2 }}>
              <Typography variant="body1" gutterBottom>
                • 儲蓄率：{savingsRate}%
                {savingsRate > 20 ? 
                  ' (優良 - 建議維持現有儲蓄習慣)' : 
                  savingsRate > 10 ? 
                    ' (尚可 - 建議適度提高儲蓄)' : 
                    ' (偏低 - 建議檢視支出，提高儲蓄)'}
              </Typography>
              <Typography variant="body1" gutterBottom>
                • 負債比率：{debtToAssetRatio}%
                {debtToAssetRatio < 30 ? 
                  ' (健康 - 財務狀況穩健)' : 
                  debtToAssetRatio < 50 ? 
                    ' (警戒 - 建議控制負債)' : 
                    ' (危險 - 建議立即降低負債)'}
              </Typography>
              <Typography variant="body1" gutterBottom>
                • 收支比：{monthlyIncomeToExpenseRatio}
                {monthlyIncomeToExpenseRatio > 1.5 ? 
                  ' (優良 - 有良好的收支平衡)' : 
                  monthlyIncomeToExpenseRatio > 1.2 ? 
                    ' (尚可 - 建議持續維持)' : 
                    ' (偏低 - 建議增加收入或減少支出)'}
              </Typography>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}

export default FinancialAnalysis;
