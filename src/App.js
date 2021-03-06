import './App.css';
import React, { useEffect, useReducer, useRef } from 'react';
import {BrowserRouter , Route ,Routes} from "react-router-dom";

import New from './pages/New';
import Home from './pages/Home';
import Edit from './pages/Edit';
import Diary from './pages/Diary';

const env = process.env;
env.PUBLIC_URL = env.PUBLIC_URL || "";

const reducer = (state,action) => {
  let newState = [];
  switch(action.type){
    case 'INIT' : {
      return action.data;
    }
    case 'CREATE' : {
      newState =[action.data,...state];
      break;
    }
    case 'REMOVE' : {
      newState = state.filter((it)=>it.id !== action.targerId);
      break; 
    }
    case 'EDIT' : {
      newState = state.map((it)=>it.id === action.data.id? {...action.data}:it);
      break;
    }
    default :
      return state;
  }
  localStorage.setItem('diary',JSON.stringify(newState));
  return newState;
};

export const DiaryStateContext = React.createContext();
export const DiaryDispatchContext = React.createContext();

function App() {
  
  const [data,dispatch] = useReducer(reducer, []);
  
  useEffect(() => {
    const localData = localStorage.getItem("diary");
    if (localData) {
      const diaryList = JSON.parse(localData).sort(
        (a, b) => parseInt(b.id) - parseInt(a.id)
      );
      
      if (diaryList.length >= 1){
      dataId.current = parseInt(diaryList[0].id) + 1;
      dispatch({ type: "INIT", data: diaryList });
    }
  }
  }, []);

  const dataId = useRef(1);  
  //CREATE
  const onCreate = (date, content, emotion,random) => {
    dispatch({type : "CREATE",
    data:{
      id:dataId.current,
      date :new Date(date).getTime(),
      content,
      emotion,
      random,
    },
  });
  dataId.current += 1;
  };
  //REMOVE
  const onRemove = (targetId) => {
    dispatch({type:"REMOVE",targetId});
  };
  //EDIT
  const onEdit = (targerId, date, content, emotion,random) => {
    dispatch({
      type:"EDIT",
      data:{
        id:targerId,
        date:new Date(date).getTime(),
        content,
        emotion,
        random,
      },
    });
  }
  return (
    <DiaryStateContext.Provider value={data}>
      <DiaryDispatchContext.Provider 
      value={{
        onCreate,
        onEdit,
        onRemove,
        }}>
      <BrowserRouter>
      <div className='App'>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/new" element={<New />} />
          <Route path="/edit/:id" element={<Edit />} />
          <Route path="/diary/:id" element={<Diary />} />
        </Routes>
        
      </div>
      </BrowserRouter>
      </DiaryDispatchContext.Provider>
    </DiaryStateContext.Provider>
  );
}

export default App;
