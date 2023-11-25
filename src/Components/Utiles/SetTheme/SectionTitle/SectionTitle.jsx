
import PropTypes from 'prop-types';
import { Typography, Box } from '@mui/material';

const SectionTitle = ({ heading }) => {
    return (
        <Box sx={{ textAlign: 'center', maxWidth: '50%', margin: 'auto', my: 8 }}>

            <Typography variant="h3" component="h3" sx={{ textTransform: 'uppercase', borderBottom: '4px solid', py: 2, color: '#457b9d' }}>
                {heading}
            </Typography>

        </Box>
    );
};

SectionTitle.propTypes = {
    heading: PropTypes.string.isRequired,
    
};

export default SectionTitle;
