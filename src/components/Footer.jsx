import React from "react";
import styles from "../styles/Footer.module.css";
import EmailIcon from "@mui/icons-material/Email";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import PlaceIcon from "@mui/icons-material/Place";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import TelegramIcon from "@mui/icons-material/Telegram";
import { LazyLoadImage } from "react-lazy-load-image-component";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.wrapper}>
        <div className={styles.left}>
          <LazyLoadImage src="/img/logo.png" alt="" width="200" height="50" />
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
        <div className={styles.center}>
          <span className={styles.title}>Our Restaurants</span>
          <div className={styles.branch}>
            342 Lonny Meadow, Suite 637, 46015
            <br />
            North Zoie, Nebraska
          </div>
          <div className={styles.branch}>
            44573 Hubert Square, Suite 585, 32737-3222
            <br />
            Mialand, Illinois
          </div>
        </div>
        <div className={styles.right}>
          <div className={styles.title}>Contact Us</div>
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
        </div>
      </div>
      <div className={styles.more}>
        <span>Terms & Condition</span>
        <span>Privacy Policy</span>
        <span>Blogs</span>
        <span>FAQ </span>
        <span>About Us</span>
        <br />
      </div>
      <div className={styles.copyright}>
        Copyright @2023 Xander Food Inc.
      </div>
    </footer>
  );
};
export default Footer;
