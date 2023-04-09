import './IconButton.css'
const IconButton = ( { icon, text, onClick } ) => {
  return (
    <div className='icon-button'>
      <p className='icon-button-text'>{ text }</p>
      <img src={ icon } className='icon-button-icon'></img>
    </div>
  )
}

export default IconButton