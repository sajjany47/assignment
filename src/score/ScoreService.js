import axios from "axios";

export class ScoreService {
  constructor() {
    this.headers = {
      "Content-type": "application/json",
    };
  }

  scoreCardList = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/scorecards");
      return response.data;
    } catch (error) {
      throw new Error(error);
    }
  };
  scoreCardDelete = async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost:8000/api/scorecards/${id}`
      );
      return response.data;
    } catch (error) {
      throw new Error(error);
    }
  };
}
