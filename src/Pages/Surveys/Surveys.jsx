import { Box, Grid } from "@mui/material";
import useSurveys from "../../Hooks/useSurveys";

import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import SectionTitle from "../../Components/Utiles/SetTheme/SectionTitle/SectionTitle";

const Surveys = () => {
    const [surveys] = useSurveys();
    console.log(surveys);

    return (
        // <Box>
        //     {surveys.map((item) => (
        //         <Box key={item._id}>
        //             <Card sx={{ maxWidth: 345 }}>
        //                 <CardHeader
        //                     avatar={
        //                         <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
        //                             R
        //                         </Avatar>
        //                     }
        //                     action={
        //                         <IconButton aria-label="settings">
        //                             <MoreVertIcon />
        //                         </IconButton>
        //                     }
        //                     title={item.title} // Replace with your survey title data
        //                     subheader={item.date} // Replace with your survey date data
        //                 />
        //                 <CardMedia
        //                     component="img"
        //                     height="194"
        //                     image={item.image} // Replace with your image URL data
        //                     alt={item.alt} // Replace with your image alt text data
        //                 />
        //                 <CardContent>
        //                     <Typography variant="body2" color="text.secondary">
        //                         {item.description} {/* Replace with your survey description data */}
        //                     </Typography>
        //                 </CardContent>
        //                 <CardActions disableSpacing>
        //                     <IconButton aria-label="add to favorites">
        //                         <FavoriteIcon />
        //                     </IconButton>
        //                     <IconButton aria-label="share">
        //                         <ShareIcon />
        //                     </IconButton>
        //                 </CardActions>
        //             </Card>
        //         </Box>
        //     ))}
        // </Box>
        <Box>
<SectionTitle heading={"surveys"}></SectionTitle>
        <Grid container sx={{width: '70%', margin:"auto" , mt:6}} spacing={2}>
        {surveys.map((item) => (
            <Grid item key={item._id} xs={12} md={6} lg={4}>
                <Box>
                    <Card sx={{ maxWidth: 345 }}>
                        <CardHeader
                            avatar={
                                <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                                    R
                                </Avatar>
                            }
                            action={
                                <IconButton aria-label="settings">
                                    <MoreVertIcon />
                                </IconButton>
                            }
                            title={item.title} // Replace with your survey title data
                            subheader={item.date} // Replace with your survey date data
                        />
                        <CardMedia
                            component="img"
                            height="194"
                            image={item.image} // Replace with your image URL data
                            alt={item.alt} // Replace with your image alt text data
                        />
                        <CardContent>
                            <Typography variant="body2" color="text.secondary">
                                {item.description} {/* Replace with your survey description data */}
                            </Typography>
                        </CardContent>
                        <CardActions disableSpacing>
                            <IconButton aria-label="add to favorites">
                                <FavoriteIcon />
                            </IconButton>
                            <IconButton aria-label="share">
                                <ShareIcon />
                            </IconButton>
                        </CardActions>
                    </Card>
                </Box>
            </Grid>
        ))}
    </Grid>
    </Box>
    );
};

export default Surveys;
