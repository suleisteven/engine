/**
 * Created by lsq on 2017/2/5.
 */
var cls = "com/iflytek/unipay/js/UniPay";
PayComponent = {
    pay: function (order, payMode, callback) {
        if (cc.sys.isNative && cc.sys.os == cc.sys.OS_ANDROID) {
            PayCallback.addListener("Pay", callback);
            jsb.reflection.callStaticMethod(cls, "pay", "(Ljava/lang/String;Ljava/lang/String;)V", order, payMode);
            return true;
        } else {
            return false;
        }
    },

    payMonth: function (order, payMode, callback) {
        if (cc.sys.isNative && cc.sys.os == cc.sys.OS_ANDROID) {
            PayCallback.addListener("Pay", callback);
            jsb.reflection.callStaticMethod(cls, "payMonth", "(Ljava/lang/String;Ljava/lang/String;)V", order, payMode);
            return true;
        } else {
            return false;
        }
    },
    checkAuth: function (productId, callback) {
        if (cc.sys.isNative && cc.sys.os == cc.sys.OS_ANDROID) {
            PayCallback.addListener("Auth", callback);
            jsb.reflection.callStaticMethod(cls, "checkAuth", "(Ljava/lang/String;)V", productId);
            return true;
        } else {
            return false;
        }
    },
    getInitMap: function (callback) {
        if (cc.sys.isNative && cc.sys.os == cc.sys.OS_ANDROID) {
            PayCallback.addListener("Init", callback);
            jsb.reflection.callStaticMethod(cls, "getInitMap", "()V");
            return true;
        } else {
			
			if(callback)
			{
				callback("{\"initStatus\":\"success\"}");
			}
            return false;
        }
    }
};

if (cc.sys.os == cc.sys.OS_ANDROID) {
    PayCallback = {
        payListeners: [],
        authListeners: [],
        addListener: function (type, listener) {
            switch (type) {
                case "Pay":
                    this.payListeners.push(listener);
                    break;
                case "Auth":
                    this.authListeners.push(listener);
                    break;
                case "Init":
                    this.initListener = listener;
                    break;
            }
        },

        onPay: function (payState) {
            for (var i = 0; i < this.payListeners.length; i++) {
                this.payListeners[i](payState);
            }
            this.payListeners.splice(0, this.payListeners.length);
        },
        onAuth: function (result) {
            for (var i = 0; i < this.authListeners.length; i++) {
                this.authListeners[i](result);
            }
            this.authListeners.splice(0, this.authListeners.length);
        },
        onInit: function (result) {
            if ( this.initListener != undefined || this.initListener != null) {
                this.initListener(result);
            }
        }
    };
    cc.PayListener.addListener("Pay", PayCallback, "onPay");
    cc.PayListener.addListener("Auth", PayCallback, "onAuth");
    cc.PayListener.addListener("Init", PayCallback, "onInit");
}


module.exports = PayComponent;
