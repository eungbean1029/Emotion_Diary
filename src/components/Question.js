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
            <h1>오늘의 질문</h1>
            <div>{randomQuestion.query1}</div>
        </>
    )
}
export default Question;