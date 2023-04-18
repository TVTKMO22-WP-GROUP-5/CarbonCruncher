import styles from "./IconButton.module.css"
const IconButton = ({ buttonAsset, onClick }) => {
  return (
    <div className={styles.iconButton}>
      <p className={styles.iconButtonText}>{buttonAsset.text}</p>
      <img src={buttonAsset.icon} className={styles.iconButtonIcon} alt={buttonAsset.altText} />
    </div>
  )
}

export default IconButton
