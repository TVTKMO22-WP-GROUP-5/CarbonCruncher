import styles from "./IconButton.module.css";
const IconButton = ({ icon, altText, text, onClick }) => {
  return (
    <div className={styles.iconButton}>
      <p className={styles.iconButtonText}>{text}</p>
      <img src={icon} className={styles.iconButtonIcon} alt={altText} />
    </div>
  );
};

export default IconButton;
