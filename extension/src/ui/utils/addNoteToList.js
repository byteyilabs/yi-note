export default (notes, note) => {
  return [...notes.filter(n => n.id !== note.id), note].sort(
    (note1, note2) => note1.timestamp - note2.timestamp
  )
}
