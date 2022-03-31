import { useNavigate } from "react-router-dom";
import { useCallback, useContext, useEffect, useRef, useState } from "react";
import { DiaryDispatchContext } from "../App";

import MyHeader from "./MyHeader";
import MyButton from "./MyButton";
import EmotionItem from "./EmotionItem";

import { getStringDate } from "../util/date";
import { emotionList } from "../util/emotion";



const env = process.env;
env.PUBLIC_URL = env.PUBLIC_URL || "";

    const question = [{
        query1:"오늘 하루중에 후회한 일이 있었나요?",
        
    },
    {
        query1:"오늘 나에게 칭찬해주고 싶은 것이 있다면 무엇인가요?",
        
    },
    {
        query1:"오늘 제일 고마웠던 사람이 누구인가요?",
        
    },
    {
        query1:"오늘 무엇이 가장 즐거웠나요?",
    }
    ];
    const randomQuestion = question[Math.floor(Math.random()*question.length)];



const DiaryEditor = ({isEdit,originData}) => {
    const contentRef = useRef();
    const randomRef = useRef();
    const [content,setContent] = useState("");
    const [emotion,setEmotion] = useState(3);
    //const [query,setQuery] = useState(randomQuestion);
    const [random,setRandom] = useState("");
    const [date,setDate] =useState(getStringDate(new Date()));
    
    const {onCreate, onEdit, onRemove} = useContext(DiaryDispatchContext);
    const handleClickEmote = useCallback((emotion) => {
        setEmotion(emotion);
    },[]);

    const navigate = useNavigate();

    const handleSubmit = () => {
        if(content.length < 1){
            contentRef.current.focus();
            return;
        }else if(random.length<1){
            randomRef.current.focus();
            return;
        }
        if(window.confirm(isEdit ? "일기를 수정하시겠습니까?" : "새로운 일기를 작성하시겠습니까?")){
            if(!isEdit){
                onCreate(date,content,emotion,random);
            }else{
                onEdit(originData.id, date, content, emotion,random);
            }
        }
        
        navigate('/',{replace:true});
    };
    useEffect(() => {
        if(isEdit){
            setDate(getStringDate(new Date(parseInt(originData.date))));
            setEmotion(originData.emotion);
            setContent(originData.content);
            //setQuery(originData.query);
            setRandom(originData.random);
        }
    },[isEdit,originData])
    
    const handleRemove = () => {
        if(window.confirm("정말 삭제하시겠습니까?")){
            onRemove(originData.id);
            navigate('/',{replace:true});
        }
    }
    return (
        <div className="DiaryEditor">
            <MyHeader 
                headText={isEdit ? "일기 수정하기" : "새 일기쓰기"}
                leftChild={<MyButton text={"< 뒤로가기"} onClick={()=> navigate(-1)} />}
                rightChild={
                    isEdit && (
                        <MyButton text={"삭제하기"} type={"negative"} onClick={handleRemove} />
                    )
                }
            ></MyHeader>
            <div>
                <section>
                    <h4>오늘은 언제인가요?</h4>
                    <div className="input_box">
                        <input 
                            className="input_date"
                            value={date}   
                            onChange={(e) => setDate(e.target.value)} 
                            type="date" />
                    </div>
                </section>
                <section>
                    <h4>오늘의 감정</h4>
                    <div className="input_box emotion_list_wrapper">
                        {emotionList.map((it)=>(
                            <EmotionItem 
                            key={it.emotion_id} 
                            {...it} 
                            onClick={handleClickEmote}
                            isSelected={it.emotion_id === emotion}
                            ></EmotionItem>
                        ))}
                    </div>
                </section>
                <section>
                    <h4>오늘의 일기</h4>
                    <div className="input_box text_wrapper">
                        <textarea 
                            placeholder="오늘은 어땠나요?"
                            ref={contentRef} 
                            value={content} 
                            onChange={(e)=> setContent(e.target.value)}
                        />
                    </div>
            
                </section>
                <section>
                    <h1>{randomQuestion.query1}</h1>
                    <div className="input_box text_wrapper">
                        <textarea 
                            placeholder="답변 :)"
                            ref={randomRef} 
                            value={random} 
                            onChange={(e)=> setRandom(e.target.value)}
                        />
                    </div>
                </section>
               
                <section>
                    <div className="control_box">
                        <MyButton text={"취소하기"} onClick={()=>navigate(-1)} />
                        <MyButton text={"작성완료"} type={"positive"} onClick={handleSubmit} />
                    </div>
                </section>
            </div>
        </div>
        
        );
};
export default DiaryEditor;