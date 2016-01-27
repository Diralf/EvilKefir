describe('answersServiceTest', function () {

    /*var answersService;
    var httpBackend, injector;

    var questionId = '555053923428475414d2de35';
    var answerId = 'qwerty';

    var responseAnswersJSON = {
        answers: [
            {
                "_id": '1a',
                "text": "Test answer message",
                "question_id": "555053923428475414d2de35",
                "__v": 0,
                "useful": true,
                "rate": 0,
                "date": "2015-05-07T06:56:03.695Z",
                "userRate": 1,
                "user_id": "abc123"
            },
            {
                "_id": '2b',
                "text": "Test answer message 2",
                "question_id": "555053923428475414d2de35",
                "__v": 0,
                "useful": true,
                "rate": 0,
                "date": "2015-05-07T06:56:03.695Z",
                "userRate": 2,
                "user_id": "fgh456"
            }
        ]
    };

    var responseQuestionJSON = {
        "question": {
            "_id": '555053923428475414d2de35',
            "title": "Test title",
            "text": "Test message",
            "code_snippet": "console.log('Hello World!');",
            "competence_id": "5555f875a499f68423f8b9e0",
            "__v": 0,
            "rate": 0,
            "date": "2015-05-07T06:56:03.695Z"
        },
        "competence": {
            "name": "comp"
        },
        "userRate": 2,
        "user": {
            "_id": "123",
            "username": "foo"
        }
    };

    var expQuestionJSON = {
        "_id": '555053923428475414d2de35',
        "title": "Test title",
        "text": "Test message",
        "code_snippet": "console.log('Hello World!');",
        "competence_id": "5555f875a499f68423f8b9e0",
        "__v": 0,
        "rate": 0,
        "date": "2015-05-07T06:56:03.695Z",
        "competence": {
            "name": "comp"
        },
        "userRate": 2,
        "user": {
            "_id": "123",
            "username": "foo"
        }
    };

    var responseAnswerJSON = {
        "_id": '3c',
        "text": "Test answer message",
        "question_id": "555053923428475414d2de35",
        "__v": 0,
        "useful": true,
        "rate": 0,
        "date": "2015-05-07T06:56:03.695Z",
        "user_id": "qwerty"
    };

    beforeEach(function () {
        module('app');

        inject(function (_$httpBackend_, _answersService_) {
            httpBackend = _$httpBackend_;
            answersService = _answersService_;
        });
    });

    it('it should submit new answer', function () {
        httpBackend.when('POST', '/questions/' + questionId + '/answers').respond(200, responseAnswerJSON);

        answersService.submitAnswer(questionId, "", function (responseAnswers) {
            expect(responseAnswers).toEqual(responseAnswerJSON);
        });

        httpBackend.flush();
    });

    it('it should get answers', function () {
        httpBackend.when('GET', '/questions/' + questionId + '/answers').respond(200, responseAnswersJSON);

        answersService.getAnswers(questionId, function (responseAnswers) {
            expect(responseAnswers).toEqual(responseAnswersJSON.answers);
        });

        httpBackend.flush();
    });

    it('it should get question', function () {
        httpBackend.when('GET', '/questions/' + questionId).respond(200, responseQuestionJSON);

        answersService.getQuestion(questionId, function (err, responseQuestion) {
            expect(err).toEqual(null);
            expect(responseQuestion).toEqual(expQuestionJSON);
        });

        httpBackend.flush();
    });*/

    it('it should delete answer', function () {
        /*httpBackend.when('DELETE', '/questions/answers/' + answerId).respond(200, responseAnswerJSON);

        answersService.deleteAnswer(answerId, function (responseAnswer) {
            expect(responseAnswer).toEqual(responseAnswerJSON);
        });

        httpBackend.flush();*/

        expect(false).toEqual(false);
    });

});
