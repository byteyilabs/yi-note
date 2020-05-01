import React from 'react'
import PropTypes from 'prop-types'
import { useTranslation } from 'react-i18next'
import { 
  Grid, 
  Link, 
  Typography
} from '@material-ui/core'
import { secondsToTime } from '../../../../common/utils'

const getUrlWithTimeQuery = (url, timestamp) => {
  const parsedUrl = new URL(url)
  parsedUrl.search = parsedUrl.search 
    ? `${parsedUrl.search}&yinote-timestamp=${timestamp}` 
    : `?yinote-timestamp=${timestamp}`
  return parsedUrl.toString()
}

const NoteItem = ({ id, content, timestamp, image, url }) => {
  const { t } = useTranslation('')

  return (
    <Grid container>
      <Grid item md={6} sm={8} xs={12}>
        <img src={image} alt="Screenshot" />
      </Grid>
      <Grid item md={6} sm={4} xs={12}>
        <Link href={getUrlWithTimeQuery(url, timestamp)} target="_blank">
          {secondsToTime(timestamp)}
        </Link>
        <Typography variant="body1">{content}</Typography>
      </Grid>
    </Grid>
  )
}

NoteItem.propTypes = {
  id: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  timestamp: PropTypes.number.isRequired,
  image: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired
}

export default NoteItem
