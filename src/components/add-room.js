import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import EditIcon from '@material-ui/icons/Edit';
import { makeStyles } from '@material-ui/styles';
import Fab from '@material-ui/core/Fab';
import Modal from '@material-ui/core/Modal';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import ButtonGroup from '@material-ui/core/ButtonGroup';

const useStyles = makeStyles({
  paper: {
    position: 'absolute',
    backgroundColor: '#fff',
    padding: 20,
    top: `50%`,
    left: `50%`,
    transform: `translate(-50%, -50%)`,
    '&:focus': {
      outline: 'none'
    }
  },
  formControl: {
    margin: 10,
    minWidth: 120,
  },
});

const AddRoom = () => {
  const styles = useStyles();
  const [open, setOpen] = useState(false);
  const toggleModel = e => {
    setOpen(!open);
  };
  return (
    <div>
      <Fab color="secondary" aria-label="edit" onClick={toggleModel}>
        <EditIcon />
      </Fab>
      <Modal
        open={open}
        onClose={toggleModel}
      >
        <Paper className={styles.paper}>
          <form>
            <Typography variant="h6">
              Edit room
            </Typography>
            <FormControl variant="outlined" className={styles.formControl}>
              <InputLabel htmlFor="outlined-age-native">
                Age
              </InputLabel>
              <Select
                native
                labelWidth={30}
                inputProps={{
                  name: 'age',
                  id: 'outlined-age-native',
                }}
              >
                <option value="" />
                <option value={10}>Ten</option>
                <option value={20}>Twenty</option>
                <option value={30}>Thirty</option>
              </Select>
            </FormControl>
            <Fab aria-label="delete">
              <DeleteIcon />
            </Fab>
            <Divider />
            <Typography variant="h6">
              Add room
            </Typography>
            <TextField
              id="room-name"
              label="Room Name"
              defaultValue="foo"
              margin="normal"
              variant="outlined"
            />
            <br/>
            <TextField
              id="ip-name"
              label="Ip address"
              defaultValue="foo"
              margin="normal"
              variant="outlined"
            />
            <br/>
            <ButtonGroup fullWidth>
              <Button variant="contained" color="secondary">
                Cancel
              </Button>
              <Button variant="contained" color='primary'>
                Save
              </Button>
            </ButtonGroup>
          </form>
        </Paper>
      </Modal>
    </div>
  )
}

export default AddRoom;
