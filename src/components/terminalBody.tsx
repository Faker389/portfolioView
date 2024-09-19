import React, { ChangeEvent, FormEvent, useEffect, useRef, useState } from "react";
import TerminalPrompt from "./terminalPrompt";



interface Output {
  command: string;
  result: string|undefined;
}
interface option{
  close:Function;
}
function Terminal({close}:option){
  const [input, setInput] = useState<string>('');
  const [output, setOutput] = useState<Output[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const [index,setIndex ]= useState<number>(0)

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInput(event.target.value);
  };
  if(inputRef.current){
    inputRef.current.onkeydown=(e)=>{
        if(e.key=="ArrowUp"){
            if(index<=output.length-1){
                setIndex(index+1)
            }
        }else if(e.key=="ArrowDown"){
            if(index>=1){
                setIndex(index-1)
            }
        }
    }
  }
  useEffect(()=>{
    if(inputRef.current){
        if(index==0){
            inputRef.current.value=""
        }else{
            inputRef.current.value=output[output.length-index].command
        }
    }
    console.log(index)
  },[index])
  const handleInputSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    processCommand(input);
    setInput('');
  };
  const processCommand = (command: string) => {
    if (command === "clear") {
      setOutput([]);
      return 0;
    }
    let result;
    switch (command.trim()) {
      case '-help':
        result = 'Available commands: -expirience, -command-info, -about-me, clear, -ls';
        break;
      case '-expirience':
        result = "Jestem programistą Frontend'owym jak i backend'owym mającym 2 letnie doświadczenie szkolne w\nrobieniu projektów w wszelakich technologiach takich jak: php, next js, react, \nhtml, css, sql, c++, c#, .NET, java";
        break;
      case '-command-info':
        result = '-expirience - Krótko o doświadczeniu \n-ls - lista moich projektów \n-about-me - krótko o mnie';
        break;
      case '-ls':
        result = 'warcaby - projekt zrobiony w technologi typescript i .net\nbudget App projekt zrobiony do łatwiejszego śledzenia wydatków zrobiony w next js i node js\nparalax scroll zrobiony w html css i js\ndashboard projekt warsztatu samochodowego wzbogacony o interakcje z klientami zrobiony przy użyciu react i node js';
        break;
      case '-about-me':
        result = 'Jesteme Michał jestem w technikum Programistycznym i bardzo interesuje sie programowaniem,\npoznawaniem nowych technologi i dążeniem do postanowionych sobie celów';
        break;
      case "":
        result = undefined;
        break;
      default:
        result = `command not found: ${command}`;
    }
    setOutput([...output, { command, result }]);
  };

  return (
    <div className="terminal" onClick={() => {
      if (inputRef.current) {
        inputRef.current.focus();
      }
    }}>
      <p className="p">Type -help to see all the commands</p>
      {output.map((item, index) => (
        <div key={index}>
          <TerminalPrompt />
          <span style={{ marginLeft: "8px" }}>{item.command}</span>
          <br />
          {item.result&&<pre>{item.result}</pre>}
        </div>
      ))}
      <form onSubmit={handleInputSubmit}>
        <div className="command">
          <TerminalPrompt />
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={handleInputChange}
            autoFocus
            autoComplete="off"
          />
        </div>
      </form>
    </div>
  );
};

export default Terminal;
