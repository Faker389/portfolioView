import { ChangeEvent, FormEvent, RefObject, useEffect, useRef, useState } from "react";
import TerminalPrompt from "./terminalPrompt";
interface Output {
    command: string;
    result: string|undefined;
  }
interface option{
    close:Function;
}
export default function TerminalSettings({close}:option){
    const [input, setInput] = useState<string>('');
    const [output, setOutput] = useState<Output[]>([]);
    const inputRef = useRef<HTMLInputElement>(null);
    const [index,setIndex ]= useState<number>(0)
    const fileRef = useRef<HTMLInputElement>(null)
    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
      setInput(event.target.value);
    };
    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        const selectedFile = event.target.files?.[0];
        if (selectedFile) {
          const fileURL = URL.createObjectURL(selectedFile);
          var div = document.querySelector(".container") as HTMLDivElement
          if(div){
            div.style.setProperty("background-image",`url(${fileURL})`)
          }
        }
      };
    const handleInputSubmit = (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      processCommand(input);
      setInput('');
    };
    if(inputRef.current){
        inputRef.current.onkeydown=(e)=>{
            if(e.key=="ArrowDown"){
                if(index<=output.length-1){
                    setIndex(index+1)
                }
            }else if(e.key=="ArrowUp"){
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
    },[index])
    const processCommand = (command: string) => {
      // Example: handle different commands
      if (command === "clear") {
        setOutput([]);
        return 0;
      }
      let result;
      switch (command.trim()) {
        case "-help":
            result ="Available commands: -background, -theme, clear , --back, -command-info"
            break;
        case '-background':
          result = 'Select background image from your device';
          break;
        case '-theme':
          result = 'comming soon';
          break;
        case "-command-info":
          result="-background - zmiana tła na twoj wybrany obrazek \n-theme - już niedługo";
          break;
        case '--back':
            close(false);setOutput([])
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
        <p className="p">Type -help to see all the settings commands</p>
        {output.map((item, index) => (
          <div key={index}>
            <TerminalPrompt />
            <span style={{ marginLeft: "8px" }}>{item.command}</span>
            <br />
            {item.result&&item.command=="-background"?<div>
                <input type="file" style={{display:"none"}} onChange={handleFileChange} ref={fileRef} />
                <span>To select background click here: <span style={{fontWeight:"bold"}} onClick={()=>fileRef.current!.click()}>+</span></span>
            </div>:<span>{item.result}</span>}
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
)}