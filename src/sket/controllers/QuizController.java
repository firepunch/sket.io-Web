package sket.controllers;

import org.json.JSONObject;
import sket.db.DBConnection;
import sket.model.action.PlayerAction;
import sket.model.action.RoomAction;
import sket.model.data.Player;
import sket.model.data.Room;

import javax.servlet.http.HttpServlet;

public class QuizController extends HttpServlet {
    public QuizController() {
        super();
    }

    /* 랜덤 퀴즈를 json 으로 반환하는 메소드 */
    public static JSONObject sendQuizByJSON(Room targetRoom, int userId) {
        JSONObject message = new JSONObject();
        JSONObject data = new JSONObject();
        targetRoom.addCurRound();

        if (!(targetRoom.getCurRound() < targetRoom.getRoundLimit())) {
            DBConnection db = new DBConnection();
            String quiz = db.selectQuiz();

            data.put("gameEnd", "false");
            data.put("id", userId);
            data.put("round", targetRoom.getCurRound());
            data.put("quiz", quiz);
            targetRoom.setAnswer(quiz);
        } else {
            data.put("gameEnd", "true");
        }

        message.put("type", "RANDOM_QUIZ");
        message.put("data", data);

        return message;
    }

    /* 문제 맞춘 시간에 따라 점수 측정 */
    public static int getScore(int total, int cur) {
        // 한 문제당 100점
        int addScore = total / cur * 100;

        return addScore;
    }

    /* 문제 맞춘 사람 점수 더해줌 */
    public static void addScore(String correctId, int addScore) {
        Player targetPlayer = PlayerAction.getEqualPlayerId(correctId);

        targetPlayer.addScore(addScore);
    }

    /* 전체 점수 감점 */
    public static void minusScore(int roomId, int minusScore) {
        Room targetRoom = RoomAction.findRoomById(roomId);
        for (Player player : Room.getRoomIntoPlayer(targetRoom)) {
            player.minusScore(minusScore);
        }
    }
}