import React, { useEffect, useState } from "react";
import './index.scss'
import { Input , Card} from 'antd';
import movieApi from "../../api/movieApi";
import { Space, Spin } from 'antd';

import moment from "moment";
import showApi from "../../api/showApi";
import { useDispatch, useSelector } from "react-redux";
import { setBooking } from "../../redux/actions";
const dateFormat = "DD";
const dateFormatQuery = "YYYY-MM-DD";
const date = [0,1,2,3,4,5,6]


const PickShowComponent = ({next, film}) => {

 const [dateQuery, setDateQUery] = useState(moment().format(dateFormatQuery));
 const [current, setCurrent] = useState(0);
 const [loading, setLoading] = useState(false)
 const [shows, setShows] = useState([])
 const depatch = useDispatch();
 const booking = useSelector((state) => state.booking);

 useEffect(()=>{
  setLoading(true)
    const getShowByDate = async (idMovie, datatDate) =>{
        try {
          const data = await showApi.getShowByMovieAndDate(idMovie, datatDate);
          setShows(data);
          setTimeout(()=>{
            setLoading(false)
        }, 1000)
        } catch (error) {
          alert(error)
        }
      
    }
    getShowByDate(booking?.film?.id, dateQuery.toString())
 }, [current])


   const caculatorDay = (dateNumber) => {
    let day = "";
    switch (dateNumber) {
      case 0:
        day = "Chủ nhật";
        break;
      case 1:
        day = "Thứ 2";
        break;
      case 2:
        day = "Thứ 3";
        break;
      case 3:
        day = "Thứ 4";
        break;
      case 4:
        day = "Thứ 5";
        break;
      case 5:
        day = "Thứ 6";
        break;
      case 6:
        day = "Thứ bảy";
    }
  
    return day;
  };

  const handeDate =  (val) =>{
    // console.log(val);
    setLoading(true)
    setTimeout(()=>{
        setLoading(false)
    }, 1000)
    setCurrent(val)
    setDateQUery(moment().add(val, "days").format(dateFormatQuery))
  }

  const handlePickShow = (val) =>{
    depatch(setBooking({...booking, show: val}));
    next();
  }

  return (
    <div className="pick-shows">
        <h3>Film: <span>{film?.nameMovie}</span></h3>
        <div className="date-pick">
            {
                date.map((val, idx) =>{
                    if(idx === 0){
                        return (
                            <div className={current === val ? "block-date active" : "block-date"} onClick={()=>handeDate(val)}>
                                <div className="span-01">{moment().format(dateFormat)}</div>
                                <div className="span-02">H.nay</div>
                            </div>
                        )
                    }
                    return (
                        <div className={current === val ? "block-date active" : "block-date"}  onClick={()=>handeDate(val)}>
                            <div className="span-01">
                            {moment().add(idx, "days").format(dateFormat)}
                            
                            </div>
                            <div className="span-02">
                            {caculatorDay(moment().add(idx, "days").day())}
                            </div>
                        </div>
                    )
                })
            }
        
        </div>
        <div className="time-pick">
            <div className="film-iamge">
                <img src={film?.image}/>
            </div>
            <div className="times">
                {
                    loading ?  <Spin size="large" /> :
                    <>
                    {
                      shows.length === 0 ? <p>Không có suất chiếu nào!!</p> :
                    <>
                        {
                                                shows.map(val =>{
                                                  return(
                                                    <div onClick={()=>handlePickShow(val)} className="time" key={val?.id}>
                                                    { val?.ShowTime.showTime}
                                                  </div>
                          
                                                  )
                                                })
                        }

                      </>
                    }
                    
                </>
                }
               
              
            </div>
        </div>
     </div>
  );
};

export default PickShowComponent;
