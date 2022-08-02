import { useEffect, useRef } from 'react';
import arrow from '../../Assets/icons/arrow.svg';
import './ArrowButton.scss';

export default function ArrowButton({
  onClick,
  ...props
}){

  const refArrowButton = useRef();

  useEffect(() => {
    if(props.functionality === 'go-top'){
      window.onscroll = () => showArrowButton();
    }
    return(() => {
      if(props.functionality === 'go-top'){
	window.onscroll = null
      }
    })
  },[]);

  function showArrowButton(){
    if(document.documentElement.scrollTop >= window.innerHeight){
      refArrowButton.current.style.display = 'block';
    }
    else{
      refArrowButton.current.style.display = 'none';
    }
  }

  return <div 
           ref={refArrowButton}
           className={props.functionality ? `ArrowButton ${props.functionality}` : 'ArrowButton'} 
           onClick={onClick}>
           <div className='ArrowButton__arrow-wrapper'>
	     <img className='ArrowButton__arrow' src={arrow} alt="" />
           </div>
         </div>
}
