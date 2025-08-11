import 'package:firebase_auth/firebase_auth.dart';
import 'package:flutter/material.dart';

class SettingsTab extends StatelessWidget {
  const SettingsTab({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Settings')),
      body: ListView(
        children: [
          ListTile(
            leading: const Icon(Icons.person),
            title: const Text('Profile'),
            onTap: () {},
          ),
          SwitchListTile(
            secondary: const Icon(Icons.check_circle_outline),
            title: const Text('Read Receipts'),
            value: true,
            onChanged: (v) {},
          ),
          ListTile(
            leading: const Icon(Icons.logout),
            title: const Text('Sign out'),
            onTap: () => FirebaseAuth.instance.signOut(),
          )
        ],
      ),
    );
  }
}