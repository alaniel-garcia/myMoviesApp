import {
  ListItemButton, ListItemIcon, ListItemText, List, Collapse
} from '@mui/material';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import colors from '../../index.scss';
import { useState } from 'react';
import { ArrowDropDown } from '@mui/icons-material';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

export default function TestList () {
  const [open,setOpen] = useState(false);
  const [t, i18n] = useTranslation('global')
  const navigate = useNavigate(); 


  return (
    <List disablePadding>
      <ListItemButton onClick={() => {setOpen(!open)}}>
	<ListItemIcon>
          {open ? 
	    <ArrowDropDown
	      sx={
		{color : colors.white,
		 fontSize: '3.6rem',
		 marginInlineStart: '0rem',
		}
	      }/>
	    :
	      <ArrowRightIcon
		sx={
		  {color : colors.white,
		   fontSize: '3.6rem',
		   marginInlineStart: '0rem',
		  }
		}/>
	  }
	</ListItemIcon>
        <ListItemText 
          disableTypography
          primary={`${t('lang.language')}`} 
	  />
      </ListItemButton>
      <Collapse in={open}>
        <List>
          <ListItemButton>
            <ListItemIcon>
            </ListItemIcon>
            <ListItemText 
              disableTypography
              onClick={() => {
		i18n.changeLanguage('en')
		navigate('/')
	      }}
              primary='en'/>
          </ListItemButton>
          <ListItemButton>
            <ListItemIcon>
            </ListItemIcon>
            <ListItemText
              disableTypography
              onClick={() => { 
		i18n.changeLanguage('es')
		navigate('/')
	      }}
              primary='es'/>
          </ListItemButton>
        </List>
      </Collapse>
    </List>
  )
}
