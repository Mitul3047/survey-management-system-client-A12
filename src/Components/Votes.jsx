import React, { useEffect } from "react";
import { Box, Typography } from "@mui/material";
import TimeAgo from "./TimeAgo";
import useVote from "../Hooks/useVote";

const Votes = ({ id }) => {
  const [votes, loading, refetch] = useVote();

  // Filter votes based on the provided ID
  const filterVote = votes.filter((item) => item?.surveyId === id);

  // Calculate total and 'yes' selected values
  const totalSelectedValues = filterVote.length;
  const totalYesSelectedValues = filterVote.filter(
    (item) => item.selectedValue === "yes"
  ).length;

  // Refetch votes when the ID changes
  useEffect(() => {
    refetch();
  }, [id,votes, refetch]);

  return (
    <Box sx={{ width: "60%", ml: 2, my: 5 }}>
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
    </Box>
  );
};

export default Votes;
