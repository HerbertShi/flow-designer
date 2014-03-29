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
			cssClass: "designer-flow",
			model:""
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


	flow.init = function(obj, option) {
		option = JQ.extend(true, {},designer.config.flow, option);

		JQ(obj)
			.addClass(option.cssClass)
			.css(option.attr);

		var svg = Raphael(obj, JQ(obj).width(), JQ(obj).height()),
			node = [];
		JQ(svg)
			.bind("addrect", function(e, type, attr) {
				var rect = new flow.rect(obj,this,JQ.extend(true, designer.config.states[type], attr));
				node.push(rect);
				JQ(obj).data("node",node);
				rect.focus();
			})
			.bind("addpath", function() {

			})
			.bind("removepath", function() {

			})
			.bind("removerect", function() {

			}).click(function(){
				
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

		if (option.model && option.model.node) {
			JQ(option.model.node).each(function() {
				var rect = new flow.rect(obj, svg, JQ.extend(true, {}, this));
				node.push(rect);
				JQ(obj).data("node", node);
			});
		}
	};

	flow.rect = function(obj, svg, option) {
		option = JQ.extend(true, {}, designer.config.rect, option);
		if (!option.id) {
			option.id = "rect" + designer.util.nextId();
		}
		var rect = this,
			block, text, node = svg.set(),
			blockAttr = {
				x: option.attr.x,
				y: option.attr.y,
				width: option.attr.width,
				height: option.attr.height
			},
			textAttr = {
				x: option.attr.x + option.attr.width / 2,
				y: option.attr.y + option.attr.height / 2
			},
			resizeLine = svg.path("M0 0L1 1").hide(),
			resizePointH = 5,
			resizePoint = {};

		resizePoint.n=svg.rect(0,0,resizePointH,resizePointH).attr({fill:"#000",stroke:"#fff",cursor:"s-resize"}).hide()
		resizePoint.nw=svg.rect(0,0,resizePointH,resizePointH).attr({fill:"#000",stroke:"#fff",cursor:"nw-resize"}).hide();
		resizePoint.w=svg.rect(0,0,resizePointH,resizePointH).attr({fill:"#000",stroke:"#fff",cursor:"w-resize"}).hide();
		resizePoint.sw=svg.rect(0,0,resizePointH,resizePointH).attr({fill:"#000",stroke:"#fff",cursor:"sw-resize"}).hide();
		resizePoint.s=svg.rect(0,0,resizePointH,resizePointH).attr({fill:"#000",stroke:"#fff",cursor:"s-resize"}).hide();
		resizePoint.se=svg.rect(0,0,resizePointH,resizePointH).attr({fill:"#000",stroke:"#fff",cursor:"se-resize"}).hide();
		resizePoint.e=svg.rect(0,0,resizePointH,resizePointH).attr({fill:"#000",stroke:"#fff",cursor:"w-resize"}).hide();
		resizePoint.ne=svg.rect(0,0,resizePointH,resizePointH).attr({fill:"#000",stroke:"#fff",cursor:"ne-resize"}).hide();

		if (option.showType == "text") {
			block = svg.rect().attr(option.attr);
			text = svg.text(textAttr.x, textAttr.y, option.text.text);
		} else if (option.showType == "image") {
			block = svg.image(designer.config.basePath + option.img.src).attr(option.attr);
			text = svg.text(textAttr.x, textAttr.y, option.text.text).hide();
		}

		node.push(block, text);
		node.drag(function(dx, dy) {
			block.attr({
				x: blockAttr.x + dx,
				y: blockAttr.y + dy
			});
			text.attr({
				x: textAttr.x + dx,
				y: textAttr.y + dy
			});
			moveResize();
		}, function() {
			rect.focus();
			node.attr({
				opacity: 0.5
			});
		}, function() {
			blockAttr.x = block.attr("x");
			blockAttr.y = block.attr("y");
			textAttr.x = text.attr("x");
			textAttr.y = text.attr("y");
			node.attr({
				opacity: 1
			});
		});

		function moveResize() {
			var attr = {
				x: block.attr("x") - 5,
				y: block.attr("y") - 5,
				width: block.attr("width") + 10,
				height: block.attr("height") + 10
			};
			resizeLine.attr({
				path: "M" + attr.x + " " + attr.y + "L" + attr.x + " " + (attr.y + attr.height) + "L" + (attr.x + attr.width) + " " + (attr.y + attr.height) + "L" + (attr.x + attr.width) + " " + attr.y + "L" + attr.x + " " + attr.y
			}).show();

			resizePoint.n.attr({x:attr.x+attr.width/2-resizePointH/2,y:attr.y-resizePointH/2}).show();
			resizePoint.nw.attr({x:attr.x-resizePointH/2,y:attr.y-resizePointH/2}).show();
			resizePoint.w.attr({x:attr.x-resizePointH/2,y:attr.y-resizePointH/2+attr.height/2}).show();
			resizePoint.sw.attr({x:attr.x-resizePointH/2,y:attr.y-resizePointH/2+attr.height}).show();
			resizePoint.s.attr({x:attr.x-resizePointH/2+attr.width/2,y:attr.y-resizePointH/2+attr.height}).show();
			resizePoint.se.attr({x:attr.x-resizePointH/2+attr.width,y:attr.y-resizePointH/2+attr.height}).show();
			resizePoint.e.attr({x:attr.x-resizePointH/2+attr.width,y:attr.y-resizePointH/2+attr.height/2}).show();
			resizePoint.ne.attr({x:attr.x-resizePointH/2+attr.width,y:attr.y-resizePointH/2}).show();
		}

		this.focus = function() {
			for (var i = 0; i < JQ(obj).data("node").length; i++) {
				JQ(obj).data("node")[i].blur();
			}
			moveResize();
		};

		this.blur = function() {
			resizeLine.hide();
			for (var i in resizePoint) {
				resizePoint[i].hide();
			}
		};

		this.toJson = function() {
			var data = {};
			console.log(JSON.stringify(JQ.extend(true, {}, option, {
				attr: blockAttr
			})));
		};
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
			JQ(obj).data("mode",JQ(this).attr("type"));
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

		JQ(obj).children(".toolbox-node[type='select']").click();
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