//copy by YourGames H1
function addRetain (item, number) {
    if (item){
        if (!item.retain) {
            item.retain = 0;
        }
        item.retain += number;
    }
}

function parserNode(node, number) {
    let children = node._children;
    children.forEach((child) => {
        dealwithNode(child, number);
        parserNode(child, number);
    });
}

function dealwithNode(node, number) {
    let sprite = node.getComponent(cc.Sprite);
    if (sprite && sprite.spriteFrame) {
        let item = cc.loader._cache[sprite.spriteFrame._textureFilename];
        addRetain(item, number);
    }

    let button = node.getComponent(cc.Button);
    if (button) {
        if (button.normalSprite) {
            let item = cc.loader._cache[button.normalSprite._textureFilename];
            addRetain(item, number);
        }

        if (button.pressedSprite) {
            let item = cc.loader._cache[button.pressedSprite._textureFilename];
            addRetain(item, number);
        }

        if (button.hoverSprite) {
            let item = cc.loader._cache[button.hoverSprite._textureFilename];
            addRetain(item, number);
        }

        if (button.disabledSprite) {
            let item = cc.loader._cache[button.disabledSprite._textureFilename];
            addRetain(item, number);
        }
    }

    let label = node.getComponent(cc.Label);
    if (label && label.font && label.font instanceof cc.BitmapFont && label.font.spriteFrame) {
            let item = cc.loader._cache[label.font.spriteFrame._textureFilename];
            addRetain(item, number);
    }

    let richText = node.getComponent(cc.RichText);
    if (richText && richText.imageAtlas) {
        let keys = Object.keys(richText.imageAtlas._spriteFrames);
        if (keys.length > 0) {
            let item = cc.loader._cache[richText.imageAtlas._spriteFrames[keys[0]]._textureFilename];
            addRetain(item, number);
        }
    }

    let particleSystem = node.getComponent(cc.ParticleSystem);
    if (particleSystem && particleSystem._texture) {
        let item = cc.loader._cache[particleSystem._texture];
        addRetain(item, number);
    }

    let pageViewIndicator = node.getComponent(cc.PageViewIndicator);
    if (pageViewIndicator && pageViewIndicator.spriteFrame) {
        let item = cc.loader._cache[pageViewIndicator.spriteFrame._textureFilename];
        addRetain(item, number);
    }

    let editBox = node.getComponent(cc.EditBox);
    if (editBox && editBox.backgroundImage) {
        let item = cc.loader._cache[editBox.backgroundImage._textureFilename];
        addRetain(item, number);
    }

    let mask = node.getComponent(cc.Mask);
    if (mask && mask.spriteFrame) {
        let item = cc.loader._cache[mask.spriteFrame._textureFilename];
        addRetain(item, number);
    }
}
function getObjSize(obj)
{
    let cnt = 0;
    for (var k in obj) {
        cnt = cnt + 1;
    }
    return cnt;
}
function releaseNodeRes() {
    var dependAssets = cc.director.getScene().dependAssets;
    var release_key = {};
    for (var asset in cc.loader._cache) {
        let item = cc.loader._cache[asset];
        if (item.retain <= 0){
            release_key[item.id] = 1;
            cc.loader.release(item.id);
        }
    }
    while(getObjSize(release_key) > 0 )
    {
        var tempKey = {};
        for (var asset in cc.loader._cache) {
            let item = cc.loader._cache[asset];
            if (item.dependKeys && item.dependKeys.length > 0) {
                var is_release = false;
                for (var i = 0; i < item.dependKeys.length; i++) {
                    if (release_key[item.dependKeys[i]]) {
                        is_release = true;

                    }
                }
                if (is_release) {
                    tempKey[item.id] = 1;
                    cc.loader.release(item.id);
                }
            }
        }    
        release_key = tempKey;
    }
}
function replaceSprite(target, oldSpriteName, newSprite) {
    if (target[oldSpriteName]) {
        initRetain(cc.loader._cache[target[oldSpriteName]._textureFilename]);
        cc.loader._cache[target[oldSpriteName]._textureFilename].retain -= 1;
    }

    initRetain(cc.loader._cache[newSprite._textureFilename]);
    cc.loader._cache[newSprite._textureFilename].retain += 1;
    target[oldSpriteName] = newSprite;
}
const uiLoader = {
    loadRes(path, type, callback) {
        cc.loader.loadRes(path, type, (err, asset) => {
            if (err) {
                cc.log(`[资源加载] 错误 ${err}`);
                return;
            }
            callback(asset)
        });
    },

    releaseRes(path, type) {
        cc.loader.releaseRes(path, type);
    },

    replaceSpriteTexture(target, spriteFrame) {
        if (!target || !spriteFrame) {
            cc.log("参数错误")
            return;
        }

        if (!target.getComponent(cc.Sprite)) {
            cc.log("目标节点没有Sprite组件");
            return;
        }

        let sprite = target.getComponent(cc.Sprite);

        replaceSprite(sprite, "spriteFrame", spriteFrame);
    },

    replaceButtonTexture(target, normalSprite, pressedSprite, hoverSprite, disabledSprite) {
        if (!target || !normalSprite) {
            cc.log("参数错误")
            return;
        }

        if (!target.getComponent(cc.Button)) {
            cc.log("目标节点没有Button组件");
            return;
        }

        let button = target.getComponent(cc.Button);
        if (normalSprite) {
            replaceSprite(button, "normalSprite", normalSprite);
        }

        if (pressedSprite) {
            replaceSprite(button, "pressedSprite", pressedSprite);
        }

        if (hoverSprite) {
            replaceSprite(button, "hoverSprite", hoverSprite);
        }

        if (disabledSprite) {
            replaceSprite(button, "disabledSprite", disabledSprite);
        }
    },
    instantiate(prefab) {
        let node_prefab = cc.instantiate(prefab);
        parserNode(node_prefab, 1);
        return node_prefab;
    },
    destroy(node) {
        if (!node instanceof cc.Node) {
            cc.log("你要销毁的不是一个节点");
            return;
        }
        parserNode(node, -1);
        node.destroy();
    },
    clearCache(){
        releaseNodeRes();
    },
    dump(){
        let cnt = 0;
        let refcnt = 0;
        for (var id in cc.loader._cache) {
            var item = cc.loader._cache[id];
            cnt = cnt + 1;
                if (item.retain <= 0)
                {                cc.log("--------------------------")
                    cc.log("id: ", id )
                    cc.log("item: ", item )
                    cc.log("item.retain: ", item.retain )
                    refcnt = refcnt + 1;
                }
        }
        cc.log("--------------------------")
        cc.log("cnt: ",  cnt)
        cc.log("refcnt: ",  refcnt)
    },
    parseNode(node)
    {
        parserNode(node, 0);
    },
};

module.exports = uiLoader;
