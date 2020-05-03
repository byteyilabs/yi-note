import React from 'react'
import { useTranslation } from 'react-i18next'
import { Grid } from '@material-ui/core'
import TextButton from '../../components/TextButton'

const ReloadView = () => {
  const { t } = useTranslation('reloadView')

  const reload = () => window.location.reload()

  return (
    <Grid container>
      <TextButton onClick={reload}>{t('reload')}</TextButton>
    </Grid>
  )
}

export default ReloadView
