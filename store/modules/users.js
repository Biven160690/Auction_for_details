//Модуль store для users

export default {
  actions: {
    async fetchUsers(ctx) {
      const res = await fetch("https://jsonplaceholder.typicode.com/users");
      const users = await res.json();

      ctx.commit("updateUsers", users);
    }
  },
  state: {
    isUserLogged: false,
    isUserDreamCar: false,
    loggedUser: [],
    users: []
  },
  mutations: {
    updateUsers(state, users) {
      if (users.length > 0 && state.users.length < 10) {
        for (var i = 0; i < users.length; i++) {
          users[i].passw = "12345";

          var user = {
            id: users[i].id,
            name: users[i].name,
            email: users[i].email,
            company: users[i].company.name,
            phone: users[i].phone,
            passw: users[i].passw
          };
          state.users.push(user);
        }
      }
    },
    updateLoggedUser(state, user) {
      for (var i = 0; i < state.users.length; i++) {
        if (state.users[i].id == user.id) {
          state.users[i].name = user.name;
          state.users[i].email = user.email;
          state.users[i].company = user.company;
          state.users[i].phone = user.phone;
        }
      }
      for (var i = 0; i < state.loggedUser.length; i++) {
        if (state.loggedUser[i].id == user.id) {
          state.loggedUser[i].name = user.name;
          state.loggedUser[i].email = user.email;
          state.loggedUser[i].company = user.company;
          state.loggedUser[i].phone = user.phone;
        }
      }
    },

    updateLoggedUserPassword(state, user) {
      for (var i = 0; i < state.users.length; i++) {
        if (state.users[i].id === user.id) {
          state.users[i].passw = user.passw;
        }
      }
      for (var i = 0; i < state.loggedUser.length; i++) {
        if (state.loggedUser[i].id == user.id) {
          state.loggedUser[i].passw = user.passw;
        }
      }
    },

    pushUser(state, user) {
      state.users.push(user);
    },

    pushLoggedUser(state, user) {
      state.loggedUser.push(user);
      state.isUserLogged = true;
      if (user.email === "dream_car@gmail.ru") {
        state.isUserDreamCar = true;
      } else {
        state.isUserDreamCar = false;
      }
    },
    deletUser(state) {
      state.loggedUser.pop();
      state.isUserLogged = false;
      state.isUserDreamCar = false;
      this.$router.push("/");
    }
  },
  getters: {
    getAllUsers(state) {
      return state.users;
    },
    isUserLogged(state) {
      return state.isUserLogged;
    },
    isUserDreamCar(state) {
      return state.isUserDreamCar;
    },
    getLoggedUser(state) {
      return state.loggedUser[0];
    }
  }
};
