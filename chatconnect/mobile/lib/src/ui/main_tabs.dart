import 'package:flutter/material.dart';
import 'tabs/chats_tab.dart';
import 'tabs/status_tab.dart';
import 'tabs/calls_tab.dart';
import 'tabs/settings_tab.dart';

class MainTabs extends StatefulWidget {
  const MainTabs({super.key});

  @override
  State<MainTabs> createState() => _MainTabsState();
}

class _MainTabsState extends State<MainTabs> {
  int _idx = 0;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: [
        const ChatsTab(),
        const StatusTab(),
        const CallsTab(),
        const SettingsTab(),
      ][_idx],
      bottomNavigationBar: NavigationBar(
        selectedIndex: _idx,
        onDestinationSelected: (i) => setState(() => _idx = i),
        destinations: const [
          NavigationDestination(icon: Icon(Icons.chat_bubble_outline), label: 'Chats'),
          NavigationDestination(icon: Icon(Icons.change_circle_outlined), label: 'Status'),
          NavigationDestination(icon: Icon(Icons.call_outlined), label: 'Calls'),
          NavigationDestination(icon: Icon(Icons.settings_outlined), label: 'Settings'),
        ],
      ),
    );
  }
}