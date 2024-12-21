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
} from '@mui/material';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

function CashFlowProjection({ data }) {
  // 將萬元轉換為元
  const toYuan = (wan) => wan * 10000;
  
  // 將元轉換為萬元（用於顯示）
  const toWan = (yuan) => yuan / 10000;

  // 計算未來30年的現金流量
  const calculateProjections = () => {
    const projections = [];
    const currentYear = new Date().getFullYear();
    const yearsToProject = 30;
    
    // 解析計劃中的重大支出（輸入時已經是以萬為單位）
    const majorExpenses = {};
    try {
      const expensesList = data.plannedMajorExpenses.split('\n');
      expensesList.forEach(expense => {
        const match = expense.match(/(\d{4})年(.+)(\d+)萬/);
        if (match) {
          const [_, year, description, amount] = match;
          if (!majorExpenses[year]) majorExpenses[year] = 0;
          majorExpenses[year] += Number(amount) * 10000; // 轉換為元
        }
      });
    } catch (e) {
      console.error('解析重大支出時出錯:', e);
    }

    // 解析生活方式改變（輸入時已經是以萬為單位）
    const lifestyleChanges = {};
    try {
      const changesList = data.expectedLifestyleChanges.split('\n');
      changesList.forEach(change => {
        const match = change.match(/(\d{4})年(.+)(\d+)萬/);
        if (match) {
          const [_, year, description, amount] = match;
          if (!lifestyleChanges[year]) lifestyleChanges[year] = 0;
          lifestyleChanges[year] += Number(amount) * 10000 * 12; // 轉換為年支出（元）
        }
      });
    } catch (e) {
      console.error('解析生活方式改變時出錯:', e);
    }

    // 初始值（轉換萬元為元）
    let currentSalary = toYuan(Number(data.monthlyIncome)) * 12;
    let currentBonus = toYuan(Number(data.yearEndBonus));
    let currentInvestmentIncome = toYuan(Number(data.investmentIncome)) * 12;
    let currentExpenses = (
      toYuan(Number(data.rentMortgage)) +
      toYuan(Number(data.dailyExpenses)) +
      toYuan(Number(data.transportation)) +
      toYuan(Number(data.insurance)) +
      toYuan(Number(data.education)) +
      toYuan(Number(data.entertainment))
    ) * 12; // 轉換為年支出（元）

    // 資產初始值（轉換萬元為元）
    let assets = {
      stocks: toYuan(Number(data.stocks)),
      bonds: toYuan(Number(data.bonds)),
      realEstate: toYuan(Number(data.realEstate)),
      savings: toYuan(Number(data.savings)),
    };

    for (let i = 0; i <= yearsToProject; i++) {
      const year = currentYear + i;
      
      // 計算當年收入
      const salary = currentSalary * Math.pow(1 + data.expectedSalaryGrowth / 100, i);
      const bonus = currentBonus * Math.pow(1 + data.expectedSalaryGrowth / 100, i);
      
      // 計算投資收益
      const stockReturn = assets.stocks * (data.expectedStockReturn / 100);
      const bondReturn = assets.bonds * (data.expectedBondReturn / 100);
      const realEstateReturn = assets.realEstate * (data.expectedRealEstateReturn / 100);
      const savingsReturn = assets.savings * (data.expectedCashReturn / 100);
      
      const investmentReturns = stockReturn + bondReturn + realEstateReturn + savingsReturn;
      
      // 計算當年支出
      let expenses = currentExpenses * Math.pow(1 + data.expectedExpenseGrowth / 100, i);
      
      // 加入生活方式改變造成的額外支出
      if (lifestyleChanges[year]) {
        expenses += lifestyleChanges[year];
      }
      
      // 計算當年現金流量
      const cashFlow = salary + bonus + investmentReturns - expenses;
      
      // 扣除重大支出
      const majorExpense = majorExpenses[year] || 0;
      const netCashFlow = cashFlow - majorExpense;
      
      // 更新資產價值（假設正現金流量按照資產配置比例投資）
      if (netCashFlow > 0) {
        const totalAssets = assets.stocks + assets.bonds + assets.realEstate + assets.savings;
        const stocksRatio = assets.stocks / totalAssets;
        const bondsRatio = assets.bonds / totalAssets;
        const realEstateRatio = assets.realEstate / totalAssets;
        const savingsRatio = assets.savings / totalAssets;
        
        assets.stocks += netCashFlow * stocksRatio;
        assets.bonds += netCashFlow * bondsRatio;
        assets.realEstate += netCashFlow * realEstateRatio;
        assets.savings += netCashFlow * savingsRatio;
      } else {
        // 負現金流量優先從現金提取
        assets.savings += netCashFlow;
        if (assets.savings < 0) {
          // 如果現金不足，按比例從其他資產提取
          const shortfall = -assets.savings;
          assets.savings = 0;
          const totalInvestments = assets.stocks + assets.bonds + assets.realEstate;
          const stocksRatio = assets.stocks / totalInvestments;
          const bondsRatio = assets.bonds / totalInvestments;
          const realEstateRatio = assets.realEstate / totalInvestments;
          
          assets.stocks -= shortfall * stocksRatio;
          assets.bonds -= shortfall * bondsRatio;
          assets.realEstate -= shortfall * realEstateRatio;
        }
      }

      // 計算總資產
      const totalAssets = assets.stocks + assets.bonds + assets.realEstate + assets.savings;
      
      // 將所有金額轉換為萬元後再存入
      projections.push({
        year,
        salary: toWan(Math.round(salary)),
        bonus: toWan(Math.round(bonus)),
        investmentReturns: toWan(Math.round(investmentReturns)),
        expenses: toWan(Math.round(expenses)),
        majorExpenses: toWan(Math.round(majorExpense)),
        netCashFlow: toWan(Math.round(netCashFlow)),
        totalAssets: toWan(Math.round(totalAssets)),
        stocks: toWan(Math.round(assets.stocks)),
        bonds: toWan(Math.round(assets.bonds)),
        realEstate: toWan(Math.round(assets.realEstate)),
        savings: toWan(Math.round(assets.savings)),
      });
    }
    
    return projections;
  };

  const projections = calculateProjections();

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('zh-TW', {
      style: 'decimal',
      minimumFractionDigits: 0,
      maximumFractionDigits: 1,
    }).format(value) + ' 萬';
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              資產成長預測
            </Typography>
            <LineChart
              width={800}
              height={400}
              data={projections}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="year" />
              <YAxis 
                tickFormatter={(value) => `${value}萬`}
                fontSize={12}
                width={45}
              />
              <Tooltip formatter={(value) => formatCurrency(value)} />
              <Legend />
              <Line type="monotone" dataKey="totalAssets" name="總資產" stroke="#8884d8" />
              <Line type="monotone" dataKey="netCashFlow" name="淨現金流量" stroke="#82ca9d" />
            </LineChart>
          </Paper>
        </Grid>

        <Grid item xs={12}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              詳細現金流量預測（單位：萬元）
            </Typography>
            <TableContainer>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>年度</TableCell>
                    <TableCell align="right">薪資收入</TableCell>
                    <TableCell align="right">投資收益</TableCell>
                    <TableCell align="right">支出</TableCell>
                    <TableCell align="right">重大支出</TableCell>
                    <TableCell align="right">淨現金流量</TableCell>
                    <TableCell align="right">總資產</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {projections.map((row) => (
                    <TableRow key={row.year}>
                      <TableCell>{row.year}</TableCell>
                      <TableCell align="right">{formatCurrency(row.salary + row.bonus)}</TableCell>
                      <TableCell align="right">{formatCurrency(row.investmentReturns)}</TableCell>
                      <TableCell align="right">{formatCurrency(row.expenses)}</TableCell>
                      <TableCell align="right">{formatCurrency(row.majorExpenses)}</TableCell>
                      <TableCell align="right">{formatCurrency(row.netCashFlow)}</TableCell>
                      <TableCell align="right">{formatCurrency(row.totalAssets)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Grid>

        <Grid item xs={12}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              資產配置預測（單位：萬元）
            </Typography>
            <LineChart
              width={800}
              height={400}
              data={projections}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="year" />
              <YAxis 
                tickFormatter={(value) => `${value}萬`}
                fontSize={12}
                width={45}
              />
              <Tooltip formatter={(value) => formatCurrency(value)} />
              <Legend />
              <Line type="monotone" dataKey="stocks" name="股票" stroke="#8884d8" />
              <Line type="monotone" dataKey="bonds" name="債券" stroke="#82ca9d" />
              <Line type="monotone" dataKey="realEstate" name="不動產" stroke="#ffc658" />
              <Line type="monotone" dataKey="savings" name="現金" stroke="#ff8042" />
            </LineChart>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}

export default CashFlowProjection;
