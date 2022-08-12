import {
  ListItemButton, ListItemIcon, ListItemText, List, Collapse
} from '@mui/material';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import colors from '../../index.scss';
import { useState } from 'react';
import { ArrowDropDown } from '@mui/icons-material';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import './NestedList.scss';

export default function TestList () {
  const [open,setOpen] = useState(false);
  const [t, i18n] = useTranslation('global')
  const navigate = useNavigate(); 
  const initialMargin = '2.5rem';

  const styles = {
    ListItemButton: {
      width: 'fit-content',
      padding: '0'

    },
    listItemIcon: {
      minWidth: 'fit-content',
    },
    listItemCollapsedButton: {
      left: '0',
      justifyContent: 'flex-end',
      padding: '0',
      marginInlineStart: `1.2rem`, 
    }
  }


  return (
    <List disablePadding>
      <ListItemButton disableGutters style={styles.ListItemButton} onClick={() => {setOpen(!open)}}>
        <ListItemText 
          disableTypography
          primary={`${t('lang.language')}`} 
	  />
	<ListItemIcon sx={styles.listItemIcon}>
          {open ? 
	    <ArrowDropDown
	      sx={
		{color : colors.white,
		 fontSize: `${initialMargin}`,
		 marginInlineStart: '0rem',
		}
	      }/>
	    :
	      <ArrowRightIcon
		sx={
		  {color : colors.white,
		   fontSize: `${initialMargin}`,
		   marginInlineStart: '0rem',
		  }
		}/>
	  }
	</ListItemIcon>
      </ListItemButton>
      <Collapse in={open}>
        <List>
          <ListItemButton disableGutters sx={styles.listItemCollapsedButton}>
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
          <ListItemButton disableGutters sx={styles.listItemCollapsedButton}>
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