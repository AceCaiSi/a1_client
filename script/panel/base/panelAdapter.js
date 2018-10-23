cc.Class({
	extends: cc.Component,

	onLoad () {
		this._prefabSize = cc.size(this.node.prefabRoot.width, this.node.prefabRoot.height);
		this.tryAdaptPanel();
	},

	tryAdaptPanel: function() {
		this._adaptPanelPosition();
		this._adaptPanelSize();
	},

	_adaptPanelSize: function() {
		let viewSize = MOD.resolution.getEffectiveSize();
		let viewRect = cc.view.getViewportRect();
		let scaleX = cc.view.getScaleX();
		let scaleY = cc.view.getScaleY();
		let height = Math.ceil(viewSize.height + viewRect.y * 2 / scaleY);
		let width = Math.ceil(viewSize.width + viewRect.x * 2 / scaleX);
		this.node.height = height;
		this.node.width = width;

		if (this.node._panelConf.fullScreen) {
			this.node.prefabRoot.width = width;
			this.node.prefabRoot.height = height;
		}
	},

	_adaptPanelPosition: function() {
		let panelAdapt = this.node.getChildByNameArray(['PanelAdaptMiddleTop']);
		this.adaptMiddleTop(panelAdapt);
		panelAdapt = this.node.getChildByNameArray(['PanelAdaptMiddleBottom']);
		this.adaptMiddleBottom(panelAdapt);
		panelAdapt = this.node.getChildByNameArray(['PanelAdaptLeftMiddle']);
		this.adaptMiddleLeft(panelAdapt);
		panelAdapt = this.node.getChildByNameArray(['PanelAdaptRightMiddle']);
		this.adaptMiddleRight(panelAdapt);
		panelAdapt = this.node.getChildByNameArray(['PanelAdaptLeftTop']);
		this.adaptLeftTop(panelAdapt);
		panelAdapt = this.node.getChildByNameArray(['PanelAdaptRightTop']);
		this.adaptRightTop(panelAdapt);
		panelAdapt = this.node.getChildByNameArray(['PanelAdaptLeftBottom']);
		this.adaptLeftBottom(panelAdapt);
		panelAdapt = this.node.getChildByNameArray(['PanelAdaptRightBottom']);
		this.adaptRightBottom(panelAdapt);
	},

	adaptHeight: function(panelAdapt) {
		if (!cc.isValid(panelAdapt)) {
			return;
		}
		let deltaHeight = this.getAdaptDeltaHeight();
		this._setPanelAdaptSize(panelAdapt, cc.size(0, deltaHeight * 2));
	},

	adaptWidth: function(panelAdapt) {
		if (!cc.isValid(panelAdapt)) {
			return;
		}
		let deltaWidth = this.getAdaptDeltaWidth();
		this._setPanelAdaptSize(panelAdapt, cc.size(deltaWidth * 2, 0));
	},

	adaptMiddleBottom: function(panelAdapt) {
		if (!cc.isValid(panelAdapt)) {
			return;
		}
		let deltaHeight = this.getAdaptDeltaHeight();
		this._setPanelAdaptPos(panelAdapt, cc.v2(0, -deltaHeight));
	},

	adaptMiddleTop: function(panelAdapt) {
		if (!cc.isValid(panelAdapt)) {
			return;
		}
		let deltaHeight = this.getAdaptDeltaHeight();
		this._setPanelAdaptPos(panelAdapt, cc.v2(0, deltaHeight));
	},

	adaptMiddleLeft: function(panelAdapt) {
		if (!cc.isValid(panelAdapt)) {
			return;
		}
		let deltaWidth = this.getAdaptDeltaWidth();
		this._setPanelAdaptPos(panelAdapt, cc.v2(-deltaWidth, 0));
	},

	adaptMiddleRight: function(panelAdapt) {
		if (!cc.isValid(panelAdapt)) {
			return;
		}
		let deltaWidth = this.getAdaptDeltaWidth();
		this._setPanelAdaptPos(panelAdapt, cc.v2(deltaWidth, 0));
	},

	adaptLeftTop: function(panelAdapt) {
		if (!cc.isValid(panelAdapt)) {
			return;
		}
		let deltaWidth = this.getAdaptDeltaWidth();
		let deltaHeight = this.getAdaptDeltaHeight();
		this._setPanelAdaptPos(panelAdapt, cc.v2(-deltaWidth, deltaHeight));
	},

	adaptRightTop: function(panelAdapt) {
		if (!cc.isValid(panelAdapt)) {
			return;
		}
		let deltaWidth = this.getAdaptDeltaWidth();
		let deltaHeight = this.getAdaptDeltaHeight();
		this._setPanelAdaptPos(panelAdapt, cc.v2(deltaWidth, deltaHeight));
	},

	adaptLeftBottom: function(panelAdapt) {
		if (!cc.isValid(panelAdapt)) {
			return;
		}
		let deltaWidth = this.getAdaptDeltaWidth();
		let deltaHeight = this.getAdaptDeltaHeight();
		this._setPanelAdaptPos(panelAdapt, cc.v2(-deltaWidth, -deltaHeight));
	},

	adaptRightBottom: function(panelAdapt) {
		if (!cc.isValid(panelAdapt)) {
			return;
		}
		let deltaWidth = this.getAdaptDeltaWidth();
		let deltaHeight = this.getAdaptDeltaHeight();
		this._setPanelAdaptPos(panelAdapt, cc.v2(deltaWidth, -deltaHeight));
	},

	getAdaptDeltaHeight: function() {
		let vsize = MOD.resolution.getEffectiveSize();
		let delta = (vsize.height - this._prefabSize.height) / 2;
		delta += (cc.view.getViewportRect().y / cc.view.getScaleY());
		return delta;
	},

	_setPanelAdaptPos: function(panelAdapt, deltaPos) {
		let originPos = panelAdapt.originPos;
		if (!originPos) {
			originPos = panelAdapt.getPosition();
			panelAdapt.originPos = originPos;
		}
		let pos = originPos.add(deltaPos);
		panelAdapt.setPosition(pos);
	},

	getAdaptDeltaWidth: function() {
		let vsize = MOD.resolution.getEffectiveSize();
		let delta = (vsize.width - this._prefabSize.width) / 2;
		delta += (cc.view.getViewportRect().x / cc.view.getScaleX());
		return delta;
	},

	_setPanelAdaptSize: function(panelAdapt, deltaSize) {
		let originSize = panelAdapt.originSize;
		if (!originSize) {
			originSize = panelAdapt.getContentSize();
			panelAdapt.originSize = originSize;
		}
		let size = cc.size(originSize.width + deltaSize.width, originSize.height + deltaSize.height);
		panelAdapt.setContentSize(size);
	},
});
