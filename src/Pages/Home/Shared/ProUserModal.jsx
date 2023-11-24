
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import PropTypes from 'prop-types';
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
//   border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  borderRadius: 1,
  background : '#f1faee'
  
};

const ProUserModal = ({open, handleClose}) => {

    return (
        <div>
  
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
          <Typography id="pro-user-modal" variant="h6" component="h2">
          Be a Pro User
        </Typography>
        <Typography id="pro-user-modal-description" sx={{ mt: 2 , color: '#457b9d'}}>
          Upgrade to unlock premium features!
        </Typography>
        {/* <Button onClick={handleClose} sx={{ mt: 3 }}>
          Close
        </Button> */}
        <Button variant="contained"  sx={{  mt: 3,background:"#1d3557" }}>
          Upgrade Now
        </Button>

          </Box>
        </Modal>
      </div>
    );
};

ProUserModal.propTypes = {
    open: PropTypes.bool.isRequired,
    handleClose: PropTypes.func.isRequired,
  };
export default ProUserModal;