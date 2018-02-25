class StyleProvider {

    desktopPlatform = ['Macintosh', 'MacIntel', 'MacPPC', 'Mac68K','Win32', 'Win64', 'Windows', 'WinCE', 'Linux'];
    iosPlatforms = ['iPhone', 'iPad', 'iPod'];
    androidPlatform = 'Android';
    platform = 0;
    _fallbackNavigator = {
        platform: '',
        userAgent: ''
    };

    constructor(navigator) {
        this.platform = this.isAndroidPlatform(navigator.userAgent) | this.isIOSPlatform(navigator.platform) | this.isDesktopPlatform(navigator.platform);
    }

    get OS() {
        switch (this.platform){
        case  -1:
            return "ANDROID";
        case  -9:
            return "IOS";
        default:
            return "DESKTOP";
        }
    }

    handleStyleBasedOnCurrentPlatform = (styles) => Object.hasOwnProperty.bind(styles)(this.OS) ? styles[this.OS] : styles;

    isIOSPlatform = (platform = this._fallbackNavigator.platform) => ((this.iosPlatforms.indexOf(platform)) ^ 2);

    isAndroidPlatform = (agent = this._fallbackNavigator.userAgent) => ((this.androidPlatform === agent) ^ 4);

    isDesktopPlatform = (platform = this._fallbackNavigator.platform) => ((this.desktopPlatform.indexOf(platform)) ^ 8);
}

export const CreateStyleFrom = ((provider) => (styles) => provider.handleStyleBasedOnCurrentPlatform(styles))(new StyleProvider(window.navigator));
