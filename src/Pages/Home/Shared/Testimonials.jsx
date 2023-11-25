import { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';
import SectionTitle from '../../../Components/Utiles/SetTheme/SectionTitle/SectionTitle';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Box, CardActionArea } from '@mui/material';
import Rating from '@mui/material/Rating';

const Testimonials = () => {
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        fetch('reviews.json')
            .then(res => res.json())
            .then(data => setReviews(data))
    }, []);

    return (
        <Box sx={{my:10}}>
            <SectionTitle  heading={'Testimonial'}></SectionTitle>
            <Swiper
                slidesPerView={4}
                spaceBetween={30}
                centeredSlides={true}
                pagination={{
                    clickable: true,
                }}
                modules={[Pagination]}
                className="mySwiper"
            >
                {reviews.map(review => (
                    <SwiperSlide key={review._id}>
                        <Card sx={{ maxWidth: 345, height: 400 }}>
                            <CardActionArea>
                                <CardMedia
                                    component="img"
                                    image="https://images.unsplash.com/photo-1610276198568-eb6d0ff53e48?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cG90cmFpdHxlbnwwfHwwfHx8MA%3D%3D"
                                    alt="green iguana"
                                    sx={{
                                        height: '140px',
                                        width: '45%',
                                        objectFit: 'cover',
                                        borderRadius: '80px', // Adjust the value to change the roundness
                                        p:2,
                                        margin:'auto',
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                    }}
                                />

                                <CardContent style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                                    <Rating
                                        value={review.rating}
                                        readOnly
                                    />
                                    <Typography gutterBottom variant="h5" component="div" sx={{ mt: 2 }}>
                                        {review.name}
                                    </Typography>
                                    <Typography variant="body2" sx={{ textAlign: "justify", mb: 1, p: 1 }}>
                                        {review.details}
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    </SwiperSlide>
                ))}
            </Swiper>
        </Box>
    );
};

export default Testimonials;
