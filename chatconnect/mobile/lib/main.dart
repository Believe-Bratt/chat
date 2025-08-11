import 'package:flutter/material.dart';
import 'package:firebase_core/firebase_core.dart';
import 'package:provider/provider.dart';
import 'src/auth/auth_gate.dart';
import 'src/state/session.dart';
import 'src/ui/theme.dart';

void main() async {
  WidgetsFlutterBinding.ensureInitialized();
  await Firebase.initializeApp();
  runApp(const ChatConnectApp());
}

class ChatConnectApp extends StatelessWidget {
  const ChatConnectApp({super.key});

  @override
  Widget build(BuildContext context) {
    return ChangeNotifierProvider(
      create: (_) => SessionState(),
      child: MaterialApp(
        title: 'ChatConnect',
        theme: buildLightTheme(),
        darkTheme: buildDarkTheme(),
        home: const AuthGate(),
      ),
    );
  }
}