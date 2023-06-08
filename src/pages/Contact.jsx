import styles from '../styles/contact.module.css'
import EmailIcon from "@mui/icons-material/Email";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import PlaceIcon from "@mui/icons-material/Place";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import TelegramIcon from "@mui/icons-material/Telegram";

const Contact = () => {
  return (
      <div className={styles.container}>
          <div className={styles.contactInfo}>
            <div className={styles.contact}>
              <EmailIcon /> info@xanderbilla.com
            </div>
            <div className={styles.contact}>
              <LocalPhoneIcon /> +916201700497
            </div>
            <div className={styles.contact}>
              <PlaceIcon /> soldevanhalli Banglore, karnataka - 560107
            </div>
          </div>
          <div className={styles.container_social}>
            <div className={styles.container_social_icon}>
              <FacebookIcon />
            </div>
            <div className={styles.container_social_icon}>
              <InstagramIcon />
            </div>
            <div className={styles.container_social_icon}>
              <TelegramIcon />
            </div>
            <div className={styles.container_social_icon}>
              <TwitterIcon />
            </div>
          </div>
    </div>
  )
}

export default Contact