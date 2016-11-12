app.value('dialogs', {
    start: {
        text: 'Hm, strange dreams.',
        next: {
            text: ' Something wrong here!'
        }
    },
    die: {
        text: 'You Died.'
    },

    pionerWC: {
        look: {
            text: " Not very pleasant spectacle."
        },
        talk: {
            text: " Pioneer: Hey! What you looking at, aren't you ashamed of yourself?"
        },
        wait: {
            text: "Pioneer: ...",
            next: {
                text: "Pioneer: When will I finish this!"
            }
        },
        attack: {
            text: " Pioneer: Get away from here!"
        }
    },

    pionerPark: {
        look: {
            text: " He looks concerned."
        },
        talk: {
            text: " MC: Don’t you think that something is wrong here? ",
            next: {
                text: " Pioneer: Yeah, I have that feeling too.",
                next: {
                    text: " Pioneer: Maybe go see the cooks…",
                    next: {
                        text: "Pioneer: .. or ask Iron Maiden fans?",
                        next: {
                            text: "Pioneer: Here take this just in case.",
                            next: {
                                text: " MC:Yeah! I got STICK!"
                            }
                        }
                    }
                }
            }
        },
        wait: {
            text: "Pioneer: I don't like all this."
        },
        attack: {
            text: " Pioneer: What are you doing!"
        }
    },

    fox: {
        look: {
            text: "This is fox. Apparently… "
        }
    },

    horse: {
        look: {
            text: " This is a horse in a coat."
        },
        talk: {
            text: "MC: Hi, where have everyone gone?",
            next: {
                text: " Horse in a coat: NNNeigh, they went missing and I don’t mind, no one scaring my fish."
            }
        },
        death: {
            text: "Punch was super effective!",
            next: {
                text: "MC:Yeah! I found KNIFE!"
            }
        }
    },

    fans: {
        look: {
            text: " This is Iron Maiden fans, and they are having fun."
        },
        talk: {
            text: "MC: Hi guys, can I sit here with you?",
            next: {
                text: "Iron Maiden fan: Do you even know any Iron Maiden song?",
                next: {
                    text: "MC: No.",
                    next: {
                        text: "Iron Maiden fan: Well then go the hell out of here!!!"
                    }
                }
            }
        },
        death: {
            text: "Punch was super effective!",
            next: {
                text: "MC:Yeah! I found GUN AND ROSE! Оо ",
                next: {
                    text: "MC:Yeah! I found letter…",
                    next: {
                        text: '" Yesterday we were trying to summon Bloody Mary, but something went wrong and couple of guys went missing…',
                        next: {
                            text: 'I hope they are just kidding around, because I heard, that kefir is behind this."',
                            next: {
                                text: 'Singed: Alex to Kate.'
                            }
                        }
                    }
                }
            }
        }
    },

    kefir: {
        look: {
            text: "MC: What the fuck!"
        },
        talk: {
            text: "Starting a conversation was not a very good idea."
        },
        death: {
            text: "Kefir is defeated! Pioneer camp saved!",
            next: {
                text: "The End."
            }
        }
    },

    weapons: {
        fist: "fist",
        stick: "stick",
        knife: "knife",
        rose: "gun and rose"
    },

    actions: {
        move: "move",
        attack: "attack",
        look: "look",
        talk: "talk"
    }
});
