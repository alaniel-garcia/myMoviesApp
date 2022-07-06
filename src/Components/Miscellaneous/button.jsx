import { useEffect, useState } from 'react';
import './Button.scss';
import colors from '../../index.scss'

export default function Button(props){

  const [icon, setIcon] = useState({});
  const [style, setStyle] = useState({background: `${colors.secondaryGrey}`});


  let rotate;
  props.rotate 
    ? rotate = props.rotate
    : rotate = 0;
  
  useEffect(() =>{
    if (props.icon){
      setIcon({
	className: 'Button__icon',
	src: props.src,
	alt: '',
      })
    }
  },[])


  useEffect(() => {
    setStyle( prevState => {
      if(prevState.background === colors.secondaryGrey){
	return {background: colors.secondaryRed}
      }
      else{
	return {background: colors.secondaryGrey}
      }
    })
  }, [props.active]);


  return(
    <div 
      className='Button' 
      style={style}
      onClick={ event =>{
	props.onClick(event);
      }}
    >
      <p className='Button__text'>
	{props.text}
      </p>
      {
	props.icon
	  ? <img 
	      className={icon.className}
	      src={icon.src} 
	      alt={icon.alt} 
	      style={{transform: `rotate(${rotate})`}}
	    />
	  : null
      }
    </div>
  )
}
