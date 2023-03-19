import React, { useEffect, useState } from "react";
import './index.scss'
import { Input , Card} from 'antd';
import movieApi from "../../api/movieApi";
import { setBooking } from "../../redux/actions";
import { useDispatch } from "react-redux";

const { Meta } = Card;
const PickFilmComponent = ({next}) => {
 const [films, setFilms] = useState([]);
 const depatch = useDispatch();
 const handleClick = (film) =>{
    const resultData = {
        film
    }
    depatch(setBooking(resultData));
    next(film)
 }
 useEffect(()=>{
    const getFilms = async (_id) =>{
        const data = await movieApi.getMovieByIdCinema(_id);
        setFilms(data);
    }
    getFilms(1)
 }, [])
  return (
    <div className="pick-film">
         <Input className="pick-film-search" placeholder="Nhập tên phim..." />;
         <div className="cards">
            {
                films.map(film =>{
                    return (
                        <Card
                            hoverable
                            style={{
                            width: 240,
                            marginRight:20,
                            marginBottom:20,
            
                            }}
                            onClick={()=>handleClick(film)}
                            cover={<img style={{height:"200px", objectFit:"cover"}} alt="example" src={film?.image} />}
                        >
                        <p className="titel-film">{film?.nameMovie}</p>
                        </Card>
                    )
                })
            }
         </div>
     
     </div>
  );
};

export default PickFilmComponent;