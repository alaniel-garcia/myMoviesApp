import './PageNotFound.scss';
import {useNavigate} from 'react-router-dom';
import Button from '../Components/Miscellaneous/Button'

export default function PageNotFound () {

  const navigate = useNavigate();

  return (
    <div className='PageNotFound'>
      <div className='PageNotFound__content'>
	<h1>404</h1>
	<h2>"This page doesn't exist"</h2>
	<Button 
          text={'Go home'}
          onClick={() => navigate('/')}/>
      </div>
    </div>
  )
}
