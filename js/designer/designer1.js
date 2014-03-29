(function(JQ) {
	var flow = {}, toolBox = {},designer = {};

	designer.config = {
		basePath:"",
		lineHeight:15,
		toolBox: {
			attr: {
				left: 10,
				top: 30,
				position: "absolute"
			},
			cssClass: "designer-toolBox",
			handle: {
				text: "工具集"
			},
			select: {
				text: "select",
				image: "images/select16.gif"
			},
			transition: {
				text: "transition",
				image: "images/16/flow_sequence.png"
			},
			start: {
				text: "开始节点",
				image: "images/16/start_event_empty.png"
			},
			end: {
				text: "结束节点",
				image: "images/16/end_event_terminate.png"
			},
			task: {
				text: "任务节点",
				image: "images/16/task_empty.png"
			},
			notify: {
				text: "知会节点",
				image: "images/16/task_empty.png"
			}
		},
		flow: {
			attr: {
				//position: "absolute",
				left: 0,
				top: 0,
				width: 1280,
				height: 900
			},
			cssClass: "designer-flow"
		},
		rect: {
			attr: {
				width: 100,
				height: 50,
				r: 8,
				fill: "#F6F7FF",
				stroke: "#03689A",
				"stroke-width": 2
			},
			text: {
				text: "状态",
				"font-size": 13
			},
			margin: 5,
			props: []
		},
		states:{}
	};

	designer.util = {
		nextId:(function(){
			return function(){
				return (new Date()).getTime();
			}
		})()
	};

	designer.editors={};

	flow.node = [];
	flow.path = [];


	flow.init = function(obj, option) {
		option = JQ.extend(true, {},designer.config.flow, option);
		JQ(obj)
			.addClass(option.cssClass)
			.css(option.attr);

		var svg=Raphael(obj,JQ(obj).width(),JQ(obj).height());
		JQ(svg)
			.bind("addrect", function(e, type, attr) {
				var rect = new flow.rect(this,JQ.extend(true, designer.config.states[type], attr));
			})
			.bind("addpath", function() {

			})
			.bind("removepath", function() {

			})
			.bind("removerect", function() {

			});

		JQ(obj).droppable({
			accept: ".state",
			drop: function(event, ui) {
				JQ(svg).trigger("addrect", [ui.helper.attr("type"), {
					attr: {
						x: ui.helper.offset().left - JQ(this).offset().left,
						y: ui.helper.offset().top - JQ(this).offset().top
					}
				}]);
			}
		});
	};

	flow.rect = function(svg, option) {
		option = JQ.extend(true, {},designer.config.rect, option);
		if(!option.id){
			option.id = "rect"+designer.util.nextId();
		}
		var block,text,node = svg.set(),
			currentBX,currentBY,currentTX,currentTY;
		if (option.showType == "text") {
			block = svg.rect().attr(option.attr);
			text = 	svg.text(option.attr.x+option.attr.width/2,option.attr.y+option.attr.height/2).attr(option.text);
		} else if (option.showType == "image") {
			block = svg.image(designer.config.basePath + option.img.src).attr(option.attr);
			text = 	svg.text(option.attr.x+option.attr.width/2,option.attr.y+option.attr.height/2).attr(option.text).hide();
		}
		node.push(block,text)
		node.drag(function(a,b,c,d) {
			block.attr("x",currentBX+a);
			block.attr("y",currentBY+b);
			text.attr("x",currentTX+a);
			text.attr("y",currentTY+b);
		}, function() {
			currentBX = block.attr("x");
			currentBY = block.attr("y");
			currentTX = text.attr("x");
			currentTY = text.attr("y");
			node.attr({opacity:0.5});
		}, function() {
			node.attr({opacity:1});
		});

		
	};


	toolBox.init = function(obj, option) {
		option = JQ.extend(true, {},designer.config.toolBox, option);

		JQ('<div class="toolbox-handle">' + option.handle.text + '</div>')
			.appendTo(JQ(obj));
		JQ('<div class="toolbox-node selectable" type="select"><img src="' + designer.config.basePath + option.select.image + '">' + option.select.text + '</div>')
			.appendTo(JQ(obj));
		JQ('<div class="toolbox-node selectable" type="transition"><img src="' + designer.config.basePath + option.transition.image + '">' + option.transition.text + '</div>')
			.appendTo(JQ(obj));
		JQ('<div><hr></div>')
			.appendTo(JQ(obj));
		JQ('<div class="toolbox-node state" type="start"><img src="' + designer.config.basePath + option.start.image + '">' + option.start.text + '</div>')
			.appendTo(JQ(obj));
		JQ('<div class="toolbox-node state" type="end"><img src="' + designer.config.basePath + option.end.image + '">' + option.end.text + '</div>')
			.appendTo(JQ(obj));
		JQ('<div class="toolbox-node state" type="task"><img src="' + designer.config.basePath + option.task.image + '">' + option.task.text + '</div>')
			.appendTo(JQ(obj));
		JQ('<div class="toolbox-node state" type="notify"><img src="' + designer.config.basePath + option.notify.image + '">' + option.notify.text + '</div>')
			.appendTo(JQ(obj));
		JQ(obj).children(".toolbox-node").hover(function() {
				JQ(this).addClass("active");
			},
			function() {
				JQ(this).removeClass("active");
			});
		JQ(obj).children(".toolbox-node.selectable").click(function() {
			JQ(this).siblings().removeClass("selected");
			JQ(this).addClass("selected");
		});
		JQ(obj).children(".toolbox-node.state").draggable({
			helper: "clone"
		});
		JQ(obj)
			.draggable({
				handle: ".toolbox-handle"
			})
			.addClass(option.cssClass)
			.css(option.attr);
	}

	JQ.fn.flow = function(option) {
		return this.each(function() {
			flow.init(this, option)
		})
	};

	JQ.fn.toolBox = function(option) {
		return this.each(function() {
			toolBox.init(this, option)
		})
	};

	JQ.designer = designer;
})(jQuery);