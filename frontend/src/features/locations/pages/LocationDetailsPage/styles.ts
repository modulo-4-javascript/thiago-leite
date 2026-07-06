import { Button, Card } from 'antd'
import styled from 'styled-components'

interface StatusBadgeProps {
  $status: 'ACTIVE' | 'INACTIVE'
}

export const Container = styled.section`
  width: 100%;
  max-width: 1440px;
`

export const StarterBox = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 24px;
  border: 1px dashed #b7c6d8;
  border-radius: 8px;
  background: #fff;
  color: #6b7280;
  font-size: 14px;
  line-height: 22px;
`

export const HeaderContainer = styled.header`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 24px;
  margin-bottom: 24px;

  @media (max-width: 900px) {
    flex-direction: column;
  }
`

export const TitleGroup = styled.div`
  min-width: 0;
`

export const BackButton = styled(Button)`
  &.ant-btn {
    margin-bottom: 16px;
    padding-inline: 0;
    color: #6b7280;
    font-weight: 600;
  }
`

export const TitleRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 12px;
`

export const Title = styled.h2`
  margin: 0;
  color: #002a64;
  font-size: 32px;
  font-weight: 700;
  line-height: 40px;
`

export const StatusBadge = styled.span<StatusBadgeProps>`
  display: inline-flex;
  align-items: center;
  height: 28px;
  padding: 0 10px;
  border-radius: 999px;
  color: ${({ $status }) => ($status === 'ACTIVE' ? '#047857' : '#b45309')};
  background: ${({ $status }) => ($status === 'ACTIVE' ? '#ecfdf5' : '#fffbeb')};
  font-size: 12px;
  font-weight: 700;
  line-height: 1;
`

export const Code = styled.span`
  display: block;
  margin-top: 4px;
  color: #6b7280;
  font-family: 'SFMono-Regular', Consolas, 'Liberation Mono', monospace;
  font-size: 13px;
  line-height: 20px;
`

export const Actions = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-end;
  gap: 12px;

  @media (max-width: 900px) {
    justify-content: flex-start;
  }
`

export const BrandButton = styled(Button)`
  &.ant-btn {
    border: 0;
    color: #ffffff;
    background: linear-gradient(90deg, #002a64, #007c8c);
    box-shadow: 0 4px 8px rgb(0 42 100 / 12%);
  }

  &.ant-btn:hover,
  &.ant-btn:focus {
    color: #ffffff !important;
    background: linear-gradient(90deg, #003f8f, #007c8c) !important;
  }
`

export const SummaryGrid = styled.section`
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 16px;
  margin-bottom: 24px;

  @media (max-width: 1100px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media (max-width: 700px) {
    grid-template-columns: 1fr;
  }
`

export const SummaryCard = styled(Card)`
  &.ant-card {
    border-color: #dde6ee;
    box-shadow: 0 1px 2px rgb(17 24 39 / 5%);
  }
`

export const Label = styled.span`
  display: block;
  color: #6b7280;
  font-size: 13px;
  font-weight: 600;
  line-height: 20px;
`

export const Value = styled.strong`
  display: block;
  margin-top: 6px;
  color: #111827;
  font-size: 20px;
  font-weight: 700;
  line-height: 28px;
`

export const Description = styled.span`
  display: block;
  margin-top: 4px;
  color: #6b7280;
  font-size: 12px;
  line-height: 18px;
`

export const ContentGrid = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 2fr) minmax(360px, 0.85fr);
  align-items: stretch;
  gap: 24px;

  @media (max-width: 1100px) {
    grid-template-columns: 1fr;
  }
`

export const MainColumn = styled.div`
  display: grid;
  gap: 24px;
`

export const SideColumn = styled.aside`
  display: flex;
  flex-direction: column;
  align-self: stretch;
`

export const PanelCard = styled(Card)`
  &.ant-card {
    border-color: #dde6ee;
    box-shadow: 0 1px 2px rgb(17 24 39 / 5%);
  }

  .ant-card-body {
    padding: 16px 20px 20px;
  }

  ul {
    margin: 12px 0 0;
    padding-left: 18px;
  }
`
