import  { useEffect } from "react";
import { Box, Typography } from "@mui/material";
import TimeAgo from "./TimeAgo";
import useVote from "../Hooks/useVote";
import Charts from "./Charts";
import PropTypes from 'prop-types';
const Votes = ({ id }) => {
  // eslint-disable-next-line no-unused-vars
  const [votes, loading, refetch] = useVote();

  // Filter votes based on the provided ID
  const filterVote = votes.filter((item) => item?.surveyId === id);

  // Calculate total and 'yes' selected values
  const totalSelectedValues = filterVote.length;
  const totalYesSelectedValues = filterVote.filter(
    (item) => item.selectedValue === "yes"
  ).length;
console.log(typeof(totalSelectedValues),typeof(totalYesSelectedValues));
  // Refetch votes when the ID changes
  useEffect(() => {
    refetch();
  }, [id, votes, refetch]);

  return (
    <Box sx={{  ml: 2, my: 5 }}>
      <Box display={'flex'} justifyContent={'center'} gap={4} mb={6}>
        <Typography variant="h6">Total Vole: {totalSelectedValues}</Typography>
        <Typography variant="h6"> Yes Count: {totalYesSelectedValues}</Typography>
        <Typography variant="h6"> No Count: {totalSelectedValues - totalYesSelectedValues}</Typography>
      </Box>
      <Typography variant="h5">Comments</Typography>
      {/* Display comments */}
      {filterVote.map((vote, index) => (
        <Box
          key={index}
          sx={{
            border: 1,
            borderColor: "#e9edc9",
            borderRadius: 2,
            p: 2,
            mt: 2,
          }}
        >
          {/* Render each comment */}
          {vote.comment && (
            <>
              <Typography sx={{ color: "#495057" }}>{vote.comment}</Typography>
              <Typography sx={{ color: "#343a40" }}>by {vote.name}</Typography>
              <Typography sx={{ color: "#343a40" }}>
                <TimeAgo timestamp={vote.time} />
              </Typography>
            </>
          )}
          {/* Add other comment details here */}

        </Box>

      ))}
<Charts total={totalSelectedValues} yes={totalYesSelectedValues}></Charts>
    </Box>
  );
};

Votes.propTypes = {
  id: PropTypes.string.isRequired, // Assuming id is a required string
};
export default Votes;
