import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Dashboard from './components/Dashboard';
import FinancialAnalysis from './components/FinancialAnalysis';
import PlanningAdvice from './components/PlanningAdvice';
import DetailedFinancialForm from './components/DetailedFinancialForm';
import CashFlowProjection from './components/CashFlowProjection';
import ThemeSelector from './components/ThemeSelector';
import Layout from './components/Layout';
import {
  defaultTheme,
  darkTheme,
  warmTheme,
  professionalTheme,
  techTheme,
  natureTheme,
} from './themes';

const themes = {
  default: defaultTheme,
  dark: darkTheme,
  warm: warmTheme,
  professional: professionalTheme,
  tech: techTheme,
  nature: natureTheme,
};

function App() {
  const [financialData, setFinancialData] = useState(null);
  const [currentTheme, setCurrentTheme] = useState('default');

  const handleFormSubmit = (data) => {
    setFinancialData(data);
  };

  const handleThemeChange = (themeName) => {
    setCurrentTheme(themeName);
  };

  const themeSelector = (
    <ThemeSelector
      currentTheme={currentTheme}
      onThemeChange={handleThemeChange}
    />
  );

  return (
    <ThemeProvider theme={themes[currentTheme]}>
      <CssBaseline />
      <Router>
        <Layout themeSelector={themeSelector}>
          <Routes>
            <Route 
              path="/form" 
              element={
                <DetailedFinancialForm 
                  onSubmit={handleFormSubmit}
                  initialData={financialData}
                />
              } 
            />
            {!financialData ? (
              <Route
                path="*"
                element={<Navigate to="/form" replace />}
              />
            ) : (
              <>
                <Route path="/" element={<Dashboard data={financialData} />} />
                <Route path="/analysis" element={<FinancialAnalysis data={financialData} />} />
                <Route path="/planning" element={<PlanningAdvice data={financialData} />} />
                <Route path="/projection" element={<CashFlowProjection data={financialData} />} />
                <Route
                  path="*"
                  element={<Navigate to="/" replace />}
                />
              </>
            )}
          </Routes>
        </Layout>
      </Router>
    </ThemeProvider>
  );
}

export default App;
