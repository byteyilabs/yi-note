import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const StyledTextarea = styled.textarea.attrs(props => ({
  disabled: props.disabled
}))`
  width: 100%;
  font-size: 0.9em;
  box-sizing: border-box;
  resize: vertical;
  height: 70px;
  border-radius: 2px;
  border-width: 1px;
`

const Editor = ({
  disabled,
  content,
  placeholder,
  onChange,
  onSave,
  ...rest
}) => {
  const onKeyDownHandler = e => {
    if (
      e.nativeEvent.keyCode == 13 &&
      (e.nativeEvent.ctrlKey || e.nativeEvent.shiftKey)
    ) {
      // CTRL + ENTER or SHIFT + ENTER for change line
      e.key = 'Enter'
    } else if (e.nativeEvent.keyCode == 13) {
      // ENTER for save
      e.preventDefault()
      onSave()
    }
  }

  return (
    <StyledTextarea
      disabled={disabled}
      placeholder={placeholder}
      value={content}
      onChange={onChange}
      onKeyUp={onKeyDownHandler}
      {...rest}
    />
  )
}

Editor.propTypes = {
  disabled: PropTypes.bool,
  content: PropTypes.string,
  placeholder: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired
}

Editor.defaultProps = {
  disabled: false,
  content: '',
  placeholder: ''
}

export default Editor
