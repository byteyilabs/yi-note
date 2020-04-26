export default s => {
  var hours = Math.floor(s / 3600)
  var minutes = Math.floor((s - hours * 3600) / 60)
  var seconds = s - hours * 3600 - minutes * 60
  var time = ''

  if (hours != 0) {
    time = hours + ':'
  }
  if (minutes != 0 || time !== '') {
    minutes = minutes < 10 && time !== '' ? '0' + minutes : String(minutes)
    time += minutes + ':'
  }
  if (time === '') {
    time = (seconds < 10 ? '0:0' : '0:') + seconds
  } else {
    time += seconds < 10 ? '0' + seconds : String(seconds)
  }

  return time
}
