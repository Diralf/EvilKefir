app=angular.module("app",[]),app.run(["$rootScope","$http","keyboardService","mapService","viewportService",function(t,e,i,n,o){i.init(),n.init(),o.init();var r=function(){e.get("/isdesk").then(function(e){t.isNotDesktop=!response.device.isDesktop}),e.post("/game/0",{checkpoint:"cehck enter"}).then(function(t){})};r()}]),app.config(["$logProvider",function(t){t.debugEnabled(!0)}]),app.constant("transparentSymbol","g"),app.service("staticObject",["entityVisible","message",function(t,e){this.StaticObject=function(i,n,o,r){t.EntityVisible.call(this,i,n,o,r),this.onMessage[e.LOOK]=function(t){return console.log("he look on me! I - "+this.id),!0}},this.StaticObject.prototype=Object.create(t.EntityVisible.prototype)}]),app.service("character",["$window","entityVisible","spriteImage","characterControl","point","characterSprite","message","mapService","game","dialogs",function(t,e,i,n,o,r,a,s,c,h){function p(i,n,p){function l(){var t,e,i=u.call(this),n=f.call(this,this.x+i.x,this.y+i.y);return n||(t=f.call(this,this.x+i.x,this.y),e=f.call(this,this.x,this.y+i.y),t||(i.x=0),e||(i.y=0)),i}function u(){var t=y.x-this.x,e=y.y-this.y,i=t>0?2:t<0?-2:0,n=e>0?1:e<0?-1:0;return o.create(i,n)}function d(){y.x=this.x,y.y=this.y,m=!1,this.sprite.changeStrip("await")}function f(t,e){var i=!0;return this.checkCollisionEntity(t,e,function(t){i=!1}),i&&this.checkCollisionMap(t,e,s.currentLevel.mask,function(){i=!1}),i}e.EntityVisible.call(this,i,n,new r.CharacterSprite,p);var y=o.create(i,n),m=!1;c.startDialog(h.start),this.onMessage[a.LOOK]=function(){return console.log("I also look!!!"),!0},this.onMessage[a.DEATH]=function(){return c.startDialog(h.die),t.location.reload(),!0},this.onMessage[a.MOVE]=function(t,e,i){e%2&&(e-=1),Math.abs(this.x-e)<4&&(e=this.x),Math.abs(this.y-i)<2&&(i=this.y),y=o.create(e,i),"move"!==this.sprite.currentStrip.name&&this.sprite.changeStrip("move")},this.onMessage[a.STEP]=function(t,e){if(m=y.x!=this.x||y.y!=this.y){var i=l.call(this);this.sprite.calcDir(i.x,i.y),i.x||i.y?this.moveIn(this.x+i.x,this.y+i.y):(d.call(this),e&&e())}else d.call(this),e&&e()}}this.create=function(t,e,i){return new p(t,e,i)},p.prototype=Object.create(e.EntityVisible.prototype)}]),app.service("characterControl",["keyboardService",function(t){var e;t.addHandler("W",function(t,i){e(0,-1)}),t.addHandler("A",function(t,i){e(-1,0)}),t.addHandler("S",function(t,i){e(0,1)}),t.addHandler("D",function(t,i){e(1,0)}),this.moveHandler=function(t){e=t}}]),app.service("characterData",[function(){this.x=15,this.y=10}]),app.service("characterLogic",["characterData","mapService",function(t,e){this.init=function(){e.getLayers().low.add("0",t.x,t.y)}}]),app.run(["characterLogic",function(t){}]),app.service("characterSprite",["$q","spriteAnimate","strip","rect",function(t,e,i,n){this.CharacterSprite=function(){e.SpriteAnimate.call(this,new n.Rect((-2),(-1),5,2));var t=this;this.promise=this.loadStripSet("await",["entity/character/await/Await_back_left.txt","entity/character/await/Await_back_right.txt","entity/character/await/Await_front_left.txt","entity/character/await/Await_front_right.txt"],{frameCount:3,dirCount:4,width:7,height:6,centerX:3,centerY:5,speed:0}).then(function(){t.changeStrip("await")}),this.loadStripSet("move",["entity/character/move/Move_back_left.txt","entity/character/move/Move_back_right.txt","entity/character/move/Move_front_left.txt","entity/character/move/Move_front_right.txt"],{frameCount:2,dirCount:4,width:7,height:6,centerX:3,centerY:5,speed:.34}),this.dir=3},this.CharacterSprite.prototype=Object.create(e.SpriteAnimate.prototype),this.CharacterSprite.prototype.calcDir=function(t,e){var i={"-1":{"-2":0,0:this.dir%2?1:0,2:1},0:{"-2":this.dir<2?0:2,0:this.dir,2:this.dir<2?1:3},1:{"-2":2,0:this.dir%2?3:2,2:3}};this.dir=i[e+""][t+""]}}]),app.controller("viewport",["$scope","$log","character","characterData","characterControl","mouseService","mapService","viewportService","render","symbolWidthService","entityVisible","sprite","spriteImage","staticObject","rect","message","game","pionerWC","pionerPark","fox","horse","fans","kefir","entity",function(t,e,i,n,o,r,a,s,c,h,p,l,u,d,f,y,m,g,v,x,w,k,C,S){function P(t,e,i){var n=[];return a.getLayers()[0].eachRect(t-20,e-10,40,20,function(t,e,i){n.unshift(i)}),n.some(function(n){return n.isPointMeet(t,e)&&n.handleMessage(i,{player:N})})}function b(t,e,i,n){return Math.sqrt(Math.pow(t-e,2)+Math.pow(i-n,2))}function M(){E&&N.handleMessage(y.MOVE,s.pos.x+A,s.pos.y+L)}var E=!1,A=0,L=0,N=i.create(24,30,a.currentLevel.layers[0]),D=new g.PionerWC(206,27,a.currentLevel.layers[0]),_=new v.PionerPark(140,69,a.currentLevel.layers[0]),I=new x.Fox(226,64,a.currentLevel.layers[0]),T=new x.Fox(262,51,a.currentLevel.layers[0]),R=new x.Fox(320,59,a.currentLevel.layers[0]),O=new x.Fox(294,74,a.currentLevel.layers[0]),W=new w.Horse(328,21,a.currentLevel.layers[0]),j=new k.Fans(388,60,a.currentLevel.layers[0]),H=new C.Kefir(40,64,a.currentLevel.layers[0]);a.currentLevel.layers[0].add(N),a.currentLevel.layers[0].add(D),a.currentLevel.layers[0].add(_),a.currentLevel.layers[0].add(I),a.currentLevel.layers[0].add(T),a.currentLevel.layers[0].add(R),a.currentLevel.layers[0].add(O),a.currentLevel.layers[0].add(W),a.currentLevel.layers[0].add(j),a.currentLevel.layers[0].add(H),s.player=N,r.addMouseHandler("mousedown",function(e,i,n,o){if(m.nextDialog())return 0;m.onStopPlayer=null;var r=s.pos.x+i,a=s.pos.y+n;if(m.currentAction!=m.actions.move){var c=m.currentAction.message;return m.currentAction!=m.actions.look?m.onStopPlayer=function(){b(N.x/2,r/2,N.y,a)<8&&(o(P(r,a,c)),m.onStopPlayer=null)}:o(P(r,a,c)),m.currentAction!=m.actions.look&&b(N.x/2,r/2,N.y,a)>3&&(N.handleMessage(y.MOVE,r,a),E=!0),m.currentAction!=m.actions.attack&&(m.currentAction=m.actions.move,t.setActive(t.buttons[0])),0}E=!0,N.handleMessage(y.MOVE,r,a)}),r.addMouseHandler("mouseup",function(t,e,i,n){E=!1}),r.addMouseHandler("mousemove",function(t,e,i,n){A=e,L=i}),h.addListener("resize",function(){s.resize()}),t.gameviewLine=[],s.init("="),s.resize(),N.sprite.promise.then(function(){console.log("loaded")});setInterval(function(){S.entityCollection.each(function(t,e){e.step()}),M(),s.update(),t.gameviewLine=c.draw(),t.$apply(),N.handleMessage("step",m.onStopPlayer)},60);t.buttons=[{active:!0,action:m.actions.move},{active:!1,action:m.actions.attack,red:!0},{active:!1,action:m.actions.look},{active:!1,action:m.actions.talk}];var V=t.buttons[0];t.hint="",t.setActive=function(e){return e===V&&V!==t.buttons[0]?void t.setActive(t.buttons[0]):(V.active=!1,e.active=!0,V=e,m.currentAction=e.action,void(t.hint=e.action!==m.actions.move?e.action.title:""))},t.setBorder=function(t){return new Array(t.length+1).join("═")},t.weapon=m.currentWeapon,t.dialog=m.dialog}]),app.service("mapService",["$http","$q","level","entityVisible","spriteImage",function(t,e,i,n,o){this.levels=[],this.currentLevel=null,this.init=function(){var n=this;this.levels.push(i.create()),this.currentLevel=this.levels[0];for(var o=[],r=0;r<126;r++)o[r]=new Array(534).join(" ");this.currentLevel.tile.init(o);for(var a="",r=0;r<40;r++)a+=new Array(89).join(" ")+"\n";var s=["map/tile/8FansRoomNice.txt","map/tile/1FirstRoom.txt","map/tile/6ForestOneRoomNice.txt","map/tile/7ForestSecondRoomNice.txt","map/tile/9LikeRoomNice.txt","map/tile/5RESTORANRoomNice.txt","map/tile/3RestRoomNice.txt","map/tile/2SecondRoom.txt","map/tile/4ThridRoomNice.txt","map/roomSmall.txt"];e.all(s.map(function(e){return t.post("/sprite",{fileName:e})})).then(function(t){var e=[[t[1].data,t[7].data,t[6].data,t[4].data,t[9].data,t[9].data],[t[5].data,t[8].data,t[2].data,t[3].data,t[0].data,t[9].data],[t[9].data,t[9].data,t[9].data,t[9].data,t[9].data,t[9].data]];n.currentLevel.tile.initFromMatrix(e),n.currentLevel.mask.initFromMatrix(e)})},this.getRect=function(t,e,i,n){return this.currentLevel.tile.getRect(t,e,i,n)},this.getLayers=function(){return this.currentLevel.layers}}]),app.service("mouseService",["$log",function(t){var e={};this.emitMouseEvent=function(i,n,o,r){return e[i]?void e[i].forEach(function(e,a){e(n,+o,+r,function(e){t.debug("handling "+a+" "+i+" finished - result: "+e)})}):void t.error("mouseEvent: "+i+" - no handlers")},this.addMouseHandler=function(t,i){e[t]||(e[t]=[]),e[t].push(i)}}]),app.service("keyboardService",["$document","KEYS",function(t,e){var i={};this.init=function(){t.bind("keydown",function(t){var n=e[t.which];n&&(t.preventDefault(),i[n]&&i[n](t))})},this.addHandler=function(t,e){i[t]=e}}]),app.constant("KEYS",{37:"left",38:"up",39:"right",40:"down",87:"W",65:"A",83:"S",68:"D"}),app.directive("symbolWidth",["symbolWidthService",function(t){return{restrict:"AE",template:"<div class='symbol-width'>S</div>",replace:!0,link:function(e,i,n){function o(){t._setSizeOneSymbol(+i[0].getBoundingClientRect().width,+i[0].getBoundingClientRect().height,+i.parent()[0].getBoundingClientRect().width,+i.parent()[0].getBoundingClientRect().height)}o(),e.$watch(function(){return i.parent()[0].getBoundingClientRect().width},function(){o()}),e.$watch(function(){return i.parent()[0].getBoundingClientRect().height},function(){o()})}}}]),app.directive("viewportLine",["$log","mouseService","symbolWidthService",function(t,e,i){return{restrict:"EA",link:function(t,n,o){t.onMouseDown=function(t){e.emitMouseEvent("mousedown",t,i.xToSymbolNumber(t.offsetX),o.cellY)},t.onMouseUp=function(t){e.emitMouseEvent("mouseup",t,i.xToSymbolNumber(t.offsetX),o.cellY)},n.bind("mouseover",function(t){n.find("div").addClass("show"),n.parent().find("i").addClass("show")}),n.bind("mouseout",function(t){n.find("div").removeClass("show"),n.parent().find("i").removeClass("show")}),n.on("mousemove",function(t){if("SPAN"==t.target.tagName){t.preventDefault(),n.find("div").css("left",i.xToCellX(t.offsetX)+"px");var r=n.parent().find("i");r.css("left",i.xToCellX(t.offsetX+20)+"px"),r.css("top",n[0].offsetTop+"px")}e.emitMouseEvent("mousemove",t,i.xToSymbolNumber(t.offsetX),o.cellY)})}}}]),app.value("dialogs_ru",{start:{text:"Хм, странные сны.",next:{text:"Что-то тут не так!"}},die:{text:"Вы погибли."},pionerWC:{look:{text:"Не самое приятное зрелище."},talk:{text:"Пионер: Эй! Чо смотришь, не стыдно тебе?"},wait:{text:"Пионер: ...",next:{text:"Пионер: Да когда я уже закончу!"}},attack:{text:"Пионер: А ну пошел вон отсюда!"}},pionerPark:{look:{text:"Он выглядит встревоженным."},talk:{text:"ГГ: Тебе не кажется, что что-то здесь не так?",next:{text:"Пионер: Вот да, есть такое же ощущение.",next:{text:"Пионер: Может, сходи к поварам..",next:{text:"Пионер: ..или спроси у фанатов Цоя?",next:{text:"Пионер: Вот возми это на всякий случай.",next:{text:"ГГ: Ура! Я получил ПАЛКУ!"}}}}}},wait:{text:"Пионер: Не нравится мне все это."},attack:{text:"Пионер: Ты что творишь!"}},fox:{look:{text:"Это лиса. Судя по всему..."}},horse:{look:{text:"Это конь в пальто."},talk:{text:"ГГ: Привет, куда все пропали?",next:{text:"Конь в пальто: ИИИИгогого, пропали и хорошо, рыбу не пугают."}},death:{text:"Удар оказался cуперэффективным!",next:{text:"ГГ: Ура! Я нашел НОЖ!"}}},fans:{look:{text:"Это фанаты Цоя и им весело."},talk:{text:"ГГ: Привет ребята, можно тут с Вами посидеть?",next:{text:"Фанат Цоя: А ты хоть одну песню Цоя знаешь?",next:{text:"ГГ: Нет.",next:{text:"Фанат Цоя: Ну так и котись к черту отсюда!!!"}}}},death:{text:"Удар оказался cуперэффективным!",next:{text:"ГГ: Ура! Я нашел РОЗУ? Оо",next:{text:"ГГ: Ура! Я нашел записку...",next:{text:'"Вчера мы призывали пиковую даму, но что-то пошло не так и пару ребят пропало...',next:{text:'Надеюсь они прикалываются, ибо поговаривают, что тут замешан кефир."',next:{text:"Подпись: Саня для Кати."}}}}}}},kefir:{look:{text:"ГГ: #@$&*% себе!"},talk:{text:"Заводить разговор было не самым удачным решением."},death:{text:"Кефир побежден! Пионерский лагерь спасен!",next:{text:"Конец."}}},weapons:{fist:"кулак",stick:"палка",knife:"нож",rose:"роза"},actions:{move:"идти",attack:"атаковать",look:"осмотреть",talk:"говорить"}}),app.value("dialogs",{start:{text:"Hm, strange dreams.",next:{text:" Something wrong here!"}},die:{text:"You Died."},pionerWC:{look:{text:" Not very pleasant spectacle."},talk:{text:" Pioneer: Hey! What you looking at, aren't you ashamed of yourself?"},wait:{text:"Pioneer: ...",next:{text:"Pioneer: When will I finish this!"}},attack:{text:" Pioneer: Get away from here!"}},pionerPark:{look:{text:" He looks concerned."},talk:{text:" MC: Don’t you think that something is wrong here? ",next:{text:" Pioneer: Yeah, I have that feeling too.",next:{text:" Pioneer: Maybe go see the cooks…",next:{text:"Pioneer: .. or ask Iron Maiden fans?",next:{text:"Pioneer: Here take this just in case.",next:{text:" MC:Yeah! I got STICK!"}}}}}},wait:{text:"Pioneer: I don't like all this."},attack:{text:" Pioneer: What are you doing!"}},fox:{look:{text:"This is fox. Apparently… "}},horse:{look:{text:" This is a horse in a coat."},talk:{text:"MC: Hi, where have everyone gone?",next:{text:" Horse in a coat: NNNeigh, they went missing and I don’t mind, no one scaring my fish."}},death:{text:"Punch was super effective!",next:{text:"MC:Yeah! I found KNIFE!"}}},fans:{look:{text:" This is Iron Maiden fans, and they are having fun."},talk:{text:"MC: Hi guys, can I sit here with you?",next:{text:"Iron Maiden fan: Do you even know any Iron Maiden song?",next:{text:"MC: No.",next:{text:"Iron Maiden fan: Well then go the hell out of here!!!"}}}},death:{text:"Punch was super effective!",next:{text:"MC:Yeah! I found GUN AND ROSE! Оо ",next:{text:"MC:Yeah! I found letter…",next:{text:'" Yesterday we were trying to summon Bloody Mary, but something went wrong and couple of guys went missing…',next:{text:'I hope they are just kidding around, because I heard, that kefir is behind this."',next:{text:"Singed: Alex to Kate."}}}}}}},kefir:{look:{text:"MC: What the fuck!"},talk:{text:"Starting a conversation was not a very good idea."},death:{text:"Kefir is defeated! Pioneer camp saved!",next:{text:"The End."}}},weapons:{fist:"fist",stick:"stick",knife:"knife",rose:"gun and rose"},actions:{move:"move",attack:"attack",look:"look",talk:"talk"}}),app.service("game",["$q","message","dialogs",function(t,e,i){this.loadMap=function(t){},this.loadObjects=function(t){},this.loadAssets=function(t){},this.weapons={hand:{title:i.weapons.fist,damage:1},plank:{title:i.weapons.stick,damage:2},knife:{title:i.weapons.knife,damage:3},rose:{title:i.weapons.rose,damage:4}},this.currentWeapon={weapon:this.weapons.hand,border:""},this.changeWeapon=function(t){this.currentWeapon.weapon=t,this.currentWeapon.border=new Array(t.title.length+1).join("─")},this.changeWeapon(this.currentWeapon.weapon),this.actions={move:{title:i.actions.move,message:e.MOVE},attack:{title:i.actions.attack,message:e.ATTACK},look:{title:i.actions.look,message:e.LOOK},talk:{title:i.actions.talk,message:e.TALK}},this.currentAction=this.actions.move,this.dialog={item:{id:"1",text:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent vitae ipsum porta, egestas sapien sed, vestibulum lectus. Vivamus malesuada neque sit amet massa placerat rutrum. Vivamus imperdiet facilisis iaculis. Ut aliquam consequat vestibulum. Proin sed ultrices tellus. Maecenas mollis ultricies dui non fermentum. Fusce turpis lectus, sodales sed nisl sit amet, commodo mattis nibh.",next:{id:"2",text:"1111 ipsum dolor sit amet, consectetur adipiscing elit. Praesent vitae ipsum porta, egestas sapien sed, vestibulum lectus. Vivamus malesuada neque sit amet massa placerat rutrum. Vivamus imperdiet facilisis iaculis. Ut aliquam consequat vestibulum. Proin sed ultrices tellus. Maecenas mollis ultricies dui non fermentum. Fusce turpis lectus, sodales sed nisl sit amet, commodo mattis nibh.",next:null}},show:!1,height:4},this.startDialog=function(t){var e=this;e.dialog.item=t,e.dialog.show=!0},this.nextDialog=function(){return!!this.dialog.show&&(this.dialog.item.next?this.dialog.item=this.dialog.item.next:this.endDialog(),!0)},this.endDialog=function(){this.dialog.show=!1},this.onStopPlayer=function(){}}]),app.service("symbolWidthService",[function(){var t=this,e=0,i=0,n=0,o=0,r={resize:[]};this._setSizeOneSymbol=function(a,s,c,h){a&&(e=a),s&&(i=s),c&&(n=t.xToSymbolNumber(c)+1),h&&(o=t.yToSymbolNumber(h)+1),r.resize.forEach(function(t){t()})},this.xToSymbolNumber=function(t){return parseInt(t/e)},this.yToSymbolNumber=function(t){return parseInt(t/i)},this.xToCellX=function(i){return parseInt(t.xToSymbolNumber(i)*e)},this.yToCellY=function(e){return parseInt(t.yToSymbolNumber(e)*i)},this.getGridSize=function(){return{wcells:n,hcells:o}},this.addListener=function(t,e){r[t].push(e)}}]),app.service("viewportService",["symbolWidthService","mapService","characterControl","point","pointLimit",function(t,e,i,n,o){function r(){a.pos.pointMax.moveIn(e.currentLevel.tile.width-a.dimension.x,e.currentLevel.tile.height-a.dimension.y)}var a=this;this.player=null,this.pos=o.create(0,0,n.create(0,0),n.create(500,500)),this.dimension=o.create(80,30,n.create(0,0)),this.init=function(){},this.update=function(){this.player&&this.pos.moveIn(parseInt(this.player.x-this.dimension.x/2),parseInt(this.player.y-this.dimension.y/2))},this.resize=function(){var e=t.getGridSize();this.dimension.moveIn(e.wcells?e.wcells:this.dimension.x,e.hcells?e.hcells:this.dimension.y),r()}}]),app.service("npc",["entityVisible","message",function(t,e){this.NPC=function(i,n,o,r){t.EntityVisible.call(this,i,n,o,r),this.onMessage[e.ATTACK]=function(t,e){return console.log("message attack"),this.attack(e)},this.onMessage[e.LOOK]=function(t,e){return this.look(e)},this.onMessage[e.TALK]=function(t,e){return this.talk(e)},this.onMessage[e.DEATH]=function(t,e){return this.death(e)}},this.NPC.prototype=Object.create(t.EntityVisible.prototype),this.NPC.prototype.attack=function(t){return console.log("npc attack"),!0},this.NPC.prototype.look=function(t){return!0},this.NPC.prototype.talk=function(t){return!0},this.NPC.prototype.death=function(t){return!0}}]),app.service("npcSprite",["$q","spriteAnimate","strip","rect",function(t,e,i,n){this.NpcSprite=function(i,n,o){e.SpriteAnimate.call(this,o);var r=this;this.promise=t.all([this.loadStripSet("await",[i.path],i.params),this.loadStripSet("death",[n.path],n.params)]).then(function(){r.changeStrip("await")})},this.NpcSprite.prototype=Object.create(e.SpriteAnimate.prototype)}]),app.service("fox",["npc","characterSprite","game","dialogs","message","npcSprite","rect",function(t,e,i,n,o,r,a){this.Fox=function(e,n,o){t.NPC.call(this,e,n,new r.NpcSprite({path:"entity/fox/Await_front_left.txt",params:{frameCount:2,dirCount:1,width:8,height:3,centerX:3,centerY:2,speed:.1}},{path:"entity/fox/Death_front_left.txt",params:{frameCount:2,dirCount:1,width:8,height:3,centerX:3,centerY:2,speed:.02}},new a.Rect((-3),(-2),8,3)),o),this.weaponDeath=i.weapons.plank,this.isTalked=!1},this.Fox.prototype=Object.create(t.NPC.prototype),this.Fox.prototype.attack=function(e){return i.currentWeapon.weapon.damage<this.weaponDeath.damage?e.player.handleMessage(o.DEATH,this):this.handleMessage(o.DEATH,e),t.NPC.prototype.attack.call(this,e)},this.Fox.prototype.look=function(e){return i.startDialog(n.fox.look),t.NPC.prototype.look.call(this,e)},this.Fox.prototype.talk=function(e){return e.player.handleMessage(o.DEATH,this),t.NPC.prototype.talk.call(this,e)},this.Fox.prototype.death=function(e){return this.die(),t.NPC.prototype.death.call(this,e)}}]),app.service("fans",["npc","characterSprite","game","dialogs","message","npcSprite","rect",function(t,e,i,n,o,r,a){this.Fans=function(e,n,o){t.NPC.call(this,e,n,new r.NpcSprite({path:"entity/fans/Await_front_left.txt",params:{frameCount:2,dirCount:1,width:26,height:12,centerX:2,centerY:5,speed:.2}},{path:"entity/fans/Death_front_left.txt",params:{frameCount:3,dirCount:1,width:26,height:13,centerX:2,centerY:5,speed:0}},new a.Rect(0,0,26,6)),o),this.weaponDeath=i.weapons.knife,this.isTalked=!1,this.fansCount=0,this.isDead=!1},this.Fans.prototype=Object.create(t.NPC.prototype),this.Fans.prototype.attack=function(e){return this.isDead||(i.currentWeapon.weapon.damage<this.weaponDeath.damage?e.player.handleMessage(o.DEATH,this):(this.sprite.changeStrip("death"),this.sprite.frame=this.fansCount,this.fansCount++,this.fansCount>=3&&(this.isDead=!0,this.handleMessage(o.DEATH,e)))),t.NPC.prototype.attack.call(this,e)},this.Fans.prototype.look=function(e){return i.startDialog(n.fans.look),t.NPC.prototype.look.call(this,e)},this.Fans.prototype.talk=function(e){return this.isDead||i.startDialog(n.fans.talk),t.NPC.prototype.talk.call(this,e)},this.Fans.prototype.death=function(e){return i.changeWeapon(i.weapons.rose),i.startDialog(n.fans.death),t.NPC.prototype.death.call(this,e)}}]),app.service("horse",["npc","characterSprite","game","dialogs","message","npcSprite","rect",function(t,e,i,n,o,r,a){this.Horse=function(e,n,o){t.NPC.call(this,e,n,new r.NpcSprite({path:"entity/horse/Await_front_left.txt",params:{frameCount:2,dirCount:1,width:25,height:18,centerX:17,centerY:17,speed:.02}},{path:"entity/horse/Death_front_left.txt",params:{frameCount:1,dirCount:1,width:25,height:18,centerX:17,centerY:17,speed:.02}},new a.Rect((-1),(-9),10,10)),o),this.weaponDeath=i.weapons.plank,this.isTalked=!1,this.isDead=!1},this.Horse.prototype=Object.create(t.NPC.prototype),this.Horse.prototype.attack=function(e){return this.isDead||(i.currentWeapon.weapon.damage<this.weaponDeath.damage?e.player.handleMessage(o.DEATH,this):(this.isDead=!0,this.handleMessage(o.DEATH,e))),t.NPC.prototype.attack.call(this,e)},this.Horse.prototype.look=function(e){return i.startDialog(n.horse.look),t.NPC.prototype.look.call(this,e)},this.Horse.prototype.talk=function(e){return this.isDead||i.startDialog(n.horse.talk),t.NPC.prototype.talk.call(this,e)},this.Horse.prototype.death=function(e){return i.changeWeapon(i.weapons.knife),i.startDialog(n.horse.death),this.sprite.changeStrip("death"),t.NPC.prototype.death.call(this,e)}}]),app.service("kefir",["npc","characterSprite","game","dialogs","message","npcSprite","rect",function(t,e,i,n,o,r,a){this.Kefir=function(e,n,o){t.NPC.call(this,e,n,new r.NpcSprite({path:"entity/kefir/Await_front_left.txt",params:{frameCount:2,dirCount:1,width:37,height:20,centerX:18,centerY:18,speed:.1}},{path:"entity/kefir/Await_front_left.txt",params:{frameCount:2,dirCount:1,width:37,height:20,centerX:18,centerY:18,speed:.1}},new a.Rect((-7),(-2),14,4)),o),this.weaponDeath=i.weapons.rose,this.isTalked=!1},this.Kefir.prototype=Object.create(t.NPC.prototype),this.Kefir.prototype.attack=function(e){return i.currentWeapon.weapon.damage<this.weaponDeath.damage?e.player.handleMessage(o.DEATH,this):this.handleMessage(o.DEATH,e),t.NPC.prototype.attack.call(this,e)},this.Kefir.prototype.look=function(e){return i.startDialog(n.kefir.look),t.NPC.prototype.look.call(this,e)},this.Kefir.prototype.talk=function(e){return i.startDialog(n.kefir.talk),e.player.handleMessage(o.DEATH,this),t.NPC.prototype.talk.call(this,e)},this.Kefir.prototype.death=function(e){return i.startDialog(n.kefir.death),this.die(),t.NPC.prototype.death.call(this,e)}}]),app.constant("message",{CHECK_COLLISION:"check_collision",COLLISION:"collision",MOVE:"move",STEP:"step",LOOK:"look",ATTACK:"attack",TALK:"talk",DEATH:"death"}),app.service("pionerWC",["npc","characterSprite","game","dialogs","npcSprite","rect",function(t,e,i,n,o,r){this.PionerWC=function(e,i,n){t.NPC.call(this,e,i,new o.NpcSprite({path:"entity/pioner/Await_back_left.txt",params:{frameCount:3,dirCount:1,width:7,height:6,centerX:3,centerY:5,speed:.1}},{path:"entity/pioner/Await_back_left.txt",params:{frameCount:3,dirCount:1,width:7,height:6,centerX:3,centerY:5,speed:.1}},new r.Rect((-2),(-1),5,2)),n),this.isTalked=!1},this.PionerWC.prototype=Object.create(t.NPC.prototype),this.PionerWC.prototype.attack=function(e){return i.startDialog(n.pionerWC.attack),t.NPC.prototype.attack.call(this,e)},this.PionerWC.prototype.look=function(e){return i.startDialog(n.pionerWC.look),t.NPC.prototype.look.call(this,e)},this.PionerWC.prototype.talk=function(e){return this.isTalked?(i.startDialog(n.pionerWC.wait),this.isTalked=!1):(i.startDialog(n.pionerWC.talk),this.isTalked=!0),t.NPC.prototype.talk.call(this,e)}}]),app.service("pionerPark",["npc","characterSprite","game","dialogs","npcSprite","rect",function(t,e,i,n,o,r){this.PionerPark=function(e,i,n){t.NPC.call(this,e,i,new o.NpcSprite({path:"entity/pioner/Await_front_left.txt",params:{frameCount:3,dirCount:1,width:7,height:6,centerX:3,centerY:5,speed:.02}},{path:"entity/pioner/Await_front_left.txt",params:{frameCount:3,dirCount:1,width:7,height:6,centerX:3,centerY:5,speed:.1}},new r.Rect((-2),(-1),5,2)),n),this.isTalked=!1},this.PionerPark.prototype=Object.create(t.NPC.prototype),this.PionerPark.prototype.attack=function(e){return i.startDialog(n.pionerPark.attack),t.NPC.prototype.attack.call(this,e)},this.PionerPark.prototype.look=function(e){return i.startDialog(n.pionerPark.look),t.NPC.prototype.look.call(this,e)},this.PionerPark.prototype.talk=function(e){return this.isTalked?i.startDialog(n.pionerPark.wait):(i.startDialog(n.pionerPark.talk),i.changeWeapon(i.weapons.plank),this.isTalked=!0),t.NPC.prototype.talk.call(this,e)}}]),app.service("collection",[function(){this.create=function(){return new this.Collection},this.Collection=function(){this._data={}},this.Collection.prototype.set=function(t,e){var i;if("undefined"==typeof t||null==t)throw new Error("Param 'key' is not defined!");if("undefined"==typeof e||null==e)throw new Error("Param 'entity' is not defined!");return i=this._data[t],this._data[t]=e,i},this.Collection.prototype.add=function(t,e){if(this.get(t))throw new Error("Entity with key '"+t+"' already exists!");return this.set(t,e),e},this.Collection.prototype.get=function(t){return this._data[t]},this.Collection.prototype.each=function(t,e){e=e||Object.keys(this._data);for(var i=0;i<e.length;i++)t(e[i],this._data[e[i]],i,this._data)},this.Collection.prototype.eachPart=function(t,e,i){var n;e<0&&(t+=e+1,e=-e),n=Object.keys(this._data).filter(function(i){return i>=t&&i<t+e}),this.each(i,n)},this.Collection.prototype.remove=function(t){if("undefined"==typeof t&&null==t)throw new Error("Param 'key' is not defined!");return!!this._data[t]&&(delete this._data[t],!0)},this.Collection.prototype.length=function(){var t=0;for(var e in this._data)t++;return t},this.Collection.prototype.getCollection=function(){return this._data},this.Collection.prototype.clear=function(){var t=this;t.each(function(e){t.remove(e)})}}]),app.service("collision",[function(){this.pointToRect=function(t,e){return!(t.x<e.x||t.x>=e.x+e.w||t.y<e.y||t.y>=e.y+e.h)},this.rectIntersectRect=function(t,e){return!(t.y+t.h<=e.y||t.y>=e.y+e.h||t.x+t.w<=e.x||t.x>=e.x+e.w)},this.rectIncludeRect=function(t,e){return this.pointToRect({x:t.x,y:t.y},e)&&this.pointToRect({x:t.x+t.w-1,y:t.y+t.h-1},e)}}]),app.service("entity",["collection",function(t){var e=this,i=0;this.entityCollection=t.create(),this.create=function(){return new this.Entity},this.Entity=function(){this.id=i,i++,this.onMessage={},e.entityCollection.add(this.id,this)},this.Entity.prototype.handleMessage=function(t){return!!this.onMessage.hasOwnProperty(t)&&this.onMessage[t].apply(this,arguments)},this.Entity.prototype.step=function(){},this.Entity.prototype.die=function(){e.entityCollection.remove(this.id)}}]),app.service("entityVisible",["$log","entity","sprite","collision","transparentSymbol","rect",function(t,e,i,n,o,r){var a=new r.Rect((-20),(-10),40,20);this.create=function(t,e,i,n){return new this.EntityVisible(t,e,i,n)},this.EntityVisible=function(t,n,o,r){e.Entity.apply(this),this.sprite=o||i.create(),this.x=t||0,this.y=n||0,this.layer=r},this.EntityVisible.prototype=Object.create(e.Entity.prototype),this.EntityVisible.prototype.getMaskRect=function(t,e){t=t||this.x,e=e||this.y;var i=this.sprite.mask;return new r.Rect(i.x+t,i.y+e,i.w,i.h)},this.EntityVisible.prototype.step=function(){e.Entity.prototype.step.call(this),this.sprite.step()},this.EntityVisible.prototype.draw=function(t){for(var e=this.sprite.spriteImage,i=0;i<e.height;i++)for(var n=0;n<e.width;n++){var r=+this.y+i-e.centerY-t.y,a=+this.x+n-e.centerX-t.x,s=n+i*e.width;e.image[s]===o||a<0||r<0||a>=t.w||r>=t.h||(t.grid[r][a]=e.image[s])}},this.EntityVisible.prototype.die=function(){e.Entity.prototype.die.call(this),this.layer.remove(this.x,this.y)},this.EntityVisible.prototype.moveIn=function(e,i){return this.layer||t.error("Layer in entity is not defined"),(!this.layer||!this.layer.moveIn(this.x,this.y,e,i))&&(this.x=e,this.y=i,!0)},this.EntityVisible.prototype.isPointMeet=function(t,e){var i=this.sprite.spriteImage;return n.pointToRect({x:t,y:e},i.getRect(this.x,this.y))},this.EntityVisible.prototype.isMeetingEntity=function(t,e,i){return n.rectIntersectRect(this.getMaskRect(t,e),i.getMaskRect())},this.EntityVisible.prototype.checkCollisionEntity=function(t,e,i,n){var o=this;t=t||this.x,e=e||this.y,this.layer.eachRect(t+a.x,e+a.y,a.w,a.h,function(r,a,s){o.id!=s.id&&(o.isMeetingEntity(t,e,s)?i&&i(s):n&&n(s))})},this.EntityVisible.prototype.checkCollisionMap=function(t,e,i,n,o){t=t||this.x,e=e||this.y;var r=" ",a=this.getMaskRect(t,e),s=i.getRect(a.x,a.y,a.w,a.h),c=s.some(function(t){return t.some(function(t){return t!=r})});c?n&&n(s):o&&o(s)}}]),app.service("layer",["collection",function(t){this.create=function(){return new this.Layer},this.Layer=function(){this._data=t.create()},this.Layer.prototype.add=function(e,i,n){if("undefined"==typeof i){if("undefined"==typeof e.x)throw new Error("Param 'x' is not defined!");i=e.x}if("undefined"==typeof n){if("undefined"==typeof e.y)throw new Error("Param 'y' is not defined!");n=e.y}i=+i,n=+n;var o=this._data.get(n)||this._data.add(n,t.create());return o.get(i)?null:o.add(i,e)},this.Layer.prototype.get=function(t,e){var i=this._data.get(e);return i?i.get(t):null},this.Layer.prototype.remove=function(t,e){var i=this._data.get(e);return!(!i||!i.remove(t))},this.Layer.prototype.layerEach=function(t){var e=this,i=0;e._data.each(function(n,o){o.each(function(o,r){t(+o,+n,r,i,e._data),i++})})},this.Layer.prototype.eachRect=function(t,e,i,n,o){var r=this,a=0;this._data.eachPart(e,n,function(e,n){n.eachPart(t,i,function(t,i){o(+t,+e,i,a,r._data),a++})})},this.Layer.prototype.moveIn=function(t,e,i,n){var o=this.get(t,e);return o?this.add(o,i,n)?(this.remove(t,e),0):1:2},this.Layer.prototype.moveOn=function(t,e,i,n){return this.moveIn(t,e,t+i,e+n)},this.Layer.prototype.clear=function(){var t=this;t.layerEach(function(e,i){t.remove(e,i)}),this._data.clear()},this.Layer.prototype.size=function(t){if("undefined"==typeof t)return this._data.length();var e=this._data.get(t);return e?e.length():null},this.Layer.prototype.count=function(){var t=0;return this.layerEach(function(){t++}),t},this.Layer.prototype.getLayer=function(){return this._data}}]),app.service("level",["symbolGrid","layer",function(t,e){function i(t){for(var i=[],n=0;n<t;n++)i[n]=e.create();return i}this.create=function(t){return new this.Level(t)},this.Level=function(e){this.tile=t.create(),this.mask=t.create(),this.layers=i(e||3)},this.Level.prototype.width=function(){return this.tile.width},this.Level.prototype.height=function(){return this.tile.height}}]),app.service("movement",[function(){}]),app.service("point",[function(){this.create=function(t,e){return new this.Point(t,e)},this.Point=function(t,e){this.x=+t||0,this.y=+e||0},this.Point.prototype.moveIn=function(t,e){this.x=+t,this.y=+e},this.Point.prototype.moveOn=function(t,e){this.moveIn(this.x+t,this.y+e)},this.Point.prototype.setPoint=function(t){this.moveIn(t.x,t.y)}}]),app.service("pointLimit",["point",function(t){this.create=function(t,e,i,n){return new this.PointLimit(t,e,i,n)},this.PointLimit=function(e,i,n,o){t.Point.call(this,e,i),this.pointMin=n||null,this.pointMax=o||null,this.moveIn(e,i)},this.PointLimit.prototype=Object.create(t.Point.prototype),this.PointLimit.prototype.moveIn=function(e,i){this.pointMin&&e<this.pointMin.x&&(e=this.pointMin.x),this.pointMin&&i<this.pointMin.y&&(i=this.pointMin.y),this.pointMax&&e>this.pointMax.x&&(e=this.pointMax.x),
this.pointMax&&i>this.pointMax.y&&(i=this.pointMax.y),t.Point.prototype.moveIn.call(this,e,i)}}]),app.service("render",["$log","mapService","viewportService","game",function(t,e,i,n){var o=" ╔═╗║╚═╝";this.draw=function(){for(var t=i,r=e.currentLevel.tile.getRect(t.pos.x,t.pos.y,t.dimension.x,t.dimension.y),a=e.currentLevel.layers,s=5,c=0;c<a.length;c++)a[c].eachRect(t.pos.x-s,t.pos.y-s,t.dimension.x+2*s,t.dimension.y+2*s,function(e,i,n){n.draw({grid:r,x:t.pos.x,y:t.pos.y,w:t.dimension.x,h:t.dimension.y})});return r=r.map(function(t,e,i){if(n.dialog.show&&e>=i.length-n.dialog.height-4){var r="";return r=e==i.length-n.dialog.height-4?o[1]+new Array(t.length-2).join(o[2])+o[3]:e==i.length-5?o[5]+new Array(t.length-2).join(o[2])+o[7]:e<i.length-5?o[4]+new Array(t.length-2).join(" ")+o[4]:new Array(t.length).join(" ")}return t.join("")})}}]),app.service("sprite",["spriteImage","rect",function(t,e){this.create=function(t,e){return new this.Sprite(t,e)},this.Sprite=function(i,n){this.spriteImage=i||t.create(),this.mask=n||new e.Rect},this.Sprite.prototype.image=function(){return this.spriteImage.image},this.Sprite.prototype.step=function(t){}}]),app.service("spriteAnimate",["$q","sprite","strip",function(t,e,i){this.SpriteAnimate=function(t){e.Sprite.call(this,null,t),this.frame=0,this.dir=0,this.strips={},this.currentStrip=null,this.prevStrip=null,this.speed=0},this.SpriteAnimate.prototype=Object.create(e.Sprite.prototype),this.SpriteAnimate.prototype.step=function(){if(!this.currentStrip)return 0;var t=this.currentStrip.speed||this.speed;this.frame+t>=this.currentStrip.frameCount-t&&(this.frame=0),this.frame+=t,this.spriteImage=this.currentStrip.dirframe(this.dir,parseInt(this.frame))},this.SpriteAnimate.prototype.changeStrip=function(t){this.strips[t]?(this.prevStrip=this.currentStrip,this.currentStrip=this.strips[t],this.frame=0):console.error("Strip not exists "+t)},this.SpriteAnimate.prototype.revertStrip=function(){this.changeStrip(this.prevStrip.name)},this.SpriteAnimate.prototype.collapseArrays=function(t){var e=[];return t.forEach(function(t){e=e.concat(t)}),e},this.SpriteAnimate.prototype.loadStripSet=function(e,n,o){var r=this;return t.all(n.map(function(t){return i.load(t)})).then(function(t){var n=new i.Strip(e,r.collapseArrays(t),o.frameCount,o.dirCount,o.width,o.height,o.centerX,o.centerY);n.speed=o.speed,r.strips[e]=n})}}]),app.service("spriteImage",["rect",function(t){function e(t,e,i,n,o){this.image=t||"$",this.width=e||1,this.height=i||1,this.centerX=n||0,this.centerY=o||0}this.create=function(t,i,n,o,r){return new e(t,i,n,o,r)},e.prototype.getRect=function(e,i){return e=e||0,i=i||0,new t.Rect(e-this.centerX,i-this.centerY,this.width,this.height)}}]),app.service("strip",["$http","$q","spriteImage",function(t,e,i){var n={};this.load=function(i){return n[i]||(n[i]=e.defer(),t.post("/sprite",{fileName:i}).then(function(t){var e=t.data.split("\n").map(function(t){return t.replace(new RegExp(String.fromCharCode(13),"g"),"")});n[i].resolve(e)})),n[i].promise},this.Strip=function(t,e,n,o,r,a,s,c){this.name=t,this.images=[],this.frameCount=n,this.dirCount=o;for(var h=0,p=0;p<this.dirCount;p++){this.images[p]=[];for(var l=0;l<this.frameCount;l++){var u=e.slice(h,h+a).join("");this.images[p][l]=i.create(u,r,a,s,c),h+=a}}this.speed=0,this.repeat=!1},this.Strip.prototype.dirframe=function(t,e){return t=t>=this.dirCount-1?this.dirCount-1:t,e=e>=this.frameCount-1?this.frameCount-1:e,this.images[t][e]}}]),app.service("symbolGrid",["collection",function(t){function e(t,e,i){this.coord=t,this.length=e,this.size=i}function i(t){t.length<0&&(t.coord+=t.length+1,t.length=-t.length),t.coord<0&&(t.length+=t.coord,t.coord=0),t.coord+t.length>t.size&&(t.length=t.size-t.coord)}function n(t){var e=0;return t.length>0&&(e=t[0].length,t.forEach(function(t){t.length<e&&(e=t.length)})),{width:e,height:t.length}}this.create=function(){return new this.SymbolGrid},this.SymbolGrid=function(){this.data=[],this.width=0,this.height=0},this.SymbolGrid.prototype.getRect=function(t,n,o,r){var a=[],s=new e(t,o,this.width),c=new e(n,r,this.height);i(s),i(c);for(var h=0;h<c.length;h++)a[h]=this.data[c.coord+h].slice(s.coord,s.coord+s.length);return a},this.SymbolGrid.prototype.initFromText=function(t){return this.initFromStringArray(t.split("\n"))},this.SymbolGrid.prototype.initFromStringArray=function(t){var e=[];return t.forEach(function(t,i){e[i]=t.split("")}),e},this.SymbolGrid.prototype.initFromMatrix=function(t){function e(t,e){var i=t.length,n="";return i<e&&(n=new Array(e-i+1).join(" ")),t+n}var i=[],n=0;t.forEach(function(t){var o=[];t.forEach(function(t){o.push(t.split("\n").map(function(t){return t.replace(new RegExp(String.fromCharCode(13),"g"),"")}))}),n=o[0][0].length;var r;o.forEach(function(t){r?t.forEach(function(t,i){r[i]+=e(t,n)}):r=t.map(function(t){return e(t,n)})}),i=i.concat(r)}),this.init(i)},this.SymbolGrid.prototype.init=function(t){if("string"==typeof t)this.data=this.initFromText(t);else{if("undefined"==typeof t.length)throw new Error("Start data is not correct type ("+typeof t+")!");this.data=this.initFromStringArray(t)}var e=n(this.data);this.width=e.width,this.height=e.height}}]),app.service("unique",[function(){this.value=100}]),app.service("rect",["point",function(t){this.Rect=function(e,i,n,o){this.place=new t.Point(e||0,i||0),this.size=new t.Point(n||0,o||0),Object.defineProperty(this,"x",{get:function(){return this.place.x},set:function(t){this.place.moveIn(t,this.place.y)}}),Object.defineProperty(this,"y",{get:function(){return this.place.y},set:function(t){this.place.moveIn(this.place.x,t)}}),Object.defineProperty(this,"w",{get:function(){return this.size.x},set:function(t){this.size.moveIn(t,this.size.y)}}),Object.defineProperty(this,"h",{get:function(){return this.size.y},set:function(t){this.size.moveIn(this.size.x,t)}})}}]);