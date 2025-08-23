export default {
  async registerCoach(context, data) {
    const userId = context.rootGetters.userId;

    const coachData = {
      firstName: data.first,
      lastName: data.last,
      description: data.desc,
      hourlyRate: data.rate,
      areas: data.areas,
    };

    const response = await fetch(
      `https://coach-finder-820bb-default-rtdb.firebaseio.com/coaches/${userId}.json`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(coachData),
      }
    );

    // const resData = await response.json();

    if (!response.ok) {
      // error ...
    }

    context.commit("registerCoach", {
      ...coachData,
      id: userId,
    });
  },
  async loadCoaches(context, payload) {
    if (payload.forceRefresh && !context.getters.shouldUpdate) {
      return;
    }

    const response = await fetch(
      "https://coach-finder-820bb-default-rtdb.firebaseio.com/coaches.json"
    );

    const data = await response.json();

    if (!response.ok) {
      const error = new Error(data.message || "Failed to fetch!");
      throw error;
    }

    const coaches = [];
    for (const key in data) {
      const coach = {
        id: key,
        firstName: data[key].firstName,
        lastName: data[key].lastName,
        description: data[key].description,
        hourlyRate: data[key].hourlyRate,
        areas: data[key].areas,
      };

      coaches.push(coach);
    }

    context.commit("setCoaches", coaches);
    context.commit("setFetchTimestamp");
  },
};
