import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart } from "@fortawesome/free-regular-svg-icons";
export default function Favorite() {
  return (
    <button><FontAwesomeIcon icon={faHeart} className='text-main mt-5 '></FontAwesomeIcon></button>
  )
}
