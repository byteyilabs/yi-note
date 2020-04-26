import React from 'react'
import TextButton from '../../components/TextButton'

const ReloadView = () => {
  const reload = () => window.location.reload()

  return (
    <TextButton onClick={reload}>Reload</TextButton>
  )
}

export default ReloadView
