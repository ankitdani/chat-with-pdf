import { App, cert, initializeApp, getApps } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

const serviceKey = "./service_key.json";

let app: App;

if (getApps().length === 0) {
  app = initializeApp({
    credential: cert(serviceKey),
  });
}

const adminDb = getFirestore(app);

export { adminDb, app as adminApp };
