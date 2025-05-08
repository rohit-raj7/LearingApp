import { createContext, useEffect, useState } from "react";
import { dummyCourses } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import humanizeDuration from 'humanize-duration'
export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
    const currency = import.meta.env.VITE_CURRENCY;
    const navigate = useNavigate();

    const [allCourses, setAllCourses] = useState([]);
    const [isEducator, setIsEducator] = useState(true); // Fixed default value (no array)
    const [enrolledCourses, setEnrolledCourses] = useState([]);  

    const fetchAllCourses = async () => {
        setAllCourses(dummyCourses);
    };

    const calculateRating = (course) => {
        if (course.courseRatings.length === 0) return 0; // Fixed typo: "lenght"
        let totalRating = 0;
        course.courseRatings.forEach(rating => {
            totalRating += rating.rating;
        });
        return totalRating / course.courseRatings.length;
    };

    // function to calculate course chapter time

    const calculateChapterTime = (chapter) => {
        let time = 0
        chapter.chapterContent.map((lecture) => time += lecture.lectureDuration)
        return humanizeDuration(time *60 *1000 ,{units:['h','m','s']})
    }

    // calucalte course Duration
    const calculateCourseDuration = (course) => {
        let time = 0;
        course.courseContent.forEach(chapter =>
          chapter.chapterContent.forEach(lecture => {
            time += lecture.lectureDuration;
          })
        );
        return humanizeDuration(time * 60 * 1000, { units: ['h', 'm', 's'] });
      };
    // function calculate to no of lectures in the course
    const calucalteNoOfLectures=(course)=>{
        let totalLectures=0;
        course.courseContent.forEach(chapter=>{
            if(Array.isArray(chapter.chapterContent)){
                totalLectures+=chapter.chapterContent.length
            }
        });
        return totalLectures;
    }

    // Fetch user Enrolled Courses
    const fetchUserEnrolledCourses=async()=>{
        setEnrolledCourses(dummyCourses)
    }
    useEffect(() => {
        fetchAllCourses(),
        fetchUserEnrolledCourses()
    }, []);

    return (
        <AppContext.Provider
            value={{
                currency,
                allCourses,
                navigate,
                calculateRating,
                isEducator,
                setIsEducator,
                calculateChapterTime,
                calculateCourseDuration
                ,calucalteNoOfLectures,
                enrolledCourses,
                fetchUserEnrolledCourses
            }}
        >
            {children}
        </AppContext.Provider>
    );
};

 