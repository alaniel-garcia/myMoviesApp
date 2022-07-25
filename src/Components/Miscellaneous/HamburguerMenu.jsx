import './HamburguerMenu.scss';

export default function HamburguerMenu({
  menuOnClick
}){
  return  <div className='HamburguerMenu' 
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
	    <div className='HamburguerMenu-bar'></div>
	    <div className='HamburguerMenu-bar'></div>
	    <div className='HamburguerMenu-bar'></div>
	  </div>
}
