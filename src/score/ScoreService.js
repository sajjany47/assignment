import axios from "axios";

export class ScoreService {
  constructor() {
    this.headers = {
      "Content-Type": "application/json",
    };
  }

  scoreCardList = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/scorecards", {
        headers: this.headers,
      });
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  };
  scoreCardDelete = async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost:8000/api/scorecards/${id}`,
        { headers: this.headers }
      );
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  };

  scoreCardCreate = async (payload) => {
    try {
      const response = await axios.post(
        `http://localhost:8000/api/scorecards`,
        payload,
        { headers: this.headers }
      );
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  };

  singleScoreCard = async (id) => {
    try {
      const response = await axios.get(
        `http://localhost:8000/api/scorecards/${id}`,

        { headers: this.headers }
      );
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  };

  singleScoreCardUpdate = async (id, payload) => {
    try {
      const response = await axios.put(
        `http://localhost:8000/api/scorecards/${id}`,
        payload,
        { headers: this.headers }
      );
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  };
}
