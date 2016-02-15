app.value('dialogs', {
    start: {
        text: 'Хм, странные сны.',
        next: {
            text: 'Что тут не так?'
        }
    },
    again: {
        text: 'Боже, ну и сон.'
    },

    pionerWC: {
        look: {
            text: "Не самое приятное зрелище."
        },
        talk: {
            text: "Пионер: Эй! Чо смотришь, не стыдно тебе?"
        },
        wait: {
            text: "Пионер: ...",
            next: {
                text: "Пионер: Да когда я уже закончу!"
            }
        },
        attack: {
            text: "Пионер: А ну пошел вон отсюда!"
        }
    },

    pionerPark: {
        look: {
            text: "Он выглядит встревоженным."
        },
        talk: {
            text: "ГГ: Тебе не кажется, что что-то здесь не так?",
            next: {
                text: "Пионер: Вот да, есть такое же ощущение.",
                next: {
                    text: "Пионер: Может сходи к поварам..",
                    next: {
                        text: "Пионер: ..или спроси у фанатов Цоя?"
                    }
                }
            }
        },
        wait: {
            text: "Пионер: Не нравится мне все это."
        }
    }
});
