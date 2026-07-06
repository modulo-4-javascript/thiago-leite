import { useCallback, useEffect, useState } from 'react'
import type { RequestState } from '../../../shared/hooks/requestState'
import { getRequestErrorMessage } from '../../../shared/http/getRequestErrorMessage'
import { locationService } from '../services/locationService'
import type { LocationEquipment, PaginatedResult } from '../types/location'

export function useLocationEquipment(
  locationId?: string,
  params: { page?: number; pageSize?: number } = {},
): RequestState<PaginatedResult<LocationEquipment>> {
  const [data, setData] = useState<PaginatedResult<LocationEquipment>>()
  const [isLoading, setIsLoading] = useState(Boolean(locationId))
  const [errorMessage, setErrorMessage] = useState('')

  const loadLocationEquipment = useCallback(async () => {
    if (!locationId) {
      setIsLoading(false)
      return
    }

    setIsLoading(true)
    setErrorMessage('')

    try {
      const result = await locationService.getLocationEquipment(locationId, params)
      setData(result)
    } catch (error) {
      setErrorMessage(getRequestErrorMessage(error))
    } finally {
      setIsLoading(false)
    }
  }, [locationId, params.page, params.pageSize])

  useEffect(() => {
    void Promise.resolve().then(loadLocationEquipment)
  }, [loadLocationEquipment])

  return {
    data,
    isLoading,
    errorMessage,
    reload: loadLocationEquipment,
  }
}
