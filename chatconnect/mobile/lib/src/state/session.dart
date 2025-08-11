import 'package:flutter/foundation.dart';
import 'package:dio/dio.dart';
import 'package:firebase_auth/firebase_auth.dart';
import 'package:firebase_messaging/firebase_messaging.dart';

class SessionState extends ChangeNotifier {
  String apiBase = const String.fromEnvironment('API_BASE', defaultValue: 'http://localhost:8080');

  Future<void> onSignedIn() async {
    final user = FirebaseAuth.instance.currentUser;
    if (user == null) return;
    final idToken = await user.getIdToken();
    final fcmToken = await FirebaseMessaging.instance.getToken();
    if (fcmToken == null) return;
    final dio = Dio(BaseOptions(baseUrl: apiBase, headers: { 'Authorization': 'Bearer $idToken' }));
    await dio.post('/auth/device-token', data: { 'token': fcmToken, 'platform': 'android' });
  }
}