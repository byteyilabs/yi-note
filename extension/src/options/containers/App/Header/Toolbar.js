import React from 'react'
import { useLocation } from 'react-router-dom'
import BookmarksToolbar from '../../Bookmarks/Toolbar'
import PageToolbar from '../../Page/Toolbar'

const Toolbar = () => {
  const { pathname } = useLocation()
  let ToolbarComp = null
  if (pathname === '/') {
    ToolbarComp = BookmarksToolbar
  } else if (pathname.includes('/pages')) {
    ToolbarComp = PageToolbar
  }

  if (!ToolbarComp) {
    return null
  }

  return <ToolbarComp />
}

export default Toolbar
