import { useState, useEffect } from "react";
import axios from "axios";

const MostVoted = () => {
    const [votedSurveys, setVotedSurveys] = useState([]);

    useEffect(() => {
        axios.get('/vote')
            .then(response => {
                const surveyData = response.data;

                if (Array.isArray(surveyData)) {
                    const surveyVotes = {};

                    surveyData.forEach(survey => {
                        const surveyId = survey.surveyId;
                        surveyVotes[surveyId] = (surveyVotes[surveyId] || 0) + 1;
                    });

                    const sortedSurveys = Object.keys(surveyVotes).map(surveyId => {
                        return { surveyId, votes: surveyVotes[surveyId] };
                    });

                    const sortedByVotes = sortedSurveys.sort((a, b) => b.votes - a.votes);
                    const mostVoted = sortedByVotes.slice(0, 6);

                    setVotedSurveys(mostVoted);
                } else {
                    console.error('Invalid survey data format:', surveyData);
                }
            })
            .catch(error => {
                console.error('Error fetching survey data:', error);
            });
    }, []);

    return (
        <div>
            <h2>Most Voted Surveys</h2>
            <ul>
                {votedSurveys.map((survey, index) => (
                    <li key={index}>
                        Survey ID: {survey.surveyId}, Votes: {survey.votes}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default MostVoted;
