import arrow from '../../Assets/icons/arrow.svg';
import './BackButton.scss';
import {useNavigate} from 'react-router-dom';

export default function BackButton(){
  const navigate = useNavigate();

  function goBack(){
    navigate(-1)
  }
  return <div className='BackButton' onClick={goBack}>
           <div className='BackButton__arrow-wrapper'>
	     <img className='BackButton__arrow' src={arrow} alt="" />
           </div>
         </div>
}
