import ArrowBackOutlined from '@mui/icons-material/ArrowBackOutlined'
import AutorenewOutlined from '@mui/icons-material/AutorenewOutlined'
import DeleteOutlineOutlined from '@mui/icons-material/DeleteOutlineOutlined'
import EditOutlined from '@mui/icons-material/EditOutlined'
import { Alert, App as AntDesignApp, Button, Spin } from 'antd'
import { useMemo, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { AppLayout } from '../../../../app/layout/AppLayout'
import { getRequestErrorMessage } from '../../../../shared/http/getRequestErrorMessage'
import { LocationFormModal, type LocationFormValues } from '../../components/LocationFormModal'
import { LocationRemoveModal } from '../../components/LocationRemoveModal'
import { LocationStatusModal, type LocationStatusFormValues } from '../../components/LocationStatusModal'
import { useDeleteLocation } from '../../hooks/useDeleteLocation'
import { useLocationDetails } from '../../hooks/useLocationDetails'
import { useLocationEquipment } from '../../hooks/useLocationEquipment'
import { useLocationHistory } from '../../hooks/useLocationHistory'
import { useUpdateLocation } from '../../hooks/useUpdateLocation'
import { useUpdateLocationStatus } from '../../hooks/useUpdateLocationStatus'
import {
  getLocationStatusLabel,
  getLocationTypeLabel,
  locationStatusOptions,
  locationTypeOptions,
  type CreateLocationPayload,
  type LocationDetails,
} from '../../types/location'
import {
  Actions,
  BackButton,
  BrandButton,
  Code,
  Container,
  ContentGrid,
  Description,
  HeaderContainer,
  Label,
  MainColumn,
  PanelCard,
  SideColumn,
  StarterBox,
  StatusBadge,
  SummaryCard,
  SummaryGrid,
  Title,
  TitleGroup,
  TitleRow,
  Value,
} from './styles'

function buildSummaryCards(location: LocationDetails): Array<{
  id: string
  title: string
  value: string
  description: string
}> {
  return [
    {
      id: 'type',
      title: 'Tipo',
      value: getLocationTypeLabel(location.type),
      description: 'Categoria do local',
    },
    {
      id: 'status',
      title: 'Situação',
      value: getLocationStatusLabel(location.status),
      description: 'Status atual',
    },
    {
      id: 'equipmentCount',
      title: 'Equipamentos',
      value: String(location.equipmentCount),
      description: 'Vinculados ao local',
    },
    {
      id: 'updatedAt',
      title: 'Atualizado',
      value: new Intl.DateTimeFormat('pt-BR', { dateStyle: 'short' }).format(new Date(location.updatedAt)),
      description: 'Última alteração',
    },
  ]
}

export function LocationDetailsPage() {
  const { message: messageApi } = AntDesignApp.useApp()
  const navigate = useNavigate()
  const { locationId } = useParams()
  const [locationInForm, setLocationInForm] = useState<LocationDetails>()
  const [locationInStatus, setLocationInStatus] = useState<LocationDetails>()
  const [locationToRemove, setLocationToRemove] = useState<LocationDetails>()

  const locationQuery = useLocationDetails(locationId)
  const equipmentQuery = useLocationEquipment(locationId)
  const historyQuery = useLocationHistory(locationId)
  const updateLocation = useUpdateLocation()
  const updateLocationStatus = useUpdateLocationStatus()
  const deleteLocation = useDeleteLocation()

  const location = locationQuery.data
  const equipmentItems = equipmentQuery.data?.data ?? []
  const historyItems = historyQuery.data?.data ?? []
  const isLoading = locationQuery.isLoading || equipmentQuery.isLoading || historyQuery.isLoading
  const loadError = locationQuery.errorMessage || equipmentQuery.errorMessage || historyQuery.errorMessage
  const isSavingForm = updateLocation.isLoading
  const isSavingStatus = updateLocationStatus.isLoading
  const isRemovingLocation = deleteLocation.isLoading

  const summaryCards = useMemo(() => (location ? buildSummaryCards(location) : []), [location])

  function handleEditLocation() {
    if (location) {
      setLocationInForm(location)
    }
  }

  function handleChangeStatus() {
    if (location) {
      setLocationInStatus(location)
    }
  }

  async function handleSubmitLocationForm(values: LocationFormValues) {
    if (!locationInForm) {
      return
    }

    const payload: CreateLocationPayload = {
      code: values.code.trim(),
      name: values.name.trim(),
      type: values.type ?? 'OTHER',
      building: values.building?.trim() || undefined,
      floor: values.floor?.trim() || undefined,
      room: values.room?.trim() || undefined,
      description: values.description?.trim() || null,
      status: values.status,
    }

    try {
      await updateLocation.update({
        locationId: locationInForm.id,
        payload,
      })
      await locationQuery.reload()
      messageApi.success('Local atualizado com sucesso.')
      setLocationInForm(undefined)
    } catch (error) {
      messageApi.error(getRequestErrorMessage(error))
    }
  }

  async function handleSubmitStatusModal(values: LocationStatusFormValues) {
    if (!locationInStatus) {
      return
    }

    try {
      await updateLocationStatus.updateStatus({
        locationId: locationInStatus.id,
        payload: {
          status: values.status,
          note: values.note?.trim() || null,
        },
      })
      await locationQuery.reload()
      messageApi.success('Status atualizado com sucesso.')
      setLocationInStatus(undefined)
    } catch (error) {
      messageApi.error(getRequestErrorMessage(error))
    }
  }

  async function handleConfirmRemoveLocation() {
    if (!locationToRemove) {
      return
    }

    try {
      await deleteLocation.remove(locationToRemove.id)
      messageApi.success('Local excluído com sucesso.')
      setLocationToRemove(undefined)
      navigate('/locations')
    } catch (error) {
      messageApi.error(getRequestErrorMessage(error))
    }
  }

  if (isLoading) {
    return (
      <AppLayout currentPage="Detalhes">
        <Container>
          <StarterBox>
            <Spin /> Carregando local...
          </StarterBox>
        </Container>
      </AppLayout>
    )
  }

  if (loadError || !location) {
    return (
      <AppLayout currentPage="Detalhes">
        <Container>
          <Alert
            showIcon
            message="Local não encontrado"
            description={loadError || 'Não foi possível exibir este local.'}
            type="error"
          />
        </Container>
      </AppLayout>
    )
  }

  return (
    <AppLayout currentPage="Detalhes">
      <Container>
        <HeaderContainer>
          <TitleGroup>
            <BackButton icon={<ArrowBackOutlined fontSize="small" />} type="text" onClick={() => navigate('/locations')}>
              Voltar para localizações
            </BackButton>

            <TitleRow>
              <Title>{location.name}</Title>
              <StatusBadge $status={location.status}>{getLocationStatusLabel(location.status)}</StatusBadge>
            </TitleRow>

            <Code>{location.code}</Code>
          </TitleGroup>

          <Actions>
            <BrandButton type="primary" icon={<EditOutlined fontSize="small" />} onClick={handleEditLocation}>
              Editar
            </BrandButton>

            <Button icon={<AutorenewOutlined fontSize="small" />} onClick={handleChangeStatus}>
              Alterar status
            </Button>

            <Button danger icon={<DeleteOutlineOutlined fontSize="small" />} onClick={() => setLocationToRemove(location)}>
              Excluir
            </Button>
          </Actions>
        </HeaderContainer>

        <SummaryGrid aria-label="Resumo do local">
          {summaryCards.map((card) => (
            <SummaryCard key={card.id} styles={{ body: { padding: 16 } }}>
              <Label>{card.title}</Label>
              <Value>{card.value}</Value>
              <Description>{card.description}</Description>
            </SummaryCard>
          ))}
        </SummaryGrid>

        <ContentGrid>
          <MainColumn>
            <PanelCard title="Equipamentos vinculados">
              {equipmentItems.length === 0 ? (
                <Alert type="info" message="Nenhum equipamento vinculado a este local." />
              ) : (
                <ul>
                  {equipmentItems.map((equipment) => (
                    <li key={equipment.id}>{equipment.name}</li>
                  ))}
                </ul>
              )}
            </PanelCard>
          </MainColumn>

          <SideColumn>
            <PanelCard title="Histórico">
              {historyItems.length === 0 ? (
                <Alert type="info" message="Nenhum histórico disponível." />
              ) : (
                <ul>
                  {historyItems.map((historyItem) => (
                    <li key={historyItem.id}>{historyItem.description}</li>
                  ))}
                </ul>
              )}
            </PanelCard>
          </SideColumn>
        </ContentGrid>

        <LocationFormModal
          location={locationInForm}
          mode="edit"
          open={Boolean(locationInForm)}
          confirmLoading={isSavingForm}
          statusOptions={locationStatusOptions}
          typeOptions={locationTypeOptions}
          onCancel={() => setLocationInForm(undefined)}
          onSubmit={handleSubmitLocationForm}
        />

        <LocationStatusModal
          location={locationInStatus}
          open={Boolean(locationInStatus)}
          confirmLoading={isSavingStatus}
          statusOptions={locationStatusOptions}
          onCancel={() => setLocationInStatus(undefined)}
          onSubmit={handleSubmitStatusModal}
        />

        <LocationRemoveModal
          location={locationToRemove}
          open={Boolean(locationToRemove)}
          confirmLoading={isRemovingLocation}
          onCancel={() => setLocationToRemove(undefined)}
          onConfirm={handleConfirmRemoveLocation}
        />
      </Container>
    </AppLayout>
  )
}
