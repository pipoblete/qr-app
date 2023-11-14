import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: 'qr app',
  webDir: 'www',
  server: {
    androidScheme: 'https'
  },
  plugins: {
    Camera: {
      ios: {
        usesPermission: 'AllowAccessToURL'
      },
      android: {
        iconColor: '#000000'
      }
    }
  }
};

export default config;
