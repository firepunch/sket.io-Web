<b>모든 key-value는 쌍따옴표(")로 쌓여있다.</b><br>
예 ) "type" : "google"
<table>
    <tbody>
    <tr>
        <th></th>
        <th align=left>Client->Server</th>
        <th align=left>Server->Client</th>
    </tr>
    <tr>
        <td>구글 로그인</td>
        <td align="center">-</td>
        <td>
            type : google,<br>
            id: (유저 아이디),<br>
            name : (유저 이름),<br>
            nick : (nickXX or 유저 닉넴),<br>
            picture : (유저 사진 링크)
        </td>
    </tr>
    <tr>
        <td>페북 로그인</td>
        <td align="center">-</td>
        <td>
            type : facebook,<br>
            id: (유저 아이디),<br>
            name : (유저 이름),<br>
            nick : (nickXX or 유저 닉넴),<br>
            picture : (유저 사진 링크)
        </td>
    </tr>
    <tr>
        <td>게스트 로그인</td>
        <td></td>
        <td></td>
    </tr>
    <tr>
        <td>방 생성</td>
        <td>
            type : createRoom,<br>
            roomName : (방 이름),<br>
            lock : (true or false),<br>
            password : (null or 1234),<br>
            master : (유저 아이디)
        </td>
        <td>type : createRoom,<br>
            roomName : (방 이름),<br>
            lock : (true or false),<br>
            master : (유저 아이디),<br>
            roomId : (룸 아이디)
        </td>
    </tr>
    <tr>
        <td>방 입장</td>
        <td> type : enterRoom,<br>
            roomId : (방 아이디),<br>
            userId : (user id)
        </td>
        <td>type : enterRoom,<br>
            roomId : (방 아이디),<br>
            userId : (user id),<br>
            userNum : (총 인원 수),<br>
            readyUser : [{<br>
            &nbsp;&nbsp;id : (유저 아이디),<br>
            &nbsp;&nbsp;isReady : (boolean)
            <br>&nbsp;}{<br>
            &nbsp;&nbsp;id : (유저 아이디),<br>
            &nbsp;&nbsp;isReady : (boolean)
            <br>}]
        </td>
    </tr>
    <tr>
        <td> 게임 준비</td>
        <td> type : gameReady,<br>
            id : 유저 아이디,<br>
            isReady : (true or false)
        </td>
        <td> type : playerGameReady,<br>
            id : 유저 아이디,<br>
            isReady : (true or false)
        </td>
    </tr>
    <tr>
        <td>방 퇴장</td>
        <td> type : exitRoom,<br>
            userId : (유저 아이디),<br>
            roomId : (방 아이디)
        </td>
        <td> type : exitRoom,<br>
            userId : (유저 아이디),<br>
            roomId : (방 아이디)
        </td>
    </tr>
    <tr>
        <td>게임 종료</td>
        <td> type : gameEnd,<br>
            roomId : (방 아이디),<br>
            scoreInfo : [{<br>
            &nbsp;&nbsp;id : (유저 아이디),<br>
            &nbsp;&nbsp;level : (유저의 레벨),<br>
            &nbsp;&nbsp;score : (해당 유저의 점수)
            <br>&nbsp;},{<br>
            &nbsp;&nbsp;id : (유저 아이디),<br>
            &nbsp;&nbsp;level : (유저의 레벨),<br>
            &nbsp;&nbsp;score : (해당 유저의 점수)
            <br>},...]
        </td>
        <td> type : gameEnd,<br>
            expinfo : [{<br>
            &nbsp;&nbsp;id : (유저 아이디),<br>
            &nbsp;&nbsp;level : (유저의 레벨),<br>
            &nbsp;&nbsp;exp : (해당 유저의 경험치)
            <br>&nbsp;},{<br>
            &nbsp;&nbsp;id : (유저 아이디),<br>
            &nbsp;&nbsp;level : (유저의 레벨),<br>
            &nbsp;&nbsp;exp : (해당 유저의 경험치)
            <br>},...]
        </td>
    </tr>
    <tr>
        <td>정답 맞춤</td>
        <td> type : correctAnswer,<br>
            roomId : 2,<br>
            correcterId : (정답자 아이디),<br>
            // 이 사람을 문제 출제자로<br>
            examinerId : (출제자 아이디),<br>
            score : (정답자 점수)
        </td>
        <td> type : correctAnswer,<br>
            roomId : (방 아이디),<br>
            quizCnt : (문제 카운트),<br>
            correcterId : (정답자 아이디),<br>
            // 이 사람을 문제 출제자로<br>
            plusScore : (정답자 점수,<br> 시간에 따라)
        </td>
    </tr>
    <tr>
        <td>모두 감점</td>
        <td></td>
        <td>type : incorrectAnswer,<br>
            roomId : (방 아이디),<br>
            quizCnt : (문제 카운터),<br>
            minusScore : (전체 점수 10점 감점)
        </td>
    </tr>
    <tr>
        <td>랜덤 퀴즈 전송</td>
        <td> type : randomQuiz,<br>
            roomId : 2,<br>
            id : ~~
        </td>
        <td> type : randomQuiz,<br>
            quiz : ~~~~
        </td>
    </tr>
    <tr>
        <td>랜덤 출제자 전송</td>
        <td></td>
        <td>type : randomExaminer,<br>
            id : (유저 아이디),<br>
            roomId : 2
        </td>
    </tr>
    <tr>
        <td>채팅 시작</td>
        <td> type : chatStart,<br>
            id : 유저 아이디,<br>
            roomId : 룸 아이디,<br>
            msg : 채팅 말
        </td>
        <td>type : chatStart,<br>
            id : 유저 아이디,<br>
            roomId : 룸 아이디,<br>
            msg : 채팅 내용,<br>
            correct : true/false
        </td>
    </tr>
    <tr>
        <td>랭킹 보여주기</td>
        <td> type : showRank,<br>
            userId : (유저 아이디)
        </td>
        <td> type : showRank,<br>
            rankinfo : [{<br>
            &nbsp;&nbsp;id : (자신의 아이디),<br>
            &nbsp;&nbsp;nick : (자신의 닉네임),<br>
            &nbsp;&nbsp;level : (자신의 레벨),<br>
            &nbsp;&nbsp;exp : (자신의 경험치)
            <br>&nbsp;},{<br>
            &nbsp;&nbsp;id : (유저 아이디),<br>
            &nbsp;&nbsp;nick : (유저의 닉네임),<br>
            &nbsp;&nbsp;level : (유저의 레벨),<br>
            &nbsp;&nbsp;exp : (유저의 경험치)
            <br>},...]
        </td>
    </tr>
    </tbody>
</table>