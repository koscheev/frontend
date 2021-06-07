import { useState } from "react";
import './style.css'

export const ShowDetails = ({ description }) => {
  const [show, setShow] = useState(false);

  return <div>
    <p>
      {show && description}
    </p>
    <button onClick={() => setShow(!show)}>{show ? 'Скрыть' : 'Описание'}</button>
  </div>
}