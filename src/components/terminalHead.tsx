"use client"
import React, { useEffect, useRef, useState } from "react";
import  Draggable from "react-draggable"
import Terminal from "../components/terminalBody";
import TerminalSettings from "./terminalSettings";
function TerminalHead() {
  const [tabsCount,setTabsCount]=useState<number>(1)
  const [indexArray,setIndexArray]=useState<Array<number>>([0])
  const [selected,setSelected]=useState<number>(0)
  const [options,setOptions]=useState<boolean>(false)
  const lastId = useRef<number>(0)
  function addTab(){
    var tab = [...indexArray]
    tab.push(lastId.current!+1)
    lastId.current!+=1
    setIndexArray(tab)
    setTabsCount(tabsCount+1)
  }
  function removeTab(id:number){
    var tab = [...indexArray]
      console.log(selected)
    if(tab.length==2){
        tab.pop()
    }else{
        var temp = tab[id]
        tab[id]=tab[tabsCount-1]
        tab[tabsCount-1]=temp
        tab.pop()
    }
    setIndexArray(tab)
    setTabsCount(tabsCount-1)
  }

    useEffect(()=>{
      setSelected(indexArray[0])
    },[indexArray])
  return <>
  <div className="container">
  <Draggable 
  cancel=".terminal"
  handle=".box"
  bounds='parent'
  >
    <main className="box">
      <div className="top">
        <div className="tabs">
          {
             indexArray.map((e:number,index:number)=>{
                  return <div key={index} className={`userTab ${selected==e?"clicked":""}`} onClick={()=>setSelected(e)} >
                <p >user@DESKTOP-123</p>
                {indexArray.length>1?<span onClick={()=>{removeTab(e);setSelected(0)}}>+</span>:""}
              </div>
            })
        }
        <span className="addTerminal" onClick={addTab}>+</span>
      </div>
        {options==false&&<img src="/images/gear.png" alt="options" onClick={()=>setOptions(true)}/>}
    </div>
      {
        options==false?indexArray.map((e:unknown,index:number)=>{
          return  <div key={index} style={{display:selected==e?"block":"none"}}><Terminal close={setOptions}/></div>
        }):<TerminalSettings close={setOptions}/>
      }
    </main>
  </Draggable>
  </div>
  </>
}

export default TerminalHead;