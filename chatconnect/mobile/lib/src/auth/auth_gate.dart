import 'package:firebase_auth/firebase_auth.dart';
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../state/session.dart';
import '../ui/main_tabs.dart';
import 'phone_auth_screen.dart';

class AuthGate extends StatelessWidget {
  const AuthGate({super.key});

  @override
  Widget build(BuildContext context) {
    return StreamBuilder<User?>(
      stream: FirebaseAuth.instance.authStateChanges(),
      builder: (context, snap) {
        if (snap.connectionState == ConnectionState.waiting) {
          return const Scaffold(body: Center(child: CircularProgressIndicator()));
        }
        if (snap.data != null) {
          // Post login setup (register device token)
          Future.microtask(() => context.read<SessionState>().onSignedIn());
          return const MainTabs();
        }
        return const PhoneAuthScreen();
      },
    );
  }
}