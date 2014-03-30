(function(JQ) {
	var flow = {}, toolBox = {},designer = {};

	designer.config = {
		basePath:"",
		lineHeight:15,
		toolBox: {
			attr: {
				left: 10,
				top: 30,
				position: "absolute",
				zIndex:2
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
				height: 900,
				zIndex:1
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
			props: {}
		},
		path: {
			attr: {
				path: {
					path: "M10 10L100 100",
					stroke: "#808080",
					fill: "none",
					"stroke-width": 2
				},
				arrow: {
					path: "M10 10L10 10",
					stroke: "#808080",
					fill: "#808080",
					"stroke-width": 2,
					radius: 4
				},
				fromDot: {
					width: 5,
					height: 5,
					stroke: "#fff",
					fill: "#000",
					cursor: "move",
					"stroke-width": 2
				},
				toDot: {
					width: 5,
					height: 5,
					stroke: "#fff",
					fill: "#000",
					cursor: "move",
					"stroke-width": 2
				},
				bigDot: {
					width: 5,
					height: 5,
					stroke: "#fff",
					fill: "#000",
					cursor: "move",
					"stroke-width": 2
				},
				smallDot: {
					width: 5,
					height: 5,
					stroke: "#fff",
					fill: "#000",
					cursor: "move",
					"stroke-width": 3
				}
			},
			props:{}
		},
		states:{}
	};

	designer.util = {
		nextId:(function(){
			return function(){
				return (new Date()).getTime();
			}
		})(),
		connPoint: function(p1, p2) {
			return "M" + p1.x + " " + p1.y + "L" + p2.x + " " + p2.y;
		},
		arrow: function(aPoint, bPoint, radius) {
			var g = Math.atan2(bPoint.y - aPoint.y, aPoint.x - bPoint.x) * (180 / Math.PI);
			var h = aPoint.x - radius * Math.cos(g * (Math.PI / 180));
			var f = aPoint.y + radius * Math.sin(g * (Math.PI / 180));
			var e = h + radius * Math.cos((g + 120) * (Math.PI / 180));
			var j = f - radius * Math.sin((g + 120) * (Math.PI / 180));
			var c = h + radius * Math.cos((g + 240) * (Math.PI / 180));
			var i = f - radius * Math.sin((g + 240) * (Math.PI / 180));
			// return [aPoint, {
			// 	x: e,
			// 	y: j
			// }, {
			// 	x: c,
			// 	y: i
			// }]
			return "M" + aPoint.x + " " + aPoint.y + "L" + e + " " + j + "L" + c + " " + i + "Z";
		}
	};

	designer.editors={};


	flow.init = function(obj, option) {
		option = JQ.extend(true, {},designer.config.flow, option);

		JQ(obj)
			.addClass(option.cssClass)
			.css(option.attr);

		var svg = Raphael(obj, JQ(obj).width(), JQ(obj).height()),
			node = [],route=[];
		JQ(svg)
			.bind("addnode", function(e, type, option) {
			var rect = new flow.node(obj, this, JQ.extend(true, {}, designer.config.states[type], option));
				node.push(rect);
				JQ(obj).data("node",node);
				rect.focus();
			})
			.bind("addroute", function(e, option) {
			if (option.props.from == option.props.to) {
				return;
			}
			if (JQ(obj).data("route")) {
				for (var i = 0; i < JQ(obj).data("route").length; i++) {
					var routeAttr = JQ(obj).data("route")[i].toJson();
					if (routeAttr.props.from == option.props.from && routeAttr.props.to == option.props.to) {
						return;
					}
				}
			}
			var path = new flow.path(obj, this, option);
				route.push(path);
				JQ(obj).data("route", route);
			})
			.bind("removeroute", function() {

			})
			.bind("removenode", function() {

			})
			.bind("click",function(e,x,y){
				if(!this.getElementByPoint(x,y) && JQ(obj).data("node")){
					for (var i = 0; i < JQ(obj).data("node").length; i++) {
						JQ(obj).data("node")[i].blur();
					}
					JQ(obj).data("currentNode",null);
				}
			});

		JQ(obj).droppable({
			accept: ".state",
			drop: function(event, ui) {
				JQ(svg).trigger("addnode", [ui.helper.attr("type"), {
					attr: {
						x: ui.helper.offset().left - JQ(this).offset().left,
						y: ui.helper.offset().top - JQ(this).offset().top
					}
				}]);
			}
		}).click(function(e){
			JQ(svg).trigger("click",[e.clientX,e.clientY])
		});

		if (option.model && option.model.node) {
			JQ(option.model.node).each(function() {
				var rect = new flow.node(obj, svg, JQ.extend(true, {}, this));
				node.push(rect);
				JQ(obj).data("node", node);
			});
		}
	};

	flow.node = function(obj, svg, option) {
		option = JQ.extend(true, {}, designer.config.rect, option);
		if (!option.id) {
			option.id = "node" + designer.util.nextId();
			option.props.id.value = option.id;
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
			resizeLine.attr({
				path: rect.getResizePath()
			}).show();

			var attr = {
				x: block.attr("x") - 5,
				y: block.attr("y") - 5,
				width: block.attr("width") + 10,
				height: block.attr("height") + 10
			};
			resizePoint.n.attr({x:attr.x+attr.width/2-resizePointH/2,y:attr.y-resizePointH/2}).show();
			resizePoint.nw.attr({x:attr.x-resizePointH/2,y:attr.y-resizePointH/2}).show();
			resizePoint.w.attr({x:attr.x-resizePointH/2,y:attr.y-resizePointH/2+attr.height/2}).show();
			resizePoint.sw.attr({x:attr.x-resizePointH/2,y:attr.y-resizePointH/2+attr.height}).show();
			resizePoint.s.attr({x:attr.x-resizePointH/2+attr.width/2,y:attr.y-resizePointH/2+attr.height}).show();
			resizePoint.se.attr({x:attr.x-resizePointH/2+attr.width,y:attr.y-resizePointH/2+attr.height}).show();
			resizePoint.e.attr({x:attr.x-resizePointH/2+attr.width,y:attr.y-resizePointH/2+attr.height/2}).show();
			resizePoint.ne.attr({x:attr.x-resizePointH/2+attr.width,y:attr.y-resizePointH/2}).show();

			if (JQ(rect).data("route").length > 0) {
				for (var i = 0; i < JQ(rect).data("route").length; i++) {
					JQ(rect).data("route")[i].render();
				}
			}
		}

		this.focus = function() {
			for (var i = 0; i < JQ(obj).data("node").length; i++) {
				JQ(obj).data("node")[i].blur();
			}
			moveResize();
			if (JQ(obj).data("currentNode") != null && designer.config.toolBoxInstance.data("mode") == "transition") {
				JQ(svg).trigger("addroute", {
					props: {
						from: JQ(obj).data("currentNode").getId(),
						to: rect.getId()
					}
				});
			}
			JQ(obj).data("currentNode",this);
		};

		this.blur = function() {
			resizeLine.hide();
			for (var i in resizePoint) {
				resizePoint[i].hide();
			}
		};

		this.toJson = function() {
			var data = {};
			return JQ.extend(true, {}, option, {
				attr: blockAttr
			});
		};

		this.getId = function(){
			return option.id;
		};

		this.getCenterPoint = function() {
			return {
				x: block.attr("x") + block.attr("width") / 2,
				y: block.attr("y") + block.attr("height") / 2
			};
		};

		this.getResizePath = function() {
			var p = {
				x: block.attr("x") - 5,
				y: block.attr("y") - 5,
				width: block.attr("width") + 10,
				height: block.attr("height") + 10
			};
			return "M" + p.x + " " + p.y + "L" + p.x + " " + (p.y + p.height) + "L" + (p.x + p.width) + " " + (p.y + p.height) + "L" + (p.x + p.width) + " " + p.y + "L" + p.x + " " + p.y;
		};

		JQ(rect).data("route",[]);
	};

	flow.path = function(obj, svg, option) {
		option = JQ.extend(true, {}, designer.config.path, option);

		var path = this,
			line, arrow, route = svg.set(),
			fromNode,toNode;

		for (var i = 0; i < JQ(obj).data("node").length; i++) {
			if(JQ(obj).data("node")[i].getId() == option.props.from){
				fromNode = JQ(obj).data("node")[i];
			}
			if(JQ(obj).data("node")[i].getId() == option.props.to){
				toNode = JQ(obj).data("node")[i];
			}
		}

		if (!option.id) {
			option.id = "route" + designer.util.nextId();
			build();
		}

		line = svg.path().attr(option.attr.path);
		arrow = svg.path().attr(option.attr.arrow);
		route.push(line,arrow);
		
		function build() {
			var centerLine = designer.util.connPoint(fromNode.getCenterPoint(), toNode.getCenterPoint());
			var fromPoint = Raphael.pathIntersection(centerLine, fromNode.getResizePath());
			var toPoint = Raphael.pathIntersection(centerLine, toNode.getResizePath());
			if (fromPoint.length > 0 && toPoint.length > 0) {
				fromPoint = fromPoint[0];
				toPoint = toPoint[0];
				var linePath = designer.util.connPoint(fromPoint, toPoint);
				var arrowPoint = Raphael.getPointAtLength(linePath, Raphael.getTotalLength(linePath) - 5);
				option.attr = JQ.extend(true, {}, option.attr, {
					path: {
						path: linePath
					},
					arrow: {
						path: designer.util.arrow(toPoint, arrowPoint, option.attr.arrow.radius)
					}
				});
			}
		}

		this.render = function(){
			build();
			line.attr(option.attr.path);
			arrow.attr(option.attr.arrow);
		}

		this.toJson = function() {
			return JQ.extend(true, {}, option);
		};

		JQ(fromNode).data("route").push(this);
		JQ(toNode).data("route").push(this);

		$.designer.config.toolBoxInstance.children(".toolbox-node[type='select']").click();
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
			designer.config.flowInstance.data("currentNode",null);
		});
		JQ(obj).children(".toolbox-node.state").draggable({
			helper: "clone",
			start: function() {
				JQ(obj).children(".toolbox-node[type='select']").click();
			}
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