const Question = () => {
    const question = [{
        query1:"오늘 음식",
        
    },
    {
        query1:"오늘 착장",
        
    },
    {
        query1:"오늘 기분",
        
    },
    {
        query1:"오늘 잠잔시간",
    }
];
    const randomQuestion = question[Math.floor(Math.random()*question.length)];
    return (
        <>
            <h1>{randomQuestion.query1}</h1>
        
        </>
    )
}
export default Question;

const question = [{
    query1:"오늘 음식",
    
},
{
    query1:"오늘 착장",
    
},
{
    query1:"오늘 기분",
    
},
{
    query1:"오늘 잠잔시간",
}
];
const randomQuestion = question[Math.floor(Math.random()*question.length)];