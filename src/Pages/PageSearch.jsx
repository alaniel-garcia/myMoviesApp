import Nav from '../Components/Nav';
import { useTranslation } from 'react-i18next';
import {lang} from '../languages';

export default function PageSearch(){

  const [t] = useTranslation('global')

  return  <div className='Page-padded'>  
            <Nav />
            <h1 
              style={
		{marginBlockStart: '2.4rem'}
	      }>
		{`${t('lang.search')}`}
            </h1>
          </div>
}
