import styled, { css } from 'styled-components'

const baseHeadingStyles = css`
  color: ${({ theme }) => theme.primaryTextColor};
`

export const Heading1 = styled.h1`
  ${baseHeadingStyles}
  font-size: 38px;
`

export const Heading2 = styled.h2`
  ${baseHeadingStyles}
  font-size: 30px;
`

export const Heading3 = styled.h3`
  ${baseHeadingStyles}
  font-size: 24px;
`

export const Heading4 = styled.h4`
  ${baseHeadingStyles}
  font-size: 20px;
`
export const Heading5 = styled.h5`
  ${baseHeadingStyles}
  font-size: 16px;
`

export const Paragraph = styled.p`
  color: ${({ theme }) => theme.primaryTextColor};
  font-size: 14px;
`

export const SecondaryParagraph = styled(Paragraph)`
  color: ${({ theme }) => theme.secondaryTextColor};
`
