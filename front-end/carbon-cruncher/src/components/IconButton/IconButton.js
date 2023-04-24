import styles from "./IconButton.module.css"
const IconButton = ({ buttonAsset, onClick }) => {
  return (
    <div className={styles.iconButton} onClick={onClick}>
      <p className={styles.iconButtonText}>{buttonAsset.buttonText}</p>
      <img src={buttonAsset.icon} className={styles.iconButtonIcon} alt={buttonAsset.altText} />
    </div>
  )
}

export default IconButton
