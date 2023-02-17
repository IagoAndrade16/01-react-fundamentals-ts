import styles from "./Avatar.module.css";
import { ImgHTMLAttributes } from "react";

interface IAvatarProps extends ImgHTMLAttributes<HTMLImageElement> {
  hasBorder?: boolean;
}

export function Avatar({ hasBorder = true, ...props}: IAvatarProps) {

  return (
    <img 
      className={hasBorder ? styles.avatarWithBorder : styles.avatar} 
      {...props}
    />

  )
}