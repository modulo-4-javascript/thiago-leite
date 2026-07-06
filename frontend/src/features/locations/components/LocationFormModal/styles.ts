import { Modal } from 'antd'
import styled from 'styled-components'

export const FormModal = styled(Modal)`
  .ant-modal-content {
    border-radius: 16px;
  }
`

export const FormGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 16px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`

export const FullField = styled.div`
  grid-column: 1 / -1;
`
