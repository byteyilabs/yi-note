import React from 'react'
import { useTranslation } from 'react-i18next'
import TextButton from '../../components/TextButton'

const ReloadView = () => {
  const { t } = useTranslation('reloadView')

  const reload = () => window.location.reload()

  return (
    <TextButton onClick={reload}>{t('reload')}</TextButton>
  )
}

export default ReloadView
