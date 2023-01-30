export const defaultTheme = {
  defaultBackgroundColor: '#f0f2f5',
  dangerColor: '#f5222d',
  secondaryBackgroundColor: '#fff',
  borderColor: '',
  primaryColor: '#3f51b5',
  primaryTextColor: '#000',
  secondaryColor: '',
  secondaryTextColor: 'rgba(0, 0, 0, 0.65)',
  borderRadius: '7px',
  defaultIconFonSize: '18px',
  secondaryIconFontSize: '25px',
  successColor: '#52c41a',
  grayColor: '#bfbfbf',
  iconStyle: {
    color: '#000',
    fontSize: '25px',
  },
  boxShadow:
    '0px 3px 5px -1px rgba(0, 0, 0, 0.2),0px 6px 10px 0px rgba(0, 0, 0, 0.14), 0px 1px 18px 0px rgba(0, 0, 0, 0.12)',
  boxShadowBottom:
    '0 4px 2px -2px  rgba(0, 0, 0, 0.14), 0 0px 2px 0px rgba(0, 0, 0, 0.12)',
}

const screenSizes = {
  s: 375,
  m: 768,
  l: 1000,
  xl: 1440,
  xxl: 1920,
}

export const mediaQueries = {
  s: `@media screen and (min-width: ${screenSizes.s + 1}px)`,
  m: `@media screen and (min-width: ${screenSizes.m + 1}px)`,
  l: `@media screen and (min-width: ${screenSizes.l + 1}px)`,
  xl: `@media screen and (min-width: ${screenSizes.xl + 1}px)`,
  xxl: `@media screen and (min-width: ${screenSizes.xxl + 1}px)`,
}

export const maxDesktopWidth = '1180px'

export const defaultBreakpoints = {
  xs: 24,
  sm: 24,
  md: 12,
  lg: 12,
  xl: 12,
  xxl: 12,
}
export const defaultFullBreakpoints = {
  xs: 24,
  sm: 24,
  md: 12,
  lg: 12,
  xl: 20,
  xxl: 24,
}

export const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 },
    md: { span: 4 },
    lg: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 24 },
  },
}

export const labelColFullWidth = {
  labelCol: {
    xs: { span: 2 },
    sm: { span: 8 },
    md: { span: 4 },
  },
}

export const defaultBreakpointsForInputGroupLeft = {
  xs: 24,
  sm: 8,
}

export const defaultBreakpointsForInputGroupRight = {
  xs: 24,
  sm: 16,
}
