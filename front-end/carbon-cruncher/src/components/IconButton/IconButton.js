import styles from "./IconButton.module.css"

/**
 * Reusable button that takes assets and onclick handler as props
 */
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
