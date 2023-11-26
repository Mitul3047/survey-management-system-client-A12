import { Box } from '@mui/material';
import SectionTitle from '../../Components/Utiles/SetTheme/SectionTitle/SectionTitle';
import useAxiosPublic from '../../Hooks/useAxiosPublic';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

const SurveyDetails = () => {
    const {  id } = useParams(); // Get the survey ID from URL parameters
    console.log(id);
    const axiosPublic = useAxiosPublic();
    const [surveyDetails, setSurveyDetails] = useState(null);

    useEffect(() => {
        const fetchSurveyDetails = async () => {
            try {
                const response = await axiosPublic.get(`/surveys/${id}`);
                setSurveyDetails(response.data); // Update state with fetched survey details
            } catch (error) {
                console.error('Error fetching survey details:', error);
            }
        };

        if (id) {
            fetchSurveyDetails(); // Fetch survey details when the component mounts or when surveyId changes
        }
    }, [axiosPublic, id]);
console.log(surveyDetails);
    return (
        <Box>
            <SectionTitle heading={'Survey Details'}></SectionTitle>
            {surveyDetails && (
                <div>
                    <h2>{surveyDetails.name}</h2>
                    <p>Description: {surveyDetails.description}</p>
                    {/* Display other survey details */}
                </div>
            )}
        </Box>
    );
};

export default SurveyDetails;
