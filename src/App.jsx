import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Box from './component/Box'
import { use } from 'react'

//1. 박스 2개 (타이틀, 사진 정보, 결과값(tie, win, lose))
//2. 가위 바위 보 버튼이 있다
//3. 버튼 클릭하면 클릭한 값이 박스에 보임
//4. 컴퓨터는 랜덤하게 아이템 선택이 된다
//5. 3 4의 결과를 가지고 누가 이겼는지 승패를 따진다
//6. 승패결과에 따라 테두리 색이 바뀐다(이기면-초록, 지면-빨강, 비기면-검은색)

const choice = {
  rock: {
    name: "Rock",
    img: "https://search.pstatic.net/sunny/?src=https%3A%2F%2Fpreview.free3d.com%2Fimg%2F2016%2F07%2F2279449938574181984%2Feguquwqb.jpg&type=sc960_832"
  },
  scissors: {
    name: "Scissors",
    img: "https://search.pstatic.net/common/?src=http%3A%2F%2Fshopping.phinf.naver.net%2Fmain_5776750%2F57767500886.20251114172249.jpg&type=sc960_832"
  },
  paper: {
    name: "Paper",
    img: "https://search.pstatic.net/sunny/?src=https%3A%2F%2Fyt3.googleusercontent.com%2FCZrCb8jlYxpYPWoGN43R1HPeRMLrOVt9SgZ7SU4K7w00_rHyIOwWJAnqezMN7Xts7toVQcZjnfk%3Ds900-c-k-c0x00ffffff-no-rj&type=sc960_832"
  }
}

function App() {
  const [userSelect, setUserSelect] = useState(null)
  const [computerSelect, setComputerSelect] = useState(null)
  const [result, setResult] = useState(null)
  const [computerResult, setComputerResult] = useState(null)


  const play = (userChoice) => {
    setUserSelect(choice[userChoice])
    let computerChoice = randomChoice();
    setComputerSelect(computerChoice);
    let userResult = judgement(choice[userChoice], computerChoice);
    setResult(userResult);
    setComputerResult(notice(userResult));
  };

  const notice = (result) => {
    console.log("result:", result)
    if (result == "win") { return "lose" }
    else if (result == "lose") {
      return "win"
    }
    else if (result === "tie") {
      return "tie"
    }
  }
  const judgement = (user, computer) => {
    console.log("user:", user);
    console.log("computer:", computer);

    //user == computer tie
    //user == rock, computer == scissors user win
    //user == rock, computer == paper user lose
    //user == scissors computer == paper user win
    //user == scissors computer == rock user lose
    //user == paper computer == rock user win
    //user == paper computer == scissors user lose

    if (user.name == computer.name) {
      return "tie"
    } else if (user.name == "Rock") return computer.name == "Scissors" ? "win" : "lose"
    else if (user.name == "Scissors") return computer.name == "Paper" ? "win" : "lose"
    else if (user.name == "Paper") return computer.name == "Rock" ? "win" : "lose"
  }



  const randomChoice = () => {
    let itemArray = Object.keys(choice); //객체에 키값만 뽑아서 배열로 만들어주는 함수
    console.log("itemArray:", itemArray);

    let randomItem = Math.floor(Math.random() * itemArray.length);
    let final = itemArray[randomItem];
    return choice[final];


  }
  return (
    <div>
      <div className='main'>
        <Box title="You" item={userSelect} result={result} />
        <Box title="Computer" item={computerSelect} result={computerResult} />
      </div>
      <div className='align'>
        <button onClick={() => play("scissors")}>가위</button>
        <button onClick={() => play("rock")}>바위</button>
        <button onClick={() => play("paper")}>보</button>
      </div>
    </div>
  )
}

export default App
