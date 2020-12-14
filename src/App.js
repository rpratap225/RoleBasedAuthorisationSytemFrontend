import React, {useState} from 'react'
//import './App.css';
import { makeStyles, } from '@material-ui/core/styles'
import *  as ReactBootStrap from 'react-bootstrap'
import Link from '@material-ui/core/Link'
//import {BrowserRouter,Router,Switch,Route} from 'react-router-dom';
import {useForm} from 'react-hook-form';
import Dialog from '@material-ui/core/Dialog'
import DialogContent from '@material-ui/core/DialogContent'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import CancelIcon from '@material-ui/icons/Cancel';
import IconButton from '@material-ui/core/IconButton'
import { Button,Checkbox,FormControlLabel,Grid} from '@material-ui/core'
import DialogActions from '@material-ui/core/DialogActions'
import Reducer from './Reducer'




const useStyles = makeStyles((theme) => {
  return{
    root: {
      margin: theme.spacing(1),
      width: theme.spacing(80),
      height: theme.spacing(35),
    },
    table:{
      width:theme.spacing(50),
      marginLeft: theme.spacing(30)
    },
    clearButton: {
      position: 'absolute',
      right: theme.spacing(1),
      top: theme.spacing(1),
    },
    margin: {
      marginRight: theme.spacing(-6),
    },
    mgTop: {
      marginTop: theme.spacing(1),
    },
  }
})

export default function App() {
  const classes = useStyles()
   const [viewRole, setViewRole] = useState()
   const [viewRolePositon, setViewRolePosition] = useState()
  // const [dialogOpen, setDialogOpen] = useState(false)
  const[open,setOpen]=useState(false)
  const { state } = React.useContext(configContext)
  const {
    sessionData
  } = state
  
 const update =(e)=> {
  // update entity - POST
  e.preventDefault();
  // this will update entries with POST
  fetch("https://localhost:9094/users/update", {
      "method": "POST",
      "headers": {
         
          "x-role-key": API_KEY,
          "content-type": "application/json",
          "accept": "application/json"
      },
      "body": JSON.stringify({
       sessionData:state.sessionData
      })
      })
      .then(response => response.json())
      .then(response => { console.log(response);
      })
      .catch(err => { console.log(err); });
} 
const getAllAPI=()=>{
fetch("https://localhost:9094/users/getAll", {
  "method": "GET",
  "headers": {
      "x-role-key": API_KEY,
      "content-type": "application/json",
      "accept": "application/json"
  },
  "body": JSON.stringify({
   sessionData:state.sessionData
  })
  })
  .then(response => response.json())
  .then(response => { console.log(response);
  })
  .catch(err => { console.log(err); });
}
React.useEffect({
  // this API will call on page load first to get data from DB
  getAllAPI()
 
},[])
const handleClose = ()=>{
  setOpen(false)
}
const display = (data)=>{
  setOpen(true)
 setViewRole(data.name)
 setViewRolePosition(data.position)

}

  return (
    <div>
      <TableContainer >
    <Table className={classes.table} aria-label="caption table" >
    <TableHead>
     
          <TableRow >
            <TableCell >SerialNo.</TableCell>
           
            <TableCell align="right" >Name</TableCell>
            <TableCell align="right">Position</TableCell>
          </TableRow>
         
        </TableHead>
       <TableBody>
          {sessionData.map((role) => ( 
            <TableRow key={role.serialno} onClick={() => display(sessionData)}>
              <TableCell component="th" scope="row" >
                {role.serialno}
              </TableCell>
              
              <TableCell align="right">{role.name}</TableCell>
              <TableCell align="right">{role.position}</TableCell>
             
            </TableRow>
            
          ))}
        </TableBody>
</Table>
</TableContainer>
{open?(
   <Dialog open={open} maxWidth="md">
      <DialogContent className={classes.root}>
      <IconButton
            className={classes.clearButton}
            color="primary"
            onClick={handleClose}
          >
         <CancelIcon/>
          </IconButton>
        <h6>
          username
        </h6>
<form >
  <input type='text' placeholder='Role' name='role'  value={viewRole}/>
</form>
<Grid container>
  <Grid item xs={3} className={classes.mgTop}>
<h6>Access Type</h6>
</Grid>
<Grid item xs={9}>
<FormControlLabel
        control={
          <Checkbox
            name="checkedB"
            color="primary"
          />
        }
        label="Read"
      />
      <FormControlLabel
        control={
          <Checkbox
            name="checkedB"
            color="primary"
          />
        }
        label="Write"
      />
      <FormControlLabel
        control={
          <Checkbox
            name="checkedB"
            color="primary"
          />
        }
        label="Delete"
      />
        </Grid>
</Grid>
<Grid container>
  <Grid item xs={3} className={classes.mgTop}>
<h6>Resource Allocated</h6>
</Grid>
<Grid item xs={9}>
<FormControlLabel
        control={
          <Checkbox
            name="checkedB"
            color="primary"
          />
        }
        label="Option1"
      />
      <FormControlLabel
        control={
          <Checkbox
            name="checkedB"
            color="primary"
          />
        }
        label="Option2"
      />
     
        </Grid>
</Grid>
<Grid container>
  <Grid item xs={3} className={classes.mgTop}>
<h6>User Type</h6>
</Grid>
<Grid item xs={9}>
<FormControlLabel
        control={
          <Checkbox
            name="checkedB"
            color="primary"
          />
        }
        label="Super Admin"
      />
      <FormControlLabel
        control={
          <Checkbox
            name="checkedB"
            color="primary"
          />
        }
        label="Super User"
      />
     
        </Grid>
</Grid>

</DialogContent>
<DialogActions >
        <Button
            onClick={handleClose}
            color="primary"
          >
            Cancel
          </Button>
          <Button
            color="primary"
            variant="contained"
            align="left"
            onClick={update}
          >
            Update Role
          </Button>
</DialogActions>
</Dialog>
):(
  ''
)
}
    </div>
     
  );
}


