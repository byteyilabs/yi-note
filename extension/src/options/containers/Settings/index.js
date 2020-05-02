import React, { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useStoreActions } from 'easy-peasy'
import ExportAndImport from './ExportAndImport'

const Settings = () => {
  const { t } = useTranslation('options')
  const {
    app: { setTitle }
  } = useStoreActions(actions => actions)

  useEffect(() => {
    setTitle(t('settings.title'))
  }, [setTitle, t])

  return <ExportAndImport />
}

export default Settings
