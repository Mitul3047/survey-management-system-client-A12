import { Box, Typography } from "@mui/material";
import TimeAgo from "./TimeAgo";
import PropTypes from 'prop-types';

const Comments = ({comments}) => {



    return (
        <Box sx={{width: '60%' ,ml:2,my:5}}>
            <Typography variant="h5">Comments</Typography>
            
            {/* Display comments */}
            {comments.map((comment, index) => (
                <Box key={index} sx={{ border:1 , borderColor: '#e9edc9',borderRadius: 2,  p: 2, mt: 2 }}>
                    {/* Render each comment */}
                    <Typography sx={{ color:"#495057"}}>{comment.comment}</Typography>
                    <Typography  sx={{ color:'#343a40'}}>by {comment.name}</Typography>
                    <Typography sx={{ color:'#343a40'}}><TimeAgo timestamp={comment.time}></TimeAgo></Typography>
                    
                    {/* Add other comment details here */}
                </Box>
            ))}

        </Box>
    );
};
Comments.propTypes = {
    comments: PropTypes.array
  };

export default Comments;
