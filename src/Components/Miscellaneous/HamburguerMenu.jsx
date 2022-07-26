import './HamburguerMenu.scss';

export default function HamburguerMenu({
  menuOnClick,
  ...props
}){
  return  <div className={props.rounded ? 'HamburguerMenu HamburguerMenu--rounded' : 'HamburguerMenu'} 
               onClick={ () => menuOnClick(
		 (prevState) => {
		   if(prevState === true){
		     return false
		   }
		   else{
		     return true
		   }
		 }
	       )}>
            <div className='HamburguerMenu-bars-wrapper'>
	      <div className='HamburguerMenu-bar'></div>
	      <div className='HamburguerMenu-bar'></div>
	      <div className='HamburguerMenu-bar'></div>
            </div>
	  </div>
}
