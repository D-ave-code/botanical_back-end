import { Injectable } from '@nestjs/common';
import * as firebase from 'firebase-admin';
const serviceAccount = require("../../botanical-be6d3-firebase-adminsdk-n0698-2817065603.json");
 
firebase.initializeApp({
    credential: firebase.credential.cert(serviceAccount)
})
@Injectable()

export class NotificacionesService {

    sendNotification(title:string, body:string, deviceToken: string){
        return firebase.messaging().send({
            notification: {title, body},
            token: deviceToken,
            android: {priority: "high"}
        })
    }
    
}
