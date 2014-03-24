(function($) {
	var flow = $.flow;

	$.extend(true, flow.config.rect, {
		attr: {
			r: 8,
			fill: '#F6F7FF',
			stroke: '#03689A',
			"stroke-width": 2
		}
	});

	$.extend(true, flow.config.props.props, {
		name: {
			name: 'name',
			label: '名称',
			value: '',
			editor: function() {
				return new flow.editors.inputEditor();
			}
		},
		displayName: {
			name: 'displayName',
			label: '显示名称',
			value: '',
			editor: function() {
				return new flow.editors.inputEditor();
			}
		},
		expireTime: {
			name: 'expireTime',
			label: '期望完成时间',
			value: '',
			editor: function() {
				return new flow.editors.inputEditor();
			}
		},
		instanceUrl: {
			name: 'instanceUrl',
			label: '实例启动Url',
			value: '',
			editor: function() {
				return new flow.editors.inputEditor();
			}
		},
		instanceNoClass: {
			name: 'instanceNoClass',
			label: '实例编号生成类',
			value: '',
			editor: function() {
				return new flow.editors.inputEditor();
			}
		}
	});


	$.extend(true, flow.config.tools.states, {
		start: {
			showType: 'image',
			type: 'start',
			name: {
				text: '<<start>>'
			},
			text: {
				text: 'start'
			},
			img: {
				src: 'images/48/start_event_empty.png',
				width: 48,
				height: 48
			},
			attr: {
				width: 50,
				heigth: 50
			},
			props: {
				name: {
					name: 'name',
					label: '名称',
					value: '开始节点',
					editor: function() {
						return new flow.editors.inputEditor();
					}
				},
				preInterceptors: {
					name: 'preInterceptors',
					label: '前置拦截器',
					value: '',
					editor: function() {
						return new flow.editors.inputEditor();
					}
				},
				postInterceptors: {
					name: 'postInterceptors',
					label: '后置拦截器',
					value: '',
					editor: function() {
						return new flow.editors.inputEditor();
					}
				}
			}
		},
		end: {
			showType: 'image',
			type: 'end',
			name: {
				text: '<<end>>'
			},
			text: {
				text: 'end'
			},
			img: {
				src: 'images/48/end_event_terminate.png',
				width: 48,
				height: 48
			},
			attr: {
				width: 50,
				heigth: 50
			},
			props: {
				name: {
					name: 'name',
					label: '名称',
					value: '结束节点',
					editor: function() {
						return new flow.editors.inputEditor();
					}
				},
				preInterceptors: {
					name: 'preInterceptors',
					label: '前置拦截器',
					value: '',
					editor: function() {
						return new flow.editors.inputEditor();
					}
				},
				postInterceptors: {
					name: 'postInterceptors',
					label: '后置拦截器',
					value: '',
					editor: function() {
						return new flow.editors.inputEditor();
					}
				}
			}
		},
		task: {
			showType: 'text',
			type: 'task',
			name: {
				text: '<<task>>'
			},
			text: {
				text: '审批节点'
			},
			img: {
				src: 'images/48/task_empty.png',
				width: 48,
				height: 48
			},
			props: {
				name: {
					name: 'name',
					label: '名称',
					value: '',
					editor: function() {
						return new flow.editors.inputEditor();
					}
				},
				displayName: {
					name: 'displayName',
					label: '显示名称',
					value: '',
					editor: function() {
						return new flow.editors.textEditor();
					}
				},
				form: {
					name: 'form',
					label: '表单',
					value: '',
					editor: function() {
						return new flow.editors.inputEditor();
					}
				},
				assignee: {
					name: 'assignee',
					label: '参与者',
					value: '',
					editor: function() {
						return new flow.editors.inputEditor();
					}
				},
				assignmentHandler: {
					name: 'assignmentHandler',
					label: '参与者处理类',
					value: '',
					editor: function() {
						return new flow.editors.inputEditor();
					}
				},
				expireTime: {
					name: 'expireTime',
					label: '期望完成时间',
					value: '',
					editor: function() {
						return new flow.editors.inputEditor();
					}
				},
				performType: {
					name: 'performType',
					label: '参与类型',
					value: '',
					editor: function() {
						return new flow.editors.selectEditor([{
							name: 'ANY',
							value: 'ANY'
						}, {
							name: 'ALL',
							value: 'ALL'
						}]);
					}
				},
				preInterceptors: {
					name: 'preInterceptors',
					label: '前置拦截器',
					value: '',
					editor: function() {
						return new flow.editors.inputEditor();
					}
				},
				postInterceptors: {
					name: 'postInterceptors',
					label: '后置拦截器',
					value: '',
					editor: function() {
						return new flow.editors.inputEditor();
					}
				}
			}
		},
		notify: {
			showType: 'text',
			type: 'notify',
			name: {
				text: '<<notify>>'
			},
			text: {
				text: '知会节点'
			},
			img: {
				src: 'images/48/task_empty.png',
				width: 48,
				height: 48
			},
			props: {
				name: {
					name: 'name',
					label: '名称',
					value: '',
					editor: function() {
						return new flow.editors.inputEditor();
					}
				},
				displayName: {
					name: 'displayName',
					label: '显示名称',
					value: '',
					editor: function() {
						return new flow.editors.textEditor();
					}
				},
				clazz: {
					name: 'clazz',
					label: '类路径',
					value: '',
					editor: function() {
						return new flow.editors.inputEditor();
					}
				},
				methodName: {
					name: 'methodName',
					label: '方法名称',
					value: '',
					editor: function() {
						return new flow.editors.inputEditor();
					}
				},
				args: {
					name: 'args',
					label: '参数变量',
					value: '',
					editor: function() {
						return new flow.editors.inputEditor();
					}
				},
				preInterceptors: {
					name: 'preInterceptors',
					label: '前置拦截器',
					value: '',
					editor: function() {
						return new flow.editors.inputEditor();
					}
				},
				postInterceptors: {
					name: 'postInterceptors',
					label: '后置拦截器',
					value: '',
					editor: function() {
						return new flow.editors.inputEditor();
					}
				}
			}
		}
	});
})(jQuery);