
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import PropTypes from 'prop-types';
import useMediaQuery from '@mui/material/useMediaQuery';

const ProUserModal = ({ open, handleClose }) => {
  const isLargeScreen = useMediaQuery('(min-width:1280px)');
  const isMediumScreen = useMediaQuery('(max-width:1279px)');
  const isSmallScreen = useMediaQuery('(max-width:600px)');

  const getWidth = () => {
    if (isLargeScreen) return 400;
    if (isMediumScreen || isSmallScreen) return '80%';
    return '50%'; // Default width for other screen sizes
  };

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: getWidth(),
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    borderRadius: 1,
    background: '#f1faee',
  };

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
          <Typography id="pro-user-modal-description" sx={{ mt: 2, color: '#457b9d' }}>
            Upgrade to unlock premium features!
          </Typography>
          <Button variant="contained" sx={{ mt: 3, background: "#1d3557" }} onClick={handleClose}>
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
