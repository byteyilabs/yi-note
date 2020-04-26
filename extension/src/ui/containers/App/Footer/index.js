import React from 'react'
import { useStoreState } from 'easy-peasy'
import styled from 'styled-components'
import { useTranslation } from 'react-i18next'
import Grid from '@material-ui/core/Grid'
import { Github as GithubIcon } from 'styled-icons/boxicons-logos/Github'
import IconButton from '../../../components/IconButton'
import { GITHUB_URL } from '../../../../constants'

const StyledContainer = styled(Grid)`
  padding: 10px 5px;
  background: #fafafa;
`

const Footer = () => {
  const { t } = useTranslation('footer')
  const { version } = useStoreState(state => state.app)

  const openGithubRepo = () => {
    window.open(GITHUB_URL, '_blank')
  }

  return (
    <StyledContainer
      container
      justify="space-between"
      spacing={1}
      alignItems="center"
    >
      <Grid item>{t('version', { version })}</Grid>
      <Grid item>
        <IconButton tooltip={t('githubTooltip')} onClick={openGithubRepo}>
          <GithubIcon />
        </IconButton>
      </Grid>
    </StyledContainer>
  )
}

export default Footer
