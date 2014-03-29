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
				name: {
					name: 'name',
					label: '名称',
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
				name: {
					name: 'name',
					label: '名称',
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
				name: {
					name: 'name',
					label: '名称',
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
				},
				assignee: {
					name: 'assignee',
					label: '参与者',
					value: '',
					editor: function() {
						return new designer.editors.inputEditor();
					}
				},
				performType: {
					name: 'performType',
					label: '驳回到',
					value: '',
					editor: function() {
						return new designer.editors.selectEditor([{
							name: 'ANY',
							value: 'ANY'

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
				submitLogic: {
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
				},
				replyOpinion: {
					name: 'replyOpinion',
					label: '可回复意见',
					value: '',
					editor: function() {
						return new designer.editors.checkEditor();
					}
				},
				checkOtherOpinion: {
					name: 'checkOtherOpinion',
					label: '可否查看他人意见',
					value: '',
					editor: function() {
						return new designer.editors.checkEditor();
					}
				},
				insertEmail: {
					name: 'insertEmail',
					label: '可插入邮件',
					value: '',
					editor: function() {
						return new designer.editors.checkEditor();
					}
				},
				checkAttachment: {
					name: 'checkAttachment',
					label: '可否查看附件',
					value: '',
					editor: function() {
						return new designer.editors.checkEditor();
					}
				},
				trackAccepter: {
					name: 'trackAccepter',
					label: '跟踪验收人',
					value: '',
					editor: function() {
						return new designer.editors.checkEditor();
					}
				},
				isUseTrueName: {
					name: 'isUseTrueName',
					label: '是否现实姓名',
					value: '',
					editor: function() {
						return new designer.editors.checkEditor();
					}
				},
				promptNext: {
					name: 'promptNext',
					label: '信息提示下一步',
					value: '',
					editor: function() {
						return new designer.editors.checkEditor();
					}
				},
				approvedIsNeedIdentityConfirm: {
					name: 'approvedIsNeedIdentityConfirm',
					label: '审批是否需要身份确认',
					value: '',
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
				name: {
					name: 'name',
					label: '名称',
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