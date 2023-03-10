// == Import
import './styles.scss';
import { init } from 'ityped';
import { useEffect, useRef } from 'react';
import error from '../../assets/img/Error.gif';

export default function Error() {
  const textRef = useRef();

  useEffect(() => {
    init(textRef.current, {
      showCursor: true,
      backDelay: 500,
      backSpeed: 40,
      strings: ['404, page not found.'],
    });
  }, []);

  return (
    <div className="wrapperError">
      <div className="top">
        <img className="imgError" src={error} alt="" />
      </div>
      <div className="down">
        <h1><span ref={textRef}></span></h1>
      </div>
    </div>
  );
}
