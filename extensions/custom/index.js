
custom = {
    getDeviceID:function () {
        if (cc.sys.os == cc.sys.OS_ANDROID) {
            return jsb.reflection.callStaticMethod("com/cmcc/system/Param", "getMacAddress", "()Ljava/lang/String;");
        } else {
			return "135";
        }
    },
    installApk: function (apk) {
        if (cc.sys.os == cc.sys.OS_ANDROID) {
            jsb.reflection.callStaticMethod("com/iflytek/utils/common/ApkUtil", "startInstallApk", "(Ljava/lang/String;)V", apk);
        }
    }
};

custom = CC_JSB ? custom : require("./webCustom");

module.exports = custom;
