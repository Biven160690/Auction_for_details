//Модуль деталей

export default {
    state: {
        parts: [
            {
                "id": 1,
                "name": "Brake disc",
                "description": "Brake disc for passenger cars",
              },
              {
                "id": 2,
                "name": "Wheel",
                "description": "Wheel  for passenger cars.",
              },
              {
                "id": 3,
                "name": "Suspension",
                "description": "Suspension for passenger cars",
              },
              {
                "id": 4,
                "name": "Headlight",
                "description": "Headlight for passenger cars",
              },
        ]
    },
    getters: {
        getAllParts(state) {
            return state.parts
        }
    }
}
