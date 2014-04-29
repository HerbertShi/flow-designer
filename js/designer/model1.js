(function($) {
	var designer = $.designer;
	
	$.extend(true, designer.config.states, {
		start: {
			showType: 'image',
			type: 'start',
			name: {
				text: '<<start>>'
			},
			text: {
				text: '开始节点'
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
				id: {
					name: 'id',
					label: '编号',
					value: '',
					editor: function() {
						return new designer.editors.readOnlyEditor();
					}
				},

				displayName: {
					name: 'displayName',
					label: '显示名称',
					value: '开始节点',
					editor: function() {
						return new designer.editors.textEditor();
					}
				},
				sponsorJob: {
					name: 'sponsorJob',
					label: '主办人职务',
					value: '',
					editor: function() {
						return new designer.editors.inputEditor();
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
				text: '结束节点'
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
				id: {
					name: 'id',
					label: '编号',
					value: '',
					editor: function() {
						return new designer.editors.readOnlyEditor();
					}
				},
				displayName: {
					name: 'displayName',
					label: '显示名称',
					value: '结束节点',
					editor: function() {
						return new designer.editors.inputEditor();
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
				text: '任务节点'
			},
			img: {
				src: 'images/48/task_empty.png',
				width: 48,
				height: 48
			},
			props: {
				id: {
					name: 'id',
					label: '编号',
					value: '',
					editor: function() {
						return new designer.editors.readOnlyEditor();
					}
				},
				displayName: {
					name: 'displayName',
					label: '显示名称',
					value: '任务节点',
					editor: function() {
						return new designer.editors.textEditor();
					}
				},
				sponsorJob: {
					name: 'sponsorJob',
					label: '主办人职务',
					value: '',
					editor: function() {
						return new designer.editors.inputEditor();
					}
				},
				rejectTo: {
					name: 'rejectTo',
					label: '驳回到',
					value: '',
					editor: function() {
						return new designer.editors.selectEditor([{
							name: '开始节点',
							value: '开始节点'

						}, {
							name: 'ALL',
							value: 'ALL'
						},{
							name: '男',
							value: '男'
						}
						]);
					}
				},
				flowDate: {
					name: 'flowDate',
					label: '流转期限',
					value: '',
					editor: function() {
						return new designer.editors.inputEditor();
					}
				},
				/*submitLogic: {
					name: 'submitLogic',
					label: '提交逻辑',
					value: '',
					editor: function() {
						return new designer.editors.selectEditor([{
							name: 'and',
							value: 'and'

						}, {
							name: 'or',
							value: 'or'
						}

						]);
					}
				},*/
				replyOpinion: {
					name: 'replyOpinion',
					label: '可回复意见',
					value: 'false',
					editor: function() {
						return new designer.editors.checkEditor();
					}
				},
				checkOpinion: {
					name: 'checkOpinion',
					label: '查看意见',
					value: 'false',
					editor: function() {
						return new designer.editors.checkEditor();
					}
				},
				checkHostOpinion: {
					name: 'checkHostOpinion',
					label: '查看主办人意见',
					value: 'false',
					editor: function() {
						return new designer.editors.checkEditor();
					}
				},
				checkCooOpinion: {
					name: 'checkCooOpinion',
					label: '查看协办人意见',
					value: 'false',
					editor: function() {
						return new designer.editors.checkEditor();
					}
				},
				insertAttachment: {
					name: 'insertAttachment',
					label: '可插入附件',
					value: 'false',
					editor: function() {
						return new designer.editors.checkEditor();
					}
				},
				checkAttachment: {
					name: 'checkAttachment',
					label: '可查看附件',
					value: 'false',
					editor: function() {
						return new designer.editors.checkEditor();
					}
				},
				trackAccepter: {
					name: 'trackAccepter',
					label: '跟踪验收人',
					value: 'false',
					editor: function() {
						return new designer.editors.checkEditor();
					}
				},
				isShowTrueName: {
					name: 'isShowTrueName',
					label: '是否显示姓名',
					value: 'false',
					editor: function() {
						return new designer.editors.checkEditor();
					}
				},
				promptNext: {
					name: 'promptNext',
					label: '信息提示下一步',
					value: 'false',
					editor: function() {
						return new designer.editors.checkEditor();
					}
				},
				ownFunction: {
					name: 'ownFunction',
					label: '隶属功能',
					value: '',
					editor: function() {
						return new designer.editors.inputEditor();
					}
				},
				talkToPre: {
					name: 'talkToPre',
					label: '和上一环节对话',
					value: 'false',
					editor: function() {
						return new designer.editors.checkEditor();
					}
				},
				approvedIsNeedIdentityConfirm: {
					name: 'approvedIsNeedIdentityConfirm',
					label: '审批是否需要身份确认',
					value: 'false',
					editor: function() {
						return new designer.editors.checkEditor();
					}
				},
				fillInstruction: {
					name: 'fillInstruction',
					label: '填写说明',
					value: '',
					editor: function() {
						return new designer.editors.textareaEditor();
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
				id: {
					name: 'id',
					label: '编号',
					value: '',
					editor: function() {
						return new designer.editors.readOnlyEditor();
					}
				},
				displayName: {
					name: 'displayName',
					label: '显示名称',
					value: '',
					editor: function() {
						return new designer.editors.textEditor();
					}
				}
			}
		}
	});
})(jQuery);