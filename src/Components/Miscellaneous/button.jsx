import { useEffect, useState } from 'react';
import './Button.scss';
import colors from '../../index.scss'

export default function Button({
  active,
  text,
  ...props
}){

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
    //conditional that is provided by categories component, and changes its style according 
    //to the state in the respective component
    if(props.genreReader){
      props.genreReader()
    }
  },[active]);


  return(
    <div 
      className='Button' 
      style={props.onClick ? style : {background: 'transparent'}}
      onClick={ event =>{
	if(props.onClick){
	  props.onClick(event);
	}
      }}
    >
      <p className='Button__text'>
	{text}
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
