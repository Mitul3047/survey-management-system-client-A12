import  { useEffect, useState } from 'react';
import SectionTitle from './Utiles/SetTheme/SectionTitle/SectionTitle';
import useAxiosPublic from '../Hooks/useAxiosPublic';

const SurveyComponent = () => {
  const [surveyData, setSurveyData] = useState([]);
  const axiosPublic = useAxiosPublic();

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch data using Axios from your API endpoint
        const response = await axiosPublic.get('/vote');
        setSurveyData(response.data); // Assuming response.data contains the survey data
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [axiosPublic]);

  // Function to filter and get top 6 data by surveyId in decreasing order
  const getTop6Data = () => {
    const surveyIdCount = surveyData.reduce((acc, entry) => {
      acc[entry.surveyId] = (acc[entry.surveyId] || 0) + 1;
      return acc;
    }, {});

    const sortedSurveyIds = Object.keys(surveyIdCount).sort((a, b) => surveyIdCount[b] - surveyIdCount[a]);

    const top6Data = [];
    for (const surveyId of sortedSurveyIds) {
      const surveyDataFiltered = surveyData.filter(entry => entry.surveyId === surveyId);
      top6Data.push(...surveyDataFiltered.slice(0, 6));
    }

    return top6Data;
  };

  const top6Data = getTop6Data();

  // Render your top 6 data
  return (
    <div>
      <SectionTitle heading={'Top Voted Survey'}></SectionTitle>
      <ul>
        {top6Data.map(entry => (
          <li key={entry._id}>
            {/* Render your data here */}
            <p>{entry.question}</p>
            {/* Other data fields */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SurveyComponent;
