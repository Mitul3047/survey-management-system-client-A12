import { Box, Typography } from "@mui/material";
import TimeAgo from "./TimeAgo";
// import PropTypes from 'prop-types';
import useVote from "../Hooks/useVote";

const Votes = ({ id }) => {
    console.log("id",typeof(id))
    const [votes, loading, refetch] = useVote()


    // const filterUser = users.filter(survey => survey?.email === user?.email)
    const filterVote = votes.filter(item => item?.surveyId === id)
    console.log(votes.length, 'votes', votes);
    console.log(filterVote.length, 'votes', filterVote);

    const totalSelectedValues = filterVote.length;

    // Count total occurrences where 'selectedValue' is 'yes'
    const totalYesSelectedValues = filterVote.filter(item => item.selectedValue === 'yes').length;
  console.log(totalSelectedValues,totalYesSelectedValues);

    refetch()
    return (
        <Box sx={{ width: '60%', ml: 2, my: 5 }}>
            <Typography variant="h5">Comments</Typography>

            {/* Display comments */}
            {filterVote.map((comment, index) => (
                <Box key={index} sx={{ border: 1, borderColor: '#e9edc9', borderRadius: 2, p: 2, mt: 2 }}>
                    {/* Render each comment */}
                    <Typography sx={{ color: "#495057" }}>{comment.comment}</Typography>
                    <Typography sx={{ color: '#343a40' }}>by {comment.name}</Typography>
                    <Typography sx={{ color: '#343a40' }}><TimeAgo timestamp={comment.time}></TimeAgo></Typography>

                    {/* Add other comment details here */}
                </Box>
            ))}

        </Box>
    );
};

export default Votes;
