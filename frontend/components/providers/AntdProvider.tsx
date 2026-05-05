'use client';

import { ConfigProvider, theme } from 'antd';
import React from 'react';

const amdTheme = {
  algorithm: theme.darkAlgorithm,
  token: {
    colorPrimary: '#E30913',
    colorBgBase: '#07070F',
    colorBgContainer: '#0D0D1A',
    colorBgElevated: '#1A1A2E',
    colorBorder: 'rgba(255,255,255,0.06)',
    colorText: '#F0F0FF',
    colorTextSecondary: '#8888AA',
    fontFamily: "'Rajdhani', sans-serif",
    borderRadius: 2,
    wireframe: false,
  },
  components: {
    Button: { colorPrimary: '#E30913', algorithm: true },
    Input: {
      colorBgContainer: '#0D0D1A',
      activeBorderColor: '#E30913',
      hoverBorderColor: 'rgba(227,9,19,0.5)',
    },
  },
};

export default function AntdProvider({ children }: { children: React.ReactNode }) {
  return <ConfigProvider theme={amdTheme}>{children}</ConfigProvider>;
}
