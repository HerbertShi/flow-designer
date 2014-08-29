(function(JQ) {
	var flow = {}, toolBox = {}, prop = {} ,flowInfoTable={},designer = {};

	
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
			props:{
				
			}
		},
		props:{
			attr:{
				  top:500,
				  left:15,
				  position: "absolute",
				  zIndex:2
			     },
			cssClass: "designer-prop",     
			props:{}
		},
		states:{}
	};

	designer.util = {
		isLine: function(object) {
			if(object.getId().indexOf("route") == 0){
				return true;
			}else{
				return false;
			}
		},
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
			return "M" + aPoint.x + " " + aPoint.y + "L" + e + " " + j + "L" + c + " " + i + "Z";
		}
	};

	designer.editors={};


	flow.init = function(obj, option) {
		option = JQ.extend(true, {},designer.config.flow, option);

		JQ(obj)
			.addClass(option.cssClass)
			.css(option.attr);
		var q={};
        var g={};	
		var svg = Raphael(obj, JQ(obj).width(), JQ(obj).height());

		JQ(obj).data("node",[]);
		JQ(obj).data("route",[]);
      //-------4_14----4_22加了注释------
		/*q=JQ(obj).data("node");
		g=JQ(obj).data("route");*/
       //-------4_14----------
		JQ(svg)
			.bind("addnode", function(e, type, option) {
			var rect = new flow.node(obj, this, JQ.extend(true, {}, designer.config.states[type], option));
				JQ(obj).data("node").push(rect);
				q[rect.getId()]=rect;
				JQ("#sync").trigger("sync",{"node":q,"path":g});

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
				
				g[path.getId()]=path;
				JQ(obj).data("route").push(path);
			
				JQ("#sync").trigger("sync",{"node":q,"path":g});
			})
			.bind("removeobject", function() {
				var cNodeId = JQ(obj).data("currentObject").getId();
				var s=designer.util.isLine(JQ(obj).data("currentObject"));
				var Olength = cNodeId.length;
				//删除节点的情况
				if (!s) {
					var delToPathId = "";
					var delFromPathId = "";
					for (var i = 0; i < JQ(obj).data("route").length; i++) {
						if (JQ(obj).data("route")[i].getToNodeId() == cNodeId) {
							delToPathId = JQ(obj).data("route")[i].getId();
						}
						if (JQ(obj).data("route")[i].getFromNodeId() == cNodeId) {
							delFromPathId = JQ(obj).data("route")[i].getId();
						}
					}
					q[JQ(obj).data("currentObject").getId()] = null;
					g[delToPathId] = null;
					g[delFromPathId] = null;
				} else {
					//删除连线的情况
					g[cNodeId] = null;
				}
				
				JQ("#sync").trigger("sync", {"node": q,"path": g});

				JQ(obj).data("currentObject").remove();
			})
			.bind("click",function(e,x,y){
				if(!this.getElementByPoint(x,y) && JQ(obj).data("node")){
					for (var i = 0; i < JQ(obj).data("node").length; i++) {
						JQ(obj).data("node")[i].blur();
					}
					for (var i = 0; i < JQ(obj).data("route").length; i++) {
						JQ(obj).data("route")[i].blur();
					}
					JQ(obj).data("currentObject",null);
				}
				//------------4_24-----
				JQ("#sync").trigger("sync", {"node": q,"path": g});				
				//-----------------

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
		}).click(function(e) {
			JQ(svg).trigger("click", [e.clientX, e.clientY])
		});
		JQ(document).keydown(function(e) {
			if (e.keyCode == 46) {
				var currentObject = JQ(obj).data("currentObject");
				if (currentObject != null) {
					JQ(obj).data("currentObject").blur();
					JQ(svg).trigger("removeobject");
				}
			}
		});

		if (option.model && option.model.node) {
			JQ(option.model.node).each(function() {
				var rect = new flow.node(obj, svg, JQ.extend(true, {}, this));
				JQ(obj).data("node").push(rect);
			});

			JQ(option.model.route).each(function() {
				var path = new flow.path(obj, svg, JQ.extend(true, {}, this));
				JQ(obj).data("route").push(path);
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
			for (var i = 0; i < JQ(obj).data("route").length; i++) {
				JQ(obj).data("route")[i].blur();
			}
			moveResize();
			if (JQ(obj).data("currentObject") != null && 
				!designer.util.isLine(JQ(obj).data("currentObject")) && 
				!designer.util.isLine(rect) && 
				designer.config.toolBoxInstance.data("mode") == "transition") {
				JQ(svg).trigger("addroute", {
					props: {
						from: JQ(obj).data("currentObject").getId(),
						to: rect.getId()
					}
				});

			}
			JQ(obj).data("currentObject", rect);
			
			//-------4_11----
			//console.log(rect.toJson().type);
			//JQ.selItems.splice(0,JQ.selItems.length);

			JQ.selItems.length=0;
			JQ.selItems.push(JQ(obj).data("currentObject").getId());
			getNodeList(JQ(obj).data("currentObject"));
            function getNodeList(rect){
            	if(rect.toJson().type=="task"){
				var currentNodeId=rect.getId();
				for(var i=0;i<JQ(obj).data("route").length;i++){
					if(currentNodeId==JQ(obj).data("route")[i].getToNodeId()){
						for(var j=0;j<JQ(obj).data("node").length;j++){
							if(JQ(obj).data("node")[j].getId()==JQ(obj).data("route")[i].getFromNodeId()){
								JQ.selItems.push(JQ(obj).data("node")[j].toJson().props.displayName.value);
								getNodeList(JQ(obj).data("node")[j]);
							}
						}
					}
				}
			}
            }
            //元素反转索引从1开始,因为索引为0存储是当前rect的ID
            for(var i=1;i<JQ.selItems.length/2;i++){
            	var temp=JQ.selItems[i];
            	JQ.selItems[i]=JQ.selItems[JQ.selItems.length-i];
            	JQ.selItems[JQ.selItems.length-i]=temp;
            }
            var setDefult="";
            if(JQ.saveList.length>0){
            	for(var i=0;i<JQ.saveList.length;i++){
            		if(JQ.saveList[i].id==JQ.selItems[0]){
            			setDefult=JQ.saveList[i].text;
            		}
            	}
            }
            for(var i=1;i<JQ.selItems.length;i++){
            	if(i>1&&JQ.selItems[i]==setDefult){
            		var temp=JQ.selItems[i];
            		JQ.selItems[i]=JQ.selItems[1];
            		JQ.selItems[1]=temp;
            		break;
            	}
            }

			//-------4_11----
			//触发prop出现事件
			designer.config.propInstance.trigger("show",rect);

		};

		this.blur = function() {
			resizeLine.hide();
			for (var i in resizePoint) {
				resizePoint[i].hide();
			}

			//触发prop消失事件
			designer.config.propInstance.trigger("hide",rect);
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

		this.remove = function() {
			var result = [];
			for (var i = 0; i < JQ(obj).data("node").length; i++) {
				if(JQ(obj).data("node")[i].getId() == rect.getId()){
				}else{
					result.push(JQ(obj).data("node")[i]);
				}
			}
			JQ(obj).data("node",result);

			var linkRoute = [];
			for (var i = 0; i < JQ(obj).data("route").length; i++) {
				if (JQ(obj).data("route")[i].getFromNodeId() == rect.getId() || JQ(obj).data("route")[i].getToNodeId() == rect.getId()) {
					linkRoute.push(JQ(obj).data("route")[i]);
				}
			}
			
			for (var i = 0; i < linkRoute.length; i++) {
				linkRoute[i].remove();
			}

			node.remove();
			resizeLine.remove();
			for (var i in resizePoint) {
				resizePoint[i].remove();
			}
		};

		this.setPropValue = function(propName,propValue){
			option.props[propName].value = propValue;	
		};
		this.setText=function(newText){
			text.attr("text",newText);
		}

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

		route.drag(function(dx, dy) {

		}, function() {
			path.focus();
		}, function() {

		});

		var resizeDot = {};
		resizeDot.fromDot = svg.rect().attr(option.attr.fromDot).hide();
		resizeDot.toDot = svg.rect().attr(option.attr.toDot).hide();

		function build() {
			var centerLine = designer.util.connPoint(fromNode.getCenterPoint(), toNode.getCenterPoint());
			var fromPoint = Raphael.pathIntersection(centerLine, fromNode.getResizePath());
			var toPoint = Raphael.pathIntersection(centerLine, toNode.getResizePath());
			if (fromPoint.length > 0 && toPoint.length > 0) {
				fromPoint = fromPoint[0];
				toPoint = toPoint[0];
				var _fromDot = {
					x: fromPoint.x - option.attr.fromDot.width / 2,
					y: fromPoint.y - option.attr.fromDot.height / 2,
				};
				var _toDot = {
					x: toPoint.x - option.attr.toDot.width / 2,
					y: toPoint.y - option.attr.toDot.height / 2,
				};
				var linePath = designer.util.connPoint(fromPoint, toPoint);
				var arrowPoint = Raphael.getPointAtLength(linePath, Raphael.getTotalLength(linePath) - 5);
				option.attr = JQ.extend(true, {}, option.attr, {
					path: {
						path: linePath
					},
					arrow: {
						path: designer.util.arrow(toPoint, arrowPoint, option.attr.arrow.radius)
					},
					fromDot: _fromDot,
					toDot: _toDot
				});
			}
		}

		this.render = function(){
			build();
			line.attr(option.attr.path);
			arrow.attr(option.attr.arrow);
			resizeDot.fromDot.attr(option.attr.fromDot);
			resizeDot.toDot.attr(option.attr.toDot);
		};

		this.focus = function(){
			for (var i = 0; i < JQ(obj).data("node").length; i++) {
				JQ(obj).data("node")[i].blur();
			}
			for (var i = 0; i < JQ(obj).data("route").length; i++) {
				JQ(obj).data("route")[i].blur();
			}
			for (var i in resizeDot) {
				resizeDot[i].show();
			}
			JQ(obj).data("currentObject", path);
		};

		this.blur = function(){
			for (var i in resizeDot) {
				resizeDot[i].hide();
			}
		};

		this.toJson = function() {
			return JQ.extend(true, {}, option);
		};

		this.getId = function(){
			return option.id;
		};

		this.getFromNodeId = function(){
			return option.props.from;
		};

		this.getToNodeId = function(){
			return option.props.to;
		};

		this.remove = function() {
			var result = [];
			for (var i = 0; i < JQ(obj).data("route").length; i++) {
				if(JQ(obj).data("route")[i].getId() == path.getId()){
					
				}else{
					result.push(JQ(obj).data("route")[i]);
				}
			}
			JQ(obj).data("route",result);
			route.remove();
			for (var i in resizeDot) {
				resizeDot[i].remove();
			}
		};

		JQ(fromNode).data("route").push(this);
		JQ(toNode).data("route").push(this);

		$.designer.config.toolBoxInstance.children(".toolbox-node[type='select']").click();
	};

	prop.init = function(obj, option) {
		option = JQ.extend(true, {},designer.config.props, option);
		var propContent = JQ(obj).find("#prop_tab");

        var d= function(e, rect) {
                JQ("#properties").show();
                var props = rect.toJson().props;
                for(var p in props){
                	var prop = props[p];
                	var content = JQ("<div></div>");
                	content.append(prop.label);
                	//--------4_14-------
                	if(prop.label=="驳回到"){
                		prop.editor().init(content,rect,prop);
                	}else{
                		prop.editor().init(content,rect,prop);
                	}
                	
                	content.appendTo(propContent);
                }
    		
        }
        var d1=function(e,rect){
        	propContent.empty();

        }
		JQ(obj).bind("show",d);
		JQ(obj).bind("hide",d1);
		JQ(obj)
			.draggable({
				handle: ".prop_div"
			})
			.addClass(option.cssClass)
			.css(option.attr);
        //JQ("#properties").show();
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
			designer.config.flowInstance.data("currentObject",null);
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

	};

	flowInfoTable.init=function(obj,option){


		/*var tBody=JQ(obj).find("#tbody");
		var num=0;
		var d=function(e,rect){
			var props=rect.toJson().props;
			//console.log(props.id.value);
			var t_tr=JQ("<tr id='"+props.id.value+"'></tr>");
			for(var i in props){
				var prop=props[i];
				if(i=="id"){
					num++;
					t_tr.append("<td>"+num+"</td>")
				}else{
				    t_tr.append("<td>"+prop.value+"</td>");
			    }

			}
			
			t_tr.appendTo(tBody);
		}
		JQ(obj).bind("showTable",d);*/
	};
	
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

	JQ.fn.prop = function(option){
		return this.each(function() {
			prop.init(this, option)
		})
	};
	JQ.fn.flowInfoTable=function(option){
		return this.each(function(){
			flowInfoTable.init(this,option)
		})
	};

	JQ.designer = designer;
})(jQuery);