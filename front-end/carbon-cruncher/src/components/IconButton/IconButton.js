import styles from "./IconButton.module.css"
const IconButton = ({ buttonAsset, onClick, no }) => {
  return (
    <div className={styles.iconButton} onClick={onClick}>
      {no ? <span>{no}</span> : null}
      <span className={styles.iconButtonText}>{buttonAsset.buttonText}</span>
      <img src={buttonAsset.icon} className={styles.iconButtonIcon} alt={buttonAsset.altText} />
    </div>
  )
}

export default IconButton
