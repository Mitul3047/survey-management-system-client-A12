
import PropTypes from 'prop-types';

import { Helmet } from 'react-helmet-async';

const SetHemlet = ({ page }) => {
    return (
        <Helmet>
            <title>
                Survey | {page}
            </title>
        </Helmet>
    );
};

SetHemlet.propTypes = {
    page: PropTypes.string.isRequired,

};

export default SetHemlet;
